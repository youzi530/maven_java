package crm.manage.dao;

import crm.pojo.WorkManage;

import java.util.List;

public interface WorkManageDao {

    /**
     * 添加职员工作
     * @param workManage
     * @return
     */
    boolean addWork(WorkManage workManage);

    /**
     * 获取刚刚添加的一条记录id
     * @return
     */
    int getLatestWid();

    /**
     * 不同的身份获取的工作信息
     * @param roleId
     * @return
     */
    List<WorkManage> query(String roleId,int workerId);

    /**
     * 模糊查询
     * @param like
     * @return
     */
    List<WorkManage> likeQuery(String like);

    WorkManage getOne(int wid);

    /**
     * 删除一条工作信息
     * @param wid
     * @return
     */
    boolean delete(int wid);

    /**
     * 上级更新工作信息
     * @param workManage
     * @return
     */
    boolean bossUpd(WorkManage workManage);

    /**
     * 员工更新工作信息
     * @param workManage
     * @return
     */
    boolean staffUpd(WorkManage workManage);


}
