package com.it.httpclient;

import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

//带参数的POST请求
public class HttpPostParamTest {
    public static void main(String[] args) throws UnsupportedEncodingException {
        //创建HttpClient对象
        CloseableHttpClient httpClient = HttpClients.createDefault();

        //创建一个httpGet对象，设置uri
        HttpPost httpPost = new HttpPost("http://yun.itheima.com/search");

        //申明list集合，封装表单中的参数
        List<NameValuePair> params = new ArrayList<NameValuePair>();
        //设置请求地址是http://yun.itheima.com/search?keys=java
        params.add(new BasicNameValuePair("keys","java"));
        //创建表单的Entity对象
        UrlEncodedFormEntity formEntity = new UrlEncodedFormEntity(params,"utf8");
        //设置表单的Entity对象到Psot请求中
        httpPost.setEntity(formEntity);


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
