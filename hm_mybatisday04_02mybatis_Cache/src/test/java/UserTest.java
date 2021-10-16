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
import java.util.List;

public class UserTest {

    private InputStream in;
    private SqlSession session;
    private UserDao userDao;
    private SqlSessionFactory factory;

    @Before
    public void init() throws Exception {
        //1读取配置文件
        in = Resources.getResourceAsStream("SqlMapConfig.xml");
        //2创建SqlBeanSeesionFactory工厂
        SqlSessionFactoryBuilder builder = new SqlSessionFactoryBuilder();
        factory = builder.build(in);
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
        }
    }

    /**
     * 测试一级缓存
     */
    @Test
    public void testFirstLevelCache(){
        User user1 = userDao.findById(41);
        System.out.println(user1);

        //将缓存对象关掉
        session.close();
        session = factory.openSession();
        userDao = session.getMapper(UserDao.class);

        session.clearCache(); //此方法也可以清空缓存

        User user2 = userDao.findById(41);
        System.out.println(user2);

        System.out.println(user1 == user2);
    }

    /**
     * 测试更新操作
     */
    @Test
    public void testClearCache(){
        //1、先做查询
        User user1 = userDao.findById(41);
        System.out.println(user1);

        //2、做更新操作
        user1.setUsername("update usename");
        user1.setAddress("湖南");
        userDao.updateUser(user1);

        //3、再次查询
        User user2 = userDao.findById(41);
        System.out.println(user2);

        System.out.println(user1 == user2);
    }
}