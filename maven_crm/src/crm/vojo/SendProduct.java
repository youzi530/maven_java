package crm.vojo;

public class SendProduct {
    private int id;
    private String pName;
    private String address;
    private String clientName;
    private String username;
    private double salePrice;
    private int saleNum;
    private int saleid;

    public SendProduct() {

    }

    public SendProduct(int id, String pName, String address, String clientName, String username, double salePrice, int saleNum, int saleid) {
        this.id = id;
        this.pName = pName;
        this.address = address;
        this.clientName = clientName;
        this.username = username;
        this.salePrice = salePrice;
        this.saleNum = saleNum;
        this.saleid = saleid;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getpName() {
        return pName;
    }

    public void setpName(String pName) {
        this.pName = pName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
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

    public int getSaleid() {
        return saleid;
    }

    public void setSaleid(int saleid) {
        this.saleid = saleid;
    }

    @Override
    public String toString() {
        return "SendProduct{" +
                "id=" + id +
                ", pName='" + pName + '\'' +
                ", address='" + address + '\'' +
                ", clientName='" + clientName + '\'' +
                ", username='" + username + '\'' +
                ", salePrice=" + salePrice +
                ", saleNum=" + saleNum +
                ", saleid=" + saleid +
                '}';
    }
}
