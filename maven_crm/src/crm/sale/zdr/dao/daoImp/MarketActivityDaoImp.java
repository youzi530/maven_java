package crm.sale.zdr.dao.daoImp;

import crm.pojo.MarketActivity;
import crm.pojo.UserInfo;
import crm.sale.zdr.dao.MarketActivityDao;
import crm.utils.C3p0Utils;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanListHandler;

import java.sql.SQLException;
import java.util.List;

public class MarketActivityDaoImp implements MarketActivityDao {
    QueryRunner queryRunner=new QueryRunner(C3p0Utils.getDataSource());
    @Override
    public List<MarketActivity> findAll() {
        String sql="select * from marketActivity";
        List<MarketActivity> list=null;
        try {
            list=queryRunner.query(sql,new BeanListHandler<MarketActivity>(MarketActivity.class));
            return list;
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public boolean add(MarketActivity marketActivity) {
        String sql="insert into marketActivity values(?,?,?,?,?,?,?)";
        try {
            queryRunner.update(sql,marketActivity.getMid(),marketActivity.getName(),marketActivity.getTime(),marketActivity.getAddress(),marketActivity.getGift(),marketActivity.getOrganizer(),marketActivity.getPartner());
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }

    }

    @Override
    public boolean modify(MarketActivity marketActivity) {
        String sql="update  marketActivity set name=?,time=?,address=?,gift=?,organizer=?,partner=?where mid=?";
        try {
            queryRunner.update(sql,marketActivity.getName(),marketActivity.getTime(),marketActivity.getAddress(),marketActivity.getGift(),marketActivity.getOrganizer(),marketActivity.getPartner(),marketActivity.getMid());
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean delete(int mid) {
        String sql="delete from marketActivity where mid=?";
        try {
            queryRunner.update(sql,mid);
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }

    }

    @Override
    public List<MarketActivity> findMax() {
        String sql="select * from marketActivity where mid=(select max(mid) from marketActivity)";
        try {
            List<MarketActivity> list=queryRunner.query(sql,new BeanListHandler<MarketActivity>(MarketActivity.class));
            return list;
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }

    }

    @Override
    public List<MarketActivity> findById(int id) {
        String sql="select * from marketActivity where mid=?";
        try {
            List<MarketActivity> list=queryRunner.query(sql,id,new BeanListHandler<MarketActivity>(MarketActivity.class));
            return list;
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public List<UserInfo> findBoss() {

        String sql="SELECT * FROM userinfo WHERE roleId LIKE '%经理%' OR roleId='admin'";
        try {
            List<UserInfo> list=queryRunner.query(sql,new BeanListHandler<UserInfo>(UserInfo.class));
            return list;
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public List<MarketActivity> findMohu(String sName) {
        String sql="SELECT * FROM marketActivity WHERE name LIKE '%"+sName+"%'";
        List<MarketActivity> list=null;
        try {
            list=queryRunner.query(sql,new BeanListHandler<MarketActivity>(MarketActivity.class));
            return list;
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

}
