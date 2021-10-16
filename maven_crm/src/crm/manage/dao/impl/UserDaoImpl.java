package crm.manage.dao.impl;

import crm.manage.dao.UserDao;
import crm.pojo.AddressBook;
import crm.pojo.UserInfo;
import crm.utils.C3p0Utils;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanHandler;
import org.apache.commons.dbutils.handlers.BeanListHandler;
import org.apache.commons.dbutils.handlers.ScalarHandler;

import java.net.UnknownServiceException;
import java.sql.SQLException;
import java.util.List;

public class UserDaoImpl implements UserDao {

    private QueryRunner runner = C3p0Utils.queryRunner;

    @Override
    public UserInfo login(UserInfo userInfo) {
        String sql = "select * from userInfo where account=? and password=?";
        try {
           UserInfo db = runner.query(sql,new BeanHandler<UserInfo>(UserInfo.class),userInfo.getAccount(),userInfo.getPassword());
           if (db != null){
               return db;
           }else {
               return null;
           }
        } catch (SQLException e) {
            return null;
        }
    }

    @Override
    public boolean reloadPassword(UserInfo userInfo) {
        String account = userInfo.getAccount();
        String email = userInfo.getEmail();
        UserInfo db = findOne(account);
        if (db == null){
            return false;
        }else {
            if (db.getEmail().equals(email)){
                String password = db.getIdentity();
                password = password.substring(12);
                try {
                    runner.update("update userInfo set password=? where account=?",password,account);
                } catch (SQLException e) {
                    return false;
                }
                return true;
            }else {
                return false;
            }
        }
    }

    @Override
    public UserInfo findOne(String account) {
        String sql = "select * from userInfo where account=?";
        try {
            UserInfo db = runner.query(sql,new BeanHandler<UserInfo>(UserInfo.class),account);
            if (db != null){
                return db;
            }else {
                return null;
            }
        } catch (SQLException e) {
            return null;
        }
    }

    @Override
    public boolean addUser(UserInfo userInfo) {
        String sql = "insert into userInfo(account,password,realName,sex,mobile,email,birthday,identity,entryTime,roleId,status," +
                "createTime) values(?,?,?,?,?,?,?,?,?,?,?,?)";
        try {
            int res = runner.update(sql,userInfo.getAccount(),userInfo.getPassword(),userInfo.getRealName(),userInfo.getSex(),userInfo.getMobile(),
                    userInfo.getEmail(),userInfo.getBirthday(),userInfo.getIdentity(),userInfo.getEntryTime(),userInfo.getRoleId(),userInfo.getStatus(),userInfo.getCreateTime());
            if (res != 0){
                return true;
            }else {
                return false;
            }
        } catch (SQLException e) {
            return false;
        }
    }

    @Override
    public String username(int userId) {
        String sql = "select realName from userInfo where userId=?";
        try {
            String name = (String) runner.query(sql,new ScalarHandler(),userId);
            if (name != null){
                return name;
            }else{
                return null;
            }
        } catch (SQLException e) {
            return null;
        }
    }

    @Override
    public List<UserInfo> getShareUsers(int userId) {
        String sql = "select * from userInfo where (roleId=? or roleId=? or roleId=?) and userId!=?";
        try {
            List<UserInfo> list = runner.query(sql,new BeanListHandler<UserInfo>(UserInfo.class),"客户职员","客户经理","admin",userId);
            if (list != null){
                return list;
            }else {
                return null;
            }
        } catch (SQLException e) {
            return null;
        }
    }

    @Override
    public boolean updateSetting(UserInfo userInfo) {
        String sql = "update userInfo set mobile=?,email=? where userId=?";
        try {
            int res = runner.update(sql,userInfo.getMobile(),userInfo.getEmail(),userInfo.getUserId());
            if (res != 0){
                return true;
            }else {
                return false;
            }
        } catch (SQLException e) {
            return false;
        }
    }

    @Override
    public int getLatestId() {
        String sql = "select userId from userInfo order by userId desc limit 1";
        try {
            int res = (int) runner.query(sql,new ScalarHandler());
            if (res > 0){
                return res;
            }else {
                return -1;
            }
        } catch (SQLException e) {
            return -1;
        }
    }

    @Override
    public List<UserInfo> query(String linkman) {
        String sql = "select * from userInfo where roleId=?";
        try {
            List<UserInfo> list = runner.query(sql,new BeanListHandler<UserInfo>(UserInfo.class),linkman);
            if (list != null){
                return list;
            }else {
                return null;
            }
        } catch (SQLException e) {
            return null;
        }
    }

    @Override
    public List<UserInfo> queryAll() {
        String sql = "select * from userInfo";
        try {
            List<UserInfo> list = runner.query(sql,new BeanListHandler<UserInfo>(UserInfo.class));
            if (list != null){
                return list;
            }else {
                return null;
            }
        } catch (SQLException e) {
            return null;
        }
    }

    @Override
    public boolean delete(int userId) {
        String sql = "delete from userInfo where userId=?";
        try {
            int res = runner.update(sql,userId);
            if (res != 0){
                return true;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    @Override
    public UserInfo getOne(int userId) {
        String sql = "select * from userInfo where userId=?";
        try {
            UserInfo userInfo = runner.query(sql,new BeanHandler<UserInfo>(UserInfo.class),userId);
            if (userInfo != null){
                return userInfo;
            }else {
                return null;
            }
        } catch (SQLException e) {
            return null;
        }
    }

    @Override
    public boolean update(UserInfo userInfo) {
        String sql = "update userInfo set account=?,password=?,realName=?,sex=?," +
                "mobile=?,email=?,birthday=?,identity=?,entryTime=?,status=?,roleId=? where userId=?";
        try {
            int res = runner.update(sql,userInfo.getAccount(),userInfo.getPassword(),userInfo.getRealName(),
                    userInfo.getSex(),userInfo.getMobile(),userInfo.getEmail(),userInfo.getBirthday(),
                    userInfo.getIdentity(),userInfo.getEntryTime(),userInfo.getStatus(),userInfo.getRoleId(),userInfo.getUserId());
            if (res != 0){
                return true;
            }else {
                return false;
            }
        } catch (SQLException e) {
            return false;
        }
    }

    @Override
    public List<UserInfo> likeCliUser(String name) {
        String sql = "select * from userInfo where realName like '%"+name+"%' and roleId=?";
        try {
            List<UserInfo> list = runner.query(sql,new BeanListHandler<UserInfo>(UserInfo.class),"客户职员");
            if (list != null){
                return list;
            }else {
                return null;
            }
        } catch (SQLException e) {
            return null;
        }
    }

    @Override
    public List<UserInfo> getWorkers() {
        String sql = "select * from userInfo where roleId=? or roleId=?";
        try {
            List<UserInfo> list = runner.query(sql,new BeanListHandler<UserInfo>(UserInfo.class),"客户职员","供销职员");
            if (list != null){
                return list;
            }else {
                return null;
            }
        } catch (SQLException e) {
            return null;
        }
    }

    @Override
    public List<AddressBook> getAddressBook() {
        String sql = "select userId,realName,mobile,email from userInfo";
        try {
            List<AddressBook> list = runner.query(sql,new BeanListHandler<AddressBook>(AddressBook.class));
            if (list != null){
                return list;
            }else {
                return null;
            }
        } catch (SQLException e) {
            return null;
        }
    }

    @Override
    public List<AddressBook> getLikeAddressBook(String like) {
        String sql = "select userId,realName,mobile,email from userInfo where realName like '%" + like + "%'";
        try {
            List<AddressBook> list = runner.query(sql,new BeanListHandler<AddressBook>(AddressBook.class));
            if (list != null){
                return list;
            }else {
                return null;
            }
        } catch (SQLException e) {
            return null;
        }
    }

    @Override
    public List<UserInfo> getLikeUser(UserInfo userInfo) {
        String sql = "select * from userInfo where ";
        boolean firstNull = false;
        boolean secondNull = false;
        String condition = "";
        if (userInfo.getRealName().length() != 0){
            condition += "realName like '%"+ userInfo.getRealName() + "%' ";
        }else {
            firstNull = true;
        }

        if (userInfo.getRoleId().length() != 0){
            if (firstNull){
                condition += "roleId='" + userInfo.getRoleId() + "' ";
            }else {
                condition += "and roleId='" + userInfo.getRoleId() + "' ";
            }
        }else {
            secondNull = true;
        }

        sql += condition;

        try {
            List<UserInfo> list = runner.query(sql,new BeanListHandler<UserInfo>(UserInfo.class));
            if (list != null){
                return list;
            }else {
                return null;
            }
        } catch (SQLException e) {
            return null;
        }
    }

    @Override
    public boolean updateAuth(UserInfo userInfo) {
        String sql = "update userInfo set roleId=? where userId=?";
        try {
            int res = runner.update(sql,userInfo.getRoleId(),userInfo.getUserId());
            if (res != 0){
                return true;
            }else {
                return false;
            }
        } catch (SQLException e) {
            return false;
        }
    }

}
