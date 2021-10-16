package crm.client.servlet;

import com.alibaba.fastjson.JSON;
import crm.client.service.ClientService;
import crm.client.service.VertifyService;
import crm.manage.servive.UserService;
import crm.pojo.ClientInfo;
import crm.pojo.UserInfo;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;

/**
 * 共享审核
 */
@WebServlet("*.vertify")
public class VertifyServlet extends HttpServlet {

    private ClientService clientService = new ClientService();
    private UserService userService = new UserService();
    private VertifyService vertifyService = new VertifyService();

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String uri = req.getRequestURI();
        if (uri.contains("query")){
            UserInfo userInfo = (UserInfo) req.getSession().getAttribute("crmuser");
            if (userInfo.getRoleId().equals("admin") || userInfo.getRoleId().equals("客户经理")){
                ArrayList<ClientInfo> list = (ArrayList<ClientInfo>) clientService.vertifyByBoss();//所有需审核客户信息
                ArrayList<UserInfo> userInfoArrayList  = new ArrayList<>();//获取申请人职工号及其姓名
                ArrayList<UserInfo> userInfoShare = new ArrayList<>();//获取共享人职工号及其姓名
                ArrayList<UserInfo> userInfoVertify = new ArrayList<>();//获取审批人人职工号及其姓名

                if (list != null){
                    for (int i = 0; i < list.size(); i++) {
                        int userId = list.get(i).getReceiveId();
                        UserInfo user = new UserInfo();
                        user.setUserId(userId); user.setRealName(userService.username(userId));
                        userInfoArrayList.add(user);
                        if (list.get(i).getApproveId() != 0){
                            UserInfo userVertify = new UserInfo();
                            userVertify.setUserId(list.get(i).getApproveId());
                            userVertify.setRealName(userService.username(list.get(i).getApproveId()));
                            userInfoVertify.add(userVertify);
                        }else {
                            UserInfo userVertify = new UserInfo();;
                            userVertify.setUserId(-1);
                            userVertify.setRealName("未审核");
                            userInfoVertify.add(userVertify);
                        }
                    }
                    for (int i = 0; i < list.size(); i++) {
                        int userId = list.get(i).getUserId();
                        UserInfo user = new UserInfo();
                        user.setUserId(userId); user.setRealName(userService.username(userId));
                        userInfoShare.add(user);
                    }
                    String jsonStr = JSON.toJSONString(list);
                    String jsonStr2 = JSON.toJSONString(userInfoArrayList);
                    String jsonStr3 = JSON.toJSONString(userInfoShare);
                    String jsonStr4 = JSON.toJSONString(userInfoVertify);
                    resp.getWriter().write("msg" + jsonStr + "crmuser" + jsonStr2 + "crmuser" + jsonStr3 + "crmuser" + jsonStr4);
                }else {
                    resp.getWriter().write("");
                }
            }else {
                int userId = Integer.valueOf(req.getParameter("userId"));
                ArrayList<ClientInfo> list = (ArrayList<ClientInfo>) clientService.vertifyByStaff(userId);//申请审核的用户信息
                ArrayList<UserInfo> userInfoShare = new ArrayList<>();//获取共享人职工号及其姓名
                ArrayList<UserInfo> userInfoVertify = new ArrayList<>();//获取审批人人职工号及其姓名
                if (list != null){
                    for (int i = 0; i < list.size(); i++) {
                        UserInfo user = new UserInfo();
                        user.setUserId(list.get(i).getUserId()); user.setRealName(userService.username(list.get(i).getUserId()));
                        userInfoShare.add(user);
                    }
                    for (int i = 0; i < list.size(); i++) {
                        if (list.get(i).getApproveId() != 0){
                            UserInfo userVertify = new UserInfo();
                            userVertify.setUserId(list.get(i).getApproveId());
                            userVertify.setRealName(userService.username(list.get(i).getApproveId()));
                            userInfoVertify.add(userVertify);
                        }else {
                            UserInfo userVertify = new UserInfo();;
                            userVertify.setUserId(-1);
                            userVertify.setRealName("未审核");
                            userInfoVertify.add(userVertify);
                        }
                    }
                    String jsonStr = JSON.toJSONString(list);
                    String jsonStr2 = JSON.toJSONString(userInfoShare);
                    String jsonStr3 = JSON.toJSONString(userInfoVertify);
                    resp.getWriter().write("msg" + jsonStr + "crmuser" + jsonStr2 + "crmuser" + jsonStr3);
                }else {
                    resp.getWriter().write("");
                }
            }
        }else if (uri.contains("wait")){
            UserInfo userInfo = (UserInfo) req.getSession().getAttribute("crmuser");
            int clientId = Integer.valueOf(req.getParameter("clientId"));
            int userId = Integer.valueOf(req.getParameter("userId"));
            int reveiveState = 1;
            ClientInfo clientInfo = new ClientInfo(); clientInfo.setApproveId(userInfo.getUserId());
            clientInfo.setClientId(clientId); clientInfo.setUserId(userId); clientInfo.setReceiveState(reveiveState);
            if (vertifyService.shareVertify(clientInfo)){
                resp.getWriter().write("操作成功");
            }else {
                resp.getWriter().write("操作出错");
            }
        }else if (uri.contains("approve")){
            UserInfo userInfo = (UserInfo) req.getSession().getAttribute("crmuser");
            int clientId = Integer.valueOf(req.getParameter("clientId"));
            int userId = Integer.valueOf(req.getParameter("userId"));
            int reveiveState = 2;
            ClientInfo clientInfo = new ClientInfo(); clientInfo.setApproveId(userInfo.getUserId());
            clientInfo.setClientId(clientId); clientInfo.setUserId(userId); clientInfo.setReceiveState(reveiveState);
            if (vertifyService.shareVertify(clientInfo)){
                resp.getWriter().write("操作成功");
            }else {
                resp.getWriter().write("操作出错");
            }
        }else if (uri.contains("refuse")){
            UserInfo userInfo = (UserInfo) req.getSession().getAttribute("crmuser");
            int clientId = Integer.valueOf(req.getParameter("clientId"));
            int userId = Integer.valueOf(req.getParameter("userId"));
            int reveiveState = 3;
            ClientInfo clientInfo = new ClientInfo(); clientInfo.setApproveId(userInfo.getUserId());
            clientInfo.setClientId(clientId); clientInfo.setUserId(userId); clientInfo.setReceiveState(reveiveState);
            if (vertifyService.shareVertify(clientInfo)){
                resp.getWriter().write("操作成功");
            }else {
                resp.getWriter().write("操作出错");
            }
        }else if (uri.contains("deleteMore")){
            String jsonStr = req.getParameter("clientIds");
            String jsonStr2 = req.getParameter("userIds");
            Object[] clientIds = JSON.parseArray(jsonStr).toArray();
            Object[] userIds = JSON.parseArray(jsonStr2).toArray();
            int count = 0;
            for (int i = 0; i < clientIds.length; i++) {
                if (vertifyService.delete(Integer.valueOf((String)clientIds[i]),Integer.valueOf((String)userIds[i]))){
                    count++;
                }
            }
            if (count == clientIds.length){
                resp.getWriter().write("删除成功");
            }else {
                resp.getWriter().write("删除时有出错");
            }
        }
    }
}
