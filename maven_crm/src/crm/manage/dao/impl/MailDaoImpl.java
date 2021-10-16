package crm.manage.dao.impl;

import crm.manage.dao.MailDao;
import crm.pojo.EmailManage;
import crm.utils.C3p0Utils;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanHandler;
import org.apache.commons.dbutils.handlers.BeanListHandler;

import java.sql.SQLException;
import java.util.List;

public class MailDaoImpl implements MailDao {




        private QueryRunner runner = C3p0Utils.queryRunner;


        @Override
        public boolean add(EmailManage emailManage) {
            String sql1 = "insert into emailmanage (id,username,userId,receiveMan,receiveId,content) values(null,?,?,?,?,?);";

            try {
                int res1 = runner.update(sql1, emailManage.getUsername(),emailManage.getUserId(), emailManage.getReceiveMan(),emailManage.getReceiveId(), emailManage.getContent());

                if (res1 != 0 ) {
                    return true;
                } else {
                    return false;
                }


            } catch (SQLException e) {
                return false;
            }
        }

        @Override
        public List<EmailManage> query() {
            String sql = "select * from emailmanage ";
            try {
                List<EmailManage> list = runner.query(sql, new BeanListHandler<EmailManage>(EmailManage.class));
                if (list != null) {
                    return list;
                } else {
                    return null;
                }
            } catch (SQLException e) {
                return null;
            }
        }

    @Override
    public List<EmailManage> query(int userId) {
        String sql = "select * from emailmanage where userId=? ";
        try {
            List<EmailManage> list = runner.query(sql, new BeanListHandler<EmailManage>(EmailManage.class),userId);
            if (list != null) {
                return list;
            } else {
                return null;
            }
        } catch (SQLException e) {
            return null;
        }
    }

    @Override
        public boolean delete(int id) {
            String sql = "delete from emailmanage where id=?";
            try {
                int res = runner.update(sql, id);
                if (res != 0) {
                    return true;
                } else {
                    return false;
                }
            } catch (SQLException e) {
                return false;
            }
        }





        @Override
        public EmailManage queryFun(String content) {
            String sql = "select * from emailmanage where content=?";
            try {
                EmailManage One = runner.query(sql, new BeanHandler<EmailManage>(EmailManage.class),content);
                if (One != null) {
                    return  One;
                } else {
                    return null;
                }
            } catch (SQLException e) {
                return null;
            }
        }

    @Override
    public List<EmailManage> viewMax() {
        String sql = "select * from emailmanage where id=(select max(id) from emailmanage)";
        try {
            List<EmailManage> list = runner.query(sql, new BeanListHandler<EmailManage>(EmailManage.class));
            if (list != null) {
                return list;
            } else {
                return null;
            }
        } catch (SQLException e) {
            return null;
        }
    }


}


