package crm.vojo;

public class ContactRecord {

    private int id; //主键自增
    private int linkmanId; //用户id
    private int clientId; //客户id
    private String content; //联系内容
    private String contactTime; //联系时间

    public ContactRecord(){
        this.id = 0;
        this.linkmanId = 0;
        this.clientId = 0;
        this.content = "";
        this.contactTime = "";
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getLinkmanId() {
        return linkmanId;
    }

    public void setLinkmanId(int linkmanId) {
        this.linkmanId = linkmanId;
    }

    public int getClientId() {
        return clientId;
    }

    public void setClientId(int clientId) {
        this.clientId = clientId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getContactTime() {
        return contactTime;
    }

    public void setContactTime(String contactTime) {
        this.contactTime = contactTime;
    }

    @Override
    public String toString() {
        return "ContactRecord{" +
                "id=" + id +
                ", linkmanId=" + linkmanId +
                ", clientId=" + clientId +
                ", content='" + content + '\'' +
                ", contactTime='" + contactTime + '\'' +
                '}';
    }
}
