package crm.manage.dao;

import crm.pojo.AddressBook;
import crm.pojo.UserInfo;

import java.util.List;

/**
 * 用户数据库操作
 */
public interface UserDao {

    UserInfo login(UserInfo userInfo); //登录 参数：账号，密码

    boolean reloadPassword(UserInfo userInfo); //重置密码 参数：账号，用户邮箱

    UserInfo findOne(String account); //查找一个用户 参数:账号

    /**
     * 添加用户
     * @param userInfo
     * @return
     */
    boolean addUser(UserInfo userInfo);

    /**
     * 获职员姓名,已用于客户部
     * @param userId 工号
     * @return
     */
    String username(int userId);

    /**
     * 分享用户，选中客户部及老板,不能包含自己
     * @return
     */
    List<UserInfo> getShareUsers(int userId);

    /**
     * 更新用户的移动电话和电子邮箱
     * @param userInfo 更新后的用户信息
     * @return
     */
    boolean updateSetting(UserInfo userInfo);

    /**
     * 获取刚刚添加客户职员的id
     * @return
     */
    int getLatestId();

    /**
     * 查询客户部门的员工
     * @param linkman ”客户职员“
     * @return
     */
    List<UserInfo> query(String linkman);

    /**
     * 查询所有职员
     * @return
     */
    List<UserInfo> queryAll();

    /**
     * 删除用户
     * @param userId Id
     * @return
     */
    boolean delete(int userId);

    /**
     * 获取一个用户
     * @param userId  用户id
     * @return
     */
    UserInfo getOne(int userId);

    /**
     * 更新用户信息
     * @param userInfo 更新后的信息
     * @return
     */
    boolean update(UserInfo userInfo);

    /**
     * 模糊查询客户部职员
     * @param name
     * @return
     */
    List<UserInfo> likeCliUser(String name);

    /**
     *
     * @return
     */
    List<UserInfo> getWorkers();

    /**
     * 查询公司的通讯录
     * @return
     */
    List<AddressBook> getAddressBook();

    /**
     * 模糊查询公司的通讯录
     * @return
     */
    List<AddressBook> getLikeAddressBook(String like);

    /**
     * 模糊查询用户
     * @param userInfo
     * @return
     */
    List<UserInfo> getLikeUser(UserInfo userInfo);

    boolean updateAuth(UserInfo userInfo);

}
