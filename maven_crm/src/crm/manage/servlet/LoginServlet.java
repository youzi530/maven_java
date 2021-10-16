package crm.manage.servlet;

import crm.manage.servive.UserService;
import crm.pojo.UserInfo;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 登录servlet
 */
@WebServlet("/login.do")
public class LoginServlet extends HttpServlet {

    private UserService userService = new UserService();

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        String account = req.getParameter("account");
        String password = req.getParameter("password");
        UserInfo userInfo = new UserInfo();
        userInfo.setAccount(account);  userInfo.setPassword(password);
        UserInfo db = userService.login(userInfo);
        if (db != null){
            req.getSession().setAttribute("crmuser",db);
            resp.getWriter().write("msg登录成功");
        }else {
            resp.getWriter().write("msg登录失败");
        }
    }
}
