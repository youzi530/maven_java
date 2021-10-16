package crm.client.servlet;

import com.alibaba.fastjson.JSON;
import crm.client.service.LinkmanService;
import crm.manage.servive.UserService;
import crm.pojo.UserInfo;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PushbackReader;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

/**
 * 客户部联系人管理
 */
@WebServlet("*.linkman")
public class LinkmanServlet extends HttpServlet {

    private LinkmanService linkmanService = new LinkmanService();
    private UserService userService = new UserService();

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String uri = req.getRequestURI();
        System.out.println(this.getServletContext().getRealPath(""));
        if (uri.contains("add")){
            String linkmanName = req.getParameter("linkmanName"); String identity = req.getParameter("identity");
            String sex = req.getParameter("sex"); String birValue = req.getParameter("birValue");
            String status = req.getParameter("status"); String mobilePhone = req.getParameter("mobilePhone");
            String email = req.getParameter("email"); String account = req.getParameter("account");
            String password = req.getParameter("password"); String entryTime = req.getParameter("entryValue");

            UserInfo userInfo = new UserInfo();
            userInfo.setAccount(account); userInfo.setPassword(password); userInfo.setRealName(linkmanName);
            userInfo.setSex(sex); userInfo.setMobile(mobilePhone); userInfo.setEmail(email);
            userInfo.setBirthday(birValue); userInfo.setIdentity(identity); userInfo.setEntryTime(entryTime);
            userInfo.setStatus(status); userInfo.setCreateTime(getDate());

            if (linkmanService.add(userInfo)){
                int userId = userService.getLatestId();
                resp.getWriter().write("添加成功"+userId);
            }else {
                resp.getWriter().write("添加出错");
            }
        }else if (uri.contains("query")){
            ArrayList<UserInfo> list = (ArrayList<UserInfo>) userService.query("客户职员");
            if (list != null){
                String jsonStr = JSON.toJSONString(list);
                resp.getWriter().write(jsonStr);
            }else {
                resp.getWriter().write("");
            }
        }else if (uri.contains("deleteOne")){
            int userId = Integer.valueOf(req.getParameter("userId"));
            if (userService.delete(userId)){
                resp.getWriter().write("删除成功");
            }else {
                resp.getWriter().write("删除失败");
            }
        }else if (uri.contains("deleteMore")){
            String jsonStr = req.getParameter("ids");
            Object[] ids = JSON.parseArray(jsonStr).toArray();
            int count = 0;
            for (int i = 0; i < ids.length; i++) {
                if (userService.delete(Integer.valueOf((String) ids[i]))){
                    count++;
                }
            }
            if (count == ids.length){
                resp.getWriter().write("删除成功");
            }else {
                resp.getWriter().write("删除时有出错");
            }
        }else if (uri.contains("getOne")){
            int userId = Integer.valueOf(req.getParameter("userId"));
            UserInfo userInfo = userService.getOne(userId);
            if (userInfo != null){
                String jsonStr = JSON.toJSONString(userInfo);
                resp.getWriter().write(jsonStr);
            }else {
                resp.getWriter().write("查无此人");
            }
        }else if (uri.contains("update")){
            int userId = Integer.valueOf(req.getParameter("userId"));
            String linkmanName = req.getParameter("linkmanName"); String identity = req.getParameter("identity");
            String sex = req.getParameter("sex"); String birValue = req.getParameter("birValue");
            String status = req.getParameter("status"); String mobilePhone = req.getParameter("mobilePhone");
            String email = req.getParameter("email"); String account = req.getParameter("account");
            String password = req.getParameter("password"); String entryTime = req.getParameter("entryValue");

            UserInfo userInfo = new UserInfo(); userInfo.setUserId(userId);
            userInfo.setAccount(account); userInfo.setPassword(password); userInfo.setRealName(linkmanName);
            userInfo.setSex(sex); userInfo.setMobile(mobilePhone); userInfo.setEmail(email);
            userInfo.setBirthday(birValue); userInfo.setIdentity(identity); userInfo.setEntryTime(entryTime);
            userInfo.setStatus(status); userInfo.setRoleId("客户职员");
            if (userService.update(userInfo)){
                resp.getWriter().write("更新成功");
            }else {
                resp.getWriter().write("更新出错");
            }
        }else if (uri.contains("likeCliUser")){
            String name = req.getParameter("name");
            ArrayList<UserInfo> list = (ArrayList<UserInfo>) userService.likeCliUser(name);
            if (list != null){
                String jsonStr = JSON.toJSONString(list);
                resp.getWriter().write(jsonStr);
            }else {
                resp.getWriter().write(JSON.toJSONString(""));
            }
        }
    }

    public static String getDate(){
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date = new Date();
        return format.format(date);
    }
}
