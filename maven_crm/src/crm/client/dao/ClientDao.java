package crm.client.dao;

import crm.pojo.ClientInfo;

import java.util.List;

public interface ClientDao {

    /**
     * 添加用户
     * @param clientInfo 用户信息
     * @param createTime 创建时间，动态生成
     * @return
     */
    boolean add(ClientInfo clientInfo,String createTime);

    /**
     * 老板查询所有客户
     * @return
     */
    List<ClientInfo> query();

    /**
     * 查询职员所对应的用户
     * @param userId 工号
     * @return
     */
    List<ClientInfo> query(int userId);

    /**
     * 获取某一个员工最近添加客户的id用于展示
     * @param userId 工号
     * @return
     */
    int getLatestId(int userId);

    /**
     *只有管理员在页面上可以删除
     * @param clientId 客户id
     * @return
     */
    boolean deleteUserClient(int clientId,int userId);

    /**
     * 查询一位用户的信息
     * @param clientId 用户id
     * @return
     */
    ClientInfo getClient(int clientId);

    /**
     * 更新用户信息
     * @param clientInfo 获取的更新信息
     * @return
     */
    boolean update(ClientInfo clientInfo);

    /**
     *
     * 将客户共享给另一个同事
     * @param userId 工号
     * @param clientId 客户id
     * @param flag 如果当前用户是老板或者经理则无需审批
     * @param selfId 用户的工号
     * @return
     */
    boolean share(int userId,int clientId,boolean flag,int selfId);

    /**
     * 分享添加
     * @param clientInfo 客户信息
     * @param userId 同事工号
     * @param receiveState 分享状态
     * @param selfId 用户的工号
     * @return
     */
    boolean shareAdd(ClientInfo clientInfo,int userId,int receiveState,int selfId);

    /**
     * 查询客户信息,老板或经理和普通职员不同
     * @param clientInfo 客户查询条件
     * @param flag 是否是经理或者老板
     * @return
     */
    List<ClientInfo> find(ClientInfo clientInfo,boolean flag);

    List<ClientInfo> vertifyByBoss();

    List<ClientInfo> vertifyByStaff(int userId);

}
