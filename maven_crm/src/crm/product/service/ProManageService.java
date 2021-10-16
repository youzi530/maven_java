package crm.product.service;

import crm.product.dao.PurchaseManageDao;
import crm.product.dao.daoImp.PurchaseManageDaoImp;
import crm.vojo.ProductManage;

import java.util.List;

public class ProManageService {

    PurchaseManageDaoImp dao = new PurchaseManageDaoImp();

    public List<ProductManage> viewPurInfo(){return dao.viewPurInfo();}

    public List<ProductManage> viewPurchaseLast(){return dao.viewPurchaseLast();}

    public List<ProductManage> viewPurByPnameUser(String pName,String username){return dao.viewPurByPnameUser(pName,username);}

    public List<ProductManage> viewPurByPname(String pName){return dao.viewPurByPname(pName);}

    public List<ProductManage> viewPurByPid(int id){return dao.viewPurByPid(id);}

    public List<ProductManage> viewProByusername(String username){return dao.viewProByusername(username);}

    public boolean addPurManage(ProductManage productManage){return dao.addPurManage(productManage);}

    public  boolean editPurManage(ProductManage productManage, int id){return dao.editPurManage(productManage,id);}

    public boolean deletePurManage(int id){return dao.deletePurManage(id);}

}
