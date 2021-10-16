package com.hc.sql;

import com.hc.entity.Users;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.jdbc.SQL;

import java.util.List;
import java.util.Map;

//动态sql类
public class dynamic {

    //动态sql的使用
    public String findByUsername(Users users){
        SQL usersql = new SQL();

        usersql.SELECT("id,username");
        usersql.SELECT("password","name");
        usersql.FROM("users");
        if(users !=null){
            if(users.getUsername()!="" && users.getUsername()!=null){
                usersql.WHERE("username like #{username}");
            }
        }
        String sql = usersql.toString();
        return sql;
    }


    public String findByCondition(Map<String, List<Integer>> map){
        List<Integer> list = map.get("list");
        String str = "";
        for (int i = 0; i < map.size(); i++) {
            int num = list.get(i);
            str += num + ",";
        }

        String instring = str.substring(0,str.length()-1);

        SQL usersql  = new SQL();
        usersql.SELECT("id,username");
        usersql.SELECT("password","name");
        usersql.FROM("users");
        usersql.WHERE("id in ("+ instring +")");
        String sql = usersql.toString();
        return sql;
    }
}
