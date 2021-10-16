package crm.sale.lingqiao.dao.daoImp;

import crm.sale.lingqiao.dao.ExpenseManageDao;
import crm.utils.C3p0Utils;
import crm.vojo.CostManage;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanListHandler;
import org.junit.Test;

import java.sql.SQLException;
import java.util.List;

import static crm.utils.C3p0Utils.queryRunner;


public class ExpenseManageDaoImp implements ExpenseManageDao {

    QueryRunner queryRunner = new QueryRunner(C3p0Utils.getDataSource());

    @Override
    public List<CostManage> viewExpenseManage() {
        String sql ="select * from costManage";
        try {
            return queryRunner.query(sql,new BeanListHandler<CostManage>(CostManage.class));
        } catch (SQLException e) {
            return null;
        }
    }

    @Override
    public boolean addExpenseManage(CostManage costManage) {
        String sql = "insert into costManage(costId,username,income,outcome,detail,state,pursaleid) values(null,?,?,?,?,?,?)";
        try {
            int update = queryRunner.update(sql,costManage.getUsername(),costManage.getIncome(),costManage.getOutcome(),costManage.getDetail(),costManage.getState(),costManage.getPursaleid());
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
    public List<CostManage> viewExpenseManageLast() {
        String sql ="select * from costManage ORDER BY costId desc LIMIT 1";
        try {
            return queryRunner.query(sql,new BeanListHandler<CostManage>(CostManage.class));
        } catch (SQLException e) {
            return null;
        }
    }

    @Override
    public boolean deleteExpMaByCostid(int costId) {
        String sql = "delete from costManage where costId = ? ";
        try {
            int update = queryRunner.update(sql, costId);
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
    public List<CostManage> viewExpMaByUsername(String username) {
        String sql ="select * from costManage where username like ?";
        try {
            return queryRunner.query(sql,new BeanListHandler<CostManage>(CostManage.class),username);
        } catch (SQLException e) {
            return null;
        }
    }

    @Override
    public List<CostManage> viewExpMaByCostid(int costId) {
        String sql ="select * from costManage where costId = ?";
        try {
            return queryRunner.query(sql,new BeanListHandler<CostManage>(CostManage.class),costId);
        } catch (SQLException e) {
            return null;
        }
    }

    @Override
    public boolean editExpMa(CostManage costManage, int costId) {
        String sql= "update costManage set username=?,income=?,outcome=?,detail=?,state=? where costId=?";
        try {
            int update = queryRunner.update(sql,costManage.getUsername(),costManage.getIncome(),costManage.getOutcome(),costManage.getDetail(),costManage.getState(),costId);
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
    public List<CostManage> viewCostmanageByUsername(String username) {
        String sql ="select * from costManage where username = ?";
        try {
            return queryRunner.query(sql,new BeanListHandler<CostManage>(CostManage.class),username);
        } catch (SQLException e) {
            return null;
        }
    }

    @Override
    public List<CostManage> viewCostmanageByDetail(String detail) {
        String sql ="select * from costManage where detail like ?";
        try {
            return queryRunner.query(sql,new BeanListHandler<CostManage>(CostManage.class),detail);
        } catch (SQLException e) {
            return null;
        }
    }

    @Override
    public List<CostManage> viewCostmanageByDetailUser(String detail, String username) {
        String sql ="select * from costManage where detail like ? and username= ?";
        try {
            return queryRunner.query(sql,new BeanListHandler<CostManage>(CostManage.class),detail,username);
        } catch (SQLException e) {
            return null;
        }
    }

    @Override
    public boolean editOutcomeByUsername(String username, double outcome) {
        String sql = "update costManage set outcome=outcome+? where username =?";
        try {
            int update = queryRunner.update(sql, outcome, username);
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
    public boolean editOutcomeDetail(String username, int pursaleid, double outcome, String detail) {
        String sql ="update costManage set outcome=?,detail=? where username=? and pursaleid =?";
        try {
            int update = queryRunner.update(sql, outcome, detail, username, pursaleid);
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
    public boolean addToExpenseManage(CostManage costManage) {
        String sql = "insert into costManage(costId,username,income,outcome,detail,state,pursaleid) values(null,?,?,?,?,?,?)";
        try {
            int update = queryRunner.update(sql,costManage.getUsername(),costManage.getIncome(),costManage.getOutcome(),costManage.getDetail(),costManage.getState(),costManage.getPursaleid());
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
    public boolean deleteCostmanageByid(int pursaleid) {
        String sql = "delete from costManage where pursaleid=?";
        try {
            int update = queryRunner.update(sql, pursaleid);
            if(update!=0){
                return true;
            }else{
                return false;
            }
        } catch (SQLException e) {
            return false;
        }
    }
    @Test
    public void test(){
        System.out.println(deleteCostmanageByid(24));
    }
}
