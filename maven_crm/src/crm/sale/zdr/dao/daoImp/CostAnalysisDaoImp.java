package crm.sale.zdr.dao.daoImp;

import crm.pojo.CostAnalysis;
import crm.sale.zdr.dao.CostAnalysisDao;
import crm.utils.C3p0Utils;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanListHandler;

import java.sql.SQLException;
import java.util.List;

public class CostAnalysisDaoImp implements CostAnalysisDao {
    QueryRunner queryRunner = new QueryRunner(C3p0Utils.getDataSource());
    @Override
    public List<CostAnalysis> findAll() {
        String sql="select * from costAnalysis";
        try {
            List<CostAnalysis> list = queryRunner.query(sql,new BeanListHandler<CostAnalysis>(CostAnalysis.class));
            return list;
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public List<CostAnalysis> findByMohu( String sName) {
        String sql="select * from costAnalysis where pName like ?";
        try {
            List<CostAnalysis> list = queryRunner.query(sql,"%"+sName+"%",new BeanListHandler<CostAnalysis>(CostAnalysis.class));
            return list;
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }
}
