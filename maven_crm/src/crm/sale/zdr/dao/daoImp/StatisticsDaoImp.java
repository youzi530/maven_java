package crm.sale.zdr.dao.daoImp;

import com.sun.org.glassfish.external.statistics.Statistic;
import crm.pojo.Statistics;
import crm.sale.zdr.dao.StatisticsDao;
import crm.utils.C3p0Utils;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanListHandler;

import java.sql.SQLException;
import java.util.List;

public class StatisticsDaoImp implements StatisticsDao {
    QueryRunner queryRunner = new QueryRunner(C3p0Utils.getDataSource());

    @Override
    public List<Statistics> findall() {
        String sql ="select * from statistics";
        try {
            List<Statistics> list=  queryRunner.query(sql,new BeanListHandler<Statistics>(Statistics.class));
            return list;
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public List<Statistics> findByMohu(String sName) {
        String sql ="select * from statistics where pName like ?";
        try {
            List<Statistics> list=  queryRunner.query(sql,"%"+sName+"%",new BeanListHandler<Statistics>(Statistics.class));
            return list;
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }
}
