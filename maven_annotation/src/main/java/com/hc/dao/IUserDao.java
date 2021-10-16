package com.hc.dao;


import com.hc.entity.Users;
import com.hc.sql.dynamic;
import org.apache.ibatis.annotations.*;
import org.apache.ibatis.mapping.FetchType;

import javax.print.DocFlavor;
import java.util.List;
import java.util.Map;

//开启二级缓存
@CacheNamespace(blocking = true)
public interface IUserDao {

    //day03：使用注解来简化mybatis使用

    @Results(id = "myuser",value = {
            @Result(id = true,property = "id",column = "id"), //因为@Result 既表示主键id,又表示非主键result,id=true,表示这个为主键,下面的其余非主键字段的话就可以省略
            @Result(property = "username",column = "username"),
            @Result(property = "password",column = "password"),
            @Result(property = "name",column = "name"),
                @Result(property = "accounts",column = "id",many = @Many(select = "com.hc.dao.IAccountDao.findAccountByUid",fetchType = FetchType.DEFAULT))
    })

    //查询到数据
    @Select(value = "select * from users")
    List<Users> findAll();

    //更新操作
    @Update("update users set username = #{username} where id = #{id}")
    void update(Users users);

    //删除操作
    @Delete("delete from users where id = #{id}")
    void delete(int id);

    //插入操作
    @Insert("insert into users(username,password,name) values (#{username},#{password},#{name})")
        //这里是为了查询到插入的最新的id,必须写下面这行，不然在test方法里面，就查不到id
        @SelectKey(keyProperty = "id",keyColumn = "id",before = false,resultType = Integer.class,statement = "select last_insert_id()")
    void insert(Users users);

    //通过id来查询
    @Results(id = "myuser1",value = {
            @Result(id = true,property = "id",column = "id"), //因为@Result 既表示主键id,又表示非主键result,id=true,表示这个为主键,下面的其余非主键字段的话就可以省略
            @Result(property = "username",column = "username"),
            @Result(property = "password",column = "password"),
            @Result(property = "name",column = "name")
    })
    //@ResultMap("myuser1")
    @Select("select * from users where id = #{id}")
    List<Users> findUserById(int id);


    //
    @Select("select * from users where id in(select uid from user_role where rid = #{rid})")
    List<Users> findByUsers(int id);


    //动态sql的使用
    @ResultMap("myuser1")
    @SelectProvider(type = dynamic.class,method = "findByUsername")
    List<Users> findByName(Users users);

    //多参数，方法一：通过下标来寻找(通过下标也有两个arg,param)
    //@Select("select * from users where id = #{arg0} and username = #{arg1}")
    @Select("select * from users where id = #{param1} and username = #{param2}")
    Users findByCondition(int id,String username);

    //多参数，方法二：通过加上@Param来寻找
    @Select("select * from users where id = #{id} and username = #{username}")
    Users findByCondition1(@Param("id") int id,@Param("username") String username);

    //多参数，方法三：通过加上javaBean来处理
    @Select("select * from users where id = #{id} and username = #{username}")
    Users findByCondition2(Users users);

    //多参数，方法四：通过Map集合来处理
    @Select("select * from users where id = #{map.id} and username = #{map.username}")
    Users findByCondition3(@Param("map") Map<String,String> map);

    //多参数，方法五：用list来处理
    @SelectProvider(type = dynamic.class,method = "findByCondition")
    List<Users> findByCondition4(@Param("list") List<Integer>list);

    //查询到数据,二级缓存的验证
    @Select(value = "select * from users where id= #{id}")
    Users findById(int id);

}
