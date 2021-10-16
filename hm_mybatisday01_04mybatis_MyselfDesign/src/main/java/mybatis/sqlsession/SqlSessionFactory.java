package mybatis.sqlsession;

public interface SqlSessionFactory {

    /**
     *
     * @return
     */
    SqlSession openSession();
}
