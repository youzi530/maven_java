package com.it.crawlerTest;

import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

import java.io.IOException;

public class craelerDemo {
    public static void main(String[] args) throws IOException {

        //1打开一个浏览器
        CloseableHttpClient httpClient = HttpClients.createDefault();

        //2输入一个网址,创建一个get请求
        HttpGet httpGet = new HttpGet("http://www.baidu.cn");

        //3按回车，发起请求，返回响应
        CloseableHttpResponse reponse = httpClient.execute(httpGet);

        //4解析响应，获取数据--状态码判断
        if(reponse.getStatusLine().getStatusCode() == 200){
            HttpEntity httpEntity = reponse.getEntity();
            String content = EntityUtils.toString(httpEntity, "utf8");
            System.out.println(content);
        }

    }
}
