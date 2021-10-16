package com.hc.dao;

import com.hc.entity.Account;
import org.apache.ibatis.annotations.*;
import org.apache.ibatis.mapping.FetchType;

import java.util.List;

public interface IAccountDao {


    @Results(id = "myaccount" ,value = {
        @Result(id = true,property = "id",column = "id"),
        @Result(property = "uid",column = "uid"),
        @Result(property = "money",column = "money"),
            @Result(property = "users",column = "uid",one = @One(select = "com.hc.dao.IUserDao.findUserById",fetchType=FetchType.EAGER))
    })

    //简单查询全部
    @Select(value = "select * from account")
    List<Account> findAll();

    //通过id来查询
    @ResultMap("myaccount")
    @Select("select * from account where uid = #{uid}")
    List<Account> findAccountByUid(int uid);


}
