package crm.manage.dao;

import crm.pojo.EmailManage;

import java.util.List;

public interface MailDao {



        /**
         * 添加
         * @param var
         * @return
         */
        boolean add(EmailManage var);

        /**
         * 管理员查询所有
         * @return
         */
        List<EmailManage> query();

        /**
         * 用户查询自己的部分
         * @return
         */
        List<EmailManage> query(int userId);


        /**
         *在页面上可以删除
         * @param var 删除内容
         * @return
         */
        boolean delete(int var);



        /**
         * 查询邮件信息
         * @return
         */

        EmailManage queryFun(String var);


/*
查询刚刚插入的最大值
 */
        List<EmailManage> viewMax();


    }


