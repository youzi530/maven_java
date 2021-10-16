package crm.manage.servlet;


import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import crm.manage.servive.BulletinBoardService;
import crm.pojo.BulletinBoard;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

@WebServlet("*.email")
public class BulletinBoardServlet extends HttpServlet {

    private BulletinBoardService bulletinBoardService = new BulletinBoardService();

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        req.setCharacterEncoding("utf-8");
        resp.setContentType("text/html;charset=utf-8");
        String uri = req.getRequestURI();
        PrintWriter printWriter = resp.getWriter();

        if (uri.contains("query")) { //查询
            ArrayList<BulletinBoard> list = (ArrayList<BulletinBoard>) bulletinBoardService.query();
            String jsonStr = JSON.toJSONString(list);
            printWriter.write(jsonStr);
        }  else if (uri.contains("find")) { //查询
            String theme = req.getParameter("Name");

            ArrayList<BulletinBoard> list = (ArrayList<BulletinBoard>) bulletinBoardService.queryFun(theme);

                if (list != null){
                    String jsonStr = JSON.toJSONString(list);
                    resp.getWriter().write(jsonStr);
                }else {
                    resp.getWriter().write(JSON.toJSONString(""));
                }


        }
        else if (uri.contains("add")) { //添加
            String theme = req.getParameter("theme");
            String content = req.getParameter("content");
            String releaseDate = req.getParameter("releaseDate");

            BulletinBoard bulletinBoard = new BulletinBoard();

            bulletinBoard.setTheme(theme);
            bulletinBoard.setContent(content);
            bulletinBoard.setReleaseDate(releaseDate);

            if (bulletinBoardService.add(bulletinBoard)) {
                printWriter.write("添加成功！");
            } else {
                printWriter.write("添加失败！");
            }
        } else if (uri.contains("oneDelete.email")) {
            String theme = req.getParameter("theme");
            if (bulletinBoardService.delete(theme)) {
                resp.getWriter().write("删除成功");
            } else {
                resp.getWriter().write("删除失败");
            }
        } else if (uri.contains("moreDelete.email")) {
            String jsonStr = req.getParameter("ids");
            Object[] ids = JSON.parseArray(jsonStr).toArray();
            int count = 0;
            for (int i = 0; i < ids.length; i++) {
                if (bulletinBoardService.delete((String) ids[i])) {
                    count++;
                }
            }
            if (count == ids.length) {
                resp.getWriter().write("删除成功");
            } else {
                resp.getWriter().write("删除失败");
            }
        } else if (uri.contains("getOne.email")) {//用于修改,获取原有的公告信息
            String theme = req.getParameter("theme");
            BulletinBoard bulletinBoard = bulletinBoardService.getBulletinBoard(theme);
            if (bulletinBoard != null) {
                resp.getWriter().write(JSON.toJSONString(bulletinBoard));
            } else {
                resp.getWriter().write(JSON.toJSONString(""));
            }
        } else if (uri.contains("update.email")) {
            String theme = req.getParameter("theme");
            String content = req.getParameter("content");
            String releaseDate = req.getParameter("releaseDate");
            BulletinBoard bulletinBoard = new BulletinBoard();
            bulletinBoard.setTheme(theme);
            bulletinBoard.setContent(content);
            bulletinBoard.setReleaseDate(releaseDate);
            if (bulletinBoardService.update(bulletinBoard)) {
                printWriter.write("更新成功！");
            } else {
                printWriter.write("更新失败！");
            }
        } else if (uri.contains("getBulletinBoard")) {
            ArrayList<BulletinBoard> list = (ArrayList<BulletinBoard>) bulletinBoardService.query();
            printWriter.write(JSONObject.toJSONString(list));
        }



    }
}





