package crm.product.servlet;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import crm.pojo.ClientInfo;
import crm.pojo.Product;
import crm.pojo.UserInfo;
import crm.product.dao.daoImp.ProductDaoImp;
import crm.product.dao.daoImp.SaleDaoImp;
import crm.product.dao.daoImp.SendProductDaoImp;
import crm.sale.lingqiao.dao.daoImp.ContractManageDaoImp;
import crm.sale.lingqiao.dao.daoImp.ExpenseManageDaoImp;
import crm.vojo.*;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import static com.alibaba.fastjson.JSON.parseArray;

@WebServlet("*.sendProduct")
public class SendProductServlet extends HttpServlet {
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        PrintWriter pw = resp.getWriter();
        String uri = req.getRequestURI();
        SendProductDaoImp sendProductDaoImp = new SendProductDaoImp();
        SaleDaoImp saleDaoImp = new SaleDaoImp();
        ContractManageDaoImp contractManageDaoImp = new ContractManageDaoImp();
        ProductDaoImp productDaoImp = new ProductDaoImp();
        ExpenseManageDaoImp expenseManageDaoImp = new ExpenseManageDaoImp();
        UserInfo userInfo = (UserInfo) req.getSession().getAttribute("crmuser");
        String realName = userInfo.getRealName();//当前用户的名字
        int userId = userInfo.getUserId();//当前用户的身份

        if(uri.indexOf("see")>=0){
            //当身份为系统管理员或者经理，当页面加载时，查询所有的信息
            if(userInfo.getRoleId().equals("admin")||userInfo.getRoleId().equals("供销经理")){
                List<SendProduct> sendProducts = sendProductDaoImp.viewSendPro();
                pw.write(JSON.toJSONString(sendProducts));
            }else if(userInfo.getRoleId().equals("供销职员")){
                List<SendProduct> sendProducts = sendProductDaoImp.viewSendProByUsername(realName + "（工号：" + userId + "）");
                pw.write(JSON.toJSONString(sendProducts));
            }

        }else if(uri.indexOf("singleDelete")>=0){
            int id = Integer.parseInt(req.getParameter("id"));
            sendProductDaoImp.deleteSendProByid(id);
        }else if(uri.indexOf("add")>=0){
            String jsonpurchaseData = req.getParameter("jsonpurchaseData");
            SendProduct sendProduct = JSON.parseObject(jsonpurchaseData).toJavaObject(SendProduct.class);
            sendProduct.setSaleid(0);
            boolean b = sendProductDaoImp.addSendProduct(sendProduct);
            if(b!=false){
                List<SendProduct> sendProducts = sendProductDaoImp.viewSendProLast();
                pw.write(JSON.toJSONString(sendProducts));
            }else{
                pw.write("");
            }
        }else if(uri.indexOf("manyDelete")>=0){
            String ids = req.getParameter("ids");
            JSONArray objects = parseArray(ids);
            for(int i =0;i<objects.size();i++){
                sendProductDaoImp.deleteSendProByid(Integer.parseInt((String) objects.get(i)));
            }
        }else if(uri.indexOf("queryByPname")>=0){
            String pName = req.getParameter("pName");
            if(userInfo.getRoleId().equals("admin")||userInfo.getRoleId().equals("供销经理")){
                List<SendProduct> sendProducts = sendProductDaoImp.viewSendProByPName("%"+pName+"%");
                pw.write("msg"+JSON.toJSONString(sendProducts));
            }else if(userInfo.getRoleId().equals("供销职员")){
                List<SendProduct> sendProducts = sendProductDaoImp.viewSendProByPnameUser("%" + pName + "%", realName + "（工号：" + userId + "）");
                pw.write("msg"+JSON.toJSONString(sendProducts));
            }

        }else if(uri.indexOf("kanBypid")>=0){
            int id = Integer.parseInt(req.getParameter("id"));
            List<SendProduct> sendProducts = sendProductDaoImp.viewSendProById(id);
            pw.write(JSON.toJSONString(sendProducts));
        }else if(uri.indexOf("edit")>=0){
            String jsonproductData = req.getParameter("jsonproductData");
            SendProduct sendProduct = JSON.parseObject(jsonproductData,SendProduct.class);
            int id = sendProduct.getId();
            boolean b = sendProductDaoImp.editSendProduct(sendProduct, id);
            if(b==true){
                pw.write(jsonproductData);
            }else{
                pw.write(" ");
            }
        //生成合同的servlet：
        }else if(uri.indexOf("contract")>=0){
            String ids = req.getParameter("ids");
            JSONArray objects = parseArray(ids);

            String username = null;//发货人&销售员
            String clientName;
            String pNames; //商品名称
            int id; //发货单号
            String cName = ""; //合同名
            int saleNum;
            double salePrice;
            String details = ""; //合同明细
            double salePrice1 = 0;
            int saleNum1 = 0;

            for(int i =0;i<objects.size();i++){
                List<SendProduct> sendProducts = sendProductDaoImp.viewSendProById(Integer.parseInt((String) objects.get(i)));
                username = sendProducts.get(0).getUsername();
                clientName = sendProducts.get(0).getClientName();
                pNames = sendProducts.get(0).getpName();//商品名称
                id = sendProducts.get(0).getId();//发货单号
                String clientName1 = sendProducts.get(0).getClientName();

                salePrice1 = sendProducts.get(0).getSalePrice();
                saleNum1 = sendProducts.get(0).getSaleNum();
                cName = "合同："+clientName1;//合同名
                //改bug：下面是通过商品名字和职员姓名来查询商品的数量和价格，这存在一个问题：我无法去判断同一用户销售了两件相同的商品
                //但是现在我这个表中新增了数量和价格，我直接在本页面进行查询即可，就避免了上面出现的错误！！
                //List<Sale> sales = saleDaoImp.viewSaleByPnameUser(pNames, username);
                //saleNum = sales.get(0).getSaleNum();
                //salePrice = sales.get(0).getSalePrice();
                details = details+ id+"-单号  :卖出了"+pNames+",数量:"+saleNum1+";";

                //当生成合同后，就将商品信息表中数据更新，减减
                String[] split = pNames.split("：");
                String[] split1 = split[1].split("）");
                int pid = Integer.parseInt(split1[0]);//得到商品id
                boolean b = productDaoImp.reduceNum(pid, saleNum1);

                //当生成合同的时候，将发货信息里面的商品，加入到费用管理中
                CostManage costManage = new CostManage();
                costManage.setUsername(username);
                costManage.setIncome(salePrice1*saleNum1);
                //这里的支出需要进行修改，支出的话就是你买的数量*进货价，进货价是通过商品id去商品表中进行查找
                List<Product> products = productDaoImp.viewProByPid(pid);
                double price = products.get(0).getpPrice();
                costManage.setOutcome(price*saleNum1);
                costManage.setDetail("卖出了"+pNames+":"+saleNum1);
                costManage.setState("未审核");
                costManage.setPursaleid(id);
                boolean b1 = expenseManageDaoImp.addToExpenseManage(costManage);



            }
            Date d = new Date();
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            String dateNowStr = sdf.format(d);

            Contact contact = new Contact();
            contact.setcName(cName);
            contact.setDetail(details);
            contact.setUsername(username);
            contact.setGiveaway("无");
            contact.setState("未审核");
            contact.setCheckTime(dateNowStr);
            boolean b = contractManageDaoImp.addContract(contact);

            if(b!=false){
                //当加入合同成功后，那么就把发货表中的数据存入发货备份表中，方便后面的操作
                int id1;
                String pName1;
                String adress1;
                String clientName1;
                String username1;
                int conid;
                String state;
                for(int i =0;i<objects.size();i++){
                    List<SendProduct> sendProducts = sendProductDaoImp.viewSendProById(Integer.parseInt((String) objects.get(i)));
                    id1 = sendProducts.get(0).getId();
                    pName1 = sendProducts.get(0).getpName();
                    adress1 = sendProducts.get(0).getAddress();
                    clientName1 = sendProducts.get(0).getClientName();
                    username1 = sendProducts.get(0).getUsername();
                    //查看最后一条记录的合同id
                    List<Contact> contacts = contractManageDaoImp.viewContractLast();
                    conid = contacts.get(0).getConid();
                    state = contacts.get(0).getState();
                    salePrice1 = sendProducts.get(0).getSalePrice();
                    saleNum1 = sendProducts.get(0).getSaleNum();
                    int saleid = sendProducts.get(0).getSaleid();

                    //将相关信息插入到备份表中
                    SendProductCopy sendProductCopy = new SendProductCopy();
                    sendProductCopy.setId(id1);
                    sendProductCopy.setpName(pName1);
                    sendProductCopy.setAddress(adress1);
                    sendProductCopy.setClientName(clientName1);
                    sendProductCopy.setUsername(username1);
                    sendProductCopy.setConid(conid);
                    sendProductCopy.setState(state);
                    //TODO:这里需要set salePrice saleNum，这是改表之后的操作
                    sendProductCopy.setSalePrice(salePrice1);
                    sendProductCopy.setSaleNum(saleNum1);
                    sendProductCopy.setSaleid(saleid);

                    //执行添加操作：
                    boolean b1 = sendProductDaoImp.addSendproToCopy(sendProductCopy);


                }
                //当生成合同成功后，就将发货表的已选数据删除
                for(int i =0;i<objects.size();i++){
                    sendProductDaoImp.deleteSendProByid(Integer.parseInt((String) objects.get(i)));
                }
            }
        }else if(uri.indexOf("clentMessage")>=0){
            List<ClientInfo> clientInfos = sendProductDaoImp.viewClientInfo();
            if(clientInfos!=null){
                pw.write(JSON.toJSONString(clientInfos));
            }else {
                pw.write("");
            }
        }else if(uri.indexOf("cityman")>=0){
            String ids = req.getParameter("ids");
            JSONArray objects = parseArray(ids);
            String sendProducts = "";

            for(int i = 0; i<objects.size();i++){
                List<SendProduct> sendProduct1 = sendProductDaoImp.viewSendProById(Integer.parseInt((String) objects.get(i)));
                String s = JSON.toJSONString(sendProduct1);
                sendProducts = sendProducts + s +"crm";
            }
            pw.write(sendProducts);
            System.out.println(sendProducts);
        }

    }
}
