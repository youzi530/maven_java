package com.hc.entity;

import java.util.List;

public class Role {
    private int id;
    private String roleName;
    private String roleDesc;

    private List<UsersTwo> usersTwoList;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public String getRoleDesc() {
        return roleDesc;
    }

    public void setRoleDesc(String roleDesc) {
        this.roleDesc = roleDesc;
    }

    public List<UsersTwo> getUsersTwoList() {
        return usersTwoList;
    }

    public void setUsersTwoList(List<UsersTwo> usersTwoList) {
        this.usersTwoList = usersTwoList;
    }

    @Override
    public String toString() {
        return "Role{" +
                "id=" + id +
                ", roleName='" + roleName + '\'' +
                ", roleDesc='" + roleDesc + '\'' +
                ", usersTwoList=" + usersTwoList +
                '}';
    }
}
