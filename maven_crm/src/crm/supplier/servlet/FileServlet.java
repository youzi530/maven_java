package crm.supplier.servlet;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import crm.pojo.FileCenter;
import crm.supplier.dao.FileDao;
import crm.supplier.dao.daoImp.FileDaoImp;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.List;

import static com.alibaba.fastjson.JSON.parseArray;
import static com.alibaba.fastjson.JSON.toJSONString;

@WebServlet("*.file")
public class FileServlet extends HttpServlet {
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        FileDao dao = new FileDaoImp();
        req.setCharacterEncoding("utf-8");
        resp.setContentType("text/html;charset=utf-8");
        PrintWriter pw = resp.getWriter();
        String uri = req.getRequestURI();
        if(uri.indexOf("see")>=0){

                List<FileCenter> list = dao.findall();
                pw.write(JSON.toJSONString(list));

        }
        else if (uri.indexOf("add") >= 0) {
            System.out.println(uri);
            String descrption = req.getParameter("descrption");
            String time = req.getParameter("time");
            System.out.println(descrption);
            System.out.println(time);
            // step1 创建一个工厂类的实例，该实例
            // 为解析器提供了缺省的配置。
            DiskFileItemFactory factory = new DiskFileItemFactory();
            // step2 创建一个解析器
            ServletFileUpload sfu = new ServletFileUpload(factory);
            // step3 使用解析器解析
            try {
                // 解析后，会将表单中的数据转换成一个个
                // FileItem 对象。一个表单域中的数据对应于一个FileItem 对象。
                List<FileItem> items = sfu.parseRequest(req);
                // step4 遍历 items 集合
                for (int i = 0; i < items.size(); i++) {
                    FileItem item = items.get(i);
                    FileItem item1=item;
                    // 读表单域中的数据时，要区分表单域的类型
                    if (item.isFormField()) {
                        // 普通表单域

                    } else {
                        // 文件上传表单域
                        ServletContext sctx = this.getServletContext();
                        //设置上传文件保存的路径
                        String path = sctx.getRealPath("file");
                        System.out.println(path);
                        System.out.println("C:\\Users\\donru\\Desktop\\crm\\out\\artifacts\\crm_war_exploded\\file");
                        String webpath=path.replace("out\\artifacts\\crm_war_exploded", "web");
                        System.out.println(webpath);
                        System.out.println("C:\\Users\\donru\\Desktop\\crm\\file");
                        // 获得文件名
                        String fileName = item.getName();
                        File file = new File(path + "\\" + fileName);
                        System.out.println(file);
                        File file1=new File(webpath+"\\"+fileName);
                        System.out.println(file1);
                        if(file.exists()){
                            item.write(file1);
                            item1.write(file);
                            String jsonStr = "{\"password\":\"用户存在\"}";
                            pw.write(jsonStr);
                        }
                        else{
                            FileCenter fileCenter = new FileCenter(fileName, descrption, time, fileName);
                        dao.add(fileCenter);
                            item.write(file1);
                            item1.write(file);


                        FileCenter fileCenter1=dao.findById(dao.findByMax());
                        String jsonStr ="{\"password\":\""+fileCenter1.getId()+"\"}";
                        pw.write(jsonStr);
 }
//                        ________________________
//                        ServletContext sctx = this.getServletContext();
//                        //设置上传文件保存的路径
//                        String outpath = sctx.getRealPath("file");
//                        String webpath = outpath.replace("out\\artifacts\\crm_war_exploded", "web");
//                        // 获得文件名
//                        String fileName = item.getName();
//                        File out = new File(outpath + "\\" + fileName);
//                        item.write(out);//写如out
//                        File web = new File(webpath + "\\" + fileName);
//                        System.out.println(web);
//                        FileCenter fileCenter = new FileCenter(fileName, descrption, time, fileName);
//                        dao.add(fileCenter);
//                        item.write(web);//写入web
//                        ---------------------------------
//                        if (file.exists()) {
//                            item.write(file);
//                            String jsonStr = "{\"password\":\"用户存在\"}";
//                            pw.write(jsonStr);
//
//                        }
////                        System.out.println(file);
//                        else {
//                            FileCenter fileCenter = new FileCenter(fileName, descrption, time, fileName);
//                            dao.add(fileCenter);
//                            item.write(file);//写入web
//                            FileCenter fileCenter1=dao.findById(dao.findByMax());
////                            String jsonStr ="{\"password\":\""+fileCenter1.getId()+"\"}";
////                            pw.write(jsonStr);
//                            String jsonStr = "{\"password\":\"用户存在\"}";
//                            pw.write(jsonStr);
//                        }


                    }
                }

            } catch (Exception e) {
                e.printStackTrace();
            }
        }  else if (uri.indexOf("delete") >= 0) {
            int id = Integer.parseInt(req.getParameter("id"));
            FileCenter fileCenter = dao.findById(id);
            String file = fileCenter.getFilename();
            dao.delete(id);
            ServletContext sctx = this.getServletContext();
            //设置上传文件保存的路径
            String path = sctx.getRealPath("file");
            File newFile = new File(path + "\\" + file);
            newFile.delete();
            String webpath=path.replace("out\\artifacts\\crm_war_exploded", "web");
            File webFile=new File(webpath+ "\\" + file);
            webFile.delete();
            pw.write("成功");
        } else if (uri.indexOf("chakan") >= 0) {
            String s = req.getParameter("s");
            JSONArray objects = parseArray(s);
            for (int i = 0; i < objects.size(); i++) {
                int id = Integer.parseInt(String.valueOf(objects.get(i)));
                FileCenter fileCenter = dao.findById(id);
                String file = fileCenter.getFilename();
                dao.delete(id);
                ServletContext sctx = this.getServletContext();
                //设置上传文件保存的路径
                String path = sctx.getRealPath("file");
                File newFile = new File(path + "\\" + file);
                newFile.delete();
                String webpath=path.replace("out\\artifacts\\crm_war_exploded", "web");
                File webFile=new File(webpath+ "\\" + file);
                webFile.delete();
            }
            pw.write("cg");
        }
        else if(uri.indexOf("modify")>=0){
                int id= Integer.parseInt(req.getParameter("id"));
                FileCenter fileCenter=dao.findById(id);
                pw.write(JSON.toJSONString(fileCenter));
        }
        else if(uri.indexOf("replace")>=0){
            String s=req.getParameter("jsonsha");
            FileCenter fileCenter = JSON.parseObject(s).toJavaObject(FileCenter.class);
            dao.modify(fileCenter);
            FileCenter fileCenter1= dao.findById(fileCenter.getId());
            pw.write(JSON.toJSONString(fileCenter1));
        }
        else if(uri.indexOf("chaxun")>=0){
            String s=req.getParameter("sName");
            List<FileCenter> list=dao.findByMohu(s);
            pw.write("msg"+JSON.toJSONString(list));
            System.out.println("msg"+JSON.toJSONString(list));
        }
    }
}
