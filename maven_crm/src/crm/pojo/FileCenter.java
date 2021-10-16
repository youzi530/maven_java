package crm.pojo;

/**
 * 文件中心类
 */
public class FileCenter {

    private int id; //主键
    private String filename; //文件名称
    private  String description;
    private String date; //上传日期
    private String uri; //文件地址

    public FileCenter(){
        this.description="";
        this.id = 0;
        this.filename = "";
        this.date = "";
        this.uri = "";
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getUri() {
        return uri;
    }

    public void setUri(String uri) {
        this.uri = uri;
    }

    public FileCenter( String filename, String description, String date, String uri) {
        this.filename = filename;
        this.description = description;
        this.date = date;
        this.uri = uri;
    }

    @Override
    public String toString() {
        return "FileCenter{" +
                "id=" + id +
                ", filename='" + filename + '\'' +
                ", description='" + description + '\'' +
                ", date='" + date + '\'' +
                ", uri='" + uri + '\'' +
                '}';
    }
}
