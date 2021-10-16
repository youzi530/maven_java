package dao;

import domain.User;
import org.apache.ibatis.annotations.*;
import org.apache.ibatis.mapping.FetchType;

import java.util.List;

@CacheNamespace(blocking = true)
public interface UserDao {

    @Select(value="select * from user")
    @Results(id = "userMap",value={
            @Result(id = true,column = "id",property = "userId"),
            @Result(column = "username",property = "userName"),
            @Result(column = "address",property = "userAddress"),
            @Result(column = "birthday",property = "userBirthday"),
            @Result(column = "sex",property = "userSex"),

            @Result(property = "accounts",column = "id",
                    many = @Many(select = "dao.AccountDao.findAccountByUid",fetchType = FetchType.LAZY))
    })
    List<User> findAll();

    @Select("select * from user where id = #{id}")
    @ResultMap(value={"userMap"})
    User findById(int id);

    @Select("select * from user where username like #{username}")
    @ResultMap(value={"userMap"})
    List<User> findByName(String username);


}
