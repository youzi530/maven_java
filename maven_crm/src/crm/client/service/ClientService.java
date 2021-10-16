package crm.client.service;

import crm.client.dao.ClientDao;
import crm.client.dao.impl.ClientDaoImpl;
import crm.pojo.ClientInfo;

import java.util.List;

public class ClientService {

    private ClientDao dao = new ClientDaoImpl();

    public boolean add(ClientInfo clientInfo, String createTime) {
        return dao.add(clientInfo,createTime);
    }

    public List<ClientInfo> query(){
        return dao.query();
    }

    public List<ClientInfo> query(int userId){
        return dao.query(userId);
    }

    public int getLatestId(int userId){
        return dao.getLatestId(userId);
    }

    public boolean deleteUserClient(int clientId,int userId){
        return dao.deleteUserClient(clientId,userId);
    }

    public ClientInfo getClient(int clientId){
        return dao.getClient(clientId);
    }

    public boolean update(ClientInfo clientInfo){
        return dao.update(clientInfo);
    }

    public boolean share(int userId, int clientId, boolean flag,int selfId){
        return dao.share(userId,clientId,flag,selfId);
    }

    public List<ClientInfo> find(ClientInfo clientInfo,boolean flag){
        return dao.find(clientInfo,flag);
    }

    public List<ClientInfo> vertifyByBoss(){
        return dao.vertifyByBoss();
    }

    public List<ClientInfo> vertifyByStaff(int userId){
        return dao.vertifyByStaff(userId);
    }
}
