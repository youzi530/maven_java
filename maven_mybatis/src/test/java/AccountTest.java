import com.hc.dao.IAccountDao;
import com.hc.dao.IUserDao;
import com.hc.entity.Account;
import com.hc.entity.UsersTwo;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.junit.Test;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

public class AccountTest {

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
        IAccountDao accountDao = session.getMapper(IAccountDao.class);
        //第五步：关心业务： 	执行dao中的方法（即使用代理对象执行方法）
        List<Account> accounts = accountDao.findAll();
        for (Account account : accounts) {
            System.out.println(account);
        }
        //第六步：	释放资源
        session.close();
        in.close();
    }


    @Test   //一对一的数据库查询
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
        IAccountDao accountDao = session.getMapper(IAccountDao.class);
        //第五步：关心业务： 	执行dao中的方法（即使用代理对象执行方法）
        List<Account> accounts = accountDao.findAll1();
        for (Account account : accounts) {
            System.out.println(account);
            System.out.println(account.getUsersTwo());
        }
        //第六步：	释放资源
        session.close();
        in.close();
    }

    @Test   //一对一的数据库查询 的懒加载语句
    public void testSelect2() throws IOException {
        //第一步.	读取配置文件,通过类加载器来加载配置文件
        InputStream in = Resources.getResourceAsStream("SqlMapConfig.xml");
        //第二步.	通过构建者创建SqlSessionFactory工厂(工厂模式)
        SqlSessionFactoryBuilder builder = new SqlSessionFactoryBuilder();
        SqlSessionFactory factory = builder.build(in);
        //第三步： 	使用工厂创建SqlSession对象
        SqlSession session = factory.openSession();
        System.out.println(session);
        //第四步： 	使用SqlSession创建Dao接口的代理对象（动态代理，来完成接口的实现类功能）
        IAccountDao accountDao = session.getMapper(IAccountDao.class);
        //第五步：关心业务： 	执行dao中的方法（即使用代理对象执行方法）
        List<Account> accounts = accountDao.findAll2();
        for (Account account : accounts) {
            //当运行这一条数据的时候，没有用到Users里面的东西，就不加载IUsersDao.xml里面的懒加载的sql语句
            System.out.println(account.getId()+"money:"+account.getMoney());
            System.out.println(account.getUsersTwo());
        }
        //第六步：	释放资源
        session.close();
        in.close();
    }


}
