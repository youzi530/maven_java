package crm.product.servlet;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import crm.pojo.Product;
import crm.pojo.UserInfo;
import crm.product.dao.daoImp.ProductDaoImp;
import crm.product.dao.daoImp.PurchaseManageDaoImp;
import crm.sale.lingqiao.dao.daoImp.ExpenseManageDaoImp;
import crm.vojo.CostManage;
import crm.vojo.ProductManage;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import static com.alibaba.fastjson.JSON.parseArray;

@WebServlet("*.purchaseManage")
public class PurManageServlet extends HttpServlet {

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        PrintWriter pw = resp.getWriter();
        String uri = req.getRequestURI();
        PurchaseManageDaoImp purchaseManageDaoImp = new PurchaseManageDaoImp();
        ProductDaoImp productDaoImp = new ProductDaoImp();
        ExpenseManageDaoImp expenseManageDaoImp = new ExpenseManageDaoImp();

        UserInfo userInfo = (UserInfo) req.getSession().getAttribute("crmuser");
        String realName = userInfo.getRealName();//当前用户的名字
        int userId = userInfo.getUserId();//当前用户的身份

        if(uri.indexOf("see")>=0){
            //当身份为系统管理员或者经理，当页面加载时，查询所有的信息
            if(userInfo.getRoleId().equals("admin")||userInfo.getRoleId().equals("供销经理")){
                List<ProductManage> list = purchaseManageDaoImp.viewPurInfo();
                pw.write(JSON.toJSONString(list));
            //促销职员只能看到自己的信息，而且添加的时候也只能添加自己的
            }else if(userInfo.getRoleId().equals("供销职员")){
                List<ProductManage> productManages = purchaseManageDaoImp.viewProByusername(realName+"（工号："+userId+"）");
                pw.write(JSON.toJSONString(productManages));
            }
        }else if(uri.indexOf("singleDelete")>=0){
            int id = Integer.parseInt(req.getParameter("id"));
            purchaseManageDaoImp.deletePurManage(id);
        }else if(uri.indexOf("add")>=0){
            String jsonpurchaseData = req.getParameter("jsonpurchaseData");
            ProductManage productManage = JSON.parseObject(jsonpurchaseData).toJavaObject(ProductManage.class);
            boolean b = purchaseManageDaoImp.addPurManage(productManage);
            if(b!=false){
                //当采购添加成功时候，将仓库（商品信息管理）中的商品数量增加，减去退货数量
                String s = productManage.getpName();
                String[] split = s.split("：");
                String[] split1 = split[1].split("）");
                int pid = Integer.parseInt(split1[0]);//得到商品id

                int inNum = productManage.getInNum();
                int outNum = productManage.getOutNum();
                int num= inNum-outNum;  //添加时，进货-退货
                boolean b1 = productDaoImp.addProNum(pid, num);
                if(b1!=false){
                    CostManage costManage = new CostManage();
                    //当添加采购商品成功时候，查询到最后一条记录即刚刚添加进去的采购信息，再传到前台，将其展示出来
                    List<ProductManage> productManages = purchaseManageDaoImp.viewPurchaseLast();
                    //pw.write(JSON.toJSONString(productManages));

                    //当采购成功后，那么就在费用管理里面进行增加支出（错误写法）
                    //当采购成功后，那么就在费用管理里面添加一条采购记录，而不是单纯的去增加支出
                    List<Product> products = productDaoImp.viewProByPid(pid);
                    double price = products.get(0).getpPrice(); //这一商品的价格
                    String pName = products.get(0).getpName();  //这一件商品的名称
                    double income=0; //收入
                    double outcome=price * num; //支出
                    String detail=null; //收支明细
                    detail = "采购了"+pName+":"+num;
                    String username = productManage.getUsername();
                    costManage.setUsername(username);
                    costManage.setIncome(income);
                    costManage.setOutcome(outcome);
                    costManage.setDetail(detail);
                    costManage.setState("未审核");
                    int id = productManages.get(0).getId();
                    costManage.setPursaleid(id);

                    boolean isAddToExpenseManage = expenseManageDaoImp.addExpenseManage(costManage);
                    if(isAddToExpenseManage!=false){
                        pw.write(JSON.toJSONString(productManages)); //productManages是查询到最后一条记录即刚刚添加进去的采购信息，再传到前台，将其展示出来
                    }else{
                        pw.write("");
                    }
                }else{
                    pw.write("");
                }
            }else{
                pw.write("");//如果失败了，就传回去一个null，前端框架会根据null展示添加失败
            }
        }else if(uri.indexOf("manyDelete")>=0){
            String ids = req.getParameter("ids");
            JSONArray objects = parseArray(ids);
            for(int i =0;i<objects.size();i++){
                purchaseManageDaoImp.deletePurManage(Integer.parseInt((String) objects.get(i)));
            }
        }else if(uri.indexOf("queryByPname")>=0){
            String pName = req.getParameter("pName");
            //权限控制，当身份为老板和经理，通过全局的商品姓名来查所有的，
            //而是员工的时候，那就需要查找是自己的商品，所以需要加一个条件来查询
            if(userInfo.getRoleId().equals("admin")||userInfo.getRoleId().equals("供销经理")){
                List<ProductManage> products = purchaseManageDaoImp.viewPurByPname("%"+pName+"%");
                pw.write("msg"+JSON.toJSONString(products));
            }else if(userInfo.getRoleId().equals("供销职员")){
                List<ProductManage> products = purchaseManageDaoImp.viewPurByPnameUser("%"+pName+"%",realName+"（工号："+userId+"）");
                pw.write("msg"+JSON.toJSONString(products));
            }
        }else if(uri.indexOf("kanBypid")>=0){
            int id = Integer.parseInt(req.getParameter("id"));
            List<ProductManage> products = purchaseManageDaoImp.viewPurByPid(id);
            pw.write(JSON.toJSONString(products));
        }else if(uri.indexOf("edit")>=0){

            //下面得到的是修改后的数据：
            String jsonproductData = req.getParameter("jsonproductData");
            ProductManage product = JSON.parseObject(jsonproductData,ProductManage.class);
            int id = product.getId(); //这里得到的是采购管理PurductManage中的id
            String s2 = product.getpName(); //这里得到的是修改后的商品名字
            //当第一次我是进货100，退货50，修改后是进货100，退货30，我不是在已有的基础上再减30，而是原来的100-50变成现在的100-30
            //用一个全局变量来接收之前（kanByid）的进货数量和退货数量，然后和现在修改后的进货数量和退货数量作比较，进行逻辑处理

            //通过id来查一次修改前的数据：进货数量和退货数量
            List<ProductManage> productManages = purchaseManageDaoImp.viewPurByPid(id);
            int inNum1 = productManages.get(0).getInNum(); //修改前的进货数量
            int outNum1 = productManages.get(0).getOutNum(); //修改前的退货数量
            String s1 = productManages.get(0).getpName();
            String[] split2 = s1.split("：");
            String[] split3 = split2[1].split("）");
            int pid1 = Integer.parseInt(split3[0]);//得到修改前的商品id

            boolean b = purchaseManageDaoImp.editPurManage(product, id); //这是对本页面的表修改
            if(b==true){
                //当没修改商品名称，只是修改了商品的数量：那么就需要得到之前的数据来还原，再进行修改
                if(s1.equals(s2)){
                    //当采购管理修改成功时，将仓库（商品信息管理）中的商品数量增加，减去退货数量
                    int inNum = product.getInNum(); //修改后的进货数量
                    int outNum = product.getOutNum(); //修改后的退货数量
                    String s = product.getpName();
                    String[] split = s.split("：");
                    String[] split1 = split[1].split("）");
                    int pid = Integer.parseInt(split1[0]);//得到修改后的商品id

                    int num = inNum-outNum-inNum1+outNum1;
                    boolean b1 = productDaoImp.addProNum(pid, num);
                    if(b1==true){
                        //当修改采购信息成功后，那么也要在费用管理里面进行修改信息
                        //TODO
                        List<Product> products = productDaoImp.viewProByPid(pid);
                        double price = products.get(0).getpPrice();
                        String pName = products.get(0).getpName();  //这一件商品的名称
                        double outcome = (inNum-outNum)*price;
                        String detail=null; //收支明细
                        detail = "采购了"+pName+":"+(inNum-outNum);
                        String username = product.getUsername();  //这是用户名字

                        boolean b2 = expenseManageDaoImp.editOutcomeDetail(username, id, outcome, detail);
                        if(b2==true){
                            pw.write(jsonproductData);
                        }else{
                            pw.write("");
                        }
                    }else{
                        pw.write("");
                    }
                }else{
                    //当直接修改了商品名称，那么就需要先对修改前的是商品数量减减，对修改后的商品进行数量加加

                    //先对修改前的是商品数量减减 pid1
                    boolean b1 = productDaoImp.reduceNum(pid1,(inNum1 - outNum1));
                    if(b1!=false){
                        //对修改后的商品进行数量加加
                        String s = product.getpName();
                        String[] split = s.split("：");
                        String[] split1 = split[1].split("）");
                        int pid = Integer.parseInt(split1[0]);//得到修改后的商品id
                        int inNum = product.getInNum(); //修改后的进货数量
                        int outNum = product.getOutNum(); //修改后的退货数量
                        boolean b2 = productDaoImp.addProNum(pid, (inNum - outNum));
                        if(b2!=false){
                            //当修改采购信息成功后，那么也要在费用管理里面进行修改信息
                            //分两步：第一步将原来的数据删除掉；第二步将插入一条新的数据 id
                            boolean b3 = expenseManageDaoImp.deleteCostmanageByid(id);
                            if(b3!=false){
                                //第二步将插入一条新的数据 id
                                CostManage costManage = new CostManage();
                                List<Product> products = productDaoImp.viewProByPid(pid);
                                double price = products.get(0).getpPrice();
                                String pName = products.get(0).getpName();  //这一件商品的名称
                                double outcome = (inNum-outNum)*price;
                                String detail=null; //收支明细
                                detail = "采购了"+pName+":"+(inNum-outNum);
                                String username = product.getUsername();  //这是用户名字

                                costManage.setUsername(username);
                                costManage.setDetail(detail);
                                costManage.setOutcome(outcome);
                                costManage.setState("未审核");
                                costManage.setIncome(0);
                                costManage.setPursaleid(id);
                                boolean b4 = expenseManageDaoImp.addExpenseManage(costManage);
                                if(b4!=false){
                                    pw.write(jsonproductData);
                                }else{
                                    pw.write("");
                                }
                            }else{
                                pw.write("");
                            }
                        }else{
                            pw.write("");
                        }
                    }else{
                        pw.write("");
                    }
                }
            }else{
                pw.write("");
            }
        }else if(uri.indexOf("isEistPro")>=0){
            String pid = req.getParameter("pid");
            boolean b = purchaseManageDaoImp.viewIsEistPro(pid);
            if(b==true){
                pw.write("true");
            }else {
                pw.write("false");
            }
        }

    }
}
