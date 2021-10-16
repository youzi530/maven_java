package crm.pojo;

public class CostAnalysis {
    private int pid;
    private String pName;
    private String pType;
    private double cPrice;// DOUBLE NOT NULL COMMENT '商品表中的成本',
    private double storePrice;// DOUBLE NOT NULL COMMENT '仓储费用',
    private double advicePrice;// DOUBLE NOT NULL COMMENT '建议出厂价',
    private double profit;

    public CostAnalysis() {
        this.pid = 0;
        this.pName = "";
        this.pType = "";
        this.cPrice = 0;
        this.storePrice = 0;
        this.advicePrice = 0;
        this.profit = 0;
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

    public double getStorePrice() {
        return storePrice;
    }

    public void setStorePrice(double storePrice) {
        this.storePrice = storePrice;
    }

    public double getAdvicePrice() {
        return advicePrice;
    }

    public void setAdvicePrice(double advicePrice) {
        this.advicePrice = advicePrice;
    }

    public double getProfit() {
        return profit;
    }

    public void setProfit(double profit) {
        this.profit = profit;
    }

    @Override
    public String toString() {
        return "CostAnalysis{" +
                "pid=" + pid +
                ", pName='" + pName + '\'' +
                ", pType='" + pType + '\'' +
                ", cPrice=" + cPrice +
                ", storePrice=" + storePrice +
                ", advicePrice=" + advicePrice +
                ", profit=" + profit +
                '}';
    }
}
