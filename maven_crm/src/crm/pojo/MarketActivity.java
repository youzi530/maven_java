package crm.pojo;

/**
 * 市场活动类
 */
public class MarketActivity {

    private int mid; //主键
    private String name; //活动名称
    private String time; //活动时间
    private String address; //活动地址
    private String gift; //活动礼品
    private String organizer; //活动组织者 要是主管
    private String partner; //参与者

    public MarketActivity() {
        this.mid = 0;
        this.name = "";
        this.time = "";
        this.address = "";
        this.gift = "";
        this.organizer = "";
        this.partner = "";
    }

    public int getMid() {
        return mid;
    }

    public void setMid(int mid) {
        this.mid = mid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getGift() {
        return gift;
    }

    public void setGift(String gift) {
        this.gift = gift;
    }

    public String getOrganizer() {
        return organizer;
    }

    public void setOrganizer(String organizer) {
        this.organizer = organizer;
    }

    public String getPartner() {
        return partner;
    }

    public void setPartner(String partner) {
        this.partner = partner;
    }

    @Override
    public String toString() {
        return "MarketActivity{" +
                "mid=" + mid +
                ", name='" + name + '\'' +
                ", time='" + time + '\'' +
                ", address='" + address + '\'' +
                ", gift='" + gift + '\'' +
                ", organizer='" + organizer + '\'' +
                ", partner='" + partner + '\'' +
                '}';
    }
}
