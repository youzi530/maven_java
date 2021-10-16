package dao;

import domain.Role;

import java.util.List;

public interface RoleDao {

    /**
     * 查询所有角色
     * @return
     */
    List<Role> findAll();

    /**
     * 查询所有，与此同时还要将该角色的所有用户信息全部显示
     * @return
     */
    List<Role> findAllRole();
}
