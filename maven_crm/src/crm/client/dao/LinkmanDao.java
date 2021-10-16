package crm.client.dao;

import crm.manage.dao.UserDao;
import crm.pojo.UserInfo;

import java.util.List;

public interface LinkmanDao {

    /**
     * 添加客户部员工
     * @param userInfo
     * @return
     */
    boolean add(UserInfo userInfo);

}
