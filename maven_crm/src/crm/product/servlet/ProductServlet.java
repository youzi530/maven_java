package crm.product.servlet;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import crm.pojo.Product;
import crm.pojo.Supplier;
import crm.pojo.UserInfo;
import crm.product.dao.daoImp.ProductDaoImp;
import crm.vojo.Daily;

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

@WebServlet("*.product")
public class ProductServlet extends HttpServlet {

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        PrintWriter pw = resp.getWriter();
        String uri = req.getRequestURI();
        ProductDaoImp productDaoImp = new ProductDaoImp();

        UserInfo userInfo = (UserInfo) req.getSession().getAttribute("crmuser");
        String realName = userInfo.getRealName();//当前用户的名字
        int userId = userInfo.getUserId();//当前用户的身份

        if(uri.indexOf("see")>=0){
            List<Product> list = productDaoImp.viewProInfo();
            if(list!=null){
                pw.write(JSON.toJSONString(list));
            }else{
                pw.write("");
            }
        }else if(uri.indexOf("singleDelete")>=0){
            int pid = Integer.parseInt(req.getParameter("id"));
            boolean b = productDaoImp.deleteProduct(pid);
            //在前台做了判断，当传过去的不是空，那么失败，如果是空，那么就成功
            //TODO
            if(b!=false){
                pw.write("");
            }else{
                pw.write("删除失败！");
            }
        }else if(uri.indexOf("manyDelete")>=0){
            String ids = req.getParameter("ids");
            JSONArray objects = parseArray(ids);
            for(int i =0;i<objects.size();i++){
                productDaoImp.deleteProduct(Integer.parseInt((String) objects.get(i)));
            }
        }else if(uri.indexOf("edit")>=0){
            String jsonproductData = req.getParameter("jsonproductData");
            Product product = JSON.parseObject(jsonproductData,Product.class);
            int pid = product.getPid();
            boolean b = productDaoImp.editProduct(product, pid);
            if(b==true){
                //当修改商品信息成功后，就存入到日志表中
                String s = product.getpName();
                double price = product.getpPrice();
                int i = product.getpNum();
                int pid1 = product.getPid();
                Daily daily = new Daily();
                Date d = new Date();
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                String dateNowStr = sdf.format(d);
                String operation=realName+"修改了"+s+"（编号："+pid1+"）"+",数量："+i+",价格："+price;
                daily.setTablenumber(1);
                daily.setTime(dateNowStr);
                daily.setOperation(operation);

                boolean b1 = productDaoImp.addToDaily(daily);
                if(b1==true){
                    pw.write(jsonproductData);
                }else{
                    pw.write("");
                }
            }else{
                pw.write("");
            }
        }else if(uri.indexOf("kanBypid")>=0){
            int pid = Integer.parseInt(req.getParameter("id"));
            List<Product> products = productDaoImp.viewProByPid(pid);
            pw.write(JSON.toJSONString(products));
        }else if(uri.indexOf("add")>=0){
            String jsonproductData = req.getParameter("jsonproductData");
            Product product = JSON.parseObject(jsonproductData).toJavaObject(Product.class);
            boolean b = productDaoImp.addProduct(product);
            if(b!=false){
                List<Product> products = productDaoImp.viewProLast();
                pw.write(JSON.toJSONString(products));
            }else{
                pw.write("");
            }
        }else if(uri.indexOf("queryByPname")>=0){
            System.out.println("进入到查询的servlet！");
            String pName = req.getParameter("pName");
            List<Product> products = productDaoImp.viewProByPname("%"+pName+"%");
            pw.write("msg"+JSON.toJSONString(products));
        }else if(uri.indexOf("supplier")>=0){
            List<Supplier> list = productDaoImp.viewSupplier();
            //pw.write("msg" +msg);
            pw.write(JSON.toJSONString(list));
        }else if(uri.indexOf("userInfo")>=0){
            List<UserInfo> userInfos = productDaoImp.viewUserInfo();
            pw.write(JSON.toJSONString(userInfos));
        }else if(uri.indexOf("pNum")>=0){
            int pid = Integer.parseInt(req.getParameter("id"));
            int i = productDaoImp.viewPNumByid(pid);
            pw.write(i);
        }
    }
}
