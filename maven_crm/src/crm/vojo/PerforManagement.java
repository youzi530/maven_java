package crm.vojo;

public class PerforManagement {
    private int perid;
    private String username;
    private int saleOrderNum;
    private int contractNum;
    private double contractMoney;

    public PerforManagement() {
    }

    public PerforManagement(int perid, String username, int saleOrderNum, int contractNum, double contractMoney) {
        this.perid = perid;
        this.username = username;
        this.saleOrderNum = saleOrderNum;
        this.contractNum = contractNum;
        this.contractMoney = contractMoney;
    }

    public int getPerid() {
        return perid;
    }

    public void setPerid(int perid) {
        this.perid = perid;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getSaleOrderNum() {
        return saleOrderNum;
    }

    public void setSaleOrderNum(int saleOrderNum) {
        this.saleOrderNum = saleOrderNum;
    }

    public int getContractNum() {
        return contractNum;
    }

    public void setContractNum(int contractNum) {
        this.contractNum = contractNum;
    }

    public double getContractMoney() {
        return contractMoney;
    }

    public void setContractMoney(double contractMoney) {
        this.contractMoney = contractMoney;
    }

    @Override
    public String toString() {
        return "PerforManagement{" +
                "perid=" + perid +
                ", username='" + username + '\'' +
                ", saleOrderNum=" + saleOrderNum +
                ", contractNum=" + contractNum +
                ", contractMoney=" + contractMoney +
                '}';
    }
}
