package crm.vojo;

public class CostManage {
    private int costId;
    private String username;
    private double income;
    private double outcome;
    private String detail;
    private String state;
    private int pursaleid;

    public CostManage() {
    }

    public CostManage(int costId, String username, double income, double outcome, String detail, String state, int pursaleid) {
        this.costId = costId;
        this.username = username;
        this.income = income;
        this.outcome = outcome;
        this.detail = detail;
        this.state = state;
        this.pursaleid = pursaleid;
    }

    public int getCostId() {
        return costId;
    }

    public void setCostId(int costId) {
        this.costId = costId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public double getIncome() {
        return income;
    }

    public void setIncome(double income) {
        this.income = income;
    }

    public double getOutcome() {
        return outcome;
    }

    public void setOutcome(double outcome) {
        this.outcome = outcome;
    }

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public int getPursaleid() {
        return pursaleid;
    }

    public void setPursaleid(int pursaleid) {
        this.pursaleid = pursaleid;
    }

    @Override
    public String toString() {
        return "CostManage{" +
                "costId=" + costId +
                ", username='" + username + '\'' +
                ", income=" + income +
                ", outcome=" + outcome +
                ", detail='" + detail + '\'' +
                ", state='" + state + '\'' +
                ", pursaleid=" + pursaleid +
                '}';
    }
}