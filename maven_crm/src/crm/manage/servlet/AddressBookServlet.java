package crm.manage.servlet;

import com.alibaba.fastjson.JSON;
import crm.manage.servive.UserService;
import crm.pojo.AddressBook;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;

@WebServlet("*.addressBook")
public class AddressBookServlet extends HttpServlet {

    private UserService userService = new UserService();

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String uri = req.getRequestURI();
        if (uri.contains("query")){
            ArrayList<AddressBook> list = (ArrayList<AddressBook>) userService.getAddressBook();
            if (list != null){
                String jsonStr = JSON.toJSONString(list);
                resp.getWriter().write("msg" + jsonStr);
            }else {
                resp.getWriter().write("msg请尽快发展公司");
            }
        }else if (uri.contains("likeQuery")){
            String like = req.getParameter("like");
            ArrayList<AddressBook> list = (ArrayList<AddressBook>) userService.getLikeAddressBook(like);
            if (list != null){
                String jsonStr = JSON.toJSONString(list);
                resp.getWriter().write("msg" + jsonStr);
            }else {
                resp.getWriter().write("msg没有查询到相关记录");
            }
        }
    }
}
