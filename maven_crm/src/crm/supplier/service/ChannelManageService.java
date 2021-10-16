package crm.supplier.service;

import crm.pojo.ChannelManage;
import crm.pojo.UserInfo;
import crm.supplier.dao.ChannelManageDao;
import crm.supplier.dao.daoImp.ChannelManageDaoImp;

import java.util.List;

public class ChannelManageService {
    private ChannelManageDao dao=new ChannelManageDaoImp();
    public List<ChannelManage> findall() {
        return dao.findall();
    }


    public List<ChannelManage> findByName(String name) {
        return dao.findByName(name);
    }


    public boolean modify(ChannelManage channelManage) {
        return dao.modify(channelManage);
    }


    public boolean delete(String name) {
        return dao.delete(name);
    }
    public List<UserInfo> findYg(){
        return dao.findYg();
    }
    public boolean add(ChannelManage channelManage){
        return dao.add(channelManage);

    }

    public List<ChannelManage> findByMohu(String s) {
        return dao.findByMohu(s);
    }
}
