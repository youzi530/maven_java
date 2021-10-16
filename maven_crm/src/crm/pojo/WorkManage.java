package crm.pojo;

/**
 * 工作管理类
 */
public class WorkManage {

    private int wid; //任务编号
    private String content; //工作内容
    private int progress; //工作进度
    private int workerId;
    private String workerName; //工作人
    private int leaderId;
    private String leaderName; //安排人

    public WorkManage(){
        this.wid = 0;
        this.content = "";
        this.progress = 0;
        this.workerId = 0;
        this.workerName = "";
        this.leaderId = 0;
        this.leaderName = "";
    }

    public int getWid() {
        return wid;
    }

    public void setWid(int wid) {
        this.wid = wid;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public int getProgress() {
        return progress;
    }

    public void setProgress(int progress) {
        this.progress = progress;
    }

    public int getWorkerId() {
        return workerId;
    }

    public void setWorkerId(int workerId) {
        this.workerId = workerId;
    }

    public String getWorkerName() {
        return workerName;
    }

    public void setWorkerName(String workerName) {
        this.workerName = workerName;
    }

    public int getLeaderId() {
        return leaderId;
    }

    public void setLeaderId(int leaderId) {
        this.leaderId = leaderId;
    }

    public String getLeaderName() {
        return leaderName;
    }

    public void setLeaderName(String leaderName) {
        this.leaderName = leaderName;
    }

    @Override
    public String toString() {
        return "WorkManage{" +
                "wid=" + wid +
                ", content='" + content + '\'' +
                ", progress=" + progress +
                ", workerId=" + workerId +
                ", workerName='" + workerName + '\'' +
                ", leaderId=" + leaderId +
                ", leaderName='" + leaderName + '\'' +
                '}';
    }
}
