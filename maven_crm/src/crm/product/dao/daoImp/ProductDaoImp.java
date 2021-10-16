package crm.product.dao.daoImp;

import crm.pojo.Product;
import crm.pojo.Supplier;
import crm.pojo.UserInfo;
import crm.product.dao.ProductDao;
import crm.utils.C3p0Utils;
import crm.vojo.Daily;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanListHandler;
import org.apache.commons.dbutils.handlers.ScalarHandler;
import org.junit.Test;

import java.sql.SQLException;
import java.util.List;

public class ProductDaoImp implements ProductDao {

    QueryRunner queryRunner = new QueryRunner(C3p0Utils.getDataSource());

    @Override
    public List<Product> viewProInfo() {
        String sql ="select * from product";
        try {
            return queryRunner.query(sql,new BeanListHandler<Product>(Product.class));
        } catch (SQLException e) {
            return null;
        }
    }

    @Override
    public List<Product> viewProLast() {
        String sql ="select * from product ORDER BY pid desc LIMIT 1";
        try {
            return queryRunner.query(sql,new BeanListHandler<Product>(Product.class));
        } catch (SQLException e) {
            return null;
        }
    }

    @Override
    public List<Product> viewProByPid(int pid) {
        String sql ="select * from product where pid = ?";
        try {
            return queryRunner.query(sql,new BeanListHandler<Product>(Product.class),pid);
        } catch (SQLException e) {
            return null;
        }
    }

    @Override
    public List<Product> viewProByPname(String pName) {
        String sql ="select * from product where pName like ?";
        try {
            return queryRunner.query(sql,new BeanListHandler<Product>(Product.class),pName);
        } catch (SQLException e) {
            return null;
        }
    }

    @Override
    public boolean addProduct(Product product) {
        String sql = "insert into product(pid,sname,pname,ptype,pprice,pnum,pDescription) values(null,?,?,?,?,?,?)";
        try {
            int update = queryRunner.update(sql, product.getsName(), product.getpName(), product.getpType(), product.getpPrice(), product.getpNum(), product.getpDescription());
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
    public boolean editProduct(Product product, int pid) {
        String sql= "update product set sname=?,pname=?,ptype=?,pprice=?,pnum=?,pDescription=? where pid=?";
        try {
            int update = queryRunner.update(sql, product.getsName(), product.getpName(), product.getpType(), product.getpPrice(), product.getpNum(), product.getpDescription(),pid);
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
    public boolean deleteProduct(int pid) {
        String sql = "delete from product where pid = ?";
        try {
            int update = queryRunner.update(sql, pid);
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
    public List<Supplier> viewSupplier() {
        String sql = "select * from  supplier";
        try {
            return queryRunner.query(sql,new BeanListHandler<Supplier>(Supplier.class));
        } catch (SQLException e) {
            return null;
        }
    }

    @Override
    public List<UserInfo> viewUserInfo() {
        String sql = "select * from  userinfo where roleId ='admin' or roleId='供销经理' or roleId='供销职员'";
        try {
            return queryRunner.query(sql,new BeanListHandler<UserInfo>(UserInfo.class));
        } catch (SQLException e) {
            return null;
        }
    }

    @Override
    public boolean addProNum(int pid ,int num) {
        String sql = "update product set pNum=pNum+? where pid=?";
        try {
            int update = queryRunner.update(sql, num, pid);
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
    public boolean reduceNum(int pid, int num) {
        String sql = "update product set pNum=pNum-? where pid=?";
        try {
            int update = queryRunner.update(sql, num, pid);
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
    public int viewPNumByid(int pid) {
        String sql = "select pNum from product where pid=?";
        try {
            return (int) queryRunner.query(sql,new ScalarHandler(),pid);
        } catch (SQLException e) {
            return 0;
        }
    }

    @Override
    public boolean addToDaily(Daily daily) {
        String sql = "insert into daily(did,tablenumber,operation,time)values(null,?,?,?)";
        try {
            int update = queryRunner.update(sql, daily.getTablenumber(), daily.getOperation(), daily.getTime());
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
        System.out.println(viewPNumByid(1001));
    }

}
