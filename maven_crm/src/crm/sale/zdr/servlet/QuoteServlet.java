package crm.sale.zdr.servlet;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import crm.pojo.Product;
import crm.product.dao.ProductDao;
import crm.product.dao.daoImp.ProductDaoImp;
import crm.sale.zdr.dao.ProductQuoteDao;
import crm.sale.zdr.dao.daoImp.ProductQuoteDaoImp;
import crm.supplier.service.ChannelManageService;
import crm.vojo.IncallManage;
import crm.vojo.ProductQuote;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import static com.alibaba.fastjson.JSON.parseArray;

@WebServlet("*.quote")
public class QuoteServlet extends HttpServlet {
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        ProductDao productDao=new ProductDaoImp();
        ProductQuoteDao productQuoteDao = new ProductQuoteDaoImp();
        req.setCharacterEncoding("utf-8");
        resp.setContentType("text/html;charset=utf-8");
        PrintWriter pw = resp.getWriter();
        String uri = req.getRequestURI();
        if (uri.indexOf("see") >= 0) {
            List<ProductQuote> list = productQuoteDao.viewAll();
            pw.write(JSON.toJSONString((list)));
        } else if (uri.indexOf("delete") >= 0) {
            int id = Integer.parseInt(req.getParameter("id"));
            System.out.println(id);
            productQuoteDao.delete(id);
            pw.write("cg");
        }
        else if (uri.indexOf("chakan") >= 0) {
                String s = req.getParameter("s");
                System.out.println(s);
                JSONArray objects = parseArray(s);
                for (int i = 0; i < objects.size(); i++) {
//                System.out.println(objects.get(i));
                    int id=Integer.parseInt(String.valueOf(objects.get(i)));
                    productQuoteDao.delete(id);
                }
            pw.write(s);
        }
        else if(uri.indexOf("shangping")>=0){
            List<Product> list = productDao.viewProInfo();
            pw.write(JSON.toJSONString(list));
        }
        else if(uri.indexOf("add")>=0){
            String s = req.getParameter("jsoncall");
            System.out.println(s);
            ProductQuote productQuote = JSON.parseObject(s).toJavaObject(ProductQuote.class);
            productQuoteDao.add(productQuote);
            List<ProductQuote> list =productQuoteDao.findByid(productQuote.getPid());
            pw.write(JSON.toJSONString((list)));
        }
        else if(uri.indexOf("modify")>=0){
            int id=Integer.parseInt(req.getParameter("id"));
            List<ProductQuote> list = productQuoteDao.findByid(id);
            pw.write(JSON.toJSONString(list));
        }
        else if(uri.indexOf("replace")>=0){
            String s=req.getParameter("jsonsha");
            ProductQuote productQuote = JSON.parseObject(s).toJavaObject(ProductQuote.class);
            productQuoteDao.modify(productQuote);
            if(productQuoteDao.modify(productQuote)){
                List<ProductQuote> list = productQuoteDao.findByid(productQuote.getPid());
                pw.write(JSON.toJSONString(list));
            }
            else{
                pw.write("dsf sdf ");
            }
        }
        else if(uri.indexOf("chaxun")>=0){
            String s=req.getParameter("sName");
            List<ProductQuote> list= productQuoteDao.findMohu(s);
            pw.write("msg"+JSON.toJSONString(list));
        }

    }
}
