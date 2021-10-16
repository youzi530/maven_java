package crm.supplier.dao.daoImp;

import crm.pojo.FileCenter;
import crm.supplier.dao.FileDao;
import crm.utils.C3p0Utils;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanHandler;
import org.apache.commons.dbutils.handlers.BeanListHandler;
import org.apache.commons.dbutils.handlers.ScalarHandler;

import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.List;

public class FileDaoImp implements FileDao {
    QueryRunner queryRunner=new QueryRunner(C3p0Utils.getDataSource());
    @Override
    public List<FileCenter> findall() {
        String sql="select * from fileCenter";
        List<FileCenter> list = null;
        try {
            list = queryRunner.query(sql,new BeanListHandler<FileCenter>(FileCenter.class));
            return list ;

        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }


    }

    @Override
    public FileCenter findById(int id) {
        String sql="select * from fileCenter where id=?";
        FileCenter fileCenter = null;
        try {
            fileCenter = queryRunner.query(sql,id,new BeanHandler<FileCenter>(FileCenter.class));
            return fileCenter ;

        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }

    }

    @Override
    public boolean delete(int id) {
        String sql="delete from fileCenter where id=?";

        try {
          queryRunner.update(sql,id);
            return true;

        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean add(FileCenter fileCenter) {
        String sql="insert into fileCenter values(null,?,?,?,?)";
        try {
            queryRunner.update(sql,fileCenter.getFilename(),fileCenter.getDescription(),fileCenter.getDate(),fileCenter.getUri());
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public int findByMax() {
        String sql="select max(id) from fileCenter";

        try {
            Object id= queryRunner.query(sql,new ScalarHandler());
           int id2= (int) id;

            return  id2;

        } catch (SQLException e) {
            e.printStackTrace();
            return 0;
        }
    }

    @Override
    public boolean modify(FileCenter fileCenter) {
        String sql="update fileCenter set description=?,date=? where id=?";
        try {
            queryRunner.update(sql,fileCenter.getDescription(),fileCenter.getDate(),fileCenter.getId());

            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public List<FileCenter> findByMohu(String s) {
        String sql="select * from fileCenter where fileName like ?";
        List<FileCenter>list = null;
        try {
            list = queryRunner.query(sql,"%"+s+"%",new BeanListHandler<FileCenter>(FileCenter.class));
            return list;
        } catch (SQLException e) {
            return null;
        }
    }


}
