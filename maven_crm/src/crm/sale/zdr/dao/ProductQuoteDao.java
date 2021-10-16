package crm.sale.zdr.dao;

import crm.vojo.ProductQuote;

import java.util.List;

public interface ProductQuoteDao {
    //查看所有的报价管理
    List<ProductQuote> viewAll();
    //修改报价管理
    boolean modify(ProductQuote productQuote);
    //添加报价管理
    boolean add(ProductQuote productQuote);
    //根据商品名字删除报价管理
    boolean delete(int name);


    List<ProductQuote>  findByid(int pid);

    List<ProductQuote> findMohu(String s);
}
