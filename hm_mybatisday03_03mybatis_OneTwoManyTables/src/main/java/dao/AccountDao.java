package dao;

import domain.Account;
import domain.AccountUser;

import java.util.List;

public interface AccountDao {

    /**
     *查询所有账户
     * @return
     */
    List<Account> findAll();

    /**
     * 查询所有账户，并且带有用户名称和地址信息
     * @return
     */
    List<AccountUser> findAllAccount();

}
