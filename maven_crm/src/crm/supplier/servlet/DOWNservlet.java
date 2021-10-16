package crm.supplier.servlet;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.FileInputStream;
import java.io.IOException;
//下载文件专用的Srvler
@WebServlet("*.down")
public class DOWNservlet extends HttpServlet {
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String filename = req.getParameter("fileName");
        ServletContext servletContext = this.getServletContext();
        String realPath = servletContext.getRealPath("/file/" + filename);
        FileInputStream fs = new FileInputStream(realPath);
        String mimeType = servletContext.getMimeType(filename);
        resp.setHeader("content-type", mimeType);
        resp.setHeader("content-disposition", "attachment;filename=" + filename);
        //shuru流的数据写到输出流当中
        ServletOutputStream sos = resp.getOutputStream();
        byte[] buff = new byte[1024 * 8];
        int len = 0;
        while ((len = fs.read(buff)) != -1) {
            sos.write(buff, 0, len);
        }
        fs.close();

    }
}
