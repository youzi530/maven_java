package com.mp.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.mp.entity.User;
import org.apache.ibatis.annotations.Mapper;

/**
 * @Author lingqiao
 * @Date 2020/6/28
 * @Version 1.0
 * @Description
 */
@Mapper
public interface UserMapper extends BaseMapper<User> {

}
