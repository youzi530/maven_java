package crm.manage.servive;

import crm.manage.dao.UserDao;
import crm.manage.dao.impl.UserDaoImpl;
import crm.pojo.AddressBook;
import crm.pojo.UserInfo;

import java.util.List;

public class UserService {

    private UserDao dao = new UserDaoImpl();

    public UserInfo login(UserInfo userInfo){
        return dao.login(userInfo);
    }

    public boolean reloadPassword(UserInfo userInfo){
        return dao.reloadPassword(userInfo);
    }

    public UserInfo findOne(String account){
        return dao.findOne(account);
    }

    public boolean addUser(UserInfo userInfo){
        return dao.addUser(userInfo);
    }

    public String username(int userId){
        return dao.username(userId);
    }

    public List<UserInfo> getShareUsers(int userId){
        return dao.getShareUsers(userId);
    }

    public boolean updateSetting(UserInfo userInfo){
        return dao.updateSetting(userInfo);
    }

    public int getLatestId(){
        return dao.getLatestId();
    }

    public List<UserInfo> query(String linkman){
        return dao.query(linkman);
    }

    public List<UserInfo> queryAll(){
        return dao.queryAll();
    }

    public boolean delete(int userId){
        return dao.delete(userId);
    }

    public UserInfo getOne(int userId){
        return dao.getOne(userId);
    }

    public boolean update(UserInfo userInfo){
        return dao.update(userInfo);
    }

    public List<UserInfo> likeCliUser(String name){
        return dao.likeCliUser(name);
    }

    public List<UserInfo> getWorkers(){
        return dao.getWorkers();
    }

    public List<AddressBook> getAddressBook(){
        return dao.getAddressBook();
    }

    public List<AddressBook> getLikeAddressBook(String like){
        return dao.getLikeAddressBook(like);
    }

    public List<UserInfo> getLikeUser(UserInfo userInfo){
        return dao.getLikeUser(userInfo);
    }

    public boolean updateAuth(UserInfo userInfo){
        return dao.updateAuth(userInfo);
    }

}
