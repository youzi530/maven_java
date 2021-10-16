package com.mp.test;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.mp.dao.UserMapper;
import com.mp.entity.User;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Map;

/**
 * @Author lingqiao
 * @Date 2020/7/3
 * @Version 1.0
 * @Description
 */
public class test {

    @Autowired
    private UserMapper userMapper;

    @Test
    public void selectPage(){
        QueryWrapper<User> userQueryWrapper = new QueryWrapper<>();
        userQueryWrapper.ge("age",22);
        Page<User> page = new Page<>(1, 2);
        IPage<User> userIPage = userMapper.selectPage(page, userQueryWrapper);
        System.out.println("总页数"+userIPage.getPages());
        System.out.println("总记录数："+userIPage.getTotal());
        List<User> userList = userIPage.getRecords();
    }

    @Test
    public void selectPage1(){
        QueryWrapper<User> userQueryWrapper = new QueryWrapper<>();
        userQueryWrapper.ge("age",22);
        Page<User> page = new Page<>(1, 2);

        IPage<Map<String, Object>> mapIPage = userMapper.selectMapsPage(page, userQueryWrapper);
        System.out.println("总页数"+mapIPage.getPages());
        System.out.println("总记录数："+mapIPage.getTotal());
        List<Map<String, Object>> records = mapIPage.getRecords();

    }
}
