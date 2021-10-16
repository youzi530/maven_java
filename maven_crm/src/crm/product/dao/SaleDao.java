package crm.product.dao;

import crm.vojo.Sale;

import java.util.List;

public interface SaleDao {

    // 商品销售管理，查询商品销售表中的数据
    List<Sale> viewSaleInfo();

    //查找最后一条数据，这里在添加信息的时候用到，需要重新查找最后一条数据来展示到页面上去
    List<Sale> viewSalesLast();

    //通过商品名字来查询到商品pid
    int viewIdBypName(String pName);

    //通过pName来查询数据
    List<Sale> viewSalesByPname(String pName);

    //通过pid来查找这一行数据
    List<Sale> viewSaleByCid(int cid);

    //进行权限查看，通过真实姓名来查看相关销售信息，员工只能看到自己的销售信息
    List<Sale> viewSaleByUsername(String username);

    //销售管理模块，新增功能
    boolean addSale(Sale sale);

    //销售管理模块，修改功能1
    boolean editSaleByTwo(Sale sale, int cid, int pid);

    //销售管理模块，修改功能2
    boolean editSaleByCid(Sale sale, int cid);

    //销售管理模块，删除功能1
    boolean deleteSale(int cid, int pid);

    //销售管理模块，删除功能2
    boolean deleteSaleBycid(int cid);

    //生成合同的时候，用商品name和username来查询销售表中的所有信息
    List<Sale> viewSaleByPnameUser(String pName,String username);

    //通过name的模糊查询 和username精准查询，来查询相关消息
    List<Sale> viewSaleByPnameusername(String pName,String username);

    //根据saleid（也就是cid）来修改发货状态
    boolean editStateByCid(String sate ,int cid);


}
