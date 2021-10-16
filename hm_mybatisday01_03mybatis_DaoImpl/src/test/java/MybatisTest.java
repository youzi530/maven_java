import dao.UserDao;
import dao.daoImpl.UserDaoImp;
import domain.User;
import org.apache.ibatis.io.Resources;
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

        //使用工厂创建对象
        UserDao userDao = new UserDaoImp(factory);

        //5使用代理对象执行方法
        List<User> users = userDao.findAll();
        for (User user:
             users) {
            System.out.println(user);
        }
        //6释放资源
        in.close();
    }
}
