import dao.UserDao;
import domain.User;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.io.InputStream;
import java.util.Date;
import java.util.List;

public class AnnotationCRUDTest {

    private InputStream in;
    private SqlSession session;
    private UserDao userDao;

    @Before
    public void init() throws Exception {
        //1读取配置文件
        in = Resources.getResourceAsStream("SqlMapConfig.xml");
        //2创建SqlBeanSeesionFactory工厂
        SqlSessionFactoryBuilder builder = new SqlSessionFactoryBuilder();
        SqlSessionFactory factory = builder.build(in);
        //3使用工厂生产sqlSession对象
        session = factory.openSession();
        //4使用SqlSession创建Dao接口的代理对象
        userDao = session.getMapper(UserDao.class);
    }

    @After
    public void destroy() throws Exception {
        //当插入的时候，不提交没效果！！
        session.commit();
        //6释放资源
        session.close();
        in.close();
    }

    /**
     * 测试查询操作
     */
    @Test
    public void testFindAll(){
        //5使用代理对象执行方法
        List<User> users = userDao.findAll();
        for (User user:users) {
            System.out.println(user);
            System.out.println(user.getAccounts());
        }
    }

    /**
     * 测试根据id查寻用户
     */
    @Test
    public void testFindById() {
        //5使用代理对象执行方法
        User user = userDao.findById(41);
        System.out.println(user);
    }

    /**
     * 测试模糊查询用户
     */
    @Test
    public void testFindByName() {
        //5使用代理对象执行方法
        List<User> users = userDao.findByName("%王%");
        //List<User> users = userDao.findByName("王");
        for (User user:
                users) {
            System.out.println(user);
        }
    }
}
