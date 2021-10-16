package crm.product.dao;

import crm.pojo.Product;
import crm.pojo.Supplier;
import crm.pojo.UserInfo;
import crm.vojo.Daily;

import java.util.List;

public interface ProductDao {

    //商品信息页面，查询所有的商品相关信息
    List<Product> viewProInfo();

    //查找最后一条数据，这里在添加信息的时候用到，需要重新查找最后一条数据来展示到页面上去
    List<Product> viewProLast();

    //通过pid来查找这一行数据
    List<Product> viewProByPid(int pid);

    //通过pName来查询数据
    List<Product> viewProByPname(String pName);

    //商品添加函数
    boolean addProduct(Product product);

    //修改商品信息函数
    boolean editProduct(Product product, int pid);

    //删除商品信息函数
    boolean deleteProduct(int pid);

    //一次删除多条商品信息(不写，解决办法：调用多次删除语句即可)
    //boolean deleteManyPro();

    //在添加的时候，需要对供应商进行选择，这就要先查出供应商(需写这个函数，我查出所有的供应商信息)
    List<Supplier> viewSupplier();

    //查询userInfo表中的realName
    List<UserInfo> viewUserInfo();

    //当采购管理采购成功，对商品信息表里面的数量进行加加
    boolean addProNum(int pid,int num);

    //当发货成功(合同审核成功后)，商品信息表中的数量减减
    boolean reduceNum(int pid,int num);

    //通过id来查询库存量
    int viewPNumByid(int pid);

    //当修改商品信息成功后，向日志表中插入一条数据
    boolean addToDaily(Daily daily);

}
