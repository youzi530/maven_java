package crm.manage.servlet;

import com.alibaba.fastjson.JSON;
import crm.manage.dao.ReceiveDao;
import crm.manage.dao.impl.MailDaoImpl;
import crm.manage.dao.impl.ReceiveDaoImpl;
import crm.pojo.EmailManage;
import crm.pojo.Receive;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@WebServlet("*.mail")
public class MailServlet extends HttpServlet {
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("utf-8");
        resp.setContentType("text/html;charset=utf-8");
        PrintWriter pw = resp.getWriter();
        String uri = req.getRequestURI();
        MailDaoImpl mailDao = new MailDaoImpl();
        ReceiveDao receiveDao = new ReceiveDaoImpl();
        if(uri.indexOf("see")>=0){
            int id= Integer.parseInt(req.getParameter("userId"));
           List<EmailManage> list = mailDao.query(id);
           List<Receive>  list1 =  receiveDao.query(id);
            System.out.println(list1);
           String s= JSON.toJSONString(list);
           String s1=JSON.toJSONString(list1);
           pw.write(s+"msg"+s1);

        }
        else if(uri.indexOf("add")>=0){
            String s=req.getParameter("jsonup");
//            System.out.println(s);
            EmailManage emailManage = JSON.parseObject(s).toJavaObject(EmailManage.class);
            Receive receive = JSON.parseObject(s).toJavaObject(Receive.class);
            mailDao.add(emailManage);
            receive.setReady("未读");
            receiveDao.add(receive);
            List<EmailManage> list = mailDao.viewMax();
            pw.write(JSON.toJSONString(list));


        }
        else if(uri.indexOf("delete")>=0){
            int id= Integer.parseInt(req.getParameter("id"))-1;
            System.out.println(id);
            String biao= req.getParameter("queren");
            System.out.println(biao);
            if(biao.equals("fajian")){
                mailDao.delete(id);
            }
            else if(biao.equals("shoujian" +
                    "")){
                receiveDao.delete(id);
            }

        }
        else if(uri.indexOf("modify")>=0){
            int  id = Integer.parseInt(req.getParameter("i"));
            if(receiveDao.status(id)){
                pw.write("msg"+"成功");
            }else{
                pw.write("msg"+"失败");
            }
        }

    }
}
