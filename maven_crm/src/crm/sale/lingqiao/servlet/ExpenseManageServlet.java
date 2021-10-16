package crm.sale.lingqiao.servlet;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import crm.pojo.UserInfo;
import crm.sale.lingqiao.dao.daoImp.ExpenseManageDaoImp;
import crm.vojo.CostManage;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import static com.alibaba.fastjson.JSON.parseArray;

@WebServlet("*.expenseManage")
public class ExpenseManageServlet extends HttpServlet {
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        PrintWriter pw = resp.getWriter();
        String uri = req.getRequestURI();
        ExpenseManageDaoImp expenseManageDaoImp = new ExpenseManageDaoImp();
        UserInfo userInfo = (UserInfo) req.getSession().getAttribute("crmuser");
        String realName = userInfo.getRealName();//当前用户的名字
        int userId = userInfo.getUserId();//当前用户的身份

        if(uri.indexOf("see")>=0){
            if(userInfo.getRoleId().equals("admin")||userInfo.getRoleId().equals("供销经理")){
                List<CostManage> costManages = expenseManageDaoImp.viewExpenseManage();
                pw.write(JSON.toJSONString(costManages));
            }else if(userInfo.getRoleId().equals("供销职员")){
                List<CostManage> costManages = expenseManageDaoImp.viewCostmanageByUsername(realName + "（工号：" + userId + "）");
                pw.write(JSON.toJSONString(costManages));
            }

        }else if(uri.indexOf("singleDelete")>=0){
            int id = Integer.parseInt(req.getParameter("id"));
            expenseManageDaoImp.deleteExpMaByCostid(id);
        }else if(uri.indexOf("add")>=0){
            String jsonpurchaseData = req.getParameter("jsonpurchaseData");
            CostManage costManage = JSON.parseObject(jsonpurchaseData).toJavaObject(CostManage.class);
            boolean b = expenseManageDaoImp.addExpenseManage(costManage);
            if(b!=false){
                List<CostManage> costManages = expenseManageDaoImp.viewExpenseManageLast();
                pw.write(JSON.toJSONString(costManages));
            }else{
                pw.write("");
            }
        }else if(uri.indexOf("manyDelete")>=0){
            String ids = req.getParameter("ids");
            JSONArray objects = parseArray(ids);
            for(int i =0;i<objects.size();i++){
                expenseManageDaoImp.deleteExpMaByCostid(Integer.parseInt((String) objects.get(i)));
            }
        }else if(uri.indexOf("queryByPname")>=0){
            String detail = req.getParameter("detail");
            if(userInfo.getRoleId().equals("admin")||userInfo.getRoleId().equals("供销经理")){
                List<CostManage> costManages = expenseManageDaoImp.viewCostmanageByDetail("%" + detail + "%");
                pw.write("msg"+JSON.toJSONString(costManages));
            }else if(userInfo.getRoleId().equals("供销职员")){
                List<CostManage> costManages = expenseManageDaoImp.viewCostmanageByDetailUser("%" + detail + "%", realName + "（工号：" + userId + "）");
                pw.write("msg"+JSON.toJSONString(costManages));
            }
//            List<CostManage> costManages = expenseManageDaoImp.viewExpMaByUsername("%"+username+"%");
//            pw.write("msg"+JSON.toJSONString(costManages));
        }else if(uri.indexOf("kanBypid")>=0){
            int id = Integer.parseInt(req.getParameter("id"));
            List<CostManage> costManages = expenseManageDaoImp.viewExpMaByCostid(id);
            pw.write(JSON.toJSONString(costManages));
        }else if(uri.indexOf("edit")>=0){
            String jsonproductData = req.getParameter("jsonproductData");
            CostManage costManage = JSON.parseObject(jsonproductData,CostManage.class);
            int costId = costManage.getCostId();
            boolean b = expenseManageDaoImp.editExpMa(costManage, costId);
            if(b==true){
                pw.write(jsonproductData);
            }else{
                pw.write(" ");
            }
        }

    }
}
