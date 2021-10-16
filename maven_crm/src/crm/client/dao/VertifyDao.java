package crm.client.dao;

import crm.pojo.ClientInfo;

public interface VertifyDao {

    /**
     * 待审核的客户
     * @param clientInfo
     * @return
     */
    boolean shareVertify(ClientInfo clientInfo);

    /**
     * 删除一个审批
     * @param clientId 客户id
     * @param userId 用户id
     * @return
     */
    boolean delete(int clientId,int userId);

}
