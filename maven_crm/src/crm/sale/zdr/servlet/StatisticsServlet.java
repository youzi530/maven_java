package crm.sale.zdr.servlet;

import com.alibaba.fastjson.JSON;
import crm.pojo.CostAnalysis;
import crm.pojo.Statistics;
import crm.sale.zdr.dao.StatisticsDao;
import crm.sale.zdr.dao.daoImp.StatisticsDaoImp;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
@WebServlet("*.static")
public class StatisticsServlet extends HttpServlet {
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        StatisticsDao dao = new StatisticsDaoImp();
        req.setCharacterEncoding("utf-8");
        resp.setContentType("text/html;charset=utf-8");
        PrintWriter pw = resp.getWriter();
        String uri = req.getRequestURI();
        if(uri.indexOf("see")>=0){
            List<Statistics> list = dao.findall();
            pw.write(JSON.toJSONString(list));
        }
        else if(uri.indexOf("chaxun")>=0){
            String s=req.getParameter("sName");
            List<Statistics> list = dao.findByMohu(s);
            pw.write("msg"+JSON.toJSONString(list));
        }
    }
}
