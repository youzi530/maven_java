package crm.supplier.dao.daoImp;

import crm.pojo.Supplier;
import crm.pojo.UserInfo;
import crm.supplier.dao.SupplierDao;
import crm.utils.C3p0Utils;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanListHandler;
import org.junit.Test;

import java.sql.SQLException;
import java.util.List;

public class SupplierDaoImp implements SupplierDao {
    QueryRunner queryRunner=new QueryRunner(C3p0Utils.getDataSource());
    @Override
    public List<Supplier> findall() {
        String sql="select * from supplier";
        try {
            List<Supplier>list=queryRunner.query(sql,new BeanListHandler<Supplier>(Supplier.class));
            if(list.isEmpty()){
                return null;}
            else{
                return list;
            }
        } catch (SQLException e) {
            return null;
        }
    }

    @Override
    public List<Supplier> findByName(String name) {
        String sql="select * from supplier where sName=?";
        List<Supplier>list = null;
        try {
            list = queryRunner.query(sql,name,new BeanListHandler<Supplier>(Supplier.class));
                return list;

//            return list;
        } catch (SQLException e) {
            return null;
        }

    }

    @Override
    public List<Supplier> findByMohu(String name) {
        String sql="select * from supplier where sName like ?";
        List<Supplier>list = null;
        try {
            list = queryRunner.query(sql,"%"+name+"%",new BeanListHandler<Supplier>(Supplier.class));
            return list;

//            return list;
        } catch (SQLException e) {
            return null;
        }
    }


    @Override
    public boolean modify(Supplier supplier){
        String sql="update supplier set sName=?,nature=?,mainProduct=?,phone=?,license=? where sid=?";
        try {
            queryRunner.update(sql,supplier.getsName(),supplier.getNature(),supplier.getMainProduct(),supplier.getPhone(),supplier.getLicense(),supplier.getSid());
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }

    }

    @Override
    public boolean delete(int id) {
        String sql="delete from supplier where sid=?";
        try {
            queryRunner.update(sql,id);
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean add(Supplier supplier) {
        String sql="insert into supplier values(null,?,?,?,?,?)";
        try {
            queryRunner.update(sql,supplier.getsName(),supplier.getNature(),supplier.getMainProduct(),supplier.getPhone(),supplier.getLicense());
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public List<Supplier> findById(int id) {
        String sql="select * from supplier where sid=?";
        List<Supplier>list = null;
        try {
            list = queryRunner.query(sql,id,new BeanListHandler<Supplier>(Supplier.class));
            return list;

//            return list;
        } catch (SQLException e) {
            return null;
        }
    }



    @Test
    public void ceshi(){
//        List<Supplier>list=findall();
//        System.out.println(list);
//        List<Supplier>list1=findByName("这张三");
//        System.out.println(list1);
//        Supplier supplier=new Supplier();
//        supplier.setsName("李四");
//        System.out.println(modify(supplier));
//        List<Supplier>list2=findall();
//        System.out.println(list2);
//        Supplier supplier=new Supplier();
//        supplier.setsName("凌桥");
//        System.out.println(add(supplier));
//        System.out.println(findall());
//        delete(2);
//        System.out.println(findall());
//        System.out.println(findById(50));


    }

}

