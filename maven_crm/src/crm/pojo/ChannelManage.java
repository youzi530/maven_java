package crm.pojo;

public class ChannelManage {
    private String sName;//供应商名字
    private String way;//渠道
    private String username;//员工名字

    public ChannelManage() {
        this.sName = "";
        this.way = "";
        this.username = "";
    }

    public String getsName() {
        return sName;
    }

    public void setsName(String sName) {
        this.sName = sName;
    }

    public String getWay() {
        return way;
    }

    public void setWay(String way) {
        this.way = way;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public String toString() {
        return "ChannelManage{" +
                "sName='" + sName + '\'' +
                ", way='" + way + '\'' +
                ", username='" + username + '\'' +
                '}';
    }
}
