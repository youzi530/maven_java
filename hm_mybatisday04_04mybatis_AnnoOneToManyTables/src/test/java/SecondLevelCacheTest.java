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

public class SecondLevelCacheTest {

    private InputStream in;
    private SqlSessionFactory factory;
    private UserDao userDao;
    private SqlSession sqlSession;

    @Before
    public void init() throws Exception {
        //1读取配置文件
        in = Resources.getResourceAsStream("SqlMapConfig.xml");
        //2创建SqlBeanSeesionFactory工厂
        SqlSessionFactoryBuilder builder = new SqlSessionFactoryBuilder();
        factory = builder.build(in);
      }

    @After
    public void destroy() throws Exception {
           in.close();
    }

    /**
     * 测试二级级缓存
     */
    @Test
    public void testFindOne(){
        SqlSession sqlSession = factory.openSession();
        UserDao userDao = sqlSession.getMapper(UserDao.class);
        User user = userDao.findById(41);
        System.out.println(user);
        sqlSession.close();

        SqlSession sqlSession1 = factory.openSession();
        UserDao userDao1 = sqlSession1.getMapper(UserDao.class);
        User user1 = userDao1.findById(41);
        System.out.println(user1);
        sqlSession1.close();
    }
}