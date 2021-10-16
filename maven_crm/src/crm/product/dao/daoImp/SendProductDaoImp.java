package crm.product.dao.daoImp;

import crm.pojo.ClientInfo;
import crm.product.dao.SendProductDao;
import crm.vojo.SendProduct;
import crm.vojo.SendProductCopy;
import org.apache.commons.dbutils.handlers.BeanListHandler;
import org.junit.Test;

import java.sql.SQLException;
import java.util.List;
import static crm.utils.C3p0Utils.queryRunner;

public class SendProductDaoImp implements SendProductDao {
    @Override
    public List<SendProduct> viewSendPro() {
        String sql ="select * from sendProduct";
        try {
            return queryRunner.query(sql,new BeanListHandler<SendProduct>(SendProduct.class));
        } catch (SQLException e) {
            return null;
        }
    }

    @Override
    public List<SendProduct> viewSendProLast() {
        String sql ="select * from sendProduct ORDER BY id desc LIMIT 1";
        try {
            return queryRunner.query(sql,new BeanListHandler<SendProduct>(SendProduct.class));
        } catch (SQLException e) {
            return null;
        }
    }

    @Override
    public List<SendProduct> viewSendProById(int id) {
        String sql ="select * from sendProduct where id = ?";
        try {
            return queryRunner.query(sql,new BeanListHandler<SendProduct>(SendProduct.class),id);
        } catch (SQLException e) {
            return null;
        }
    }

    @Override
    public List<SendProduct> viewSendProByUsername(String username) {
        String sql ="select * from sendProduct where username like ?";
        try {
            return queryRunner.query(sql,new BeanListHandler<SendProduct>(SendProduct.class),username);
        } catch (SQLException e) {
            return null;
        }
    }

    @Override
    public List<SendProduct> viewSendProByPName(String pName) {
        String sql ="select * from sendProduct where pName like ?";
        try {
            return queryRunner.query(sql,new BeanListHandler<SendProduct>(SendProduct.class),pName);
        } catch (SQLException e) {
            return null;
        }
    }

    @Override
    public List<SendProduct> viewSendProByPnameUser(String pName, String username) {
        String sql = "select * from sendProduct where pName like ? and username = ?";
        try {
            return queryRunner.query(sql,new BeanListHandler<SendProduct>(SendProduct.class),pName,username);
        } catch (SQLException e) {
            return null;
        }
    }

    @Override
    public boolean addSendProduct(SendProduct sendProduct) {
        String sql = "insert into sendProduct(id,pName,address,clientName,username,salePrice,saleNum,saleid) values(null,?,?,?,?,?,?,?)";
        try {
            int update = queryRunner.update(sql, sendProduct.getpName(), sendProduct.getAddress(),sendProduct.getClientName(),sendProduct.getUsername(),sendProduct.getSalePrice(),sendProduct.getSaleNum(),sendProduct.getSaleid());
            if(update!=0){
                return true;
            }else{
                return false;
            }
        } catch (SQLException e) {
            return false;
        }
    }

    @Override
    public boolean editSendProduct(SendProduct sendProduct, int id) {
        String sql= "update sendProduct set pName=?, address=?,clientName=?,username=?,salePrice=?,saleNum=? where id=?";
        try {
            int update = queryRunner.update(sql,sendProduct.getpName(),sendProduct.getAddress(),sendProduct.getClientName(),sendProduct.getUsername(),sendProduct.getSalePrice(),sendProduct.getSaleNum(),id);
            if(update!=0){
                return true;
            }else{
                return false;
            }

        } catch (SQLException e) {
            return false;
        }
    }

    @Override
    public boolean deleteSendProByid(int id) {
        String sql = "delete from sendProduct where id = ? ";
        try {
            int update = queryRunner.update(sql, id);
            if(update!=0){
                return true;
            }else{
                return false;
            }
        } catch (SQLException e) {
            return false;
        }
    }

    @Override
    public boolean addSendproToCopy(SendProductCopy sendProductCopy) {
        String sql = "insert into sendProductCopy(id,pName,address,clientName,username,state,conid,salePrice,saleNum,saleid) values(?,?,?,?,?,?,?,?,?,?)";
        try {
            int update = queryRunner.update(sql, sendProductCopy.getId(), sendProductCopy.getpName(),sendProductCopy.getAddress(), sendProductCopy.getClientName(), sendProductCopy.getUsername(), sendProductCopy.getState(), sendProductCopy.getConid(),sendProductCopy.getSalePrice(),sendProductCopy.getSaleNum(),sendProductCopy.getSaleid());
            if(update!=0){
                return true;
            }else{
                return false;
            }
        } catch (SQLException e) {
            return false;
        }
    }

    @Override
    public List<ClientInfo> viewClientInfo(){
        String sql ="select * from clientInfo";
        try {
            return queryRunner.query(sql,new BeanListHandler<ClientInfo>(ClientInfo.class));
        } catch (SQLException e) {
            return null;
        }
    }

    @Override
    public boolean addSaleToSendproduct(SendProduct sendProduct) {
        String sql ="insert into sendProduct(id,pName,address,clientName,username,salePrice,saleNum,saleid) values(null,?,?,?,?,?,?,?)";
        try {
            int update = queryRunner.update(sql, sendProduct.getpName(), sendProduct.getAddress(), sendProduct.getClientName(), sendProduct.getUsername(), sendProduct.getSalePrice(), sendProduct.getSaleNum(),sendProduct.getSaleid());
            if(update!=0){
                return true;
            }else{
                return false;
            }
        } catch (SQLException e) {
            return false;
        }
    }

    @Override
    public boolean editSaleBysaleid(double salePrice,int saleNum, int saleid) {
        String sql= "update sendProduct set salePrice=?,saleNum=? where saleid=?";
        try {
            int update = queryRunner.update(sql,salePrice,saleNum,saleid);
            if(update!=0){
                return true;
            }else{
                return false;
            }

        } catch (SQLException e) {
            return false;
        }
    }

    @Override
    public boolean editSenproBysaleid(SendProduct sendProduct, int saleid) {
        String sql= "update sendProduct set pName=?,username=?,salePrice=?,saleNum=? where saleid=?";
        try {
            int update = queryRunner.update(sql,sendProduct.getpName(),sendProduct.getUsername(),sendProduct.getSalePrice(),sendProduct.getSaleNum(),saleid);
            if(update!=0){
                return true;
            }else{
                return false;
            }

        } catch (SQLException e) {
            return false;
        }
    }

    @Override
    public List<SendProductCopy> viewSaleidById(int id) {
        String sql ="select * from sendProductCopy where id = ?";
        try {
            return queryRunner.query(sql,new BeanListHandler<SendProductCopy>(SendProductCopy.class),id);
        } catch (SQLException e) {
            return null;
        }
    }

    @Test
    public void test(){
        System.out.println(viewSendPro());
    }
}
