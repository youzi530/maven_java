package crm.pojo;

/**
 * 通讯录类
 */
public class AddressBook {

    private int userId;
    private String realName; //职员姓名
    private String mobile; //职员电话
    private String email; //家庭住址

    public AddressBook(){
        this.userId = 0;
        this.realName = "";
        this.mobile = "";
        this.email = "";
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getRealName() {
        return realName;
    }

    public void setRealName(String realName) {
        this.realName = realName;
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

    @Override
    public String toString() {
        return "AddressBook{" +
                "userId=" + userId +
                ", realName='" + realName + '\'' +
                ", mobile='" + mobile + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}
