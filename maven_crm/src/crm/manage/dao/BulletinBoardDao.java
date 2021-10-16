package crm.manage.dao;


import crm.pojo.BulletinBoard;

import java.util.List;

public interface BulletinBoardDao {

    /**
     * 添加公告
     * @param var 公告信息
     * @return
     */
    boolean add(BulletinBoard var);

    /**
     * 用户查询所有公告
     * @return
     */
    List<BulletinBoard> query();


    /**
     *只有管理员在页面上可以删除
     * @param var 删除内容
     * @return
     */
    boolean delete(String var);


    /**
     * 更新公告信息
     * @return
     */
    boolean update(BulletinBoard bulletinboard);

    /**
     * 获取公告信息（当公告进行更新操作时能够进行填充）
     * @param var
     * @return
     */


    BulletinBoard getBulletinBoard(String var);



    /**
     * 查询公告信息
     * @return
     */

    List<BulletinBoard> queryFun(String var);



}
