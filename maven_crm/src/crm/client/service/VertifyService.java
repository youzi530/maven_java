package crm.client.service;

import crm.client.dao.VertifyDao;
import crm.client.dao.impl.VertifyDaoImpl;
import crm.pojo.ClientInfo;

public class VertifyService {

    private VertifyDao dao = new VertifyDaoImpl();

    public boolean shareVertify(ClientInfo clientInfo){
        return dao.shareVertify(clientInfo);
    }

    public boolean delete(int clientId, int userId){
        return dao.delete(clientId,userId);
    }

}
