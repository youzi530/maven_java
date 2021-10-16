package com.hc.entity;

import java.util.List;

public class Info {
    private Users users;
    List<Integer> ids;

    public Users getUsers() {
        return users;
    }

    public void setUsers(Users users) {
        this.users = users;
    }

    public List<Integer> getIds() {
        return ids;
    }

    public void setIds(List<Integer> ids) {
        this.ids = ids;
    }

    @Override
    public String toString() {
        return "Info{" +
                "users=" + users +
                ", ids=" + ids +
                '}';
    }
}
