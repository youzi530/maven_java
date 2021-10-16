package crm.supplier.servlet;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import crm.supplier.service.IncallManageService;
import crm.vojo.IncallManage;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import static com.alibaba.fastjson.JSON.parseArray;

@WebServlet("*.call")
public class IncallManageServlet extends HttpServlet {
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        IncallManageService incallManageService=new IncallManageService();
        req.setCharacterEncoding("utf-8");
        resp.setContentType("text/html;charset=utf-8");
        PrintWriter pw = resp.getWriter();
        String uri = req.getRequestURI();
        if(uri.indexOf("see")>=0){
            List<IncallManage> list =incallManageService.viewAll() ;
            System.out.println(list);
            pw.write(JSON.toJSONString(list));
        }
        else if(uri.indexOf("delete")>=0){
            int id= Integer.parseInt(req.getParameter("id"));
//            System.out.println(id);
            incallManageService.delete(id);
            pw.write(req.getParameter("id"));
        }
        else if(uri.indexOf("chakan")>=0){
            String s=req.getParameter("s");
            System.out.println(s);
            JSONArray objects = parseArray(s);
            for(int i=0;i<objects.size();i++){
//                System.out.println(objects.get(i));
                int a=Integer.parseInt(String.valueOf(objects.get(i)));
                incallManageService.delete(a);
            }
            pw.write(req.getParameter("s"));
        }
        else if(uri.indexOf("add")>=0){
            String s=req.getParameter("jsoncall");
//            System.out.println(s);
            IncallManage incallManage = JSON.parseObject(s).toJavaObject(IncallManage.class);
            incallManageService.add(incallManage);
            List<IncallManage>list=incallManageService.maxId();
            pw.write(JSON.toJSONString(list));
        }
        //通过id找出这条的所有信息返回
        else if(uri.indexOf("modify")>=0){
            int id= Integer.parseInt(req.getParameter("id"));
            System.out.println(id);
            List<IncallManage> list=incallManageService.findByid(id);
            pw.write(JSON.toJSONString(list));
        }
        else if(uri.indexOf("replace")>=0){
            String s=req.getParameter("jsonsha");
            IncallManage incallManage = JSON.parseObject(s).toJavaObject(IncallManage.class);
            incallManageService.modify(incallManage);
            if(incallManageService.modify(incallManage)){
                List<IncallManage> list = incallManageService.findByid(incallManage.getId());
                pw.write(JSON.toJSONString(list));
            }
            else{
                pw.write("dsf sdf ");
            }
        }
        else if(uri.indexOf("chaxun")>=0){
            String s = req.getParameter("sName");
            List<IncallManage> list=incallManageService.findmohu(s);
            pw.write("msg"+JSON.toJSONString(list));
        }
    }
}
