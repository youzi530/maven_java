package servlet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/GetRequestDispatcherServlet")
public class GetRequestDispatcherServlet extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request,response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //转发：一次请求，一次响应
        // 直接访问资源路径
        //如果succes.jsp放在WEB-INF里面只能转发，且路径为：WEB-INF/success.jsp
        request.getRequestDispatcher("success.jsp").forward(request,response);
    }
}
