package crm.product.service;

import crm.product.dao.daoImp.SaleDaoImp;
import crm.vojo.Sale;

import java.util.List;

public class SaleService {

    SaleDaoImp dao = new SaleDaoImp();

    public List<Sale> viewSaleInfo(){return dao.viewSaleInfo();}

    public List<Sale> viewSalesLast(){return dao.viewSalesLast();}

    public int viewIdBypName(String pName){return dao.viewIdBypName(pName);}

    public List<Sale> viewSalesByPname(String pName){return dao.viewSalesByPname(pName);}

    public List<Sale> viewSaleByCid(int cid){return dao.viewSaleByCid(cid);}

    public List<Sale> viewSaleByUsername(String username){return dao.viewSaleByUsername(username);}

    public boolean addSale(Sale sale){return dao.addSale(sale);}

    public boolean editSaleByTwo(Sale sale, int cid, int pid){return dao.editSaleByTwo(sale,cid,pid);}

    public boolean editSaleByCid(Sale sale, int cid){return dao.editSaleByCid(sale,cid);}

    public boolean deleteSale(int cid, int pid){return dao.deleteSale(cid,pid);}

    public boolean deleteSaleBycid(int cid){return dao.deleteSaleBycid(cid);}

    public List<Sale> viewSaleByPnameUser(String pName,String username){return dao.viewSaleByPnameUser(pName,username);}

    public List<Sale> viewSaleByPnameusername(String pName,String username){return dao.viewSaleByPnameusername(pName,username);}
}
