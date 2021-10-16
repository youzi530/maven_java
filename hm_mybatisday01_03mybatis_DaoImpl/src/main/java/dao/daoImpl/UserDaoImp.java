package dao.daoImpl;

import dao.UserDao;
import domain.User;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;

import java.util.List;

public class UserDaoImp implements UserDao {

    private SqlSessionFactory factory;

    public UserDaoImp(SqlSessionFactory factory) {
        this.factory = factory;
    }

    @Override
    public List<User> findAll() {
        //1、使用工厂生产sqlSession对象
        SqlSession session = factory.openSession();
        //2、查询
        List<User> users = session.selectList("dao.UserDao.findAll");
        //3、释放资源
        session.close();
        return users;
    }
}
