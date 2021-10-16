package crm.pojo;

/**
 * 客户类
 */
public class ClientInfo {

    private int clientId; //主键
    private int userId; //负责的员工
    private String department; //客户部门
    private String clientName; //客户姓名
    private String workAddress; //客户工作地址
    private String mainPhone; //客户主要电话
    private String zipCode; //客户邮编
    private String email; //客户邮箱
    private String industry; //客户行业
    private String province; //客户 省
    private String city; //客户 市
    private String town; //客户 县
    private int rank; //客户等级 1：潜在客户  2：合作伙伴  3：忠实客户  4：代理商  5：战略合作
    private int creditGrade; //信用等级 共5级【用“★”表示，一个★代表1级】
    private int creditLimit; //信用额度 一级：0.00 二级：5000.00 三级：10000.00 四级：20000.00 五级：100000.00
    private String superCompany; //上级单位
    private String financePhone; //财务电话
    private String companyHome; //公司网站主页
    private String register; //注册时间
    private String remark; //备注
    private int receiveId; //接收人工号 暂时不填 有上级主管分配
    private int receiveState; //转交状态 0：未转交   1：申请转交   2：转交成功    3：转交失败default(0)
    private String deployState; //部署状态
    private int approveId; //审批人工号
    private int status; //客户状态 0：活跃客户  1：跟进客户  2：流失客户
    private String createTime;
    private String updTime;

    public ClientInfo() {
        this.clientId = 0;
        this.userId = 0;
        this.department = "";
        this.clientName = "";
        this.workAddress = "";
        this.mainPhone = "";
        this.zipCode = "";
        this.email = "";
        this.industry = "";
        this.province = "";
        this.city = "";
        this.town = "";
        this.rank = 0;
        this.creditGrade = 0;
        this.creditLimit = 0;
        this.superCompany = "";
        this.financePhone = "";
        this.companyHome = "";
        this.register = "";
        this.remark = "";
        this.receiveId = 0;
        this.receiveState = 0;
        this.deployState = "";
        this.approveId = 0;
        this.status = 0;
        this.createTime = "";
        this.updTime = "";
    }

    public int getClientId() {
        return clientId;
    }

    public void setClientId(int clientId) {
        this.clientId = clientId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    public String getWorkAddress() {
        return workAddress;
    }

    public void setWorkAddress(String workAddress) {
        this.workAddress = workAddress;
    }

    public String getMainPhone() {
        return mainPhone;
    }

    public void setMainPhone(String mainPhone) {
        this.mainPhone = mainPhone;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getIndustry() {
        return industry;
    }

    public void setIndustry(String industry) {
        this.industry = industry;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getTown() {
        return town;
    }

    public void setTown(String town) {
        this.town = town;
    }

    public int getRank() {
        return rank;
    }

    public void setRank(int rank) {
        this.rank = rank;
    }

    public int getCreditGrade() {
        return creditGrade;
    }

    public void setCreditGrade(int creditGrade) {
        this.creditGrade = creditGrade;
    }

    public int getCreditLimit() {
        return creditLimit;
    }

    public void setCreditLimit(int creditLimit) {
        this.creditLimit = creditLimit;
    }

    public String getSuperCompany() {
        return superCompany;
    }

    public void setSuperCompany(String superCompany) {
        this.superCompany = superCompany;
    }

    public String getFinancePhone() {
        return financePhone;
    }

    public void setFinancePhone(String financePhone) {
        this.financePhone = financePhone;
    }

    public String getCompanyHome() {
        return companyHome;
    }

    public void setCompanyHome(String companyHome) {
        this.companyHome = companyHome;
    }

    public String getRegister() {
        return register;
    }

    public void setRegister(String register) {
        this.register = register;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public int getReceiveId() {
        return receiveId;
    }

    public void setReceiveId(int receiveId) {
        this.receiveId = receiveId;
    }

    public int getReceiveState() {
        return receiveState;
    }

    public void setReceiveState(int receiveState) {
        this.receiveState = receiveState;
    }

    public String getDeployState() {
        return deployState;
    }

    public void setDeployState(String deployState) {
        this.deployState = deployState;
    }

    public int getApproveId() {
        return approveId;
    }

    public void setApproveId(int approveId) {
        this.approveId = approveId;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    public String getUpdTime() {
        return updTime;
    }

    public void setUpdTime(String updTime) {
        this.updTime = updTime;
    }

    @Override
    public String toString() {
        return "ClientInfo{" +
                "clientId=" + clientId +
                ", userId=" + userId +
                ", department='" + department + '\'' +
                ", clientName='" + clientName + '\'' +
                ", workAddress='" + workAddress + '\'' +
                ", mainPhone='" + mainPhone + '\'' +
                ", zipCode='" + zipCode + '\'' +
                ", email='" + email + '\'' +
                ", industry='" + industry + '\'' +
                ", province='" + province + '\'' +
                ", city='" + city + '\'' +
                ", town='" + town + '\'' +
                ", rank=" + rank +
                ", creditGrade=" + creditGrade +
                ", creditLimit=" + creditLimit +
                ", superCompany='" + superCompany + '\'' +
                ", financePhone='" + financePhone + '\'' +
                ", companyHome='" + companyHome + '\'' +
                ", register='" + register + '\'' +
                ", remark='" + remark + '\'' +
                ", receiveId=" + receiveId +
                ", receiveState=" + receiveState +
                ", deployState='" + deployState + '\'' +
                ", approveId=" + approveId +
                ", status=" + status +
                ", createTime='" + createTime + '\'' +
                ", updTime='" + updTime + '\'' +
                '}';
    }
}
