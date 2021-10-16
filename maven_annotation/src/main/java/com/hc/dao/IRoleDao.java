package com.hc.dao;

import com.hc.entity.Role;
import org.apache.ibatis.annotations.Many;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.mapping.FetchType;

import java.util.List;

public interface IRoleDao {

    @Results(id = "myrole",value = {
            @Result(id = true,property = "id",column = "id"),
            @Result(property = "roleName",column = "ROLE_NAME"),
            @Result(property = "roleDesc",column = "ROLE_DESC"),
                @Result(property = "users",column = "id",many = @Many(select = "com.hc.dao.IUserDao.findByUsers",fetchType = FetchType.LAZY))
    })
    @Select("select * from role")
    List<Role> findAll();

}
