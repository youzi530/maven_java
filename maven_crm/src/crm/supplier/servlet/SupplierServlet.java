package crm.supplier.servlet;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import crm.pojo.Supplier;
import crm.supplier.service.SupplierService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import static com.alibaba.fastjson.JSON.parseArray;

@WebServlet("*.supplier")
public class SupplierServlet extends HttpServlet {
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println(this.getServletContext().getRealPath("file"));
        //C:\Users\donru\Desktop\crm\web\file
        SupplierService supplierService=new SupplierService();
        req.setCharacterEncoding("utf-8");
        resp.setContentType("text/html;charset=utf-8");
        PrintWriter pw = resp.getWriter();
        String uri = req.getRequestURI();
        //出输出所有
        if(uri.indexOf("see")>=0){
            List<Supplier> list=supplierService.findall();
            pw.write(JSON.toJSONString(list));
            //ajax只是传字符串的时候需要加msg，否则直接传过去就可以了
//            String json = JSON.toJSONString(list);
//            pw.write("msg"+json);
            System.out.println("成功");
        }
        //删除单个
        else if(uri.indexOf("delete")>=0){
            int id= Integer.parseInt(req.getParameter("id"));
//            System.out.println(id);
            supplierService.delete(id);
            pw.write(req.getParameter("id"));

        }
        //删除选中的
        else if(uri.indexOf("chakan")>=0){
            String s=req.getParameter("s");
            System.out.println(s);
            JSONArray objects = parseArray(s);
            for(int i=0;i<objects.size();i++){
//                System.out.println(objects.get(i));
               int a=Integer.parseInt(String.valueOf(objects.get(i)));
                supplierService.delete(a);
            }
            pw.write(req.getParameter("s"));
        }
        //添加
        else if(uri.indexOf("add")>=0){
            String s=req.getParameter("jsonup");
//            System.out.println(s);
            Supplier supplier = JSON.parseObject(s).toJavaObject(Supplier.class);
            System.out.println(supplier);
            if(supplierService.findByName(supplier.getsName()).isEmpty()){
                supplierService.add(supplier);
//                int id= supplierService.findByName(supplier.getsName()).get(0).getSid();
                List<Supplier> list=supplierService.findByName(supplier.getsName());
                pw.write(JSON.toJSONString(list));
            }
            else{

            }
        }
//        修改时拿到id输出查到的数据
        else if(uri.indexOf("modify")>=0){
            int id= Integer.parseInt(req.getParameter("id"));
            List<Supplier> list=supplierService.findById(id);
//            System.out.println(list);
            pw.write(JSON.toJSONString(list));

        }
        //修改数据
        else if(uri.indexOf("replace")>=0){
            String s=req.getParameter("jsonup222");
            System.out.println(s);
            Supplier supplier = JSON.parseObject(s).toJavaObject(Supplier.class);
            if(supplierService.findById(supplier.getSid()).isEmpty()){
                pw.write("asss ");
            }else{
                supplierService.modify(supplier);
               List<Supplier> list=supplierService.findById(supplier.getSid());
               pw.write(JSON.toJSONString(list));
            }

        }
        else if(uri.indexOf("chaxun")>=0){
            String sName=req.getParameter("sName");
            List<Supplier> list=supplierService.findByMohu(sName);
            pw.write("msg"+JSON.toJSONString(list));
            System.out.println("msg"+JSON.toJSONString(list));
        }
    }
}
