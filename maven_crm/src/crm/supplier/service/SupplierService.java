package crm.supplier.service;

import crm.pojo.Supplier;
import crm.supplier.dao.SupplierDao;
import crm.supplier.dao.daoImp.SupplierDaoImp;

import java.util.List;

public class SupplierService {

    private SupplierDao dao = new SupplierDaoImp();

    public List<Supplier> findall() {
        return dao.findall();
    }


    public List<Supplier> findByName(String name) {
        return dao.findByName(name);
    }
    public List<Supplier> findByMohu(String name){
        return dao.findByMohu(name);
    }


    public boolean modify(Supplier supplier) {
        return dao.modify(supplier);
    }


    public boolean delete(int id) {
        return dao.delete(id);
    }
    public boolean add(Supplier supplier){
        return dao.add(supplier);
    }
    public List<Supplier> findById(int id){
        return dao.findById(id);
    }
}
