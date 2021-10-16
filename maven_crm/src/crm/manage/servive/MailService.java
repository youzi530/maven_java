package crm.manage.servive;

import crm.manage.dao.MailDao;
import crm.manage.dao.impl.MailDaoImpl;
import crm.pojo.EmailManage;

import java.util.List;

public class MailService {
    private MailDao dao = new MailDaoImpl();

    public List<EmailManage> query() {
        return dao.query();
    }
    public List<EmailManage> query(int userId) {
        return dao.query(userId);
    }

    public boolean add(EmailManage emailManage){
        return dao.add(emailManage);
    }

    public boolean delete(int id){
        return dao.delete(id);
    }



    public EmailManage queryFun(String content){
        return dao.queryFun(content);
    }

}
