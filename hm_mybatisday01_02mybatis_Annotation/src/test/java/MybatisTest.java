import dao.UserDao;
import domain.User;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.InputStream;
import java.util.List;

public class MybatisTest {

    public static void main(String[] args) throws Exception {
        //1读取配置文件
        InputStream in = Resources.getResourceAsStream("SqlMapConfig.xml");
        //2创建SqlBeanSeesionFactory工厂
        SqlSessionFactoryBuilder builder = new SqlSessionFactoryBuilder();
        SqlSessionFactory factory = builder.build(in);
        //3使用工厂生产sqlSession对象
        SqlSession session = factory.openSession();
        //4使用SqlSession创建Dao接口的代理对象
        UserDao userDao = session.getMapper(UserDao.class);
        //5使用代理对象执行方法
        List<User> users = userDao.findAll();
        for (User user:
             users) {
            System.out.println(user);
        }
        //6释放资源
        session.close();
        in.close();
    }
}
