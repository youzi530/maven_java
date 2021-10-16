package crm.sale.zdr.servlet;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import crm.manage.dao.UserDao;
import crm.manage.dao.impl.UserDaoImpl;
import crm.pojo.MarketActivity;
import crm.pojo.UserInfo;
import crm.sale.zdr.dao.MarketActivityDao;
import crm.sale.zdr.dao.daoImp.MarketActivityDaoImp;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import static com.alibaba.fastjson.JSON.parseArray;
import static com.alibaba.fastjson.JSON.toJSON;

@WebServlet("*.acctive")
public class MarketActivityServlet extends HttpServlet {
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        MarketActivityDao dao=new MarketActivityDaoImp();
        UserDao userDao=new UserDaoImpl();
        req.setCharacterEncoding("utf-8");
        resp.setContentType("text/html;charset=utf-8");
        PrintWriter pw = resp.getWriter();
        String uri = req.getRequestURI();
        if(uri.indexOf("see")>=0){
            List<MarketActivity> list=dao.findAll();
//            System.out.println(list);
            pw.write(JSON.toJSONString(list));
        }
        else if (uri.indexOf("delete")>=0){
            int id = Integer.parseInt(req.getParameter("id"));
            dao.delete(id);
            pw.write(req.getParameter("id"));
        }
        else if(uri.indexOf("chakan")>=0){
            String s = req.getParameter("s");
            System.out.println(s);
            JSONArray objects = parseArray(s);
            for (int i = 0; i < objects.size(); i++) {
//                System.out.println(objects.get(i));
                int id=Integer.parseInt(String.valueOf(objects.get(i)));
                dao.delete(id);
            }
            pw.write(s);
        }
        else if(uri.indexOf("user")>=0){
            List<UserInfo>list = dao.findBoss();
            pw.write(JSON.toJSONString(list));
        }
        else  if(uri.indexOf("add")>=0){
            String s=req.getParameter("jsoncall");
            System.out.println(s);
            MarketActivity marketActivity = JSON.parseObject(s).toJavaObject(MarketActivity.class);
            dao.add(marketActivity);
            pw.write(JSON.toJSONString(dao.findMax()));

        }
        else if(uri.indexOf("modify")>=0){
             int id=Integer.parseInt(req.getParameter("id"));
             List<MarketActivity> list = dao.findById(id);
             pw.write(JSON.toJSONString(list));
        }
        else if(uri.indexOf("replace")>=0){
            String s=req.getParameter("jsonsha");
            MarketActivity marketActivity = JSON.parseObject(s).toJavaObject(MarketActivity.class);
            dao.modify(marketActivity);
            pw.write(s);
        }
        else if(uri.indexOf("chaxun")>=0){
            String s=req.getParameter("sName");
            List<MarketActivity> list=dao.findMohu(s);
//            System.out.println(list);
            pw.write("msg"+JSON.toJSONString(list));
        }
    }
}
