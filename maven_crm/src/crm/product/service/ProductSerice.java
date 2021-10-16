package crm.product.service;

import crm.pojo.Product;
import crm.pojo.Supplier;
import crm.pojo.UserInfo;
import crm.product.dao.daoImp.ProductDaoImp;

import java.util.List;

public class ProductSerice {

    ProductDaoImp productDaoImp = new ProductDaoImp();

    public List<Product> viewProInfo(){
        return productDaoImp.viewProInfo();
    }

    public List<Product> viewProLast(){return productDaoImp.viewProLast();}

    public List<Product> viewProByPid(int pid){return productDaoImp.viewProByPid(pid);}

    public List<Product> viewProByPname(String pName){return productDaoImp.viewProByPname(pName);}

    public boolean addProduct(Product product){return productDaoImp.addProduct(product);}

    public boolean editProduct(Product product, int pid){return productDaoImp.editProduct(product,pid);}

    public boolean deleteProduct(int pid){return productDaoImp.deleteProduct(pid);}

    public List<Supplier> viewSupplier(){return productDaoImp.viewSupplier();}

    public List<UserInfo> viewUserInfo(){return productDaoImp.viewUserInfo();}

    public boolean addProNum(int pid,int num){return productDaoImp.addProNum(pid,num);}
}
