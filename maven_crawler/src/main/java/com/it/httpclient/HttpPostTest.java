package com.it.httpclient;

import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

import java.io.IOException;

//不带参数的POST请求
public class HttpPostTest {
    public static void main(String[] args) {
        //创建HttpClient对象
        CloseableHttpClient httpClient = HttpClients.createDefault();

        //创建一个httpPost对象，设置uri
        HttpPost httpPost = new HttpPost("http://www.baidu.cn");

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
                httpClient.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }


    }
}
