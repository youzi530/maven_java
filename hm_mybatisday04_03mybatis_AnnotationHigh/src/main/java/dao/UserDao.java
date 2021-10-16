package dao;

import domain.User;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

public interface UserDao {

    @Select(value="select * from user")
    List<User> findAll();

    @Insert("insert into user(username,address,sex,birthday)values(#{username},#{address},#{sex},#{birthday})")
    void saveUser(User user);

    @Update("update user set username = #{username},sex=#{sex},birthday=#{birthday},address=#{address} where id =#{id}")
    void updateUser(User user);

    @Delete("delete from user where id = #{id}")
    void deleteUser(int id);

    @Select("select * from user where id = #{id}")
    User findById(int id);

    @Select("select * from user where username like #{username}")
    List<User> findByName(String username);

    @Select("select count(id) from user")
    int findTotal();
}
