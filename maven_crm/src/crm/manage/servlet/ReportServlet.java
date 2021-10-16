package crm.manage.servlet;

import com.alibaba.fastjson.JSON;
import crm.manage.servive.ReportService;
import crm.vojo.ClientReport;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;

@WebServlet("*.report")
public class ReportServlet extends HttpServlet {

    private ReportService reportService = new ReportService();

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String uri = req.getRequestURI();
        if (uri.contains("client")){
            ArrayList<ClientReport> list = (ArrayList<ClientReport>) reportService.getClientReport();
            if (list != null){
                String jsonStr = JSON.toJSONString(list);
                resp.getWriter().write("msg"+jsonStr);
            }else {
                resp.getWriter().write("msg暂无数据");
            }
        }
    }
}
