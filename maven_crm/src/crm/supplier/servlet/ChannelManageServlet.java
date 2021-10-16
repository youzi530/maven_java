package crm.supplier.servlet;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import crm.pojo.ChannelManage;
import crm.pojo.UserInfo;
import crm.supplier.service.ChannelManageService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import static com.alibaba.fastjson.JSON.parseArray;

@WebServlet("*.channel")
public class ChannelManageServlet extends HttpServlet {
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        ChannelManageService channelManageService=new ChannelManageService();
        req.setCharacterEncoding("utf-8");
        resp.setContentType("text/html;charset=utf-8");
        PrintWriter pw = resp.getWriter();
        String uri = req.getRequestURI();
        if(uri.indexOf("see")>=0){
            List<ChannelManage>list = channelManageService.findall();
            pw.write(JSON.toJSONString(list));
        }
        else if(uri.indexOf("delete")>=0){
            String sName=req.getParameter("sName");
            if(channelManageService.delete(sName)){
            pw.write("gg");}
            else{
                pw.write("");
            }
        }
        else if(uri.indexOf("chakan")>=0){
            String s=req.getParameter("s");
            System.out.println(s);
            JSONArray objects = parseArray(s);
            for(int i=0;i<objects.size();i++){
//                System.out.println(objects.get(i));
                String s1=String.valueOf(objects.get(i));
                channelManageService.delete(s1);
            }
            pw.write(s);
        }
        else if(uri.indexOf("yuangong")>=0){
            List<UserInfo> list = channelManageService.findYg();
            pw.write(JSON.toJSONString(list));
        }
        else if(uri.indexOf("add")>=0){
            String s=req.getParameter("jsonqd");
            ChannelManage channelManage=JSON.parseObject(s).toJavaObject(ChannelManage.class);
            //先添加进去
            channelManageService.add(channelManage);
//                int id= supplierService.findByName(supplier.getsName()).get(0).getSid();
            List<ChannelManage> list=channelManageService.findByName(channelManage.getsName());
            pw.write(JSON.toJSONString(list));
            }
        //todo
        //判断是否存在这个渠道
        else if(uri.indexOf("modify")>=0){
            String s=req.getParameter("sName");
            System.out.println(s);
            List<ChannelManage> list=channelManageService.findByName(s);
            pw.write(JSON.toJSONString(list));
            }
        else if(uri.indexOf("tianjia")>=0){
            List<UserInfo> list = channelManageService.findYg();
            pw.write("msg"+JSON.toJSONString(list));
        }
        else if(uri.indexOf("replace")>=0){
            String s=req.getParameter("jsonsha");
            System.out.println(s);
            ChannelManage channelManage = JSON.parseObject(s).toJavaObject(ChannelManage.class);
            System.out.println(channelManage);
            channelManageService.modify(channelManage);
            List<ChannelManage> list=channelManageService.findByName(channelManage.getsName());
            pw.write(JSON.toJSONString(list));
//            if(channelManageService.findByName(channelManage.getsName()).isEmpty()){
//            }else{
//                channelManageService.modify(channelManage);
//                List<ChannelManage> list=channelManageService.findByName(channelManage.getsName());
//                pw.write(JSON.toJSONString(list));
//            }
        }
        else if(uri.indexOf("chaxun")>=0){
            String s=req.getParameter("sName");
            List<ChannelManage> list=channelManageService.findByMohu(s);
            pw.write("msg"+JSON.toJSONString(list));
            System.out.println("msg"+JSON.toJSONString(list));
        }
        }

}
