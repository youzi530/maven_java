package crm.vojo;

public class ProductManage {
    private int id;
    private String pName;
    private String username;
    private int inNum;
    private int outNum;

    public ProductManage() {

    }

    public ProductManage(int id, String pName, String username, int inNum, int outNum) {
        this.id = id;
        this.pName = pName;
        this.username = username;
        this.inNum = inNum;
        this.outNum = outNum;
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

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getInNum() {
        return inNum;
    }

    public void setInNum(int inNum) {
        this.inNum = inNum;
    }

    public int getOutNum() {
        return outNum;
    }

    public void setOutNum(int outNum) {
        this.outNum = outNum;
    }

    @Override
    public String toString() {
        return "ProductManage{" +
                "id=" + id +
                ", pName='" + pName + '\'' +
                ", username='" + username + '\'' +
                ", inNum=" + inNum +
                ", outNum=" + outNum +
                '}';
    }
}
