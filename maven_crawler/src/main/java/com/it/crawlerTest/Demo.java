package com.it.crawlerTest;

import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

import java.io.IOException;

public class Demo {
    public static void main(String[] args) throws IOException {

        //打开一个浏览器
        CloseableHttpClient httpClient = HttpClients.createDefault();

        //输入一个网址
        HttpGet httpGet = new HttpGet("http://www.firefox.com.cn");

        //按回车，发送请求，返回响应
        CloseableHttpResponse response = httpClient.execute(httpGet);

        //解析
        if(200 == response.getStatusLine().getStatusCode()){
            HttpEntity httpEntity = response.getEntity();
            String content = EntityUtils.toString(httpEntity, "utf8");
            System.out.println(content);
        }

    }
}
