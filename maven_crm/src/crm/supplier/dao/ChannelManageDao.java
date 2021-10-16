package crm.supplier.dao;

import crm.pojo.ChannelManage;
import crm.pojo.UserInfo;

import java.util.List;

public interface ChannelManageDao {
    //找到所有的渠道
    List<ChannelManage> findall();
    //通过用户名查找渠道
    List<ChannelManage> findByName(String name);
    //修改渠道
    boolean modify(ChannelManage channelManage);
    //删除渠道
    boolean delete(String name);
    //todo
    // 添加渠道
    boolean add(ChannelManage channelManage);
    //查询所有的员工信息
    List<UserInfo>findYg();

    List<ChannelManage> findByMohu(String s);
}
