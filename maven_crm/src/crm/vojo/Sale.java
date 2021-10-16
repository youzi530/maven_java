package crm.vojo;

public class Sale {
    private int cid;
    private int pid;
    private String pName;
    private double salePrice;
    private int saleNum;
    private String username;
    private String  sate;

    public Sale() {
    }

    public Sale(int cid, int pid, String pName, double salePrice, int saleNum, String username, String sate) {
        this.cid = cid;
        this.pid = pid;
        this.pName = pName;
        this.salePrice = salePrice;
        this.saleNum = saleNum;
        this.username = username;
        this.sate = sate;
    }

    public int getCid() {
        return cid;
    }

    public void setCid(int cid) {
        this.cid = cid;
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

    public double getSalePrice() {
        return salePrice;
    }

    public void setSalePrice(double salePrice) {
        this.salePrice = salePrice;
    }

    public int getSaleNum() {
        return saleNum;
    }

    public void setSaleNum(int saleNum) {
        this.saleNum = saleNum;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getSate() {
        return sate;
    }

    public void setSate(String sate) {
        this.sate = sate;
    }

    @Override
    public String toString() {
        return "Sale{" +
                "cid=" + cid +
                ", pid=" + pid +
                ", pName='" + pName + '\'' +
                ", salePrice=" + salePrice +
                ", saleNum=" + saleNum +
                ", username='" + username + '\'' +
                ", sate='" + sate + '\'' +
                '}';
    }
}
