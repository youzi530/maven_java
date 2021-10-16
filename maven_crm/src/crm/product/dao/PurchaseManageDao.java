package crm.product.dao;

import crm.pojo.Product;
import crm.vojo.ProductManage;

import java.util.List;

public interface PurchaseManageDao {

    //商品信息页面，查询所有的商品相关信息
    List<ProductManage> viewPurInfo();

    //查找最后一条数据，这里在添加信息的时候用到，需要重新查找最后一条数据来展示到页面上去
    List<ProductManage> viewPurchaseLast();

    //通过pName和usernmae来查询数据（当身份是员工）
    List<ProductManage> viewPurByPnameUser(String pName,String username);

    //通过pName和usernmae来查询数据（当身份是老板和经理）
    List<ProductManage> viewPurByPname(String pName);

    //通过pid来查找这一行数据
    List<ProductManage> viewPurByPid(int id);

    //通过职员的姓名来查询到采购管理的信息
    List<ProductManage> viewProByusername(String username);

    //采购管理模块，新增功能
    boolean addPurManage(ProductManage productManage);

    //采购管理模块，修改功能
    boolean editPurManage(ProductManage productManage, int id);

    //采购管理模块，删除功能
    boolean deletePurManage(int id);

    //通过采购管理里面的商品名称，去商品信息里面查找，当查出的记录大于0，那么就存在这个商品的信息
    boolean viewIsEistPro(String pName);

}
