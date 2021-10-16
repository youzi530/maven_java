package crm.supplier.dao;

import crm.pojo.Supplier;
import crm.pojo.UserInfo;

import java.util.List;

public interface SupplierDao {
    //查看所有的供应商；
    List<Supplier> findall();
    //根据供应商的名字查找供应商；
    List<Supplier> findByName(String name);
    List<Supplier> findByMohu(String name);
    //根据供应商的名字修改供应商信息；
    boolean modify (Supplier supplier);
    //根据供应商的删除供应商信息;
    boolean delete(int id);
    //todo
    // 添加供应商带的信息
    boolean add(Supplier supplier);
    //插入的时候怎么插入自增
    //
    //根据id查找所有的供应商信息
    List<Supplier> findById(int id);

}
