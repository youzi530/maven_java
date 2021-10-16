package crm.sale.lingqiao.dao.daoImp;

import crm.sale.lingqiao.dao.ContractManageDao;
import crm.utils.C3p0Utils;
import crm.vojo.Contact;
import crm.vojo.SendProductCopy;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanListHandler;
import org.apache.commons.dbutils.handlers.ScalarHandler;
import org.junit.Test;

import java.sql.SQLException;
import java.util.List;

public class ContractManageDaoImp implements ContractManageDao {

    QueryRunner queryRunner = new QueryRunner(C3p0Utils.getDataSource());

    @Override
    public List<Contact> viewContract() {
        String sql ="select * from contact";
        try {
            return queryRunner.query(sql,new BeanListHandler<Contact>(Contact.class));
        } catch (SQLException e) {
            return null;
        }
    }

    @Override
    public boolean deleteContractByConid(int conid) {
        String sql = "delete from contact where conid = ? ";
        try {
            int update = queryRunner.update(sql, conid);
            if(update!=0){
                return true;
            }else{
                return false;
            }
        } catch (SQLException e) {
            return false;
        }
    }

    @Override
    public boolean addContract(Contact contact) {
        String sql = "insert into contact(conid,cName,detail,username,giveaway,state,checkTime) values(null,?,?,?,?,?,?)";
        try {
            int update = queryRunner.update(sql,contact.getcName(),contact.getDetail(),contact.getUsername(),contact.getGiveaway(),contact.getState(),contact.getCheckTime());
            if(update!=0){
                return true;
            }else{
                return false;
            }
        } catch (SQLException e) {
            return false;
        }
    }

    @Override
    public List<Contact> viewContractLast() {
        String sql ="select * from contact ORDER BY conid desc LIMIT 1";
        try {
            return queryRunner.query(sql,new BeanListHandler<Contact>(Contact.class));
        } catch (SQLException e) {
            return null;
        }
    }

    @Override
    public List<Contact> viewContractByUsername(String username) {
        String sql ="select * from contact where username like ?";
        try {
            return queryRunner.query(sql,new BeanListHandler<Contact>(Contact.class),username);
        } catch (SQLException e) {
            return null;
        }
    }

    @Override
    public List<Contact> viewContractByConid(int conid) {
        String sql ="select * from contact where conid = ?";
        try {
            return queryRunner.query(sql,new BeanListHandler<Contact>(Contact.class),conid);
        } catch (SQLException e) {
            return null;
        }
    }

    @Override
    public boolean editContract(Contact contact, int conid) {
        String sql= "update contact set cName=?,detail=?,username=?,giveaway=?,state=?,checkTime=? where conid=?";
        try {
            int update = queryRunner.update(sql,contact.getcName(),contact.getDetail(),contact.getUsername(),contact.getGiveaway(),contact.getState(),contact.getCheckTime(),conid);
            if(update!=0){
                return true;
            }else{
                return false;
            }

        } catch (SQLException e) {
            return false;
        }
    }

    @Override
    public List<Contact> viewContractByPnameUsername(String pName, String username) {
        String sql ="select * from contact where pName like ? and username = ?";
        try {
            return queryRunner.query(sql,new BeanListHandler<Contact>(Contact.class),pName,username);
        } catch (SQLException e) {
            return null;
        }
    }

    @Override
    public List<Contact> viewContractByDetail(String detail) {
        String sql = "select * from contact where detail like ?";
        try {
            return queryRunner.query(sql,new BeanListHandler<Contact>(Contact.class),detail);
        } catch (SQLException e) {
            return null;
        }
    }

    @Override
    public List<Contact> viewContactBydetailUsername(String detail, String username) {
        String sql ="select * from contact where detail like ? and username = ?";
        try {
            return queryRunner.query(sql,new BeanListHandler<Contact>(Contact.class),detail,username);
        } catch (SQLException e) {
            return null;
        }
    }

    @Override
    public List<SendProductCopy> viewSendProductCopy(int id) {
        String sql = "select * from sendProductCopy where id = ?";
        try {
            return queryRunner.query(sql,new BeanListHandler<SendProductCopy>(SendProductCopy.class),id);
        } catch (SQLException e) {
            return null;
        }
    }

    @Test
    public void test(){
        System.out.println(viewSendProductCopy(1));
    }

}
