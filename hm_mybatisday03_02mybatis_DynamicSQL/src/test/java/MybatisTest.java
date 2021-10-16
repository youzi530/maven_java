import dao.UserDao;
import domain.QueryVo;
import domain.User;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class MybatisTest {

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
        }
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


    /**
     * 测试模糊查询用户
     */
    @Test
    public void testFindUserByVoe() {
        //5使用代理对象执行方法
        QueryVo vo = new QueryVo();
        User user = new User();
        user.setUsername("%王%");
        vo.setUser(user);
        List<User> users= userDao.findUserByVo(vo);
        for (User u:users) {
            System.out.println(u);
        }
    }

    //---------------------------------------------
    /**
     * 测试根据条件查询用户
     */
    @Test
    public void testFindByCondition(){
        User u = new User();
        u.setUsername("老王");
        u.setSex("男");
        //5使用代理对象执行方法
        List<User> users = userDao.findByCondition(u);
        for (User user:users) {
            System.out.println(user);
        }
    }

    /**
     * 测试foreach
     */
    @Test
    public void testFindUserInIds(){
        QueryVo vo = new QueryVo();
        List<Integer> list = new ArrayList<Integer>();
        list.add(41);
        list.add(42);
        list.add(46);
        vo.setIds(list);
        //5.执行查询所有方法
        List<User> users = userDao.findUserInIds(vo);
        for(User user : users){
            System.out.println(user);
        }
    }
}
