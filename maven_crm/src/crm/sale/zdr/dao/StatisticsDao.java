package crm.sale.zdr.dao;

import crm.pojo.Statistics;

import java.util.List;

public interface StatisticsDao {
    List<Statistics> findall();
    List<Statistics> findByMohu(String Name);
}
