package com.it.httpclient;

import org.apache.http.HttpEntity;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

import java.io.IOException;

//不带参数的GET请求
public class HttpGetConfigTest {
    public static void main(String[] args) {
        //创建HttpClient对象
        CloseableHttpClient httpClient = HttpClients.createDefault();

        //创建一个httpGet对象，设置uri
        HttpGet httpGet = new HttpGet("http://www.itcast.cn");


        //配置请求的信息  --网络不好的话就可以设置
        RequestConfig config = RequestConfig.custom().setConnectTimeout(1000)  //创建连接最长时间
                .setConnectionRequestTimeout(500)  //设置获取连接的最长时间
                .setSocketTimeout(10*1000)     //设置数据传输的最长时间
                .build();

        //给请求设置请求信息
        httpGet.setConfig(config);

        //发起请求，返回响应
        CloseableHttpResponse reponse = null;
        try {
            reponse = httpClient.execute(httpGet);

            //解析响应，获取数据--状态码判断
            if(reponse.getStatusLine().getStatusCode() == 200){
                HttpEntity httpEntity = reponse.getEntity();
                String content = EntityUtils.toString(httpEntity, "utf8");
                System.out.println(content.length());
            }
        } catch (IOException e) {
            e.printStackTrace();
        }finally {
            //关闭reponse
            try {
                reponse.close();
                httpClient.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }


    }
}
