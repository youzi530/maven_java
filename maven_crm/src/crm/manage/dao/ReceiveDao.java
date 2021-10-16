package crm.manage.dao;

import crm.pojo.Receive;

import java.util.List;

public interface ReceiveDao {



    /**
     * 添加
     * @param var
     * @return
     */
    boolean add(Receive var);

    /**
     * 管理员查询所有
     * @return
     */
    List<Receive> query();


    /**
     * 用户查询自己的部分
     * @return
     */
    List<Receive> query(int userId);



    /**
     *在页面上可以删除
     * @param var 删除内容
     * @return
     */
    boolean delete(int var);


    /**
     * 更新状态
     * @return
     */
    boolean update(Receive receive);




    /**
     * 查询信息
     * @return
     */

    Receive queryFun(String var);


    boolean status(int id);
}
