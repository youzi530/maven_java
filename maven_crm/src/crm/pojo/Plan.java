package crm.pojo;

/**
 * 日程管理类
 */
public class Plan {

    private String content; //日程内容
    private String username1; //职员姓名
    private String username2; //主管姓名

    public Plan(){
        this.content = "";
        this.username1 = "";
        this.username2 = "";
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getUsername1() {
        return username1;
    }

    public void setUsername1(String username1) {
        this.username1 = username1;
    }

    public String getUsername2() {
        return username2;
    }

    public void setUsername2(String username2) {
        this.username2 = username2;
    }

    @Override
    public String toString() {
        return "Plan{" +
                "content='" + content + '\'' +
                ", username1='" + username1 + '\'' +
                ", username2='" + username2 + '\'' +
                '}';
    }
}
