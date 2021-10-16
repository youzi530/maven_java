package com.it.httpclient;

import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

import java.io.IOException;
import java.net.URISyntaxException;

//带参数的GET请求
public class HttpGetParamTest {
    public static void main(String[] args) throws URISyntaxException {
        //创建HttpClient对象
        CloseableHttpClient httpClient = HttpClients.createDefault();

        //设置请求地址是http://yun.itheima.com/search?keys=java
            //1创建uriBuilder
            URIBuilder uriBuilder = new URIBuilder("http://yun.itheima.com/search");
            //2设置参数
            uriBuilder.setParameter("keys","java");//多个参数就继续.setParameter


        //创建一个httpGet对象，设置uri
        HttpGet httpGet = new HttpGet(uriBuilder.build());
        System.out.println("发起请求的信息："+httpGet);

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
