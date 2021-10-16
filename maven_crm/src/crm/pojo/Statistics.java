package crm.pojo;

public class Statistics {
    private int pid;
    private  String pName ;//VARCHAR (100) NOT NULL PRIMARY KEY,
    private String pType; //VARCHAR (10) NOT NULL,
    private String area ;//VARCHAR (100) NOT NULL COMMENT '根据收货区域来',
    private int num; //INT NOT NULL COMMENT '使用人数'

    public Statistics() {
        this.pid=0;
        this.pName = "";
        this.pType = "";
        this.area = "";
        this.num = 0;
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

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public int getPid() {
        return pid;
    }

    public void setPid(int pid) {
        this.pid = pid;
    }

    public int getNum() {
        return num;
    }

    public void setNum(int num) {
        this.num = num;
    }

    @Override
    public String toString() {
        return "Statistics{" +
                "pid=" + pid +
                ", pName='" + pName + '\'' +
                ", pType='" + pType + '\'' +
                ", area='" + area + '\'' +
                ", num=" + num +
                '}';
    }
}
