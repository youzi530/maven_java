package com.hc.dao;

import com.hc.entity.Info;
import com.hc.entity.Users;
import com.hc.entity.UsersThree;
import com.hc.entity.UsersTwo;

import java.util.List;

public interface IUserDao {

    //查询到数据
    List<Users> findAll();

    //插入某个用户
    void insertUsers(Users users);

    //删除一条数据
    void deleteUsers(int id);

    //修改一条数据
    void updateUsers(Users users);

    //修改一条数据（加set标签改良版本）
    void updateUsers1(Users users);

    //ognl #{对象.对象}，新建一个Info类，里面还
    List<Users> findUsersByInfo(Info info);

    //模糊查询
    List<Users> findUsersByUserName(String username);

    //解释动态sql  --if标签
    List<Users> findUsersByActiveSql(Users users);

    //解释动态sql改良版--加上where标签
    List<Users> findUsersByActiveSql1(Users users);

    //解释动态sql改良版--加上choose when标签
    List<Users> findUsersByActiveSql2(Users users);

    //遍历集合，在Info集合里面加上一个集合ids,用foreach来实现
    List<Users> findUsersByInfo1(Info info);

//第二天加强

    //查询到数据1--用别名
    List<UsersTwo> findAll1();

    //查询到数据2--resultMap
    List<UsersTwo> findAll2();

    //一对多数据库查询，就是一个用户对应多个账户的查询
    List<UsersThree> findAll3();

    //一对多数据库查询，使用懒加载的方式运用
    List<UsersThree> findAll4();

    //一对多数据库查询，使用懒加载的方式运用
    UsersThree findUserByUserId(int id);
}
