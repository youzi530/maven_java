package crm.sale.lingqiao.dao;

import crm.vojo.Contact;
import crm.vojo.SendProductCopy;

import java.util.List;

public interface ContractManageDao {

    //合同管理页面，查询所有的相关信息
    List<Contact> viewContract();

    //合同管理模块，删除功能
    boolean deleteContractByConid(int conid);

    //合同管理添加函数
    boolean addContract(Contact contact);

    //查找最后一条数据，这里在添加信息的时候用到，需要重新查找最后一条数据来展示到页面上去
    List<Contact> viewContractLast();

    //通过职员人realName来查询数据
    List<Contact> viewContractByUsername(String username);

    //通过conid来查找这一行数据
    List<Contact> viewContractByConid(int conid);

    //修改信息函数
    boolean editContract(Contact contact, int conid);

    //权限展示时候，只能展示自己的数据
    List<Contact> viewContractByPnameUsername(String pName,String username);

    //通过模糊查询订单明细中的商品名称，来查询数据
    List<Contact> viewContractByDetail(String detail);

    //通过detail和username进行查询
    List<Contact> viewContactBydetailUsername(String detail,String username);

    //通过id来查询销售备份表中的的信息
    List<SendProductCopy> viewSendProductCopy(int id);



}
