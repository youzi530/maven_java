package crm.client.servlet;

import com.alibaba.fastjson.JSON;
import crm.client.service.ClientService;
import crm.manage.servive.UserService;
import crm.pojo.ClientInfo;
import crm.pojo.UserInfo;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

/**
 * 客户管理
 */
@WebServlet("*.client")
public class ClientServlet extends HttpServlet {

    private ClientService clientService = new ClientService();
    private UserService userService = new UserService();

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String uri = req.getRequestURI();
        if (uri.contains("add")){
            String clientName = req.getParameter("clientName");  String workAddress = req.getParameter("workAddress");
            String mainPhone = req.getParameter("mainPhone");  String zipCode = req.getParameter("zipCode");
            String email = req.getParameter("email");  String province = req.getParameter("province");
            String city = req.getParameter("city");  String town = req.getParameter("town");
            String industry = req.getParameter("industry"); String rank = req.getParameter("rank");
            String creditGrade = req.getParameter("creditGrade");  String creditLimit = req.getParameter("creditLimit");
            String financePhone = req.getParameter("financePhone"); String superCompany = req.getParameter("superCompany");
            String companyHome = req.getParameter("companyHome");  String remark = req.getParameter("remark");
            String registerTime = req.getParameter("registerTime");  String userId = req.getParameter("userId");

            ClientInfo clientInfo = new ClientInfo();

            clientInfo.setUserId(Integer.valueOf(userId)); clientInfo.setDepartment("客户部门"); clientInfo.setClientName(clientName);
            clientInfo.setWorkAddress(workAddress); clientInfo.setMainPhone(mainPhone); clientInfo.setZipCode(zipCode);
            clientInfo.setEmail(email); clientInfo.setProvince(province); clientInfo.setCity(city);
            clientInfo.setTown(town); clientInfo.setIndustry(industry); clientInfo.setRank(Integer.valueOf(rank));
            clientInfo.setCreditGrade(Integer.valueOf(creditGrade)); clientInfo.setCreditLimit(Integer.valueOf(creditLimit));
            clientInfo.setFinancePhone(financePhone); clientInfo.setSuperCompany(superCompany); clientInfo.setCompanyHome(companyHome); clientInfo.setRemark(remark);
            clientInfo.setRegister(registerTime);

            if (clientService.add(clientInfo,getDate())){
                int id = clientService.getLatestId(Integer.valueOf(userId));
                resp.getWriter().write("添加成功" + id);
            }else {
                resp.getWriter().write("添加失败");
            }
        }else if (uri.contains("query")){
            UserInfo userInfo = (UserInfo) req.getSession().getAttribute("crmuser");
            if (userInfo.getRoleId().equals("admin") || userInfo.getRoleId().equals("客户经理")){
                ArrayList<ClientInfo> list = (ArrayList<ClientInfo>) clientService.query();//所有客户信息
                ArrayList<UserInfo> userInfoArrayList  = new ArrayList<>();//获取职工号及其姓名
                if (list != null){
                    for (int i = 0; i < list.size(); i++) {
                        int userId = list.get(i).getUserId();
                        UserInfo user = new UserInfo();
                        user.setUserId(userId); user.setRealName(userService.username(userId));
                        userInfoArrayList.add(user);
                    }
                    String jsonStr = JSON.toJSONString(list);
                    String jsonStr2 = JSON.toJSONString(userInfoArrayList);
                    resp.getWriter().write("msg" + jsonStr + "crmuser" + jsonStr2);
                }else {
                    resp.getWriter().write("");
                }
            }else {
                int userId = Integer.valueOf(req.getParameter("userId"));
                ArrayList<ClientInfo> list = (ArrayList<ClientInfo>) clientService.query(userId);
                if (list != null){
                    String jsonStr = JSON.toJSONString(list);
                    resp.getWriter().write(jsonStr);
                }else {
                    resp.getWriter().write("");
                }
            }
        }else if (uri.contains("oneDelete.client")){
            int clientId = Integer.valueOf(req.getParameter("clientId"));
            int userId = Integer.valueOf(req.getParameter("userId"));
            if (clientService.deleteUserClient(clientId,userId)){
                resp.getWriter().write("删除成功");
            }else {
                resp.getWriter().write("删除失败");
            }
        }else if (uri.contains("moreDelete.client")){
            String jsonStr = req.getParameter("ids");
            String jsonStr2 = req.getParameter("userids");
            Object[] ids = JSON.parseArray(jsonStr).toArray();
            Object[] userids = JSON.parseArray(jsonStr2).toArray();
            int count = 0;
            for (int i = 0; i < ids.length; i++) {
                if (clientService.deleteUserClient(Integer.valueOf((String) ids[i]),Integer.valueOf((String) userids[i]))){
                    count++;
                }
            }
            if (count == ids.length){
                resp.getWriter().write("删除成功");
            }else {
                resp.getWriter().write("删除时有出错");
            }
        }else if (uri.contains("getOne.client")){//用于修改,获取原有的用户信息
            int clientId = Integer.valueOf(req.getParameter("clientId"));
            ClientInfo clientInfo = clientService.getClient(clientId);
            if (clientInfo != null){
                resp.getWriter().write(JSON.toJSONString(clientInfo));
            }else {
                resp.getWriter().write(JSON.toJSONString(""));
            }
        }else if(uri.contains("update.client")){
            String clientId = req.getParameter("clientId");
            String clientName = req.getParameter("clientName");  String workAddress = req.getParameter("workAddress");
            String mainPhone = req.getParameter("mainPhone");  String zipCode = req.getParameter("zipCode");
            String email = req.getParameter("email");  String province = req.getParameter("province");
            String city = req.getParameter("city");  String town = req.getParameter("town");
            String industry = req.getParameter("industry"); String rank = req.getParameter("rank");
            String creditGrade = req.getParameter("creditGrade");  String creditLimit = req.getParameter("creditLimit");
            String financePhone = req.getParameter("financePhone"); String superCompany = req.getParameter("superCompany");
            String companyHome = req.getParameter("companyHome");  String remark = req.getParameter("remark");
            String registerTime = req.getParameter("registerTime");  String userId = req.getParameter("userId");
            String status = req.getParameter("status");

            ClientInfo clientInfo = new ClientInfo(); clientInfo.setClientId(Integer.valueOf(clientId));

            clientInfo.setUserId(Integer.valueOf(userId)); clientInfo.setDepartment("客户部门"); clientInfo.setClientName(clientName);
            clientInfo.setWorkAddress(workAddress); clientInfo.setMainPhone(mainPhone); clientInfo.setZipCode(zipCode);
            clientInfo.setEmail(email); clientInfo.setProvince(province); clientInfo.setCity(city);
            clientInfo.setTown(town); clientInfo.setIndustry(industry); clientInfo.setRank(Integer.valueOf(rank));
            clientInfo.setCreditGrade(Integer.valueOf(creditGrade)); clientInfo.setCreditLimit(Integer.valueOf(creditLimit));
            clientInfo.setFinancePhone(financePhone); clientInfo.setSuperCompany(superCompany); clientInfo.setCompanyHome(companyHome); clientInfo.setRemark(remark);
            clientInfo.setRegister(registerTime); clientInfo.setStatus(Integer.valueOf(status)); clientInfo.setUpdTime(getDate());

            if (clientService.update(clientInfo)){
                resp.getWriter().write("更新成功");
            }else {
                resp.getWriter().write("更新出错");
            }
        }else if (uri.contains("shareGetUsers")){//分享用户，选中客户部及老板
            UserInfo userInfo = (UserInfo) req.getSession().getAttribute("crmuser");
            ArrayList<UserInfo> list = (ArrayList<UserInfo>) userService.getShareUsers(userInfo.getUserId());
            if (list != null){
                resp.getWriter().write(JSON.toJSONString(list));//已经被parse好了
            }else {
                resp.getWriter().write("");
            }
        }else if (uri.contains("share")){
            String jsonStr = req.getParameter("ids");
            int userId = Integer.valueOf(req.getParameter("userId"));
            UserInfo userInfo = (UserInfo) req.getSession().getAttribute("crmuser");
            boolean flag = false;//如果是老板或者经理共享无需审批
            if (userInfo.getRoleId().equals("admin") || userInfo.getRoleId().equals("客户经理")){
                flag = true;
            }
            Object[] ids = JSON.parseArray(jsonStr).toArray();

            int count = 0;//标记
            for (int i = 0; i < ids.length; i++) {
                if (clientService.share(userId, Integer.valueOf((String)ids[i]), flag,userInfo.getUserId())){
                    count++;
                }
            }
            if (count == ids.length){
                if (flag){
                    resp.getWriter().write("共享成功");
                }else {
                    resp.getWriter().write("共享成功,待审批");
                }
            }else {
                resp.getWriter().write("您已将某些用户共享,请检查出错的共享信息");
            }
        }else if (uri.contains("find")){
            //参数
            int userId = Integer.valueOf(req.getParameter("userId"));
            String clientName = req.getParameter("clientName"); String workAddress = req.getParameter("workAddress");
            String province = req.getParameter("province");
            String city = req.getParameter("city"); String town = req.getParameter("town");

            ClientInfo clientInfo = new ClientInfo(); clientInfo.setUserId(userId);

            clientInfo.setClientName(clientName); clientInfo.setWorkAddress(workAddress);
            clientInfo.setProvince(province); clientInfo.setCity(city); clientInfo.setTown(town);

            UserInfo userInfo = (UserInfo) req.getSession().getAttribute("crmuser");
            boolean flag = false;//如果是老板或者经理可查询的更多
            if (userInfo.getRoleId().equals("admin") || userInfo.getRoleId().equals("客户经理")){
                flag = true;
            }

            if (flag){//经理
                ArrayList<ClientInfo> list = (ArrayList<ClientInfo>) clientService.find(clientInfo,flag);
                ArrayList<UserInfo> userInfoArrayList  = new ArrayList<>();//获取职工号及其姓名
                if (list != null){
                    for (int i = 0; i < list.size(); i++) {
                        int userIdq = list.get(i).getUserId();
                        UserInfo user = new UserInfo();
                        user.setUserId(userIdq); user.setRealName(userService.username(userIdq));
                        userInfoArrayList.add(user);
                    }
                    String jsonStr = JSON.toJSONString(list);
                    String jsonStr2 = JSON.toJSONString(userInfoArrayList);
                    resp.getWriter().write(jsonStr + "crmuser" + jsonStr2);
               }else {
                    resp.getWriter().write(JSON.toJSONString(""));
                }
            }else {//员工
                ArrayList<ClientInfo> list = (ArrayList<ClientInfo>) clientService.find(clientInfo,flag);

                if (list != null){
                    String jsonStr = JSON.toJSONString(list);
                    resp.getWriter().write(jsonStr);
                }else {
                    resp.getWriter().write(JSON.toJSONString(""));
                }
            }

        }
    }

    public static String getDate(){
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date = new Date();
        return format.format(date);
    }

}
