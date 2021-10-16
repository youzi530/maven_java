package crm.manage.servlet;

import crm.pojo.UserInfo;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 身份验证servlet
 */
@WebServlet("/views/identity.do")
public class IdentityServlet extends HttpServlet {

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        UserInfo userInfo = (UserInfo) req.getSession().getAttribute("crmuser");
        String permission = userInfo.getRoleId();
        String name = userInfo.getRealName();
        String sex = userInfo.getSex();
        int userId = userInfo.getUserId();
        resp.getWriter().write("msg"+ permission + "," + name + "," + sex + "," + userId);
    }
}
