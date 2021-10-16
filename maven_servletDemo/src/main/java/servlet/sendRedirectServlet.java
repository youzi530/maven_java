package servlet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/test")
public class sendRedirectServlet extends HttpServlet {

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        //重定向：两次请求，两次响应（借钱一样，a向b借钱，b告诉a，c有钱，a向c借钱，c给a钱）当请求的是受保护的资源的话，无法访问（WEB-INF）
        // 地址栏发生变化
        //路径需要加项目路径
        String path = req.getContextPath();
        resp.sendRedirect(path+"success.jsp");
    }
}
