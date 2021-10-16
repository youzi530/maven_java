package crm.manage.servlet;


import com.alibaba.fastjson.JSON;
import crm.manage.servive.UserService;
import crm.pojo.UserInfo;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 *用户个人信息设置
 */
@WebServlet("*.userSettings")
public class UserSettingsServlet extends HttpServlet {

    private UserService userService = new UserService();

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String uri = req.getRequestURI();
        if (uri.contains("introduction")){//个人简介
            UserInfo userInfo = (UserInfo) req.getSession().getAttribute("crmuser");
            String realName = userInfo.getRealName(); String sex = userInfo.getSex();
            int age = getAge(userInfo.getBirthday()); String entryTime = userInfo.getEntryTime();
            String roleId = userInfo.getRoleId(); String status = userInfo.getStatus();
            resp.getWriter().write("msg姓名：" + realName + ", 性别：" + sex + ", 年龄：" + age + ", 入职时间：" + entryTime + ", " +
                    "**************************************************职位：" + roleId + ", 状态：" + status);
        }else if (uri.contains("setting")){//获取
            UserInfo userInfo = (UserInfo) req.getSession().getAttribute("crmuser");
            String mobile = userInfo.getMobile(); String email = userInfo.getEmail();
            resp.getWriter().write("msg" + mobile + "," + email);
        }else if (uri.contains("update")){
            String mobile = req.getParameter("mobile");
            String email = req.getParameter("email");
            UserInfo userInfo = (UserInfo) req.getSession().getAttribute("crmuser");
            userInfo.setMobile(mobile); userInfo.setEmail(email);
            if (userService.updateSetting(userInfo)){
                req.getSession().setAttribute("crmuser",userInfo);
                resp.getWriter().write("设置修改成功");
            }else {
                resp.getWriter().write("设置修改出错");
            }
        }
    }

    /**
     * 通过生日获取年龄
     * @param birthday 生日
     * @return
     */
    private int getAge(String birthday){
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        try {
            Date date = format.parse(birthday);
            Date now = new Date();
            return now.getYear() - date.getYear();
        } catch (ParseException e) {
            return -1;
        }
    }
}
