package com.mp;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * @Author lingqiao
 * @Date 2020/6/28
 * @Version 1.0
 * @Description
 */
@SpringBootApplication
@MapperScan("com.com.com.mp.dao")
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class,args);
    }
}
