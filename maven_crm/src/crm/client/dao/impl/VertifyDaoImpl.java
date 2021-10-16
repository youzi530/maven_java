package crm.client.dao.impl;

import crm.client.dao.VertifyDao;
import crm.pojo.ClientInfo;
import crm.utils.C3p0Utils;
import org.apache.commons.dbutils.QueryRunner;

import java.sql.SQLException;

public class VertifyDaoImpl implements VertifyDao {

    private QueryRunner runner = C3p0Utils.queryRunner;

    @Override
    public boolean shareVertify(ClientInfo clientInfo) {
        String sql = "update clientInfo set receiveState=?,approveId=? where clientId=? and userId=?";
        try {
            int res = runner.update(sql,clientInfo.getReceiveState(),clientInfo.getApproveId(),clientInfo.getClientId(),clientInfo.getUserId());
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
    public boolean delete(int clientId, int userId) {
        String sql = "delete from clientInfo where clientId=? and userId=?";
        try {
            int res = runner.update(sql,clientId,userId);
            if (res != 0){
                return true;
            }else{
                return false;
            }
        } catch (SQLException e) {
            return false;
        }
    }

}
