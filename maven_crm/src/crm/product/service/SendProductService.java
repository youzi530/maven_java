package crm.product.service;

import crm.product.dao.daoImp.SendProductDaoImp;
import crm.vojo.SendProduct;
import crm.vojo.SendProductCopy;

import java.util.List;

public class SendProductService {

    SendProductDaoImp dao = new SendProductDaoImp();

    public List<SendProduct> viewSendPro(){return dao.viewSendPro();}

    public List<SendProduct> viewSendProLast(){return dao.viewSendProLast();}

    public List<SendProduct> viewSendProById(int id){return dao.viewSendProById(id);}

    public List<SendProduct> viewSendProByUsername(String username){return dao.viewSendProByUsername(username);}

    public List<SendProduct> viewSendProByPName(String pName){return dao.viewSendProByPName(pName);}

    public List<SendProduct> viewSendProByPnameUser(String pName,String username){return dao.viewSendProByPnameUser(pName,username);}

    public boolean addSendProduct(SendProduct sendProduct){return dao.addSendProduct(sendProduct);}

    public boolean editSendProduct(SendProduct sendProduct, int id){return dao.editSendProduct(sendProduct,id);}

    public boolean deleteSendProByid(int id){return dao.deleteSendProByid(id);}

    public boolean addSendproToCopy(SendProductCopy sendProductCopy){return dao.addSendproToCopy(sendProductCopy);}
}
