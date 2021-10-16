import com.hc.dao.IUserDao;
import com.hc.entity.Info;
import com.hc.entity.Users;
import com.hc.entity.UsersThree;
import com.hc.entity.UsersTwo;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.junit.Test;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

public class UsersTest {

    @Test
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
        IUserDao userDao = session.getMapper(IUserDao.class);
        //第五步：关心业务： 	执行dao中的方法（即使用代理对象执行方法）
        List<Users> users = userDao.findAll();
        for (Users user : users) {
            System.out.println(user);
        }
        //第六步：	释放资源
        session.close();
        in.close();
    }

    @Test
    public void testInsert() throws IOException {
        //第一步.	读取配置文件,通过类加载器来加载配置文件
        InputStream in = Resources.getResourceAsStream("SqlMapConfig.xml");
        //第二步.	通过构建者创建SqlSessionFactory工厂(工厂模式)
        SqlSessionFactoryBuilder builder = new SqlSessionFactoryBuilder();
        SqlSessionFactory factory = builder.build(in);
        //第三步： 	使用工厂创建SqlSession对象
        SqlSession session = factory.openSession();
        System.out.println(session);
        //第四步： 	使用SqlSession创建Dao接口的代理对象（动态代理，来完成接口的实现类功能）
        IUserDao userDao = session.getMapper(IUserDao.class);
        //第五步：关心业务： 	执行dao中的方法（即使用代理对象执行方法）
       Users users = new Users();
       users.setUsername("凌巧");
       users.setPassword("123456");
       users.setName("职员一号");
       System.out.println("插入前："+users);
       userDao.insertUsers(users);
        System.out.println("插入后："+users);
       session.commit();

        //第六步：	释放资源
        session.close();
        in.close();
    }

    @Test
    public void testDelete() throws IOException {
        //第一步.	读取配置文件,通过类加载器来加载配置文件
        InputStream in = Resources.getResourceAsStream("SqlMapConfig.xml");
        //第二步.	通过构建者创建SqlSessionFactory工厂(工厂模式)
        SqlSessionFactoryBuilder builder = new SqlSessionFactoryBuilder();
        SqlSessionFactory factory = builder.build(in);
        //第三步： 	使用工厂创建SqlSession对象
        SqlSession session = factory.openSession();
        System.out.println(session);
        //第四步： 	使用SqlSession创建Dao接口的代理对象（动态代理，来完成接口的实现类功能）
        IUserDao userDao = session.getMapper(IUserDao.class);
        //第五步：关心业务： 	执行dao中的方法（即使用代理对象执行方法）
        int id = 1002;
        userDao.deleteUsers(id);

        session.commit();
        //第六步：	释放资源
        session.close();
        in.close();
    }

    @Test  //修改一条数据
    public void testUpdateUsers() throws IOException {
        //第一步.	读取配置文件,通过类加载器来加载配置文件
        InputStream in = Resources.getResourceAsStream("SqlMapConfig.xml");
        //第二步.	通过构建者创建SqlSessionFactory工厂(工厂模式)
        SqlSessionFactoryBuilder builder = new SqlSessionFactoryBuilder();
        SqlSessionFactory factory = builder.build(in);
        //第三步： 	使用工厂创建SqlSession对象
        SqlSession session = factory.openSession();
        System.out.println(session);
        //第四步： 	使用SqlSession创建Dao接口的代理对象（动态代理，来完成接口的实现类功能）
        IUserDao userDao = session.getMapper(IUserDao.class);
        //第五步：关心业务： 	执行dao中的方法（即使用代理对象执行方法）

        Users users = new Users();
        users.setUsername("凌巧32141");
        users.setPassword("123456");
        users.setName("职员一号");
        users.setId(1004);
        userDao.updateUsers(users);

        session.commit();
        //第六步：	释放资源
        session.close();
        in.close();
    }

    @Test   //修改一条数据（加set标签改良版本）
    public void testUpdateUsers1() throws IOException {
        //第一步.	读取配置文件,通过类加载器来加载配置文件
        InputStream in = Resources.getResourceAsStream("SqlMapConfig.xml");
        //第二步.	通过构建者创建SqlSessionFactory工厂(工厂模式)
        SqlSessionFactoryBuilder builder = new SqlSessionFactoryBuilder();
        SqlSessionFactory factory = builder.build(in);
        //第三步： 	使用工厂创建SqlSession对象
        SqlSession session = factory.openSession();
        System.out.println(session);
        //第四步： 	使用SqlSession创建Dao接口的代理对象（动态代理，来完成接口的实现类功能）
        IUserDao userDao = session.getMapper(IUserDao.class);
        //第五步：关心业务： 	执行dao中的方法（即使用代理对象执行方法）

        Users users = new Users();
        users.setUsername("zhangsan1");
        users.setPassword("123456");
        users.setName("职员一号");
        users.setId(1001);
        userDao.updateUsers1(users);

        session.commit();
        //第六步：	释放资源
        session.close();
        in.close();
    }

    @Test
    public void testFindUsersByInfo() throws IOException {
        //第一步.	读取配置文件,通过类加载器来加载配置文件
        InputStream in = Resources.getResourceAsStream("SqlMapConfig.xml");
        //第二步.	通过构建者创建SqlSessionFactory工厂(工厂模式)
        SqlSessionFactoryBuilder builder = new SqlSessionFactoryBuilder();
        SqlSessionFactory factory = builder.build(in);
        //第三步： 	使用工厂创建SqlSession对象
        SqlSession session = factory.openSession();
        System.out.println(session);
        //第四步： 	使用SqlSession创建Dao接口的代理对象（动态代理，来完成接口的实现类功能）
        IUserDao userDao = session.getMapper(IUserDao.class);
        //第五步：关心业务： 	执行dao中的方法（即使用代理对象执行方法）

        Users users =new Users();
        users.setId(1001);

        Info info = new Info();
        info.setUsers(users);

        userDao.findUsersByInfo(info);

        session.commit();
        //第六步：	释放资源
        session.close();
        in.close();
    }

    @Test  //模糊查询
    public void testFindUsersByUserName() throws IOException {
        //第一步.	读取配置文件,通过类加载器来加载配置文件
        InputStream in = Resources.getResourceAsStream("SqlMapConfig.xml");
        //第二步.	通过构建者创建SqlSessionFactory工厂(工厂模式)
        SqlSessionFactoryBuilder builder = new SqlSessionFactoryBuilder();
        SqlSessionFactory factory = builder.build(in);
        //第三步： 	使用工厂创建SqlSession对象
        SqlSession session = factory.openSession();
        System.out.println(session);
        //第四步： 	使用SqlSession创建Dao接口的代理对象（动态代理，来完成接口的实现类功能）
        IUserDao userDao = session.getMapper(IUserDao.class);
        //第五步：关心业务： 	执行dao中的方法（即使用代理对象执行方法）

        List<Users> usersByUserName = userDao.findUsersByUserName("%凌%");
        System.out.println(usersByUserName);

        session.commit();
        //第六步：	释放资源
        session.close();
        in.close();
    }

    @Test  //解释动态sql
    public void testFindUsersByActiveSql() throws IOException {
        //第一步.	读取配置文件,通过类加载器来加载配置文件
        InputStream in = Resources.getResourceAsStream("SqlMapConfig.xml");
        //第二步.	通过构建者创建SqlSessionFactory工厂(工厂模式)
        SqlSessionFactoryBuilder builder = new SqlSessionFactoryBuilder();
        SqlSessionFactory factory = builder.build(in);
        //第三步： 	使用工厂创建SqlSession对象
        SqlSession session = factory.openSession();
        System.out.println(session);
        //第四步： 	使用SqlSession创建Dao接口的代理对象（动态代理，来完成接口的实现类功能）
        IUserDao userDao = session.getMapper(IUserDao.class);
        //第五步：关心业务： 	执行dao中的方法（即使用代理对象执行方法）

        Users u =new Users();
//        u.setUsername("321");
        List<Users> users = userDao.findUsersByActiveSql(u);
        for (Users user : users) {
            System.out.println(user);
        }
        //第六步：	释放资源
        session.close();
        in.close();
    }

    @Test  //解释动态sql--加上where标签的改良版本
    public void testFindUsersByActiveSql1() throws IOException {
        //第一步.	读取配置文件,通过类加载器来加载配置文件
        InputStream in = Resources.getResourceAsStream("SqlMapConfig.xml");
        //第二步.	通过构建者创建SqlSessionFactory工厂(工厂模式)
        SqlSessionFactoryBuilder builder = new SqlSessionFactoryBuilder();
        SqlSessionFactory factory = builder.build(in);
        //第三步： 	使用工厂创建SqlSession对象
        SqlSession session = factory.openSession();
        System.out.println(session);
        //第四步： 	使用SqlSession创建Dao接口的代理对象（动态代理，来完成接口的实现类功能）
        IUserDao userDao = session.getMapper(IUserDao.class);
        //第五步：关心业务： 	执行dao中的方法（即使用代理对象执行方法）

        Users u =new Users();
        //u.setUsername("321");
        List<Users> users = userDao.findUsersByActiveSql1(u);
        for (Users user : users) {
            System.out.println(user);
        }
        //第六步：	释放资源
        session.close();
        in.close();
    }

    @Test  //解释动态sql--加上where标签的改良版本
    public void testFindUsersByActiveSql2() throws IOException {
        //第一步.	读取配置文件,通过类加载器来加载配置文件
        InputStream in = Resources.getResourceAsStream("SqlMapConfig.xml");
        //第二步.	通过构建者创建SqlSessionFactory工厂(工厂模式)
        SqlSessionFactoryBuilder builder = new SqlSessionFactoryBuilder();
        SqlSessionFactory factory = builder.build(in);
        //第三步： 	使用工厂创建SqlSession对象
        SqlSession session = factory.openSession();
        System.out.println(session);
        //第四步： 	使用SqlSession创建Dao接口的代理对象（动态代理，来完成接口的实现类功能）
        IUserDao userDao = session.getMapper(IUserDao.class);
        //第五步：关心业务： 	执行dao中的方法（即使用代理对象执行方法）

        Users u =new Users();
        u.setUsername("321");
        List<Users> users = userDao.findUsersByActiveSql2(u);
        for (Users user : users) {
            System.out.println(user);
        }
        //第六步：	释放资源
        session.close();
        in.close();
    }

    @Test  //解释动态sql--加上where标签的改良版本
    public void testFindUsersByInfo1() throws IOException {
        //第一步.	读取配置文件,通过类加载器来加载配置文件
        InputStream in = Resources.getResourceAsStream("SqlMapConfig.xml");
        //第二步.	通过构建者创建SqlSessionFactory工厂(工厂模式)
        SqlSessionFactoryBuilder builder = new SqlSessionFactoryBuilder();
        SqlSessionFactory factory = builder.build(in);
        //第三步： 	使用工厂创建SqlSession对象
        SqlSession session = factory.openSession();
        System.out.println(session);
        //第四步： 	使用SqlSession创建Dao接口的代理对象（动态代理，来完成接口的实现类功能）
        IUserDao userDao = session.getMapper(IUserDao.class);
        //第五步：关心业务： 	执行dao中的方法（即使用代理对象执行方法）

        Info info = new Info();
        List<Integer> list = new ArrayList<Integer>();
        list.add(1001);
        list.add(1002);
        list.add(1003);
        list.add(1004);
        info.setIds(list);

        List<Users> users = userDao.findUsersByInfo1(info);
        for (Users user : users) {
            System.out.println(user);
        }
        //第六步：	释放资源
        session.close();
        in.close();
    }


    //第二天加强


    //如果实体类和数据库的字段不一样的话，怎么办？新建一个实体类，UsersTwo里面的username改为uname
    @Test   //方法一：用别名
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
        IUserDao userDao = session.getMapper(IUserDao.class);
        //第五步：关心业务： 	执行dao中的方法（即使用代理对象执行方法）
        List<UsersTwo> users = userDao.findAll1();
        for (UsersTwo user : users) {
            System.out.println(user);
        }
        //第六步：	释放资源
        session.close();
        in.close();
    }

    @Test   //方法二：用resultMap
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
        IUserDao userDao = session.getMapper(IUserDao.class);
        //第五步：关心业务： 	执行dao中的方法（即使用代理对象执行方法）
        List<UsersTwo> users = userDao.findAll2();
        for (UsersTwo user : users) {
            System.out.println(user);
        }
        //第六步：	释放资源
        session.close();
        in.close();
    }


    @Test   //一对多数据库查询，就是一个用户对应多个账户的查询
    public void testSelect3() throws IOException {
        //第一步.	读取配置文件,通过类加载器来加载配置文件
        InputStream in = Resources.getResourceAsStream("SqlMapConfig.xml");
        //第二步.	通过构建者创建SqlSessionFactory工厂(工厂模式)
        SqlSessionFactoryBuilder builder = new SqlSessionFactoryBuilder();
        SqlSessionFactory factory = builder.build(in);
        //第三步： 	使用工厂创建SqlSession对象
        SqlSession session = factory.openSession();
        System.out.println(session);
        //第四步： 	使用SqlSession创建Dao接口的代理对象（动态代理，来完成接口的实现类功能）
        IUserDao userDao = session.getMapper(IUserDao.class);
        //第五步：关心业务： 	执行dao中的方法（即使用代理对象执行方法）
        List<UsersThree> users = userDao.findAll3();
        for (UsersThree user : users) {
            System.out.println(user);
        }
        //第六步：	释放资源
        session.close();
        in.close();
    }

    @Test   //一对多数据库查询，懒加载的使用
    public void testSelect4() throws IOException {
        //第一步.	读取配置文件,通过类加载器来加载配置文件
        InputStream in = Resources.getResourceAsStream("SqlMapConfig.xml");
        //第二步.	通过构建者创建SqlSessionFactory工厂(工厂模式)
        SqlSessionFactoryBuilder builder = new SqlSessionFactoryBuilder();
        SqlSessionFactory factory = builder.build(in);
        //第三步： 	使用工厂创建SqlSession对象
        SqlSession session = factory.openSession();
        System.out.println(session);
        //第四步： 	使用SqlSession创建Dao接口的代理对象（动态代理，来完成接口的实现类功能）
        IUserDao userDao = session.getMapper(IUserDao.class);
        //第五步：关心业务： 	执行dao中的方法（即使用代理对象执行方法）
        List<UsersThree> users = userDao.findAll4();
        for (UsersThree user : users) {
            //System.out.println(user.getName());
            System.out.println(user);
        }
        //第六步：	释放资源
        session.close();
        in.close();
    }

    @Test   //一级缓存和二级缓存的区别(错误的解释！！！！！！！因为没开启二级缓存)
    public void testSelect5() throws IOException {
        //第一步.	读取配置文件,通过类加载器来加载配置文件
        InputStream in = Resources.getResourceAsStream("SqlMapConfig.xml");
        //第二步.	通过构建者创建SqlSessionFactory工厂(工厂模式)
        SqlSessionFactoryBuilder builder = new SqlSessionFactoryBuilder();
        SqlSessionFactory factory = builder.build(in);


        SqlSession session1 = factory.openSession();
        IUserDao userDao = session1.getMapper(IUserDao.class);
        UsersThree user1 = userDao.findUserByUserId(1002);
        System.out.println(session1+"user1:"+user1.hashCode());

        session1.close();
        //session1.clearCache();

        SqlSession session2 = factory.openSession();
        IUserDao userDao2 = session2.getMapper(IUserDao.class);
        UsersThree user2 = userDao2.findUserByUserId(1002);
        System.out.println(session2+"user2:"+user2.hashCode());

        session2.close();
        in.close();
    }

    @Test   //一级缓存和二级缓存的区别--正确    --open一次session的话，就是一次缓存，拿到的数据都是同一个对象，
    public void testSelect6() throws IOException {

        SqlSession session;
        IUserDao userDao;

        //第一步.	读取配置文件,通过类加载器来加载配置文件
        InputStream in = Resources.getResourceAsStream("SqlMapConfig.xml");
        //第二步.	通过构建者创建SqlSessionFactory工厂(工厂模式)
        SqlSessionFactoryBuilder builder = new SqlSessionFactoryBuilder();
        SqlSessionFactory factory = builder.build(in);
        //第三步： 	使用工厂创建SqlSession对象   --SqlSession是一级缓存，自动打开
        session = factory.openSession();
        userDao = session.getMapper(IUserDao.class);

        UsersThree user1 = userDao.findUserByUserId(1002);
        System.out.println(session+"user1:"+user1.hashCode());

        //session.clearCache(); //清除session，只清除的话，不会变化

        //关闭session
        //session.close();
        //session = factory.openSession();
        //userDao = session.getMapper(IUserDao.class);

        UsersThree user2 = userDao.findUserByUserId(1002);
        System.out.println(session+"user2:"+user2.hashCode());

        //第六步：	释放资源
        session.close();
        in.close();
    }

}
