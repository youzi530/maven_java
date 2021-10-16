package crm.vojo;

public class ProductQuote {
    private int pid;
    private String pName;//商品名字
    private String pType;//上坪类别
    private double cPrice;//三个价格
    private double sPrice;
    private double dPrice;

    public ProductQuote() {
        this.pid=0;
        this.pName = "";
        this.pType = "";
        this.cPrice = 0;
        this.sPrice = 0;
        this.dPrice = 0;
    }

    public int getPid() {
        return pid;
    }

    public void setPid(int pid) {
        this.pid = pid;
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

    public double getcPrice() {
        return cPrice;
    }

    public void setcPrice(double cPrice) {
        this.cPrice = cPrice;
    }

    public double getsPrice() {
        return sPrice;
    }

    public void setsPrice(double sPrice) {
        this.sPrice = sPrice;
    }

    public double getdPrice() {
        return dPrice;
    }

    public void setdPrice(double dPrice) {
        this.dPrice = dPrice;
    }

    @Override
    public String toString() {
        return "ProductQuote{" +
                "pid=" + pid +
                ", pName='" + pName + '\'' +
                ", pType='" + pType + '\'' +
                ", cPrice=" + cPrice +
                ", sPrice=" + sPrice +
                ", dPrice=" + dPrice +
                '}';
    }
}
