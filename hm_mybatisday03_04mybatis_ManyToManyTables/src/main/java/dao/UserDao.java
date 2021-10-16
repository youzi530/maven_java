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
     * 查询所有，与此同时还要将该用户所属的角色全部显示
     * @return
     */
    List<User> findAllUsers();
}
