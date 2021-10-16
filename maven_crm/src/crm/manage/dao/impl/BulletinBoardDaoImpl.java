package crm.manage.dao.impl;


import crm.manage.dao.BulletinBoardDao;
import crm.pojo.BulletinBoard;
import crm.utils.C3p0Utils;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanHandler;
import org.apache.commons.dbutils.handlers.BeanListHandler;

import java.sql.SQLException;
import java.util.List;

public class BulletinBoardDaoImpl implements BulletinBoardDao {

    private QueryRunner runner = C3p0Utils.queryRunner;


    @Override
    public boolean add(BulletinBoard bulletinboard) {
        String sql = "insert into bulletinboard values(?,?,?)";
        try {
            int res = runner.update(sql, bulletinboard.getTheme(), bulletinboard.getContent(), bulletinboard.getReleaseDate());
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
    public List<BulletinBoard> query() {
        String sql = "select * from bulletinboard";
        try {
            List<BulletinBoard> list = runner.query(sql, new BeanListHandler<BulletinBoard>(BulletinBoard.class));
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
    public boolean delete(String theme) {
        String sql = "delete from bulletinboard where theme=?";
        try {
            int res = runner.update(sql, theme);
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
    public boolean update(BulletinBoard bulletinboard) {
        String sql = "update bulletinboard set content=? , releaseDate=? where theme=?";
        try {
            int res = runner.update(sql, bulletinboard.getContent(), bulletinboard.getReleaseDate(), bulletinboard.getTheme());
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
    public BulletinBoard getBulletinBoard(String theme) {
       String sql = "select * from bulletinboard where theme=?";
        try {
            BulletinBoard One = runner.query(sql, new BeanHandler<BulletinBoard>(BulletinBoard.class),theme);
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
    public List<BulletinBoard> queryFun(String theme) {

        String sql = "select * from bulletinboard where theme like '%" + theme + "%'";

            try {
                List<BulletinBoard> list = runner.query(sql, new BeanListHandler<BulletinBoard>(BulletinBoard.class));
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






