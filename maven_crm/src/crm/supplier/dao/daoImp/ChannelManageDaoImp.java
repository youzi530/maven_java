package crm.supplier.dao.daoImp;

import crm.pojo.ChannelManage;
import crm.pojo.UserInfo;
import crm.supplier.dao.ChannelManageDao;
import crm.utils.C3p0Utils;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanListHandler;
import org.junit.Test;

import java.sql.SQLException;
import java.util.List;

public class ChannelManageDaoImp implements ChannelManageDao {
    QueryRunner queryRunner=new QueryRunner(C3p0Utils.getDataSource());
    @Override
    public List<ChannelManage> findall() {
        String sql="select * from channelManage";
        try {
          List<ChannelManage>list=queryRunner.query(sql, new BeanListHandler<ChannelManage>(ChannelManage.class));
            if(list.isEmpty()){
                return null;
            }
            else{
                return list;
            }
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }
    @Override
    public List<UserInfo> findYg() {
        String sql="select * from userInfo";
        List<UserInfo>list = null;
        try {
            list = queryRunner.query(sql,new BeanListHandler<UserInfo>(UserInfo.class));
            return list;

//            return list;
        } catch (SQLException e) {
            return null;
        }
    }

    @Override
    public List<ChannelManage> findByMohu(String s) {
        String sql="select * from channelmanage where sName like ?";
        List<ChannelManage>list = null;
        try {
            list = queryRunner.query(sql,"%"+s+"%",new BeanListHandler<ChannelManage>(ChannelManage.class));
            return list;

//            return list;
        } catch (SQLException e) {
            return null;
        }
    }

    @Override
    public List<ChannelManage> findByName(String name) {
        String sql="select * from channelManage where sName=?";
        try {
            List<ChannelManage>list=queryRunner.query(sql, name,new BeanListHandler<ChannelManage>(ChannelManage.class));
            if(list.isEmpty()){
                return null;
            }
            else{
                return list;
            }
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public boolean modify(ChannelManage channelManage) {
        String sql="update channelManage set way=?,username=?where sName=?";
        try {
            queryRunner.update(sql,channelManage.getWay(),channelManage.getUsername(),channelManage.getsName());
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean delete(String name) {
        String sql="delete from channelManage where sName=?";
        try {
            queryRunner.update(sql,name);
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean add(ChannelManage channelManage) {
        String sql="insert into channelManage values(?,?,?)";
        try {
            queryRunner.update(sql,channelManage.getsName(),channelManage.getWay(),channelManage.getUsername());
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    @Test
    public void xiaoceshi(){
        //测试第一个
//        System.out.println(findall());
        //测试第二个
//        System.out.println(findByName("李四"));
//        System.out.println(findByName(" "));
       //测试第三个
//        ChannelManage channelManage=new ChannelManage();
//        channelManage.setsName("李四");
//        System.out.println(modify(channelManage));
//        System.out.println(findall());
        //测试第四个
//        System.out.println(delete("李四"));
//        System.out.println(findall());
        //测试添加
        ChannelManage channelManage=new ChannelManage();
        channelManage.setsName("麻子");
        channelManage.setUsername("fw");
        channelManage.setWay("chifan");
        System.out.println(modify(channelManage));
        System.out.println(findall());
    }
}
