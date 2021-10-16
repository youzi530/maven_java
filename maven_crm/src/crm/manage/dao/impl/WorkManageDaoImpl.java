package crm.manage.dao.impl;

import crm.manage.dao.WorkManageDao;
import crm.pojo.WorkManage;
import crm.utils.C3p0Utils;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanHandler;
import org.apache.commons.dbutils.handlers.BeanListHandler;
import org.apache.commons.dbutils.handlers.ScalarHandler;

import java.sql.SQLException;
import java.util.List;

public class WorkManageDaoImpl implements WorkManageDao {

    private QueryRunner runner = C3p0Utils.queryRunner;

    @Override
    public boolean addWork(WorkManage workManage) {
        String sql = "insert into workManage(content,progress,workerId,workerName,leaderId,leaderName) values(?,?,?,?,?,?)";
        try {
            int res = runner.update(sql,workManage.getContent(),workManage.getProgress(),workManage.getWorkerId(),
                    workManage.getWorkerName(),workManage.getLeaderId(),workManage.getLeaderName());
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
    public int getLatestWid() {
        String sql = "select wid from workManage order by wid desc limit 1";
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
    public List<WorkManage> query(String roleId,int workerId) {
        String sql = "";
        if (roleId.equals("admin")){
            sql = "select * from workManage";
        }else if (roleId.equals("客户经理")){
            sql = "SELECT * from workmanage where workerId in (SELECT userId from userinfo WHERE roleId='客户职员')";
        }else if (roleId.equals("供销经理")){
            sql = "SELECT * from workmanage where workerId in (SELECT userId from userinfo WHERE roleId='供销职员')";
        }else {
            sql = "SELECT * from workmanage where workerId="+workerId;
        }
        try {
            List<WorkManage> list = runner.query(sql,new BeanListHandler<WorkManage>(WorkManage.class));
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
    public List<WorkManage> likeQuery(String like) {
        String sql = "select * from workManage where content like '%" + like + "%'";
        try {
            List<WorkManage> list = runner.query(sql,new BeanListHandler<WorkManage>(WorkManage.class));
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
    public WorkManage getOne(int wid) {
        String sql = "select * from workManage where wid=?";
        try {
            WorkManage workManage = runner.query(sql,new BeanHandler<WorkManage>(WorkManage.class),wid);
            if (workManage != null){
                return workManage;
            }else {
                return null;
            }
        } catch (SQLException e) {
            return null;
        }
    }

    @Override
    public boolean delete(int wid) {
        String sql = "delete from workManage where wid=?";
        try {
            int res = runner.update(sql,wid);
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
    public boolean bossUpd(WorkManage workManage) {
        String sql = "update workManage set content=?,workerId=?,workerName=? where wid=?";
        try {
            int res = runner.update(sql,workManage.getContent(),workManage.getWorkerId(),workManage.getWorkerName(),workManage.getWid());
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
    public boolean staffUpd(WorkManage workManage) {
        String sql = "update workManage set progress=? where wid=?";
        try {
            int res = runner.update(sql,workManage.getProgress(),workManage.getWid());
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
