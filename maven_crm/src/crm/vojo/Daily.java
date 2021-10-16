package crm.vojo;

public class Daily {
    private int did;
    private int tablenumber;
    private String operation;
    private String time;

    public Daily() {
    }

    public Daily(int did, int tablenumber, String operation, String time) {
        this.did = did;
        this.tablenumber = tablenumber;
        this.operation = operation;
        this.time = time;
    }

    public int getDid() {
        return did;
    }

    public void setDid(int did) {
        this.did = did;
    }

    public int getTablenumber() {
        return tablenumber;
    }

    public void setTablenumber(int tablenumber) {
        this.tablenumber = tablenumber;
    }

    public String getOperation() {
        return operation;
    }

    public void setOperation(String operation) {
        this.operation = operation;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    @Override
    public String toString() {
        return "Daily{" +
                "did=" + did +
                ", tablenumber=" + tablenumber +
                ", operation='" + operation + '\'' +
                ", time='" + time + '\'' +
                '}';
    }
}
