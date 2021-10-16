package com.kuang.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.kuang.pojo.User;
import org.springframework.stereotype.Repository;

/**
 * @Author lingqiao
 * @Date 2020/6/28
 * @Version 1.0
 * @Description
 *  在对应的mapper上面继承基本的类 BaseMapper
 */
@Repository
public interface UserMapper extends BaseMapper<User> {
}
