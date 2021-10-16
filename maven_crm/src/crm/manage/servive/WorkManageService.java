package crm.manage.servive;

import crm.manage.dao.WorkManageDao;
import crm.manage.dao.impl.WorkManageDaoImpl;
import crm.pojo.WorkManage;

import java.util.List;

public class WorkManageService {

    private WorkManageDao dao = new WorkManageDaoImpl();

    public boolean addWork(WorkManage workManage){
        return dao.addWork(workManage);
    }

    public int getLatestWid(){
        return dao.getLatestWid();
    }

    public List<WorkManage> query(String roleId, int workerId){
        return dao.query(roleId,workerId);
    }

    public List<WorkManage> likeQuery(String like){
        return dao.likeQuery(like);
    }

    public WorkManage getOne(int wid){
        return dao.getOne(wid);
    }

    public boolean delete(int wid){
        return dao.delete(wid);
    }

    public boolean bossUpd(WorkManage workManage){
        return dao.bossUpd(workManage);
    }

    public boolean staffUpd(WorkManage workManage){
        return dao.staffUpd(workManage);
    }

}
