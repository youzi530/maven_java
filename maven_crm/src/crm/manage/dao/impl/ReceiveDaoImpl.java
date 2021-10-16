package crm.manage.dao.impl;

import crm.manage.dao.ReceiveDao;
import crm.pojo.Receive;
import crm.utils.C3p0Utils;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanHandler;
import org.apache.commons.dbutils.handlers.BeanListHandler;

import java.sql.SQLException;
import java.util.List;

public class ReceiveDaoImpl implements ReceiveDao {
    private QueryRunner runner = C3p0Utils.queryRunner;


    @Override
    public boolean add(Receive receive) {
        String sql1 = "insert into receive (id,username,userId,receiveMan,receiveId,content) values(null,?,?,?,?,?);";

        try {
            int res1 = runner.update(sql1, receive.getUsername(),receive.getUserId(), receive.getReceiveMan(),receive.getReceiveId(), receive.getContent());

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
    public List<Receive> query() {
        String sql = "select * from receive";
        try {
            List<Receive> list = runner.query(sql, new BeanListHandler<Receive>(Receive.class));
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
    public List<Receive> query(int userId) {
        String sql = "select * from receive where receiveId=? ";
        try {
            List<Receive> list = runner.query(sql, new BeanListHandler<Receive>(Receive.class),userId);
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
        String sql = "delete from receive where id=?";
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
    public boolean update(Receive receive) {
        String sql = "update receive set ready='已读' where id=?";
        try {
            int res = runner.update(sql, receive.getReady(), receive.getId());
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
    public Receive queryFun(String content) {
        String sql = "select * from receive where content=?";
        try {
            Receive One = runner.query(sql, new BeanHandler<Receive>(Receive.class),content);
            if (One != null) {
                return  One;
            } else {
                return null;
            }
        } catch (SQLException e) {
            return null;
        }
    }
//修改状态boolean
    @Override
    public boolean status(int id) {
        String sql = "update receive set ready='已读' where id=?";
        try {
            int res = runner.update(sql,id);
            if (res != 0) {
                return true;
            } else {
                return false;
            }
        } catch (SQLException e) {
            return false;
        }
    }


}
