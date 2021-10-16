package crm.sale.lingqiao.servlet;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import crm.pojo.UserInfo;
import crm.sale.lingqiao.dao.PerformanceManageDao;
import crm.sale.lingqiao.dao.daoImp.PerformanceManageDaoImp;
import crm.vojo.CostManage;
import crm.vojo.PerforManagement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import static com.alibaba.fastjson.JSON.parseArray;

@WebServlet("*.performanceManage")
public class PerformanceManageServlet extends HttpServlet {

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        PrintWriter pw = resp.getWriter();
        String uri = req.getRequestURI();
        PerformanceManageDao performanceManageDao = new PerformanceManageDaoImp();
        UserInfo userInfo = (UserInfo) req.getSession().getAttribute("crmuser");
        String realName = userInfo.getRealName();//当前用户的名字
        int userId = userInfo.getUserId();//当前用户的身份

        if(uri.indexOf("see")>=0){
            if(userInfo.getRoleId().equals("admin")||userInfo.getRoleId().equals("供销经理")){
                List<PerforManagement> perforManagements = performanceManageDao.viewPerforManage();
                pw.write(JSON.toJSONString(perforManagements));
            }else if(userInfo.getRoleId().equals("供销职员")){
                List<PerforManagement> perforManagements = performanceManageDao.viewPerforManageByUsername(realName + "（工号：" + userId + "）");
                pw.write(JSON.toJSONString(perforManagements));
            }
        }else if(uri.indexOf("singleDelete")>=0){
            int id = Integer.parseInt(req.getParameter("id"));
            performanceManageDao.deletePerformance(id);
        }else if(uri.indexOf("add")>=0){
            String jsonpurchaseData = req.getParameter("jsonpurchaseData");
            PerforManagement perforManagement = JSON.parseObject(jsonpurchaseData).toJavaObject(PerforManagement.class);
            boolean b = performanceManageDao.addPerformance(perforManagement);
            if(b!=false){
                List<PerforManagement> perforManagements = performanceManageDao.viewPerfomanceLast();
                pw.write(JSON.toJSONString(perforManagements));
            }else{
                pw.write("");
            }
        }else if(uri.indexOf("manyDelete")>=0){
            String ids = req.getParameter("ids");
            JSONArray objects = parseArray(ids);
            for(int i =0;i<objects.size();i++){
                performanceManageDao.deletePerformance(Integer.parseInt((String) objects.get(i)));
            }
        }else if(uri.indexOf("queryByPname")>=0){
            String username = req.getParameter("username");
            if(userInfo.getRoleId().equals("admin")||userInfo.getRoleId().equals("供销经理")){
                List<PerforManagement> perforManagements = performanceManageDao.viewPerforMaByUsername("%" + username + "%");
                pw.write("msg"+JSON.toJSONString(perforManagements));
            }else if(userInfo.getRoleId().equals("供销职员")){
                List<PerforManagement> perforManagements = performanceManageDao.viewPerforMaByUsername("%" + username + "%");
                pw.write("msg"+JSON.toJSONString(perforManagements));
            }
        }else if(uri.indexOf("kanBypid")>=0){
            int id = Integer.parseInt(req.getParameter("id"));
            List<PerforManagement> perforManagements = performanceManageDao.viewPerfomanceById(id);
            pw.write(JSON.toJSONString(perforManagements));
        }else if(uri.indexOf("edit")>=0){
            String jsonproductData = req.getParameter("jsonproductData");
            PerforManagement perforManagement = JSON.parseObject(jsonproductData,PerforManagement.class);
            int perid = perforManagement.getPerid();
            boolean b = performanceManageDao.editPerfomanceByid(perforManagement, perid);
            if(b==true){
                pw.write(jsonproductData);
            }else{
                pw.write(" ");
            }
        }

    }
}
