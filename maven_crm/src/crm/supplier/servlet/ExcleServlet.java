package crm.supplier.servlet;

import com.alibaba.fastjson.JSONArray;
import crm.pojo.CostAnalysis;
import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.VerticalAlignment;
import org.apache.poi.ss.util.CellRangeAddress;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.*;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Calendar;
import java.util.List;

import static com.alibaba.fastjson.JSON.parseArray;

@WebServlet("*.xiazai")
public class ExcleServlet extends HttpServlet {
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("utf-8");
        resp.setContentType("text/html;charset=utf-8");
        PrintWriter pw = resp.getWriter();
        String uri= req.getRequestURI();
        String sheetname="消费统计表";
        if(uri.indexOf("cost")>=0){
            String successful = req.getParameter("json4");
            JSONArray objects = parseArray(successful);
            List<CostAnalysis> successfulTradeList = objects.toJavaList(CostAnalysis.class);
            System.out.println(successfulTradeList);
            //创建HSSFWorkbook对象
            HSSFWorkbook hssfWorkbook = new HSSFWorkbook();
            //生成HSSFSheet对象
            HSSFSheet hssfSheet = hssfWorkbook.createSheet(sheetname);

            //创建HSSFCellStyle1
            HSSFCellStyle cellStyle1 = hssfWorkbook.createCellStyle();
            //设置填充模式
            cellStyle1.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            //设置前景色
            cellStyle1.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.index);
            //设置横向和纵向居中对齐
            cellStyle1.setAlignment(HorizontalAlignment.CENTER);
            cellStyle1.setVerticalAlignment(VerticalAlignment.CENTER);
            //设置字体样式
            HSSFFont font1 = hssfWorkbook.createFont();
            //设置字体
            font1.setFontHeightInPoints((short)12);
            //设置字体颜色
            font1.setColor(IndexedColors.BLACK.index);
            //设置粗体
            font1.setBold(true);
            //设置下划线
            cellStyle1.setFont(font1);

            //创建HSSFCellStyle
            HSSFCellStyle cellStyle2 = hssfWorkbook.createCellStyle();
            //设置横向和纵向居中对齐
            cellStyle2.setAlignment(HorizontalAlignment.CENTER);
            cellStyle2.setVerticalAlignment(VerticalAlignment.CENTER);
            //设置字体样式
            HSSFFont font2 = hssfWorkbook.createFont();
            //设置字体
            font2.setFontHeightInPoints((short)10);
            //设置字体颜色
            font2.setColor(IndexedColors.SKY_BLUE.index);
            //设置粗体
            font2.setBold(true);
            cellStyle2.setFont(font2);

            //创建HSSFCellStyle
            HSSFCellStyle cellStyle3 = hssfWorkbook.createCellStyle();
            //设置填充模式
            cellStyle3.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            //设置前景色
            cellStyle3.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.index);
            //设置横向和纵向居中对齐
            cellStyle3.setAlignment(HorizontalAlignment.CENTER);
            cellStyle3.setVerticalAlignment(VerticalAlignment.CENTER);
            //创建HSSFCellStyle
            HSSFCellStyle cellStyle4 = hssfWorkbook.createCellStyle();
            //设置横向和纵向居中对齐
            cellStyle4.setAlignment(HorizontalAlignment.CENTER);
            cellStyle4.setVerticalAlignment(VerticalAlignment.CENTER);

            for(int i =0;i<successfulTradeList.size()+2;i++){
                //生成HSSFRow行
                HSSFRow row = hssfSheet.createRow(i);
                if(i==0){
                    row.setHeight((short)500);
                    HSSFCell cell = row.createCell(0);
                    //标题
                    cell.setCellValue(sheetname);
                    //合并单元格
                    hssfSheet.addMergedRegion(new CellRangeAddress(0,0,0,5));

                    //设置单元格的高度
                    cell.setCellStyle(cellStyle1);
                }else if(i==1){

                    for(int j=0;j<6;j++){//列
                        HSSFCell cell = row.createCell(j);
                        //填充文本
                        if(j==0){
                            cell.setCellValue("商品名字");
                        }else if(j==1){
                            cell.setCellValue("商品类别");
                        }else if(j==2){
                            cell.setCellValue("成本");
                        }else if(j==3){
                            cell.setCellValue("仓储费用");
                        }
                        else if(j==4){
                            cell.setCellValue("建议出厂价");
                        }
                        else{
                            cell.setCellValue("毛利润");
                        }
                        cell.setCellStyle(cellStyle2);
                        row.setHeight((short)400);
                    }
                }else{
//                    if(successfulTradeList.get(0).getPid()<0){//没有数据
//                        break;
//                    }

                    for(int j=0;j<6;j++){//列
                        HSSFCell cell = row.createCell(j);
                        //填充文本
                        if(j==0){
                            cell.setCellValue(successfulTradeList.get(i-2).getpName());
                        }else if(j==1){
                            cell.setCellValue(successfulTradeList.get(i-2).getpType());
                        }else if(j==2){
                            cell.setCellValue(successfulTradeList.get(i-2).getcPrice());

//                            cell.setCellValue(successfulTradeList.get(i-2).getConfirmdate().substring(0,successfulTradeList.get(i-2).getConfirmdate().length()-2));
                        }else if(j==3){
                            cell.setCellValue(successfulTradeList.get(i-2).getStorePrice());
                        }else if(j==4){
                            cell.setCellValue(successfulTradeList.get(i-2).getAdvicePrice());
                        }
                        else if(j==5)
                        {
                            cell.setCellValue(successfulTradeList.get(i-2).getProfit());

                        }
                        if(i%2==0){
                            cell.setCellStyle(cellStyle3);
                        }else {
                            cell.setCellStyle(cellStyle4);
                        }
                    }
                    row.setHeight((short)400);

                }
            }
            hssfSheet.setColumnWidth(0,256*24);
            hssfSheet.setColumnWidth(1,256*24);
            hssfSheet.setColumnWidth(2,256*24);
            hssfSheet.setColumnWidth(3,256*24);
            hssfSheet.setColumnWidth(4,256*24);

            Calendar calendar = Calendar.getInstance();
            int y=calendar.get(Calendar.YEAR);
            int m=calendar.get(Calendar.MONTH);
            int d=calendar.get(Calendar.DATE);
            int h=calendar.get(Calendar.HOUR_OF_DAY);
            int mi=calendar.get(Calendar.MINUTE);
            int s=calendar.get(Calendar.SECOND);
            String time = ""+y+m+d+h+mi+s;
            String filename = sheetname+time+".xls";
            File fileDirectory=new File("D:\\数据分析");
            if(!fileDirectory.exists()){//如果文件夹不存在
                fileDirectory.mkdir();//创建文件夹
            }
            String path = "D:\\天猫Excel\\"+filename;
            try {
                File file = new File(path);
                FileOutputStream out = new FileOutputStream(file);
                hssfWorkbook.write(out);
                out.flush();
                out.close();
                pw.write("msg导出成功！");
                Desktop.getDesktop().open(file); // 启动已在本机桌面上注册的关联应用程序，打开文件文件file。
            } catch (IOException | NullPointerException e) { // 异常处理
                System.out.println("文件已打开！");
            }
        }
    }
}
