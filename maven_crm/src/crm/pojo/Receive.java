package crm.pojo;

public class Receive {

    private int id; //主键
    private String username; //职工姓名
    private int userId;  //职工ID
    private String receiveMan; //另一个职工姓名
    private int receiveId;  //另一个职工ID
    private String content; //邮件内容
    private String ready; //状态

    public Receive(){
        this.id = 0;
        this.username = "";
        this.userId = 0;
        this.receiveMan = "";
        this.receiveId = 0;
        this.content = "";
        this.ready = "";
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getReceiveMan() {
        return receiveMan;
    }

    public void setReceiveMan(String receiveMan) {
        this.receiveMan = receiveMan;
    }

    public int getReceiveId() {
        return receiveId;
    }

    public void setReceiveId(int receiveId) {
        this.receiveId = receiveId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getReady() {
        return ready;
    }

    public void setReady(String ready) {
        this.ready = ready;
    }

    @Override
    public String toString() {
        return "Receive{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", userId=" + userId +
                ", receiveMan='" + receiveMan + '\'' +
                ", receiveId=" + receiveId +
                ", content='" + content + '\'' +
                ", ready='" + ready + '\'' +
                '}';
    }
}
