package crm.manage.servive;

import crm.manage.dao.BulletinBoardDao;
import crm.manage.dao.impl.BulletinBoardDaoImpl;
import crm.pojo.BulletinBoard;

import java.util.List;

public class BulletinBoardService {


    private BulletinBoardDao dao = new BulletinBoardDaoImpl();

    public List<BulletinBoard> query() {
        return dao.query();
    }

    public boolean add(BulletinBoard bulletinBoard){
        return dao.add(bulletinBoard);
    }

    public boolean delete(String theme){
        return dao.delete(theme);
    }

    public boolean update(BulletinBoard bulletinBoard){
        return dao.update(bulletinBoard);
    }

    public BulletinBoard getBulletinBoard(String theme){
        return dao.getBulletinBoard(theme);
    }

    public List<BulletinBoard> queryFun(String theme) {
        return dao.queryFun(theme);
    }

}


