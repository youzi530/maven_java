package crm.sale.lingqiao.servlet;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import crm.pojo.Product;
import crm.pojo.UserInfo;
import crm.product.dao.daoImp.ProductDaoImp;
import crm.product.dao.daoImp.SaleDaoImp;
import crm.product.dao.daoImp.SendProductDaoImp;
import crm.sale.lingqiao.dao.daoImp.ContractManageDaoImp;
import crm.sale.lingqiao.dao.daoImp.ExpenseManageDaoImp;
import crm.sale.lingqiao.dao.daoImp.PerformanceManageDaoImp;
import crm.vojo.*;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.crypto.Data;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import static com.alibaba.fastjson.JSON.parseArray;

@WebServlet("*.contractManage")
public class ContractManageServlet extends HttpServlet {
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        PrintWriter pw = resp.getWriter();
        String uri = req.getRequestURI();
        ContractManageDaoImp contractManageDaoImp = new ContractManageDaoImp();
        ProductDaoImp productDaoImp = new ProductDaoImp();
        ExpenseManageDaoImp expenseManageDaoImp = new ExpenseManageDaoImp();
        PerformanceManageDaoImp performanceManageDaoImp = new PerformanceManageDaoImp();
        SendProductDaoImp sendProductDaoImp = new SendProductDaoImp();
        SaleDaoImp saleDaoImp = new SaleDaoImp();
        UserInfo userInfo = (UserInfo) req.getSession().getAttribute("crmuser");
        String realName = userInfo.getRealName();//当前用户的名字
        int userId = userInfo.getUserId();//当前用户的身份

        if(uri.indexOf("see")>=0){
            if(userInfo.getRoleId().equals("admin")||userInfo.getRoleId().equals("供销经理")){
                List<Contact> costManages = contractManageDaoImp.viewContract();
                pw.write(JSON.toJSONString(costManages));
            }else if(userInfo.getRoleId().equals("供销职员")){
                List<Contact> contacts = contractManageDaoImp.viewContractByUsername(realName + "（工号：" + userId + "）");
                pw.write(JSON.toJSONString(contacts));
            }
        }else if(uri.indexOf("singleDelete")>=0){
            int id = Integer.parseInt(req.getParameter("id"));
            boolean b = contractManageDaoImp.deleteContractByConid(id);
            System.out.println(b);
        }else if(uri.indexOf("add")>=0){
            String jsonpurchaseData = req.getParameter("jsonpurchaseData");
            Contact contact = JSON.parseObject(jsonpurchaseData).toJavaObject(Contact.class);
            String checkTime = contact.getCheckTime();
            String giveaway = contact.getGiveaway();
            if("".equals(checkTime)){
                Date d = new Date();
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                String dateNowStr = sdf.format(d);
                contact.setCheckTime(dateNowStr);
            }
            if("".equals(giveaway)){
                contact.setGiveaway("无");
            }
            boolean b = contractManageDaoImp.addContract(contact);
            if(b!=false){
                List<Contact> contacts = contractManageDaoImp.viewContractLast();
                pw.write(JSON.toJSONString(contacts));
            }else{
                pw.write("");
            }
        }else if(uri.indexOf("manyDelete")>=0){
            String ids = req.getParameter("ids");
            JSONArray objects = parseArray(ids);
            for(int i =0;i<objects.size();i++){
                contractManageDaoImp.deleteContractByConid(Integer.parseInt((String) objects.get(i)));
            }
        }else if(uri.indexOf("queryByPname")>=0){
            String pName = req.getParameter("pName");
            if(userInfo.getRoleId().equals("admin")||userInfo.getRoleId().equals("供销经理")){
//              List<Contact> contacts = contractManageDaoImp.viewContractByUsername("%"+username+"%");
//              pw.write("msg"+JSON.toJSONString(contacts));
                List<Contact> contacts = contractManageDaoImp.viewContractByDetail("%" + pName + "%");
                pw.write("msg"+JSON.toJSONString(contacts));
            }else if(userInfo.getRoleId().equals("供销职员")){
                List<Contact> contacts = contractManageDaoImp.viewContactBydetailUsername("%" + pName + "%", realName + "（工号：" + userId + "）");
                pw.write("msg"+JSON.toJSONString(contacts));
            }
        }else if(uri.indexOf("kanBypid")>=0){
            int id = Integer.parseInt(req.getParameter("id"));
            List<Contact> contacts = contractManageDaoImp.viewContractByConid(id);
            pw.write(JSON.toJSONString(contacts));
        }else if(uri.indexOf("edit")>=0){

            //修改后的数据：
            String jsonproductData = req.getParameter("jsonproductData");
            Contact contact = JSON.parseObject(jsonproductData,Contact.class);
            int conid = contact.getConid();
            boolean b = contractManageDaoImp.editContract(contact, conid);  //修改本页面
            String state = contact.getState(); //审核状态
            String username = contact.getUsername(); //职员姓名
            if(b==true){
                pw.write(jsonproductData);
                //当合同修改审核状态的时候，修改为审核成功，不要做商品信息仓库的数量减减，当审核失败的时候，才去将商品信息加回来：然后费用管理里面插入职员卖出了某某商品多少：然后修改销售管理里面的发货状态：
                //则做商品信息仓库的数量减减：(先得到pid，去销售备份表中查询)
                if("审核成功".equals(state)){
                    String detail = contact.getDetail();
                    String[] splits = detail.split("；");
                    double money = 0;
                    for (int i=0;i<splits.length;i++){
                        Product product = new Product();
                        String[] split2 = splits[i].split("-");
                        String substring = split2[0]; //单号也就是发货表的id

                        List<SendProductCopy> sendProductCopies = contractManageDaoImp.viewSendProductCopy(Integer.parseInt(substring));
                        double salePrice = sendProductCopies.get(0).getSalePrice();
                        int saleNum= sendProductCopies.get(0).getSaleNum();
                        String s = sendProductCopies.get(0).getpName();
                        String[] split = s.split("：");
                        String[] split1 = split[1].split("）");
                        int pid = Integer.parseInt(split1[0]);//得到商品id
                        //boolean b1 = productDaoImp.reduceNum(pid, saleNum);
                        money =money+(saleNum*salePrice);

                        //当审核成功后，就将销售表中的商品的发货状态改为已发货
                        //然后修改销售管理里面的发货状态：（根据单号去备份表中去查找这条记录的saleid,然后根据saleid去销售表中改状态）
                        List<SendProductCopy> sendProductCopies1 = sendProductDaoImp.viewSaleidById(Integer.parseInt(substring));
                        int saleid = sendProductCopies1.get(0).getSaleid();
                        String sate = "发货成功";
                        boolean b1 = saleDaoImp.editStateByCid(sate, saleid);

                    }

                    //当审核成功的时候，插入到绩效管理,如果已经存在这个职员，则做修改操作，如果无职员，则做插入操作
                    boolean eistMss = performanceManageDaoImp.isEistMss(username);
                    if(eistMss==true){
                        //执行更新操作
                        PerforManagement perforManagement = new PerforManagement();
                        int l = splits.length; //明细的切割后的数组元素个数就是订单个数
                        int num = 1;
                        perforManagement.setSaleOrderNum(l);
                        perforManagement.setContractNum(num);
                        perforManagement.setContractMoney(money);
                        boolean b1 = performanceManageDaoImp.editPerfanceByUsername(perforManagement, username);

                    }else{
                        //执行添加操作
                        PerforManagement perforManagement = new PerforManagement();
                        int l = splits.length; //明细的切割后的数组元素个数就是订单个数
                        int num = 1;
                        perforManagement.setSaleOrderNum(l);
                        perforManagement.setContractNum(num);
                        perforManagement.setContractMoney(money);
                        perforManagement.setUsername(username);
                        boolean b1 = performanceManageDaoImp.addPerformance(perforManagement);
                    }
                }else if("审核失败".equals(state)){
                    //当审核失败的时候，才去将商品信息加回来
                    String detail = contact.getDetail();
                    String[] splits = detail.split("；");
                    for (int i=0;i<splits.length;i++) {
                        Product product = new Product();

                        String[] split2 = splits[i].split("-");
                        String substring = split2[0]; //单号也就是发货表的id

                        //String substring = splits[i].substring(0, 3);
                        List<SendProductCopy> sendProductCopies = contractManageDaoImp.viewSendProductCopy(Integer.parseInt(substring));
                        double salePrice = sendProductCopies.get(0).getSalePrice();
                        int saleNum = sendProductCopies.get(0).getSaleNum();
                        String s = sendProductCopies.get(0).getpName();
                        String[] split = s.split("：");
                        String[] split1 = split[1].split("）");
                        int pid = Integer.parseInt(split1[0]);//得到商品id
                        boolean b1 = productDaoImp.addProNum(pid, saleNum);

                        //当审核失败了，那就删除费用管理里面的记录，通过substring来删除
                        boolean b2 = expenseManageDaoImp.deleteCostmanageByid(Integer.parseInt(substring));

                        //当审核成功后，就将销售表中的商品的发货状态改为已发货
                        //然后修改销售管理里面的发货状态：（根据单号去备份表中去查找这条记录的saleid,然后根据saleid去销售表中改状态）
                        List<SendProductCopy> sendProductCopies1 = sendProductDaoImp.viewSaleidById(Integer.parseInt(substring));
                        int saleid = sendProductCopies1.get(0).getSaleid();
                        String sate = "发货失败";
                        boolean b4 = saleDaoImp.editStateByCid(sate, saleid);
                    }
                }

            }else{
                pw.write(" ");
            }
        }
    }
}
