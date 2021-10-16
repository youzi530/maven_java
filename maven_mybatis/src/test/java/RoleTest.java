import com.hc.dao.IAccountDao;
import com.hc.dao.IRoleDao;
import com.hc.entity.Account;
import com.hc.entity.Role;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.junit.Test;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

public class RoleTest {

    @Test   //测试！
    public void testSelect() throws IOException {
        //第一步.	读取配置文件,通过类加载器来加载配置文件
        InputStream in = Resources.getResourceAsStream("SqlMapConfig.xml");
        //第二步.	通过构建者创建SqlSessionFactory工厂(工厂模式)
        SqlSessionFactoryBuilder builder = new SqlSessionFactoryBuilder();
        SqlSessionFactory factory = builder.build(in);
        //第三步： 	使用工厂创建SqlSession对象
        SqlSession session = factory.openSession();
        System.out.println(session);
        //第四步： 	使用SqlSession创建Dao接口的代理对象（动态代理，来完成接口的实现类功能）
        IRoleDao iRoleDao = session.getMapper(IRoleDao.class);
        //第五步：关心业务： 	执行dao中的方法（即使用代理对象执行方法）
        List<Role> roles = iRoleDao.findAll();
        for (Role role : roles) {
            System.out.println(role);
        }
        //第六步：	释放资源
        session.close();
        in.close();
    }


    @Test   //一对多数据库查询，就是一个用户对应多个账户的查询
    public void testSelect1() throws IOException {
        //第一步.	读取配置文件,通过类加载器来加载配置文件
        InputStream in = Resources.getResourceAsStream("SqlMapConfig.xml");
        //第二步.	通过构建者创建SqlSessionFactory工厂(工厂模式)
        SqlSessionFactoryBuilder builder = new SqlSessionFactoryBuilder();
        SqlSessionFactory factory = builder.build(in);
        //第三步： 	使用工厂创建SqlSession对象
        SqlSession session = factory.openSession();
        System.out.println(session);
        //第四步： 	使用SqlSession创建Dao接口的代理对象（动态代理，来完成接口的实现类功能）
        IRoleDao iRoleDao = session.getMapper(IRoleDao.class);
        //第五步：关心业务： 	执行dao中的方法（即使用代理对象执行方法）
        List<Role> roles = iRoleDao.findAll2();
        for (Role role : roles) {
            System.out.println(role);
        }
        //第六步：	释放资源
        session.close();
        in.close();
    }




}
