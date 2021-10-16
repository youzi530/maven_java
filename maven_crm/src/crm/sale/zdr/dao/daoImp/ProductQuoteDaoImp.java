package crm.sale.zdr.dao.daoImp;

import crm.sale.zdr.dao.ProductQuoteDao;
import crm.utils.C3p0Utils;
import crm.vojo.ProductQuote;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanListHandler;
import org.junit.Test;

import java.sql.SQLException;
import java.util.List;

import static crm.utils.C3p0Utils.queryRunner;

public class ProductQuoteDaoImp implements ProductQuoteDao {
    QueryRunner queryRunner=new QueryRunner(C3p0Utils.getDataSource());
    @Override
    public List<ProductQuote> viewAll() {
        String sql="select * from productQuote";
        try {
            List<ProductQuote>list=queryRunner.query(sql,new BeanListHandler<ProductQuote>(ProductQuote.class));
            if(list.isEmpty()){
                return null;}
            else{
                return list;
            }
        } catch (SQLException e) {
            return null;
        }
    }

    @Override
    public boolean modify(ProductQuote productQuote) {
        String sql="update productQuote set cPrice=?,sPrice=?,dPrice=?where pid=?";
        try {
            queryRunner.update(sql,productQuote.getcPrice(),productQuote.getsPrice(),productQuote.getdPrice(),productQuote.getPid());
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean add(ProductQuote productQuote) {
        String sql="insert into productQuote values(?,?,?,?,?,?)";
        try {
            queryRunner.update(sql,productQuote.getPid(),productQuote.getpName(),productQuote.getpType(),productQuote.getcPrice(),productQuote.getsPrice(),productQuote.getdPrice());
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean delete(int name) {
        String sql="delete from productQuote where pid=?";
        try {
            queryRunner.update(sql,name);
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public List<ProductQuote> findByid(int pid) {
        String sql="select * from productQuote where pid=?";
        List<ProductQuote>list = null;
        try {
            list = queryRunner.query(sql,pid,new BeanListHandler<ProductQuote>(ProductQuote.class));
            return list;
//            return list;
        } catch (SQLException e) {
            return null;
        }
    }

    @Override
    public List<ProductQuote> findMohu(String pName) {
        String sql="select * from productQuote where pName like ?";
        List<ProductQuote> list  = null;
        try {
            list=queryRunner.query(sql,"%"+pName+"%",new BeanListHandler<ProductQuote>(ProductQuote.class));
            return list;
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }

    }

    @Test
    public void ceshi(){
        //ceshiviewalll()
        System.out.println(viewAll());
        //测试修改
//        ProductQuote productQuote=new ProductQuote();
//        productQuote.setpName("雪碧");
//        productQuote.setcPrice(2);
//        productQuote.setsPrice(23);
//        System.out.println(modify(productQuote));
//        System.out.println(viewAll());
        //添加
        ProductQuote productQuote2=new ProductQuote();
        productQuote2.setpName("槟榔");
        productQuote2.setpType("yignliao");
        productQuote2.setcPrice(2);
        productQuote2.setsPrice(23);
        System.out.println(add(productQuote2));
        System.out.println(viewAll());
//        删除
//        delete("槟榔");
//        System.out.println(viewAll());
    }
}
