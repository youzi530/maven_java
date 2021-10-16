package crm.product.servlet;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.sun.org.apache.bcel.internal.generic.SALOAD;
import crm.pojo.UserInfo;
import crm.product.dao.daoImp.SaleDaoImp;
import crm.product.dao.daoImp.SendProductDaoImp;
import crm.vojo.Sale;
import crm.vojo.SendProduct;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import static com.alibaba.fastjson.JSON.clearMixInAnnotations;
import static com.alibaba.fastjson.JSON.parseArray;

@WebServlet("*.sales")
public class SaleServlet extends HttpServlet {

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        PrintWriter pw = resp.getWriter();
        String uri = req.getRequestURI();
        SaleDaoImp saleDaoImp = new SaleDaoImp();
        SendProductDaoImp sendProductDaoImp= new SendProductDaoImp();
        UserInfo userInfo = (UserInfo) req.getSession().getAttribute("crmuser");
        String realName = userInfo.getRealName();//当前用户的名字
        int userId = userInfo.getUserId();//当前用户的身份

        if(uri.indexOf("see")>=0){
            if(userInfo.getRoleId().equals("admin")||userInfo.getRoleId().equals("供销经理")){
                List<Sale> sales = saleDaoImp.viewSaleInfo();
                pw.write(JSON.toJSONString(sales));
            }else if(userInfo.getRoleId().equals("供销职员")){
                List<Sale> sales = saleDaoImp.viewSaleByUsername(realName+"（工号："+userId+"）");
                pw.write(JSON.toJSONString(sales));
            }
        }else if(uri.indexOf("singleDelete")>=0){
            int id = Integer.parseInt(req.getParameter("id"));
            saleDaoImp.deleteSaleBycid(id);
        }else if(uri.indexOf("add")>=0){
            String jsonpurchaseData = req.getParameter("jsonpurchaseData");
            Sale sale = JSON.parseObject(jsonpurchaseData).toJavaObject(Sale.class);
            int pid = sale.getPid();
            //String pName = sale.getpName();
            // int pid = saleDaoImp.viewIdBypName(pName); //要是商品同名就完了！！！！
            boolean b = saleDaoImp.addSale(sale);
            if(b!=false){
                List<Sale> sales = saleDaoImp.viewSalesLast();
                int cid = sales.get(0).getCid();
                // pw.write(JSON.toJSONString(sales));
                //在销售管理处，新增一条销售记录时，商品库存里面的值就必须减少！！！
                //我想了想，这个逻辑应该放在审核合同的时候进行操作！！

                //当销售管理添加完毕后，将销售记录会添加到发货表表中作为一个发货出单
                SendProduct sendProduct = new SendProduct();
                String s = sale.getpName();//商品姓名
                double salePrice = sale.getSalePrice(); //销售价格
                int saleNum = sale.getSaleNum(); //商品数量
                String address="请选择收货地址"; //收货地址
                String clientName="请选择收货人";
                String username = sale.getUsername(); //职员姓名

                sendProduct.setpName(s);
                sendProduct.setAddress(address);
                sendProduct.setUsername(username);
                sendProduct.setClientName(clientName);
                sendProduct.setSaleNum(saleNum);
                sendProduct.setSalePrice(salePrice);
                sendProduct.setSaleid(cid);
                boolean b1 = sendProductDaoImp.addSaleToSendproduct(sendProduct);
                if(b1!=false){
                    pw.write(JSON.toJSONString(sales));
                }else{
                    pw.write("");
                }
            }else{
                pw.write("");
            }
        }else if(uri.indexOf("manyDelete")>=0){
            String ids = req.getParameter("ids");
            JSONArray objects = parseArray(ids);
            for(int i =0;i<objects.size();i++){
                saleDaoImp.deleteSaleBycid(Integer.parseInt((String) objects.get(i)));
            }
        }else if(uri.indexOf("queryByPname")>=0){
            String pName = req.getParameter("pName");
            //权限控制，当身份为老板和经理，通过全局的商品姓名来查所有的，
            //而是员工的时候，那就需要查找是自己的商品，所以需要加一个条件来查询
            if(userInfo.getRoleId().equals("admin")||userInfo.getRoleId().equals("供销经理")){
                List<Sale> sales = saleDaoImp.viewSalesByPname("%"+pName+"%");
                pw.write("msg"+JSON.toJSONString(sales));
            }else if(userInfo.getRoleId().equals("供销职员")){
                //viewSaleByPnameUser("百事可乐（编号：1001）","老板（工号：1）")
                List<Sale> sales = saleDaoImp.viewSaleByPnameusername("%" + pName + "%",realName+"（工号："+userId+"）");
                pw.write("msg"+JSON.toJSONString(sales));
            }
        }else if(uri.indexOf("kanBypid")>=0){
            int cid = Integer.parseInt(req.getParameter("cid"));
            List<Sale> products = saleDaoImp.viewSaleByCid(cid);
            pw.write(JSON.toJSONString(products));
        }else if(uri.indexOf("edit")>=0){

            //这是修改后的数据：
            String jsonproductData = req.getParameter("jsonproductData");
            Sale sale = JSON.parseObject(jsonproductData,Sale.class);
            int cid = sale.getCid();
            String s = sale.getpName();
            int saleNum = sale.getSaleNum();
            double salePrice = sale.getSalePrice();
            String username = sale.getUsername();

            //商品同名bug改善：
//          //这里是通过修改后的商品名来查询到pid，然后在更新到sale里面，再做修改操作
//            String pName = sale.getpName();
//            int pid = saleDaoImp.viewIdBypName(pName);
//            sale.setPid(pid);

            //这是修改前的数据：cid (通过cid来查询修改前的数据)
            List<Sale> sales = saleDaoImp.viewSaleByCid(cid);
            String s1 = sales.get(0).getpName();

            //当修改好销售表里面的数据时，那么与此同时要做的是，修改发货表中的数据的时候，分两种情况：
            //当商品名字没改，那么直接通过saleid(也就是cid)来进行修改数量和价格：
            if(s1.equals(s)){
                boolean b = sendProductDaoImp.editSaleBysaleid(salePrice, saleNum, cid);
            //当商品名字改了，那么也是直接通过saleid(也就是cid)来进行修改数量和价格
            }else{
                SendProduct sendProduct = new SendProduct();
                sendProduct.setSalePrice(salePrice);
                sendProduct.setSaleNum(saleNum);
                sendProduct.setpName(s);
                sendProduct.setUsername(username);
                boolean b = sendProductDaoImp.editSenproBysaleid(sendProduct, cid);
            }

            boolean b = saleDaoImp.editSaleByCid(sale,cid);//修改本页面的数据
            if(b==true){
                pw.write(jsonproductData);
            }else{
               pw.write(" ");
            }
        }
    }
}
