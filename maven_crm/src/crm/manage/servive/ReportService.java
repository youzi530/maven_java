package crm.manage.servive;

import crm.manage.dao.ReportDao;
import crm.manage.dao.impl.ReportDaoImpl;
import crm.vojo.ClientReport;

import java.util.List;

public class ReportService {

    private ReportDao dao = new ReportDaoImpl();

    public List<ClientReport> getClientReport(){
        return dao.getClientReport();
    }

}
