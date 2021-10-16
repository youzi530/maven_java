package crm.pojo;

/**
 * 商品类
 */
public class Product {

    private int pid; //主键
    private String sName; //商品名称
    private String pName; //供应商名称
    private String pType; //商品类型
    private double pPrice; //商品价格
    private int pNum; //库存量
    private String pDescription; //商品描述

    public Product(){
        this.pid = 0;
        this.sName = "";
        this.pName = "";
        this.pType = "";
        this.pPrice = 0.00;
        this.pNum = 0;
        this.pDescription = "";
    }

    public int getPid() {
        return pid;
    }

    public void setPid(int pid) {
        this.pid = pid;
    }

    public String getsName() {
        return sName;
    }

    public void setsName(String sName) {
        this.sName = sName;
    }

    public String getpName() {
        return pName;
    }

    public void setpName(String pName) {
        this.pName = pName;
    }

    public String getpType() {
        return pType;
    }

    public void setpType(String pType) {
        this.pType = pType;
    }

    public double getpPrice() {
        return pPrice;
    }

    public void setpPrice(double pPrice) {
        this.pPrice = pPrice;
    }

    public int getpNum() {
        return pNum;
    }

    public void setpNum(int pNum) {
        this.pNum = pNum;
    }

    public String getpDescription() {
        return pDescription;
    }

    public void setpDescription(String pDescription) {
        this.pDescription = pDescription;
    }

    @Override
    public String toString() {
        return "Product{" +
                "pid=" + pid +
                ", sName='" + sName + '\'' +
                ", pName='" + pName + '\'' +
                ", pType='" + pType + '\'' +
                ", pPrice=" + pPrice +
                ", pNum=" + pNum +
                ", pDescription='" + pDescription + '\'' +
                '}';
    }
}
