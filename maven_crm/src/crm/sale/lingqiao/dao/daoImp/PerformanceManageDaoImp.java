package crm.sale.lingqiao.dao.daoImp;

import crm.sale.lingqiao.dao.PerformanceManageDao;
import crm.utils.C3p0Utils;
import crm.vojo.PerforManagement;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanListHandler;
import org.apache.commons.dbutils.handlers.ScalarHandler;
import org.junit.Test;

import java.sql.SQLException;
import java.util.List;

public class PerformanceManageDaoImp implements PerformanceManageDao {

    QueryRunner queryRunner = new QueryRunner(C3p0Utils.getDataSource());

    @Override
    public List<PerforManagement> viewPerforManage() {
        String sql = "select * from performanagement";
        try {
            return queryRunner.query(sql,new BeanListHandler<PerforManagement>(PerforManagement.class));
        } catch (SQLException e) {
            return null;
        }
    }

    @Override
    public List<PerforManagement> viewPerforManageByUsername(String username) {
        String sql ="select * from performanagement where username = ?";
        try {
            return queryRunner.query(sql,new BeanListHandler<PerforManagement>(PerforManagement.class),username);
        } catch (SQLException e) {
            return null;
        }
    }

    @Override
    public boolean deletePerformance(int perid) {
        String sql = "delete from performanagement where perid = ? ";
        try {
            int update = queryRunner.update(sql, perid);
            if(update!=0){
                return true;
            }else{
                return false;
            }
        } catch (SQLException e) {
            return false;
        }
    }

    @Override
    public boolean addPerformance(PerforManagement perforManagement) {
        String sql = "insert into performanagement(perid,username,saleOrderNum,contractNum,contractMoney) values(null,?,?,?,?)";
        try {
            int update = queryRunner.update(sql,perforManagement.getUsername(),perforManagement.getSaleOrderNum(),perforManagement.getContractNum(),perforManagement.getContractMoney());
            if(update!=0){
                return true;
            }else{
                return false;
            }
        } catch (SQLException e) {
            return false;
        }
    }

    @Override
    public List<PerforManagement> viewPerfomanceLast() {
        String sql ="select * from performanagement ORDER BY perid desc LIMIT 1";
        try {
            return queryRunner.query(sql,new BeanListHandler<PerforManagement>(PerforManagement.class));
        } catch (SQLException e) {
            return null;
        }
    }

    @Override
    public List<PerforManagement> viewPerfomanceById(int perid) {
        String sql = "select * from performanagement where perid = ?";
        try {
            return queryRunner.query(sql,new BeanListHandler<PerforManagement>(PerforManagement.class),perid);
        } catch (SQLException e) {
            return null;
        }
    }

    @Override
    public boolean editPerfomanceByid(PerforManagement perforManagement, int perid) {
        String sql= "update performanagement set username=?,saleOrderNum=?,contractNum=?,contractMoney=? where perid=?";
        try {
            int update = queryRunner.update(sql,perforManagement.getUsername(),perforManagement.getSaleOrderNum(),perforManagement.getContractNum(),perforManagement.getContractMoney(),perid);
            if(update!=0){
                return true;
            }else{
                return false;
            }
        } catch (SQLException e) {
            return false;
        }
    }

    @Override
    public boolean isEistMss(String username) {
        String sql ="select count(*) from performanagement where username = ?";
        try {
            long long1 = (long) queryRunner.query(sql,new ScalarHandler(),username);
            if(long1>0){
                return true;
            }else{
                return false;
            }
        } catch (SQLException e) {
            return false;
        }
    }

    @Override
    public boolean editPerfanceByUsername(PerforManagement perforManagement,String username) {
        String sql ="update performanagement set saleOrderNum=saleOrderNum+?,contractNum=contractNum+?,contractMoney=contractMoney+? where username = ?";
        try {
            int update = queryRunner.update(sql, perforManagement.getSaleOrderNum(), perforManagement.getContractNum(), perforManagement.getContractMoney(), username);
            if(update!=0){
                return true;
            }else{
                return false;
            }
        } catch (SQLException e) {
            return false;
        }
    }

    @Override
    public List<PerforManagement> viewPerforMaByUsername(String username) {
        String sql ="select * from performanagement where username like ?";
        try {
            return queryRunner.query(sql,new BeanListHandler<PerforManagement>(PerforManagement.class),username);
        } catch (SQLException e) {
            return null;
        }
    }

    @Test
    public void test(){
        System.out.println(isEistMss("张一（工号：8）"));
    }
}
