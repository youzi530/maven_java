import dao.RoleDao;
import dao.UserDao;
import domain.Role;
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

public class RoleTest {

    private InputStream in;
    private SqlSession session;
    private RoleDao roleDao;

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
        roleDao = session.getMapper(RoleDao.class);
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
        List<Role> roles = roleDao.findAll();
        for (Role role:roles) {
            System.out.println(role);
        }
    }

    /**
     * 测试查询所有，与此同时还要将该角色的所有用户信息全部显示
     */
    @Test
    public void testFindAllRole(){
        //5使用代理对象执行方法
        List<Role> roles = roleDao.findAllRole();
        for (Role role:roles) {
            System.out.println(role);
            System.out.println(role.getUsers());

        }
    }
}