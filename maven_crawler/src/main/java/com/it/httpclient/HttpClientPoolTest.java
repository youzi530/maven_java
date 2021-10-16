package com.it.httpclient;

import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.apache.http.util.EntityUtils;

import java.io.IOException;

public class HttpClientPoolTest {
    public static void main(String[] args) {
        //创建连接池管理器
        PoolingHttpClientConnectionManager cm = new PoolingHttpClientConnectionManager();

        //设置最大连接数
        cm.setMaxTotal(100);

        //设置每个主机的最大连接数
        cm.setDefaultMaxPerRoute(10);

        //使用连接池管理器发请求
        doGet(cm);
        doPost(cm);
    }

    private static void doPost(PoolingHttpClientConnectionManager cm) {
        //不是每次创建新的HttpClient，而是从连接池中获取httpclient对象
        CloseableHttpClient httpClient = HttpClients.custom().setConnectionManager(cm).build();
        HttpPost httpPost = new HttpPost("http://www.itcast.cn");
        //发起请求，返回响应
        CloseableHttpResponse reponse = null;
        try {
            reponse = httpClient.execute(httpPost);
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
                //httpClient.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    private static void doGet(PoolingHttpClientConnectionManager cm) {
        //不是每次创建新的HttpClient，而是从连接池中获取httpclient对象
        CloseableHttpClient httpClient = HttpClients.custom().setConnectionManager(cm).build();
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
                //httpClient.close();  不能关闭，是由连接池来操作
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
