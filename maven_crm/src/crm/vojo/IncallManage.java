package crm.vojo;

public class IncallManage {
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    private int id;
    private String sName;//供应商名字
    private String content;//内容

    public String getsName() {
        return sName;
    }

    public void setsName(String sName) {
        this.sName = sName;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public IncallManage() {
        this.id=0;
        this.sName = "";
        this.content = "";
    }

    @Override
    public String toString() {
        return "IncallManage{" +
                "id=" + id +
                ", sName='" + sName + '\'' +
                ", content='" + content + '\'' +
                '}';
    }
}
