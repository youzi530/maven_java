package com.hc.dao;


import com.hc.entity.Users;
import org.apache.ibatis.annotations.*;
import org.apache.ibatis.mapping.FetchType;

import java.util.List;
import java.util.Map;

//开启二级缓存
@CacheNamespace(blocking = true)
public interface IUserDao {

    @Select("select * from users")
    List<Users> findAll();


}
