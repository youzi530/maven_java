package crm.supplier.dao.daoImp;

import crm.supplier.dao.IncallManageDao;
import crm.utils.C3p0Utils;
import crm.vojo.IncallManage;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanListHandler;
import org.junit.Test;

import java.sql.SQLException;
import java.util.List;

public class IncallManageDaoImp implements IncallManageDao {
    QueryRunner queryRunner=new QueryRunner(C3p0Utils.getDataSource());

    @Override
    public List<IncallManage> viewAll() {
        String sql="select * from incallManage";
        try {
            List<IncallManage>list=queryRunner.query(sql,new BeanListHandler<IncallManage>(IncallManage.class));
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
    public boolean add(IncallManage incallManage) {
        String sql="insert into incallManage values(null,?,?)";
        try {
            queryRunner.update(sql,incallManage.getsName(),incallManage.getContent());
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean delete(int id) {
        String sql="delete from incallmanage where id=?";
        try {
            queryRunner.update(sql,id);
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public List<IncallManage> maxId() {
        String sql="SELECT * FROM incallmanage WHERE id =(SELECT MAX(id)FROM incallmanage)";
        try {
            List<IncallManage>list=queryRunner.query(sql,new BeanListHandler<IncallManage>(IncallManage.class));
            return list;
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public List<IncallManage> findByid(int id) {
        String sql="select * from incallmanage where id=?";
        List<IncallManage>list = null;
        try {
            list = queryRunner.query(sql,id,new BeanListHandler<IncallManage>(IncallManage.class));
            return list;
//            return list;
        } catch (SQLException e) {
            return null;
        }
    }

    @Override
    public boolean modify(IncallManage incallManage) {
        String sql="update incallmanage set sName=?,content=?where id=?";
        try {
            queryRunner.update(sql,incallManage.getsName(),incallManage.getContent(),incallManage.getId());
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public List<IncallManage> findmohu(String s) {
        String sql="select * from incallmanage where sName like ?";
        List<IncallManage>list = null;
        try {
            list = queryRunner.query(sql,"%"+s+"%",new BeanListHandler<IncallManage>(IncallManage.class));
            return list;

//            return list;
        } catch (SQLException e) {
            return null;
        }
    }

    @Test
    public void ceshi(){
        IncallManage incallManage=new IncallManage();
        incallManage.setsName("laji");
        incallManage.setContent("问我们的ak多少钱");
        System.out.println(add(incallManage));
        System.out.println(viewAll());
    }
}
