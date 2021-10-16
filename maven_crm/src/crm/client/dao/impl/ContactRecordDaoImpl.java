package crm.client.dao.impl;

import crm.client.dao.ContactRecordDao;
import crm.utils.C3p0Utils;
import crm.vojo.ContactRecord;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanListHandler;
import org.apache.commons.dbutils.handlers.ScalarHandler;

import java.sql.SQLException;
import java.util.List;

public class ContactRecordDaoImpl implements ContactRecordDao {

    private QueryRunner runner = C3p0Utils.queryRunner;

    @Override
    public boolean add(ContactRecord contactRecord) {
        String sql = "insert into contactRecord(linkmanId,clientId,content,contactTime) values(?,?,?,?)";
        try {
            int res = runner.update(sql,contactRecord.getLinkmanId(),contactRecord.getClientId(),
                    contactRecord.getContent(),contactRecord.getContactTime());
            if (res != 0){
                return true;
            }else {
                return false;
            }
        } catch (SQLException e) {
            return false;
        }
    }

    @Override
    public int getLatestId() {
        String sql = "select id from contactRecord order by id desc limit 1";
        try {
            int id = (int) runner.query(sql,new ScalarHandler());
            if (id > 0){
                return id;
            }else {
                return -1;
            }
        } catch (SQLException e) {
            return -1;
        }
    }

    @Override
    public List<ContactRecord> staff(int userId) {
        String sql = "select * from contactRecord where linkmanId=?";
        try {
            List<ContactRecord> list = runner.query(sql,new BeanListHandler<ContactRecord>(ContactRecord.class),userId);
            if (list != null){
                return list;
            }else {
                return null;
            }
        } catch (SQLException e) {
            return null;
        }
    }

    @Override
    public List<ContactRecord> leader() {
        String sql = "select * from contactRecord";
        try {
            List<ContactRecord> list = runner.query(sql,new BeanListHandler<ContactRecord>(ContactRecord.class));
            if (list != null){
                return list;
            }else {
                return null;
            }
        } catch (SQLException e) {
            return null;
        }
    }

    @Override
    public boolean deleteOne(int id) {
        String sql = "delete from contactRecord where id=?";
        try {
            int res = runner.update(sql,id);
            if (res != 0){
                return true;
            }else {
                return false;
            }
        } catch (SQLException e) {
            return false;
        }
    }

    @Override
    public boolean update(ContactRecord record) {
        String sql = "update contactRecord set content=?,contactTime=? where id=?";
        try {
            int res = runner.update(sql,record.getContent(),record.getContactTime(),record.getId());
            if (res != 0){
                return true;
            }else {
                return false;
            }
        } catch (SQLException e) {
            return false;
        }
    }

    @Override
    public List<ContactRecord> findByBoss(String beginTime,String endTime) {
        String sql = "SELECT * from contactrecord WHERE DATE_FORMAT(contactTime,'%Y-%c-%d') BETWEEN DATE_FORMAT(?,'%Y-%c-%d') AND DATE_FORMAT(?,'%Y-%c-%d')";
        try {
            List<ContactRecord> list = runner.query(sql,new BeanListHandler<ContactRecord>(ContactRecord.class),beginTime,endTime);
            if (list != null){
                return list;
            }else {
                return null;
            }
        } catch (SQLException e) {
            return null;
        }
    }

    @Override
    public List<ContactRecord> findByStaff(int userId, String beginTime, String endTime) {
        String sql = "SELECT * from contactrecord WHERE linkmanId=? and (DATE_FORMAT(contactTime,'%Y-%c-%d') BETWEEN DATE_FORMAT(?,'%Y-%c-%d') AND DATE_FORMAT(?,'%Y-%c-%d'))";
        try {
            List<ContactRecord> list = runner.query(sql,new BeanListHandler<ContactRecord>(ContactRecord.class),userId,beginTime,endTime);
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
