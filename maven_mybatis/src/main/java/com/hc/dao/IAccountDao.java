package com.hc.dao;

import com.hc.entity.Account;
import com.hc.entity.Info;
import com.hc.entity.Users;
import com.hc.entity.UsersTwo;

import java.util.List;

public interface IAccountDao {

    //新建这个xml的测试，简单查询全部
    List<Account> findAll();

    //一对一的数据库查询,就是一个账户对应一个用户，其实也是多个账户对应一个用户
    List<Account> findAll1();

    //一对一的数据库查询,用的是懒加载
    List<Account> findAll2();

}
