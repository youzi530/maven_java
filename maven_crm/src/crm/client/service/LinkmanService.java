package crm.client.service;

import crm.client.dao.LinkmanDao;
import crm.client.dao.impl.LinkmanDaoImpl;
import crm.pojo.UserInfo;

public class LinkmanService {

    private LinkmanDao dao = new LinkmanDaoImpl();

    public boolean add(UserInfo userInfo){
        return dao.add(userInfo);
    }

}
