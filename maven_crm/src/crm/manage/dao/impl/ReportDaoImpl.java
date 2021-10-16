package crm.manage.dao.impl;

import crm.manage.dao.ReportDao;
import crm.utils.C3p0Utils;
import crm.vojo.ClientReport;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanListHandler;

import java.sql.SQLException;
import java.util.List;

public class ReportDaoImpl implements ReportDao {

    private QueryRunner runner = C3p0Utils.queryRunner;

    @Override
    public List<ClientReport> getClientReport() {
        String sql = "SELECT rank,COUNT(DISTINCT clientId) AS num FROM clientinfo GROUP BY rank ORDER BY rank";
        try {
            List<ClientReport> list = runner.query(sql,new BeanListHandler<ClientReport>(ClientReport.class));
            if (list != null){
                return list;
            }else {
                return null;
            }
        } catch (SQLException e) {
            return null;
        }
    }
}
