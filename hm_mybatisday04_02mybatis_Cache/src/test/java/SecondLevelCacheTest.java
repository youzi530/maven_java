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

public class SecondLevelCacheTest {

    private InputStream in;
    private SqlSessionFactory factory;

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
    public void testFirstLevelCache(){

        SqlSession sqlSession1 = factory.openSession();
        UserDao dao1 = sqlSession1.getMapper(UserDao.class);
        User user1 = dao1.findById(41);
        System.out.println(user1);

        sqlSession1.close();

        SqlSession sqlSession2 = factory.openSession();
        UserDao dao2 = sqlSession2.getMapper(UserDao.class);
        User user2 = dao2.findById(41);
        System.out.println(user2);

        sqlSession2.close();

        System.out.println(user1 == user2);
    }
}