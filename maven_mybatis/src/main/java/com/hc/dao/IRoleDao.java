package com.hc.dao;

import com.hc.entity.*;

import java.util.List;

public interface IRoleDao {

    //查询到数据 --测试
    List<Role> findAll();

    //查询到数据 --多表查询
    List<Role> findAll2();


}
