import dao.UserDao;
import dao.daoImpl.UserDaoImpl;
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

public class MybatisTest {

    private InputStream in;
    private UserDao userDao;

    @Before
    public void init() throws Exception {
        //1读取配置文件
        in = Resources.getResourceAsStream("SqlMapConfig.xml");
        //2创建SqlBeanSeesionFactory工厂
        SqlSessionFactoryBuilder builder = new SqlSessionFactoryBuilder();
        SqlSessionFactory factory = builder.build(in);
        //3使用工厂生产dao对象
        userDao = new UserDaoImpl(factory);
    }

    @After
    public void destroy() throws Exception {
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
     * 测试保存操作
     */
    @Test
    public void testSave(){
        User user = new User();
        user.setUsername("柚子君121212");
        user.setSex("男");
        user.setAddress("地球村");
        user.setBirthday(new Date());
        System.out.println("前："+user);
        //5使用代理对象执行方法
        userDao.saveUser(user);
        System.out.println("后"+user);
    }

    /**
     * 测试更新操作
     */
    @Test
    public void testUpdate(){
        User user = new User();
        user.setId(41);
        user.setUsername("柚子君");
        user.setSex("男");
        user.setAddress("地球村");
        user.setBirthday(new Date());
        //5使用代理对象执行方法
        userDao.updateUser(user);
    }

    /**
     * 测试删除操作
     */
    @Test
    public void testDelete() {
        //5使用代理对象执行方法
        userDao.deleteUser(52);
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

    /**
     * 测试查询总用户数
     */
    @Test
    public void testFindTotal() {
        //5使用代理对象执行方法
        int total = userDao.findTotal();
        System.out.println(total);
    }

}
