package com.hc.servlet;

import com.hc.dao.IUserDao;
import com.hc.entity.Users;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@WebServlet("/test.do")
public class mavenWebTestServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //第一步.	读取配置文件,通过类加载器来加载配置文件
        InputStream in = Resources.getResourceAsStream("SqlMapConfig.xml");
        //第二步.	通过构建者创建SqlSessionFactory工厂(工厂模式)
        SqlSessionFactoryBuilder builder = new SqlSessionFactoryBuilder();
        SqlSessionFactory factory = builder.build(in);
        //第三步： 	使用工厂创建SqlSession对象
        SqlSession session = factory.openSession();
        System.out.println(session);
        //第四步： 	使用SqlSession创建Dao接口的代理对象（动态代理，来完成接口的实现类功能）
        IUserDao userDao = session.getMapper(IUserDao.class);
        //第五步：关心业务： 	执行dao中的方法（即使用代理对象执行方法）
        List<Users> users = userDao.findAll();
        for (Users user : users) {
            System.out.println(user);
        }
        //第六步：	释放资源
        session.close();
        in.close();
    }
}
