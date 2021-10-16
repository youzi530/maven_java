package crm.client.dao;

import crm.vojo.ContactRecord;

import java.util.List;

public interface ContactRecordDao {

    /**
     * 添加一条联系记录
     * @param contactRecord
     * @return
     */
    boolean add(ContactRecord contactRecord);

    /**
     * 取刚刚添加的记录的id
     * @return
     */
    int getLatestId();

    /**
     * 员工与自己客户的联系记录
     * @param userId 工号
     * @return
     */
    List<ContactRecord> staff(int userId);

    /**
     * 老板或者经理获取到所有的联系记录
     * @return
     */
    List<ContactRecord> leader();

    /**
     * 删除一条联系记录
     * @param id 记录的id
     * @return
     */
    boolean deleteOne(int id);

    /**
     * 更新一条联系记录
     * @param contactRecord
     * @return
     */
    boolean update(ContactRecord contactRecord);

    List<ContactRecord> findByBoss(String beginTime,String endTime);

    List<ContactRecord> findByStaff(int userId,String beginTime,String endTime);

}
