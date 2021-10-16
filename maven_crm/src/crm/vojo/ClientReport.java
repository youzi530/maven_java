package crm.vojo;

/**
 * 用户报表类
 */
public class ClientReport {

    private int rank; //等级
    private int num; //数量

    public ClientReport(){
        this.rank = 0;
        this.num = 0;
    }

    public int getRank() {
        return rank;
    }

    public void setRank(int rank) {
        this.rank = rank;
    }

    public int getNum() {
        return num;
    }

    public void setNum(int num) {
        this.num = num;
    }

    @Override
    public String toString() {
        return "ClientReport{" +
                "rank=" + rank +
                ", num=" + num +
                '}';
    }
}
