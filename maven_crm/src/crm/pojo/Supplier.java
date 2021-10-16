package crm.pojo;

/**
 * 供应商类
 */
public class Supplier {

    private int sid; //主键
    private String sName; //名称
    private String nature;  //企业属性
    private String mainProduct; //主要产品
    private String phone; //联系电话
    private String license; //营业执照

    public Supplier(){
        this.sid = 0;
        this.sName = "";
        this.nature = "";
        this.mainProduct = "";
        this.phone = "";
        this.license = "";
    }

    public int getSid() {
        return sid;
    }

    public void setSid(int sid) {
        this.sid = sid;
    }

    public String getsName() {
        return sName;
    }

    public void setsName(String sName) {
        this.sName = sName;
    }

    public String getNature() {
        return nature;
    }

    public void setNature(String nature) {
        this.nature = nature;
    }

    public String getMainProduct() {
        return mainProduct;
    }

    public void setMainProduct(String mainProduct) {
        this.mainProduct = mainProduct;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getLicense() {
        return license;
    }

    public void setLicense(String license) {
        this.license = license;
    }

    @Override
    public String toString() {
        return "Supplier{" +
                "sid=" + sid +
                ", sName='" + sName + '\'' +
                ", nature='" + nature + '\'' +
                ", mainProduct='" + mainProduct + '\'' +
                ", phone='" + phone + '\'' +
                ", license='" + license + '\'' +
                '}';
    }
}
