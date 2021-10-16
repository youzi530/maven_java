package com.it.httpclient;

import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

import java.io.IOException;

//不带参数的GET请求
public class HttpGetTest {
    public static void main(String[] args) {
        //创建HttpClient对象
        CloseableHttpClient httpClient = HttpClients.createDefault();

        //创建一个httpGet对象，设置uri
        HttpGet httpGet = new HttpGet("http://www.itcast.cn");

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
