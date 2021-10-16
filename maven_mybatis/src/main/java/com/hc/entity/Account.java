package com.hc.entity;

public class Account {
    private int id;
    private int uid;
    private double money;

    private UsersTwo usersTwo;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getUid() {
        return uid;
    }

    public void setUid(int uid) {
        this.uid = uid;
    }

    public double getMoney() {
        return money;
    }

    public void setMoney(double money) {
        this.money = money;
    }

    public UsersTwo getUsersTwo() {
        return usersTwo;
    }

    public void setUsersTwo(UsersTwo usersTwo) {
        this.usersTwo = usersTwo;
    }

    @Override
    public String toString() {
        return "Account{" +
                "id=" + id +
                ", uid=" + uid +
                ", money=" + money +
                ", usersTwo=" + usersTwo +
                '}';
    }
}
