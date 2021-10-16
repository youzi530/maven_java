package crm.manage.servlet;

import com.alibaba.fastjson.JSON;
import crm.manage.servive.UserService;
import crm.manage.servive.WorkManageService;
import crm.pojo.UserInfo;
import crm.pojo.WorkManage;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;

@WebServlet("*.workManage")
public class WorkManageServlet extends HttpServlet {

    private UserService userService = new UserService();
    private WorkManageService workManageService = new WorkManageService();

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String uri = req.getRequestURI();
        if (uri.contains("getWorkers")){
            ArrayList<UserInfo> list = (ArrayList<UserInfo>) userService.getWorkers();
            if (list != null){
                String jsonStr = JSON.toJSONString(list);
                resp.getWriter().write("msg" + jsonStr);
            }else {
                resp.getWriter().write("msg暂无职员");
            }
        }else if (uri.contains("addWork")){
            String jsonStr = req.getParameter("workManage");
            WorkManage workManage = JSON.parseObject(jsonStr,WorkManage.class);
            if (workManageService.addWork(workManage)){
                int wid = workManageService.getLatestWid();
                resp.getWriter().write("分发成功"+wid);
            }else {
                resp.getWriter().write("分发出错");
            }
        }else if (uri.contains("query")){
            UserInfo db = (UserInfo) req.getSession().getAttribute("crmuser");
            ArrayList<WorkManage> list = (ArrayList<WorkManage>) workManageService.query(db.getRoleId(),db.getUserId());
            if (list != null){
                String jsonStr = JSON.toJSONString(list);
                resp.getWriter().write("msg" + jsonStr);
            }else {
                resp.getWriter().write("msg暂无工作信息");
            }
        }else if (uri.contains("getOne")){
            int wid = Integer.valueOf(req.getParameter("wid"));
            WorkManage workManage = workManageService.getOne(wid);
            if (workManage != null){
                String jsonStr = JSON.toJSONString(workManage);
                resp.getWriter().write(jsonStr);
            }else {
                resp.getWriter().write("msg获取出错");
            }
        }else if (uri.contains("deleteOne")){
            int wid = Integer.valueOf(req.getParameter("wid"));
            if (workManageService.delete(wid)){
                resp.getWriter().write("删除成功");
            }else {
                resp.getWriter().write("删除失败");
            }
        }else if ((uri.contains("deleteMore"))){
            String jsonStr = req.getParameter("wids");
            Object[] wids = JSON.parseArray(jsonStr).toArray();
            int count = 0;
            for (int i = 0; i < wids.length; i++) {
                if (workManageService.delete(Integer.valueOf((String) wids[i]))){
                    count++;
                }
            }
            if (count == wids.length){
                resp.getWriter().write("删除成功");
            }else {
                resp.getWriter().write("删除时有出错");
            }
        }else if (uri.contains("bossUpdWork")){
            String jsonStr = req.getParameter("workManage");
            WorkManage workManage = JSON.parseObject(jsonStr,WorkManage.class);
            if (workManageService.bossUpd(workManage)){
                resp.getWriter().write("更新成功");
            }else {
                resp.getWriter().write("更新出错");
            }
        }else if (uri.contains("staffUpdWork")){
            String jsonStr = req.getParameter("workManage");
            WorkManage workManage = JSON.parseObject(jsonStr,WorkManage.class);
            if (workManageService.staffUpd(workManage)){
                resp.getWriter().write("更新成功");
            }else {
                resp.getWriter().write("更新出错");
            }
        }else if (uri.contains("likeQuery")){
            String like = req.getParameter("like");
            ArrayList<WorkManage> list = (ArrayList<WorkManage>) workManageService.likeQuery(like);
            if (list != null){
                String jsonStr = JSON.toJSONString(list);
                resp.getWriter().write("msg" + jsonStr);
            }else {
                resp.getWriter().write("msg暂无相关主题工作信息");
            }
        }
    }
}
