package crm.supplier.service;

import crm.supplier.dao.IncallManageDao;
import crm.supplier.dao.daoImp.IncallManageDaoImp;
import crm.vojo.IncallManage;

import java.util.List;

public class IncallManageService implements IncallManageDao{
    private IncallManageDao dao=new IncallManageDaoImp();

    @Override
    public List<IncallManage> viewAll() {
        return dao.viewAll();
    }

    @Override
    public boolean add(IncallManage incallManage) {
        return dao.add(incallManage);
    }

    @Override
    public boolean delete(int id) {
       return dao.delete(id);
    }

    public List<IncallManage> maxId() {
        return dao.maxId();
    }

    public List<IncallManage> findByid(int id) {
        return dao.findByid(id);
    }

    public boolean modify(IncallManage incallManage) {
        return dao.modify(incallManage);
    }

    public List<IncallManage> findmohu(String s) {
        return dao.findmohu(s);
    }
}
