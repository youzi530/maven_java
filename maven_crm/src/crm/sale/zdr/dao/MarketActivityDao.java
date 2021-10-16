package crm.sale.zdr.dao;

import crm.pojo.MarketActivity;
import crm.pojo.UserInfo;

import java.util.List;

public interface MarketActivityDao {
    List<MarketActivity> findAll();
    boolean add(MarketActivity marketActivity);
    boolean modify(MarketActivity marketActivity);
    boolean delete(int mid);
    //查看最大id的数据
    List<MarketActivity> findMax();
//根据id查看数据
    List<MarketActivity> findById(int id);
    List<UserInfo> findBoss();//找到经理和boss

    List<MarketActivity> findMohu(String sName);//模糊查询
}
