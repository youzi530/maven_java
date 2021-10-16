package crm.sale.lingqiao.dao;

import crm.vojo.CostManage;

import java.util.List;

public interface ExpenseManageDao {

    //费用管理页面，查询所有的相关信息
    List<CostManage> viewExpenseManage();

    //费用管理添加函数
    boolean addExpenseManage(CostManage costManage);

    //查找最后一条数据，这里在添加信息的时候用到，需要重新查找最后一条数据来展示到页面上去
    List<CostManage> viewExpenseManageLast();

    //管理模块，删除功能
    boolean deleteExpMaByCostid(int costId);

    //通过职员人realName来查询数据
    List<CostManage> viewExpMaByUsername(String username);

    //通过costId来查找这一行数据
    List<CostManage> viewExpMaByCostid(int costId);

    //修改信息函数
    boolean editExpMa(CostManage costManage, int costId);

    //通过username来查询这个表中的数据
    List<CostManage> viewCostmanageByUsername(String username);

    //通过费用管理中的明细来查询---这是管理员的查询
    List<CostManage> viewCostmanageByDetail(String detail);

    //通过明细和身份来查询，这是适用于普通用户
    List<CostManage> viewCostmanageByDetailUser(String detail,String username);

    //通过username来修改该用户的支出
    boolean editOutcomeByUsername(String username,double outcome);

    //通过username和pursaleid来更新outcome和details
    boolean editOutcomeDetail(String username,int pursaleid,double outcome,String detail);

    //当合同审核成功后，在费用管理里面添加一条记录
    boolean addToExpenseManage(CostManage costManage);

    //当合同审核失败的时候，通过pursaleid来删除
    boolean deleteCostmanageByid(int pursaleid);




}
