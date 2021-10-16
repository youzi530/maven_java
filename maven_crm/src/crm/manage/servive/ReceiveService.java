package crm.manage.servive;


import crm.manage.dao.ReceiveDao;
import crm.manage.dao.impl.ReceiveDaoImpl;
import crm.pojo.Receive;

import java.util.List;

public class ReceiveService {
    private ReceiveDao dao = new ReceiveDaoImpl();

    public List<Receive> query() {
        return dao.query();
    }
    public List<Receive> query(int userId) {
        return dao.query(userId);
    }

    public boolean add(Receive receive){
        return dao.add(receive);
    }

    public boolean delete(int id){
        return dao.delete(id);
    }
    public boolean update(Receive receive){
        return  dao.update(receive);
    }

    public Receive queryFun(String content){
        return dao.queryFun(content);
    }
}
