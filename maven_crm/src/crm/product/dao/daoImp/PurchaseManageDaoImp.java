package crm.product.dao.daoImp;

import crm.product.dao.PurchaseManageDao;
import crm.utils.C3p0Utils;
import crm.vojo.ProductManage;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanHandler;
import org.apache.commons.dbutils.handlers.BeanListHandler;
import org.apache.commons.dbutils.handlers.ScalarHandler;
import org.junit.Test;
import java.sql.SQLException;
import java.util.List;

public class PurchaseManageDaoImp implements PurchaseManageDao {

    QueryRunner queryRunner = new QueryRunner(C3p0Utils.getDataSource());

    @Override
    public List<ProductManage> viewPurInfo() {
        String sql = "select * from productmanage";
        try {
            List<ProductManage> list = queryRunner.query(sql,new BeanListHandler<ProductManage>(ProductManage.class));
            return  list;
        } catch (SQLException e) {
             e.printStackTrace();
             return null;
        }
    }

    @Override
    public List<ProductManage> viewPurchaseLast() {
        String sql ="select * from productManage ORDER BY id desc LIMIT 1";
        try {
            return queryRunner.query(sql,new BeanListHandler<ProductManage>(ProductManage.class));
        } catch (SQLException e) {
            return null;
        }
    }

    @Override
    public List<ProductManage> viewPurByPnameUser(String pName,String username) {
        String sql ="select * from ProductManage where pName like ? and username = ?";
        try {
            return queryRunner.query(sql,new BeanListHandler<ProductManage>(ProductManage.class),pName,username);
        } catch (SQLException e) {
            return null;
        }
    }

    @Override
    public List<ProductManage> viewPurByPname(String pName) {
        String sql ="select * from ProductManage where pName like ? ";
        try {
            return queryRunner.query(sql,new BeanListHandler<ProductManage>(ProductManage.class),pName);
        } catch (SQLException e) {
            return null;
        }
    }

    @Override
    public List<ProductManage> viewPurByPid(int id) {
        String sql ="select * from productManage where id = ?";
        try {
            return queryRunner.query(sql,new BeanListHandler<ProductManage>(ProductManage.class),id);
        } catch (SQLException e) {
            return null;
        }
    }


    @Override
    public boolean addPurManage(ProductManage productManage) {
        String sql = "insert into productManage(pName,username,inNum,outNum) values(?,?,?,?)";
        try {
            int update = queryRunner.update(sql, productManage.getpName(), productManage.getUsername(), productManage.getInNum(), productManage.getOutNum());
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
    public boolean editPurManage(ProductManage productManage, int id) {
        String sql= "update productManage set pName=?,username=?,inNum=?,outNum=? where id=?";
        try {
            int update = queryRunner.update(sql, productManage.getpName(), productManage.getUsername(), productManage.getInNum(), productManage.getOutNum(),id);
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
    public List<ProductManage> viewProByusername(String username) {
        String sql = "select * from productManage where username = ?";
        try {
            return queryRunner.query(sql,new BeanListHandler<ProductManage>(ProductManage.class),username);
        } catch (SQLException e) {
            return null;
        }
    }

    @Override
    public boolean deletePurManage(int id) {
        String sql = "delete from productManage where id = ?";
        try {
            int update = queryRunner.update(sql, id);
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
    public boolean viewIsEistPro(String pid) {
        String sql ="select count(*) from product where pid=?";
        try {

            long res = (long) queryRunner.query(sql, new ScalarHandler(), pid);
            if (res > 0){
                return true;
            }else {
                return false;
            }
        } catch (SQLException e) {
            return false;
        }
    }

    @Test
    public void test(){
        System.out.println(viewIsEistPro("1001"));
    }

}
