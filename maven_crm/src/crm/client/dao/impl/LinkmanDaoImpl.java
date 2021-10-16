package crm.client.dao.impl;

import crm.client.dao.LinkmanDao;
import crm.pojo.UserInfo;
import crm.utils.C3p0Utils;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.ScalarHandler;

import java.sql.SQLException;

public class LinkmanDaoImpl implements LinkmanDao {

    private QueryRunner runner = C3p0Utils.queryRunner;

    @Override
    public boolean add(UserInfo userInfo) {
        String sql = "insert into userInfo(account,password,realName,sex,mobile,email,birthday,identity,entryTime,roleId,status," +
                "createTime) values(?,?,?,?,?,?,?,?,?,?,?,?)";
        try {
            int res = runner.update(sql,userInfo.getAccount(),userInfo.getPassword(),userInfo.getRealName(),userInfo.getSex(),userInfo.getMobile(),
                    userInfo.getEmail(),userInfo.getBirthday(),userInfo.getIdentity(),userInfo.getEntryTime(),"客户职员",userInfo.getStatus(),userInfo.getCreateTime());
            if (res != 0){
                return true;
            }else {
                return false;
            }
        } catch (SQLException e) {
            return false;
        }
    }


}
