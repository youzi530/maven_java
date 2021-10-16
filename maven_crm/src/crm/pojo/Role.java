package crm.pojo;

/**
 * 角色类
 */
public class Role {

    private String permission; //权限
    private String department; //部门

    public Role(){
        this.permission = "";
        this.department = "";
    }

    public String getPermission() {
        return permission;
    }

    public void setPermission(String permission) {
        this.permission = permission;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    @Override
    public String toString() {
        return "Role{" +
                "permission='" + permission + '\'' +
                ", department='" + department + '\'' +
                '}';
    }
}
