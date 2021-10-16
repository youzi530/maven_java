package crm.sale.lingqiao.dao;

import crm.vojo.PerforManagement;

import java.util.List;

public interface PerformanceManageDao {

    //查询函数
    List<PerforManagement> viewPerforManage();

    //通过username来查询
    List<PerforManagement> viewPerforManageByUsername(String username);

    //通过id来删除记录
    boolean deletePerformance(int perid);

    //添加一条记录
    boolean addPerformance(PerforManagement perforManagement);

    //查看最后一条记录
    List<PerforManagement> viewPerfomanceLast();

    //通过id来查询相关信息
    List<PerforManagement> viewPerfomanceById(int perid);

    //通过id来修改信息
    boolean editPerfomanceByid(PerforManagement perforManagement,int perid);

    //通过username来查询是否有这条记录
    boolean isEistMss(String username);

    //通过username来修改信息
    boolean editPerfanceByUsername(PerforManagement perforManagement,String username);

    //通过username来模糊查询
    List<PerforManagement> viewPerforMaByUsername(String username);


}
