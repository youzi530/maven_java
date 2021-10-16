package crm.manage.servlet;

import crm.manage.servive.UserService;
import crm.pojo.UserInfo;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 重置密码
 *
 */
@WebServlet("/reload")
public class ReloadPasswordServlet extends HttpServlet {

    private UserService userService = new UserService();

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String account = req.getParameter("account");
        String email = req.getParameter("email");
        UserInfo userInfo = new UserInfo();
        userInfo.setAccount(account);  userInfo.setEmail(email);
        if (userService.reloadPassword(userInfo)){
            resp.getWriter().write("msg密码已重置为身份证后六位");
        }else {
            resp.getWriter().write("msg账号或邮箱有误");
        }
    }
}
