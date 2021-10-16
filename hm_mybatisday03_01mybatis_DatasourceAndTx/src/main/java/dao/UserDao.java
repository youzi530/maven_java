package dao;


import domain.QueryVo;
import domain.User;

import java.util.List;

public interface UserDao {

    /**
     * 查询所有
     * @return
     */
    List<User> findAll();

    /**
     * 保存用户
     * @param user
     */
    void saveUser(User user);

    /**
     * 更新用户
     * @param user
     */
    void updateUser(User user);

    /**
     * 删除用户
     * @param id
     */
    void deleteUser(int id);

    /**
     * 根据id查寻用户
     * @param id
     * @return
     */
    User findById(int id);

    /**
     * 模糊查询用户
     * @param  username
     * @return
     */
    List<User> findByName(String username);

    /**
     * 查询总用户数
     * @param
     * @return
     */
    int findTotal();

    //-----------------------------------------
    /**
     * pojo来
     * 根据queryVo中的条件查询用户
     * @param
     * @return
     */
    List<User> findUserByVo(QueryVo vo);

}
