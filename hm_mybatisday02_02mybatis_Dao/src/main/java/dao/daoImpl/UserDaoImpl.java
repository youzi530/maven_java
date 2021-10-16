package dao.daoImpl;

import dao.UserDao;
import domain.User;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;

import java.util.List;

public class UserDaoImpl implements UserDao {

    private SqlSessionFactory factory;

    public UserDaoImpl(SqlSessionFactory factory) {
        this.factory = factory;
    }

    @Override
    public List<User> findAll() {
        //获取sqlsession对象
        SqlSession sqlSession = factory.openSession();
        //实现查询列表
        List<User> users = sqlSession.selectList("dao.UserDao.findAll");//参数是获取配置信息（xml文件）中的namespace+方法名
        //释放资源
        sqlSession.close();
        return users;
    }

    @Override
    public void saveUser(User user) {
        //获取sqlsession对象
        SqlSession sqlSession = factory.openSession();
        //实现查询列表
        sqlSession.insert("dao.UserDao.saveUser",user);//参数是获取配置信息（xml文件）中的namespace+方法名
        sqlSession.commit();
        //释放资源
        sqlSession.close();
    }

    @Override
    public void updateUser(User user) {
        //获取sqlsession对象
        SqlSession sqlSession = factory.openSession();
        //实现查询列表
        sqlSession.update("dao.UserDao.updateUser",user);//参数是获取配置信息（xml文件）中的namespace+方法名
        //释放资源
        sqlSession.close();
    }

    @Override
    public void deleteUser(int id) {
        //获取sqlsession对象
        SqlSession sqlSession = factory.openSession();
        //实现查询列表
        sqlSession.delete("dao.UserDao.deleteUser");//参数是获取配置信息（xml文件）中的namespace+方法名
        //释放资源
        sqlSession.close();
    }

    @Override
    public User findById(int id) {
        //获取sqlsession对象
        SqlSession sqlSession = factory.openSession();
        //实现查询列表
        User users = sqlSession.selectOne("dao.UserDao.findById",id);//参数是获取配置信息（xml文件）中的namespace+方法名
        //释放资源
        sqlSession.close();
        return users;
    }

    @Override
    public List<User> findByName(String username) {
        //获取sqlsession对象
        SqlSession sqlSession = factory.openSession();
        //实现查询列表
        List<User> users = sqlSession.selectList("dao.UserDao.findByName",username);//参数是获取配置信息（xml文件）中的namespace+方法名
        //释放资源
        sqlSession.close();
        return users;
    }

    @Override
    public int findTotal() {
        //获取sqlsession对象
        SqlSession sqlSession = factory.openSession();
        //实现查询列表
        int i = sqlSession.selectOne("dao.UserDao.findTotal");//参数是获取配置信息（xml文件）中的namespace+方法名
        //释放资源
        sqlSession.close();
        return i;
    }
}
