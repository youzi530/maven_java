package com.mp.entity;


import lombok.Data;

import java.time.LocalDateTime;

/**
 * @Author lingqiao
 * @Date 2020/6/28
 * @Version 1.0
 * @Description
 */
@Data
public class User {

    private Long id; //主键
    private String name; //姓名
    private Integer age; //年纪
    private String email; //邮箱
    private Long managerId; //直属上级
    private LocalDateTime createTime; //创建时间
}
