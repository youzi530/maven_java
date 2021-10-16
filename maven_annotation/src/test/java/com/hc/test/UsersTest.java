package com.hc.test;

import com.hc.dao.IUserDao;
import com.hc.entity.Users;
import org.apache.ibatis.annotations.CacheNamespace;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


public class UsersTest {

    @Test  //查询到数据
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


    SqlSession session;
    InputStream in;
    IUserDao userDao;
    SqlSessionFactory factory;


    @Before
    public void init() throws IOException {
        //第一步.	读取配置文件,通过类加载器来加载配置文件
        in = Resources.getResourceAsStream("SqlMapConfig.xml");
        //第二步.	通过构建者创建SqlSessionFactory工厂(工厂模式)
        SqlSessionFactoryBuilder builder = new SqlSessionFactoryBuilder();
        factory = builder.build(in);
        //第三步： 	使用工厂创建SqlSession对象
        session = factory.openSession();
        System.out.println(session);
        //第四步： 	使用SqlSession创建Dao接口的代理对象（动态代理，来完成接口的实现类功能）
        userDao = session.getMapper(IUserDao.class);
    }

    @After
    public void destory() throws IOException {
        //事务提交
        session.commit();
        //第六步：	释放资源
        session.close();
        in.close();
    }


    @Test //查询到数据
    public void testSelect2() throws IOException {
        //第五步：关心业务： 	执行dao中的方法（即使用代理对象执行方法）
        List<Users> users = userDao.findAll();
        for (Users user : users) {
            System.out.println(user);
        }
    }

    @Test //更新操作
    public void testUpdate() throws IOException {
        //第五步：关心业务： 	执行dao中的方法（即使用代理对象执行方法）
        Users users = new Users();
        users.setUsername("张东润");
        users.setId(1005);
        userDao.update(users);
        System.out.println("更新成功！！！");
    }

    @Test //删除操作
    public void testDelete() throws IOException {
        //第五步：关心业务： 	执行dao中的方法（即使用代理对象执行方法）
        userDao.delete(1006);
        System.out.println("删除成功！！！");
    }

    @Test //插入操作
    public void testInsert() throws IOException {
        //第五步：关心业务： 	执行dao中的方法（即使用代理对象执行方法）
        Users users = new Users();
        users.setUsername("张东润二哈");
        users.setPassword("414141");
        users.setName("老板");

        userDao.insert(users);
        System.out.println("插入成功！！！");
    }

    @Test //测试查询插入的最新的id
    public void testInsert1() throws IOException {
        //第五步：关心业务： 	执行dao中的方法（即使用代理对象执行方法）
        Users users = new Users();
        users.setUsername("张东润二哈");
        users.setPassword("414141");
        users.setName("老板");
        System.out.println("插入前："+ users.getId());
        userDao.insert(users);
        System.out.println("插入成功！！！");
        System.out.println("插入后："+ users.getId());
    }

    @Test //通过id来查询
    public void testFindUserById() throws IOException {
        //第五步：关心业务： 	执行dao中的方法（即使用代理对象执行方法）
        List<Users> user = userDao.findUserById(1003);
        System.out.println(user);
        System.out.println("成功！！！");
    }

    @Test //一对多的查询
    public void testSelect3() throws IOException {
        //第五步：关心业务： 	执行dao中的方法（即使用代理对象执行方法）
        List<Users> users = userDao.findAll();
        for (Users user : users) {
            System.out.println(user);
            System.out.println(user.getAccounts());
        }
    }

    @Test //动态sql的使用
    public void testSelect4() throws IOException {
        //第五步：关心业务： 	执行dao中的方法（即使用代理对象执行方法）
        Users u  =new Users();
        u.setUsername("42143214");
        List<Users> users = userDao.findByName(u);
        for (Users user : users) {
            System.out.println(user);

        }
    }

    @Test //多参数，通过下标来寻找(通过下标也有两个arg,param)
    public void testSelect5() throws IOException {
        //第五步：关心业务： 	执行dao中的方法（即使用代理对象执行方法）
        Users users = userDao.findByCondition(1003,"凌巧");
        System.out.println(users);
    }

    @Test //多参数，通过下标来寻找(通过下标也有两个arg,param)
    public void testSelect6() throws IOException {
        //第五步：关心业务： 	执行dao中的方法（即使用代理对象执行方法）
        Users users = new Users();
        users.setId(1003);
        users.setUsername("凌巧");
        Users user = userDao.findByCondition2(users);
        System.out.println(user);
    }

    @Test //多参数，通过下标来寻找(通过下标也有两个arg,param)
    public void testSelect7() throws IOException {
        //第五步：关心业务： 	执行dao中的方法（即使用代理对象执行方法）
        Map<String,String> map = new HashMap<>();
        map.put("id","1003");
        map.put("username","凌巧");
        Users user = userDao.findByCondition3(map);
        System.out.println(user);
    }

    @Test //多参数，用list
    public void testSelect8() throws IOException {
        //第五步：关心业务： 	执行dao中的方法（即使用代理对象执行方法）
        List<Integer> list = new ArrayList<>();
        list.add(1001);
        list.add(1002);
        list.add(1003);
        list.add(1004);
        List<Users> users = userDao.findByCondition4(list);
        for (Users user : users) {
            System.out.println(user);

        }
    }

    @Test //二级缓存的验证
    public void testCache() throws IOException {
        //第五步：关心业务： 	执行dao中的方法（即使用代理对象执行方法）
        SqlSession sqlSession1 = factory.openSession();
        IUserDao iUserDao = sqlSession1.getMapper(IUserDao.class);
        Users user1 = iUserDao.findById(1002);
        System.out.println(sqlSession1+"user1:"+user1.hashCode());

        sqlSession1.close();
        //session1.clearCache();

        SqlSession session2 = factory.openSession();
        IUserDao userDao2 = session2.getMapper(IUserDao.class);
        Users user2 = userDao2.findById(1002);
        System.out.println(session2+"user2:"+user2.hashCode());

        session2.close();
    }
}
