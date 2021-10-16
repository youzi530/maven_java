package crm.product.dao;

import crm.pojo.ClientInfo;
import crm.pojo.UserInfo;
import crm.vojo.SendProduct;
import crm.vojo.SendProductCopy;

import java.util.List;

public interface SendProductDao {

    //商品信息页面，查询所有的商品相关信息
    List<SendProduct> viewSendPro();

    //查找最后一条数据，这里在添加信息的时候用到，需要重新查找最后一条数据来展示到页面上去
    List<SendProduct> viewSendProLast();

    //通过pid来查找这一行数据
    List<SendProduct> viewSendProById(int id);

    //通过发货人username来查询数据
    List<SendProduct> viewSendProByUsername(String username);

    //通过发货人username来查询数据
    List<SendProduct> viewSendProByPName(String pName);

    //通过发货人和商品来查询
    List<SendProduct> viewSendProByPnameUser(String pName,String username);

    //发货信息添加函数
    boolean addSendProduct(SendProduct sendProduct);

    //修改发货信息函数
    boolean editSendProduct(SendProduct sendProduct, int id);

    //发货管理模块，删除功能
    boolean deleteSendProByid(int id);

    //发货生成合同成功后，将数据插入到发货备份表中
    boolean addSendproToCopy(SendProductCopy sendProductCopy);

    //发货管理，查看客户信息(查询到客户的姓名)
    List<ClientInfo> viewClientInfo();

    //当添加一条销售记录，就将这条记录插入到发货管理表中了
    boolean addSaleToSendproduct(SendProduct sendProduct);

    //通过saleid来修改数据
    boolean editSaleBysaleid(double salePrice,int saleNum,int saleid);

    //通过saleid来修改数据
    boolean editSenproBysaleid(SendProduct sendProduct,int saleid);

    //在发货备份表中，通过id来查找saleid，通过id来查找备份表中的数据，从而找到里面的saleid
    List<SendProductCopy> viewSaleidById(int id);

}
