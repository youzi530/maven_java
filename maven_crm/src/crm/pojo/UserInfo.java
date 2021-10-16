package crm.pojo;

/**
 * 用户类
 */
public class UserInfo {

    private int userId; //工号
    private String account; //账户
    private String password; //密码
    private String realName; //真实姓名
    private String sex; //性别
    private String mobile; //电话
    private String email; //电子邮箱
    private String birthday; //生日
    private String identity; //身份证号
    private String entryTime; //入职日期
    private String roleId; //权限
    private String status; //试用期' 试用期 正式员工 离职
    private String createTime; //创建时间

    public UserInfo(){
        this.userId = 0;
        this.account = "";
        this.password = "";
        this.realName = "";
        this.sex = "";
        this.mobile = "";
        this.email = "";
        this.birthday = "";
        this.identity = "";
        this.entryTime = "";
        this.roleId = "";
        this.status="试用期";
        this.createTime="";

    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRealName() {
        return realName;
    }

    public void setRealName(String realName) {
        this.realName = realName;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getBirthday() {
        return birthday;
    }

    public void setBirthday(String birthday) {
        this.birthday = birthday;
    }

    public String getIdentity() {
        return identity;
    }

    public void setIdentity(String identity) {
        this.identity = identity;
    }

    public String getEntryTime() {
        return entryTime;
    }

    public void setEntryTime(String entryTime) {
        this.entryTime = entryTime;
    }

    public String getRoleId() {
        return roleId;
    }

    public void setRoleId(String roleId) {
        this.roleId = roleId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    @Override
    public String toString() {
        return "UserInfo{" +
                "userId=" + userId +
                ", account='" + account + '\'' +
                ", password='" + password + '\'' +
                ", realName='" + realName + '\'' +
                ", sex='" + sex + '\'' +
                ", mobile='" + mobile + '\'' +
                ", email='" + email + '\'' +
                ", birthday='" + birthday + '\'' +
                ", identity='" + identity + '\'' +
                ", entryTime='" + entryTime + '\'' +
                ", roleId='" + roleId + '\'' +
                ", status='" + status + '\'' +
                ", createTime='" + createTime + '\'' +
                '}';
    }
}
