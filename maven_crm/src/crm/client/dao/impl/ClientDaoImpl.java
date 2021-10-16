package crm.client.dao.impl;

import crm.client.dao.ClientDao;
import crm.pojo.ClientInfo;
import crm.utils.C3p0Utils;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanHandler;
import org.apache.commons.dbutils.handlers.BeanListHandler;
import org.apache.commons.dbutils.handlers.ScalarHandler;

import java.sql.SQLException;
import java.util.List;

public class ClientDaoImpl implements ClientDao {

    private QueryRunner runner = C3p0Utils.queryRunner;

    @Override
    public boolean add(ClientInfo clientInfo,String createTime) {
        String sql = "insert into clientInfo(userId,department,clientName,workAddress,mainPhone,zipCode,email,province," +
                "city,town,industry,rank,creditGrade,creditLimit,superCompany,financePhone,companyHome,register,remark,createTime) " +
                "values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        try {
            long res = runner.update(sql,clientInfo.getUserId(),clientInfo.getDepartment(),clientInfo.getClientName(),clientInfo.getWorkAddress(),
                    clientInfo.getMainPhone(),clientInfo.getZipCode(),clientInfo.getEmail(),clientInfo.getProvince(),clientInfo.getCity(),clientInfo.getTown(),
                    clientInfo.getIndustry(),clientInfo.getRank(),clientInfo.getCreditGrade(),clientInfo.getCreditLimit(),clientInfo.getSuperCompany(),
                    clientInfo.getFinancePhone(),clientInfo.getCompanyHome(),clientInfo.getRegister(),clientInfo.getRemark(),createTime);
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
    public List<ClientInfo> query() {
        String sql = "select * from clientInfo where receiveState=? or receiveState=?";
        try {
            List<ClientInfo> list = runner.query(sql,new BeanListHandler<ClientInfo>(ClientInfo.class),0,2);
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
    public List<ClientInfo> query(int userId) {
        String sql = "select * from clientInfo where (userId=? and receiveState=?) or (userId=? and receiveState=?)";
        try {
            List<ClientInfo> list = runner.query(sql,new BeanListHandler<ClientInfo>(ClientInfo.class),userId,0,userId,2);
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
    public int getLatestId(int userId) {
        String sql = "select clientId from clientInfo where userId=? order by clientId desc limit 1";
        try {
            Integer res = (Integer) runner.query(sql,new ScalarHandler(),userId);
            if (res >= 1){
                return res;
            }else {
                return -1;
            }
        } catch (SQLException e) {
            return -1;
        }
    }

    @Override
    public boolean deleteUserClient(int clientId,int userId) {
        String sql = "delete from clientInfo where clientId=? and userId=?";
        try {
            int res = runner.update(sql,clientId,userId);
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
    public ClientInfo getClient(int clientId) {
        String sql = "select * from clientInfo where clientId=?";
        try {
            ClientInfo clientInfo = runner.query(sql,new BeanHandler<ClientInfo>(ClientInfo.class),clientId);
            if (clientInfo != null){
                return clientInfo;
            }else {
                return null;
            }
        } catch (SQLException e) {
            return null;
        }
    }

    @Override
    public boolean update(ClientInfo clientInfo) {
        String sql = "update clientInfo set clientName=?,workAddress=?,mainPhone=?,zipCode=?,email=?,province=?," +
                "city=?,town=?,industry=?,rank=?,creditGrade=?,creditLimit=?,financePhone=?,superCompany=?,companyHome=?," +
                "remark=?,register=?,status=?,updTime=? where clientId=?";
        try {
            int res = runner.update(sql,clientInfo.getClientName(),clientInfo.getWorkAddress(),clientInfo.getMainPhone(),clientInfo.getZipCode(),
                    clientInfo.getEmail(),clientInfo.getProvince(),clientInfo.getCity(),clientInfo.getTown(),clientInfo.getIndustry(),
                    clientInfo.getRank(),clientInfo.getCreditGrade(),clientInfo.getCreditLimit(),clientInfo.getFinancePhone(),
                    clientInfo.getSuperCompany(),clientInfo.getCompanyHome(),clientInfo.getRemark(),clientInfo.getRegister(),
                    clientInfo.getStatus(),clientInfo.getUpdTime(),clientInfo.getClientId());
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
    public boolean share(int userId, int clientId, boolean flag,int selfId) {
        ClientInfo clientInfo = getClient(clientId);
        if (flag){
            if (shareAdd(clientInfo,userId,2,selfId)){
                return true;
            }else {
                return false;
            }
        }else {
            if (shareAdd(clientInfo,userId,1,selfId)){
                return true;
            }else {
                return false;
            }
        }
    }

    @Override
    public boolean shareAdd(ClientInfo clientInfo, int userId, int receiveState,int selfId) {
        String sql = "insert into clientInfo(clientId,userId,department,clientName,workAddress,mainPhone,zipCode,email,province," +
                "city,town,industry,rank,creditGrade,creditLimit,superCompany,financePhone,companyHome,register,remark,createTime,updTime,receiveState,status,receiveId) " +
                "values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        if (receiveState == 2){
            clientInfo.setApproveId(selfId);
            sql = "insert into clientInfo(clientId,userId,department,clientName,workAddress,mainPhone,zipCode,email,province," +
                    "city,town,industry,rank,creditGrade,creditLimit,superCompany,financePhone,companyHome,register,remark,createTime,updTime,receiveState,status,receiveId,approveId) " +
                    "values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        }
        try {
            long res = 0;
            if (receiveState == 2){
                res = runner.update(sql,clientInfo.getClientId(),userId,clientInfo.getDepartment(),clientInfo.getClientName(),clientInfo.getWorkAddress(),
                        clientInfo.getMainPhone(),clientInfo.getZipCode(),clientInfo.getEmail(),clientInfo.getProvince(),clientInfo.getCity(),clientInfo.getTown(),
                        clientInfo.getIndustry(),clientInfo.getRank(),clientInfo.getCreditGrade(),clientInfo.getCreditLimit(),clientInfo.getSuperCompany(),
                        clientInfo.getFinancePhone(),clientInfo.getCompanyHome(),clientInfo.getRegister(),clientInfo.getRemark(),clientInfo.getCreateTime(),clientInfo.getUpdTime(),receiveState,
                        clientInfo.getStatus(),selfId,clientInfo.getApproveId());
            }else {
                res = runner.update(sql,clientInfo.getClientId(),userId,clientInfo.getDepartment(),clientInfo.getClientName(),clientInfo.getWorkAddress(),
                        clientInfo.getMainPhone(),clientInfo.getZipCode(),clientInfo.getEmail(),clientInfo.getProvince(),clientInfo.getCity(),clientInfo.getTown(),
                        clientInfo.getIndustry(),clientInfo.getRank(),clientInfo.getCreditGrade(),clientInfo.getCreditLimit(),clientInfo.getSuperCompany(),
                        clientInfo.getFinancePhone(),clientInfo.getCompanyHome(),clientInfo.getRegister(),clientInfo.getRemark(),clientInfo.getCreateTime(),clientInfo.getUpdTime(),receiveState,
                        clientInfo.getStatus(),selfId);
            }
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
    public List<ClientInfo> find(ClientInfo clientInfo,boolean flag) {//通过判空来排除多条件查询的sql语句
        boolean firstNull = false;
        boolean secondNull = false;
        boolean thirdNull = false;
        boolean fourthNull = false;
        boolean fifthNull = false;
        String sql = "";
        sql += "SELECT * from clientinfo WHERE ";
        String clientName =clientInfo.getClientName(); String workAddress = clientInfo.getWorkAddress();
        String province = clientInfo.getProvince(); String city = clientInfo.getCity(); String town = clientInfo.getTown();

        if (flag){

            String condition1 = "(receiveState=? and (";
            String condition2 = "(receiveState=? and (";

            if (clientName.length() != 0 ){
                condition1 += "clientName LIKE '%"+clientName+"%'";
                condition2 += "clientName LIKE '%"+clientName+"%'";
            }else {
                firstNull = true;
            }

            if (workAddress.length() != 0){
                if (firstNull){
                    condition1 += "  workAddress LIKE '%"+workAddress+"%'";
                    condition2 += "  workAddress LIKE '%"+workAddress+"%'";
                }else {
                    condition1 += " and workAddress LIKE '%"+workAddress+"%'";
                    condition2 += " and workAddress LIKE '%"+workAddress+"%'";
                }
            }else {
                secondNull = true;
            }

            if (province.length() != 0){
                if (firstNull && secondNull){
                    condition1 += "  province LIKE '%"+province+"%'";
                    condition2 += "  province LIKE '%"+province+"%'";
                }else {
                    condition1 += " and province LIKE '%"+province+"%'";
                    condition2 += " and province LIKE '%"+province+"%'";
                }
            }else {
                thirdNull = true;
            }

            if (city.length() != 0){
               if (fifthNull && secondNull && thirdNull){
                   condition1 += " city LIKE '%"+city+"%'";
                   condition2 += " city LIKE '%"+city+"%'";
               }else {
                   condition1 += " and city LIKE '%"+city+"%'";
                   condition2 += " and city LIKE '%"+city+"%'";
               }
            }else {
                fourthNull = true;
            }

            if (town.length() != 0){
                if (fifthNull && secondNull && thirdNull && fourthNull){
                    condition1 += " town LIKE '%"+town+"%'";
                    condition2 += " town LIKE '%"+town+"%'";
                }else {
                    condition1 += " and town LIKE '%"+town+"%'";
                    condition2 += " and town LIKE '%"+town+"%'";
                }
            }else {
                fifthNull = true;
            }

            condition1 += "))";
            condition2 += "))";
            sql += condition1 + " OR " + condition2;
            try {
                List<ClientInfo> list = runner.query(sql,new BeanListHandler<ClientInfo>(ClientInfo.class),0,2);
                if (list != null){
                    return list;
                }else {
                    return null;
                }
            } catch (SQLException e) {
                return null;
            }
        }else {
            String condition1 = "(userId=? and receiveState=? and (";
            String condition2 = "(userId=? and receiveState=? and (";
            if (clientName.length() != 0 ){
                condition1 += "clientName LIKE '%"+clientName+"%'";
                condition2 += "clientName LIKE '%"+clientName+"%'";
            }else {
                firstNull = true;
            }

            if (workAddress.length() != 0){
                if (firstNull){
                    condition1 += "  workAddress LIKE '%"+workAddress+"%'";
                    condition2 += "  workAddress LIKE '%"+workAddress+"%'";
                }else {
                    condition1 += " and workAddress LIKE '%"+workAddress+"%'";
                    condition2 += " and workAddress LIKE '%"+workAddress+"%'";
                }
            }else {
                secondNull = true;
            }

            if (province.length() != 0){
                if (firstNull && secondNull){
                    condition1 += "  province LIKE '%"+province+"%'";
                    condition2 += "  province LIKE '%"+province+"%'";
                }else {
                    condition1 += " and province LIKE '%"+province+"%'";
                    condition2 += " and province LIKE '%"+province+"%'";
                }
            }else {
                thirdNull = true;
            }

            if (city.length() != 0){
                if (fifthNull && secondNull && thirdNull){
                    condition1 += " city LIKE '%"+city+"%'";
                    condition2 += " city LIKE '%"+city+"%'";
                }else {
                    condition1 += " and city LIKE '%"+city+"%'";
                    condition2 += " and city LIKE '%"+city+"%'";
                }
            }else {
                fourthNull = true;
            }

            if (town.length() != 0){
                if (fifthNull && secondNull && thirdNull && fourthNull){
                    condition1 += " town LIKE '%"+town+"%'";
                    condition2 += " town LIKE '%"+town+"%'";
                }else {
                    condition1 += " and town LIKE '%"+town+"%'";
                    condition2 += " and town LIKE '%"+town+"%'";
                }
            }else {
                fifthNull = true;
            }

            condition1 += "))";
            condition2 += "))";
            sql += condition1 + " OR " + condition2;
            try {
                List<ClientInfo> list = runner.query(sql,new BeanListHandler<ClientInfo>(ClientInfo.class),clientInfo.getUserId(),0,clientInfo.getUserId(),2);
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

    @Override
    public List<ClientInfo> vertifyByBoss() {
        String sql = "select * from clientInfo where receiveState!=?";
        try {
            List<ClientInfo> list = runner.query(sql,new BeanListHandler<ClientInfo>(ClientInfo.class),0);
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
    public List<ClientInfo> vertifyByStaff(int userId) {
        String sql = "select * from clientInfo where (receiveState!=? and receiveId=? and userId!=?) or (receiveState!=? and userId=?)";
        try {
            List<ClientInfo> list = runner.query(sql,new BeanListHandler<ClientInfo>(ClientInfo.class),0,userId,userId,0,userId);
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
