package crm.vojo;

public class Contact {
    private int conid;
    private String cName;
    private String detail;
    private String username;
    private String giveaway;
    private String state;
    private String checkTime;

    public Contact() {
    }

    public Contact(int conid, String cName, String detail, String username, String giveaway, String state, String checkTime) {
        this.conid = conid;
        this.cName = cName;
        this.detail = detail;
        this.username = username;
        this.giveaway = giveaway;
        this.state = state;
        this.checkTime = checkTime;
    }

    public int getConid() {
        return conid;
    }

    public void setConid(int conid) {
        this.conid = conid;
    }

    public String getcName() {
        return cName;
    }

    public void setcName(String cName) {
        this.cName = cName;
    }

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getGiveaway() {
        return giveaway;
    }

    public void setGiveaway(String giveaway) {
        this.giveaway = giveaway;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCheckTime() {
        return checkTime;
    }

    public void setCheckTime(String checkTime) {
        this.checkTime = checkTime;
    }

    @Override
    public String toString() {
        return "Contact{" +
                "conid=" + conid +
                ", cName='" + cName + '\'' +
                ", detail='" + detail + '\'' +
                ", username='" + username + '\'' +
                ", giveaway='" + giveaway + '\'' +
                ", state='" + state + '\'' +
                ", checkTime='" + checkTime + '\'' +
                '}';
    }
}