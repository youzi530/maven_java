package crm.client.service;

import crm.client.dao.ContactRecordDao;
import crm.client.dao.impl.ContactRecordDaoImpl;
import crm.vojo.ContactRecord;

import java.util.List;

public class ContactRecordService {

    private ContactRecordDao dao = new ContactRecordDaoImpl();

    public boolean add(ContactRecord contactRecord){
        return dao.add(contactRecord);
    }

    public int getLatestId(){
        return dao.getLatestId();
    }

    public List<ContactRecord> staff(int userId){
        return dao.staff(userId);
    }

    public List<ContactRecord> leader(){
        return dao.leader();
    }

    public boolean deleteOne(int id){
        return dao.deleteOne(id);
    }

    public boolean update(ContactRecord record){
        return dao.update(record);
    }

    public List<ContactRecord> findByBoss(String beginTime,String endTime){
        return dao.findByBoss(beginTime,endTime);
    }

    public List<ContactRecord> findByStaff(int userId, String beginTime, String endTime){
        return dao.findByStaff(userId,beginTime,endTime);
    }

}
