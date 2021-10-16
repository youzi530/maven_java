package crm.product.dao.daoImp;

import crm.product.dao.SaleDao;
import crm.utils.C3p0Utils;
import crm.vojo.Sale;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanListHandler;
import org.apache.commons.dbutils.handlers.ScalarHandler;
import org.junit.Test;

import java.sql.SQLException;
import java.util.List;

public class SaleDaoImp implements SaleDao {

    QueryRunner queryRunner = new QueryRunner(C3p0Utils.getDataSource());

    @Override
    public List<Sale> viewSaleInfo() {
        String sql="select * from  sale";
        try {
            return queryRunner.query(sql,new BeanListHandler<Sale>(Sale.class));
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public List<Sale> viewSalesLast() {
        String sql ="select * from sale ORDER BY cid desc LIMIT 1";
        try {
            return queryRunner.query(sql,new BeanListHandler<Sale>(Sale.class));
        } catch (SQLException e) {
            return null;
        }
    }

    @Override
    public int viewIdBypName(String pName) {
        String sql = "select pid from product where pName = ?";
        try {
            return (int) queryRunner.query(sql,new ScalarHandler(),pName);
        } catch (SQLException e) {
            return 0;
        }

    }

    @Override
    public List<Sale> viewSalesByPname(String pName) {
        String sql ="select * from sale where pName like ?";
        try {
            return queryRunner.query(sql,new BeanListHandler<Sale>(Sale.class),pName);
        } catch (SQLException e) {
            return null;
        }
    }

    @Override
    public List<Sale> viewSaleByCid(int cid) {
        String sql ="select * from sale where cid = ?";
        try {
            return queryRunner.query(sql,new BeanListHandler<Sale>(Sale.class),cid);
        } catch (SQLException e) {
            return null;
        }
    }

    @Override
    public List<Sale> viewSaleByUsername(String username) {
        String sql = "select * from sale where username = ?";
        try {
            return queryRunner.query(sql,new BeanListHandler<Sale>(Sale.class),username);
        } catch (SQLException e) {
            return null;
        }
    }


    @Override
    public boolean addSale(Sale sale) {
        String sql = "insert into sale(cid,pid,pName,salePrice,saleNum,username,sate) values (null,?,?,?,?,?,?)";
        try {
            int update = queryRunner.update(sql,sale.getPid(),sale.getpName(), sale.getSalePrice(), sale.getSaleNum(), sale.getUsername(),sale.getSate());
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
    public boolean editSaleByTwo(Sale sale, int cid, int pid) {
        String sql= "update sale set pName=?,salePrice=?,saleNum=?,username=?,sate=? where cid=? and pid =?";
        try {
            int update = queryRunner.update(sql,sale.getpName(),sale.getSalePrice(),sale.getSaleNum(),sale.getUsername(),sale.getSate(),cid,pid);
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
    public boolean editSaleByCid(Sale sale, int cid) {
        String sql= "update sale set pid=?,pName=?,salePrice=?,saleNum=?,username=?,sate=? where cid=? ";
        try {
            int update = queryRunner.update(sql,sale.getPid(),sale.getpName(),sale.getSalePrice(),sale.getSaleNum(),sale.getUsername(),sale.getSate(),cid);
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
    public boolean deleteSale(int cid, int pid) {
        String sql = "delete from sale where cid = ? and pid=?";
        try {
            int update = queryRunner.update(sql, cid,pid);
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
    public boolean deleteSaleBycid(int cid) {
        String sql = "delete from sale where cid = ? ";
        try {
            int update = queryRunner.update(sql, cid);
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
    public List<Sale> viewSaleByPnameUser(String pName, String username) {
        String sql = "select * from sale where pName = ? and username=?";
        try {
            return queryRunner.query(sql,new BeanListHandler<Sale>(Sale.class),pName,username);
        } catch (SQLException e) {
            return null;
        }
    }

    @Override
    public List<Sale> viewSaleByPnameusername(String pName, String username) {
        String sql = "select * from sale where pName like ? and username=?";
        try {
            return queryRunner.query(sql,new BeanListHandler<Sale>(Sale.class),pName,username);
        } catch (SQLException e) {
            return null;
        }
    }

    @Override
    public boolean editStateByCid(String sate ,int cid) {
        String sql ="update sale set sate=? where cid=?";
        try {
            int update = queryRunner.update(sql, sate, cid);
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
        System.out.println(viewSaleInfo());
    }

}
