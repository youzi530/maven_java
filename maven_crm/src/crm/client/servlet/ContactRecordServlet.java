package crm.client.servlet;

import com.alibaba.fastjson.JSON;
import crm.client.service.ClientService;
import crm.client.service.ContactRecordService;
import crm.manage.servive.UserService;
import crm.pojo.ClientInfo;
import crm.pojo.UserInfo;
import crm.vojo.ContactRecord;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;

/**
 * 联系记录管理
 */
@WebServlet("*.contactRecord")
public class ContactRecordServlet extends HttpServlet {

    private ContactRecordService contactRecordService = new ContactRecordService();
    private ClientService clientService = new ClientService();
    private UserService userService = new UserService();

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String uri = req.getRequestURI();
        if (uri.contains("add")){
            String  linkmanId = req.getParameter("linkmanId");
            String cliId = req.getParameter("cliId");
            String content = req.getParameter("content");
            String contactTimeStr = req.getParameter("contactTimeStr");
            ContactRecord contactRecord = new ContactRecord();
            contactRecord.setLinkmanId(Integer.parseInt(linkmanId)); contactRecord.setClientId(Integer.parseInt(cliId));
            contactRecord.setContent(content); contactRecord.setContactTime(contactTimeStr);
            if (contactRecordService.add(contactRecord)){
                int id = contactRecordService.getLatestId();
                resp.getWriter().write("添加成功"+id);
            }else {
                resp.getWriter().write("添加出错");
            }
        }else if (uri.contains("query")){
            UserInfo userInfo = (UserInfo) req.getSession().getAttribute("crmuser");

            if (userInfo.getRoleId().equals("admin") || userInfo.getRoleId().equals("客户经理")){

                ArrayList<ContactRecord> contactRecords = (ArrayList<ContactRecord>) contactRecordService.leader();
                if (contactRecords != null){
                    ArrayList<ClientInfo> clientInfos = new ArrayList<>();
                    ArrayList<UserInfo> userInfos = new ArrayList<>();
                    for (int i = 0; i < contactRecords.size(); i++) {
                        ClientInfo client = clientService.getClient(contactRecords.get(i).getClientId());
                        UserInfo user = userService.getOne(contactRecords.get(i).getLinkmanId());
                        clientInfos.add(client); userInfos.add(user);
                    }
                    String jsonStr = JSON.toJSONString(userInfos);
                    String jsonStr2 = JSON.toJSONString(clientInfos);
                    String jsonStr3 = JSON.toJSONString(contactRecords);
                    resp.getWriter().write("msg" + jsonStr + "crmuser" + jsonStr2+"crmuser"+jsonStr3);
                }else {
                    resp.getWriter().write("");
                }

            }else {
                int userId = userInfo.getUserId();
                ArrayList<ContactRecord> contactRecords = (ArrayList<ContactRecord>) contactRecordService.staff(userId);
               if (contactRecords != null){
                   ArrayList<ClientInfo> clientInfos = new ArrayList<>();
                   for (int i = 0; i < contactRecords.size(); i++) {
                       ClientInfo clientInfo = clientService.getClient(contactRecords.get(i).getClientId());
                       clientInfos.add(clientInfo);
                   }
                   String jsonStr = JSON.toJSONString(clientInfos);
                   String jsonStr2 = JSON.toJSONString(contactRecords);
                   resp.getWriter().write("msg" + jsonStr + "crmuser" + jsonStr2);
               }else {
                   resp.getWriter().write("");
               }
            }
        }else if (uri.contains("deleteOne")){
            int id = Integer.valueOf(req.getParameter("id"));
            if (contactRecordService.deleteOne(id)){
                resp.getWriter().write("删除成功");
            }else {
                resp.getWriter().write("删除失败");
            }
        }else if (uri.contains("deleteMore")){
            String jsonStr = req.getParameter("ids");
            Object[] ids = JSON.parseArray(jsonStr).toArray();
            int count = 0;
            for (int i = 0; i < ids.length; i++) {
                if (contactRecordService.deleteOne(Integer.valueOf((String) ids[i]))){
                    count++;
                }
            }
            if (count == ids.length){
                resp.getWriter().write("删除成功");
            }else {
                resp.getWriter().write("删除时有出错");
            }
        }else if (uri.contains("update")){
             int id = Integer.valueOf(req.getParameter("id"));
             String content = req.getParameter("content");
             String contactTime = req.getParameter("contactTimeStr");
             ContactRecord record = new ContactRecord();
             record.setId(id); record.setContent(content); record.setContactTime(contactTime);
             if (contactRecordService.update(record)){
                 resp.getWriter().write("更新成功");
             }else {
                 resp.getWriter().write("更新出错");
             }
        }else if (uri.contains("find")){
            UserInfo userInfo = (UserInfo) req.getSession().getAttribute("crmuser");
            String beginTime = req.getParameter("beginTime");
            String endTime = req.getParameter("endTime");
            if (userInfo.getRoleId().equals("admin") || userInfo.getRoleId().equals("客户经理")){

                ArrayList<ContactRecord> contactRecords = (ArrayList<ContactRecord>) contactRecordService.findByBoss(beginTime,endTime);
                if (contactRecords != null){
                    ArrayList<ClientInfo> clientInfos = new ArrayList<>();
                    ArrayList<UserInfo> userInfos = new ArrayList<>();
                    for (int i = 0; i < contactRecords.size(); i++) {
                        ClientInfo client = clientService.getClient(contactRecords.get(i).getClientId());
                        UserInfo user = userService.getOne(contactRecords.get(i).getLinkmanId());
                        clientInfos.add(client); userInfos.add(user);
                    }
                    String jsonStr = JSON.toJSONString(userInfos);
                    String jsonStr2 = JSON.toJSONString(clientInfos);
                    String jsonStr3 = JSON.toJSONString(contactRecords);
                    resp.getWriter().write("msg" + jsonStr + "crmuser" + jsonStr2+"crmuser"+jsonStr3);
                }else {
                    resp.getWriter().write("");
                }

            }else {
                int userId = userInfo.getUserId();
                ArrayList<ContactRecord> contactRecords = (ArrayList<ContactRecord>) contactRecordService.findByStaff(userId,beginTime,endTime);
                if (contactRecords != null){
                    ArrayList<ClientInfo> clientInfos = new ArrayList<>();
                    for (int i = 0; i < contactRecords.size(); i++) {
                        ClientInfo clientInfo = clientService.getClient(contactRecords.get(i).getClientId());
                        clientInfos.add(clientInfo);
                    }
                    String jsonStr = JSON.toJSONString(clientInfos);
                    String jsonStr2 = JSON.toJSONString(contactRecords);
                    resp.getWriter().write("msg" + jsonStr + "crmuser" + jsonStr2);
                }else {
                    resp.getWriter().write("");
                }
            }
        }
    }
}
