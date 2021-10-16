package dao;

import domain.Account;

import java.util.List;

public interface AccountDao {

    /**
     *查询所有账户
     * @return
     */
    List<Account> findAll();

    /**
     * 根据id查询账户信息
     * @param uid
     * @return
     */
    List<Account> findAccountByUid(Integer uid);

}
