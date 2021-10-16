package crm.supplier.dao;

import crm.vojo.IncallManage;

import java.util.List;

public interface IncallManageDao {
   List<IncallManage> viewAll();
   boolean add(IncallManage incallManage);
   boolean delete(int id);

   List<IncallManage> maxId();

    List<IncallManage> findByid(int id);
//修改信息
    boolean modify(IncallManage incallManage);


    List<IncallManage> findmohu(String s);
}
