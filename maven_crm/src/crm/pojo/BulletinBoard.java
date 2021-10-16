package crm.pojo;

/**
 * 公告栏类
 */
public class BulletinBoard {

    private String theme; //主题
    private String content; //内容
    private String releaseDate; //发布日期

    public BulletinBoard(){
        this.theme = "";
        this.content = "";
        this.releaseDate = "";
    }

    public String getTheme() {
        return theme;
    }

    public void setTheme(String theme) {
        this.theme = theme;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(String releaseDate) {
        this.releaseDate = releaseDate;
    }

    @Override
    public String toString() {
        return "BulletinBoard{" +
                "theme='" + theme + '\'' +
                ", content='" + content + '\'' +
                ", releaseDate='" + releaseDate + '\'' +
                '}';
    }
}
