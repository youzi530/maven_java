package crm.pojo;

public class LinkmanInfo {

    private int id; //工号
    private String clientName; //客户姓名
    private String linkmanName; //联系人姓名
    private String sex; //性别
    private int age; //年龄
    private String department; //职员所属部门
    private String duty; //职务
    private String superChange; //上级主管
    private String workPhone; //办公电话
    private String mobile; //手机号
    private String birthday; //生日
    private String hobby; //个人爱好
    private String remark; //备注信息

    public LinkmanInfo(){
        this.id = 0;
        this.clientName = "";
        this.linkmanName = "";
        this.sex = "";
        this.age = 0;
        this.department = "";
        this.duty = "";
        this.superChange = "";
        this.workPhone = "";
        this.mobile = "";
        this.birthday = "";
        this.hobby = "";
        this.remark = "";
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    public String getLinkmanName() {
        return linkmanName;
    }

    public void setLinkmanName(String linkmanName) {
        this.linkmanName = linkmanName;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getDuty() {
        return duty;
    }

    public void setDuty(String duty) {
        this.duty = duty;
    }

    public String getSuperChange() {
        return superChange;
    }

    public void setSuperChange(String superChange) {
        this.superChange = superChange;
    }

    public String getWorkPhone() {
        return workPhone;
    }

    public void setWorkPhone(String workPhone) {
        this.workPhone = workPhone;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getBirthday() {
        return birthday;
    }

    public void setBirthday(String birthday) {
        this.birthday = birthday;
    }

    public String getHobby() {
        return hobby;
    }

    public void setHobby(String hobby) {
        this.hobby = hobby;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    @Override
    public String toString() {
        return "LinkmanInfo{" +
                "id=" + id +
                ", clientName='" + clientName + '\'' +
                ", linkmanName='" + linkmanName + '\'' +
                ", sex='" + sex + '\'' +
                ", age=" + age +
                ", department='" + department + '\'' +
                ", duty='" + duty + '\'' +
                ", superChange='" + superChange + '\'' +
                ", workPhone='" + workPhone + '\'' +
                ", mobile='" + mobile + '\'' +
                ", birthday='" + birthday + '\'' +
                ", hobby='" + hobby + '\'' +
                ", remark='" + remark + '\'' +
                '}';
    }
}
