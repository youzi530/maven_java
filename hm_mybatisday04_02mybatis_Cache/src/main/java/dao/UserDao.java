package dao;


import domain.User;

import java.util.List;

public interface UserDao {

    /**
     * 查询所有
     * @return
     */
    List<User> findAll();

    /**
     * 根据id查寻用户
     * @param id
     * @return
     */
    User findById(int id);

    /**
     * 更新用户
     * @param user
     */
    void updateUser(User user);
}
