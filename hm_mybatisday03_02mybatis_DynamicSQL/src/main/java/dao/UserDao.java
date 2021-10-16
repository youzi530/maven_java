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
     * pojo来
     * 根据queryVo中的条件查询用户
     * @param
     * @return
     */
    List<User> findUserByVo(QueryVo vo);

    //-----------------------------------------
    /**
     * 根据传入参数条件
     * @param user  的条件可能是姓名、性别、地址、可能都有
     * @return
     */
    List<User> findByCondition(User user);

    /**
     *  根据queryvo中提供的ID集合，查询用信息
     * @param vo
     * @return
     */
    List<User> findUserInIds(QueryVo vo);

}
