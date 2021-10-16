package jsoup;

import org.apache.commons.io.FileUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Attributes;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.junit.Test;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Set;


public class JsoupAffectTest {

    //jsoup的三个作用
    //1解析url
    //2解析字符串
    //3解析文件

    @Test
    public void testUrl() throws Exception {
        //解析url地址
        Document doc = Jsoup.parse(new URL("http://www.firefox.com.cn"), 1000);
        //使用标签选择器，获取title标签中的内容
        String title = doc.getElementsByTag("title").first().text();
        //打印
        System.out.println(title);
    }

    @Test
    public void testText() throws Exception {
        //使用工具类读取文件，获取字符串
        String content = FileUtils.readFileToString(new File("C:\\Users\\26762\\Desktop\\test.html"), "utf8");

        //解析字符串
        Document doc = Jsoup.parse(content);
        String title = doc.getElementsByTag("title").first().text();
        System.out.println(title);

    }

    @Test
    public void testFile() throws Exception {
        //解析文件
        Document doc = Jsoup.parse(new File("C:\\Users\\26762\\Desktop\\test.html"), "utf8");
        String title = doc.getElementsByTag("title").first().text();
        System.out.println(title);
    }







    //根据DOM方式，来获取元素
    //1通过id--getElementById
    //2通过标签--getElementsByTag
    //3通过class--getElementsByClass
    //4通过属性--getElementsByAttribute

    @Test
    public void testDOM() throws Exception{
        Document doc = Jsoup.parse(new File("C:\\Users\\26762\\Desktop\\test.html"), "utf8");

        //1通过id--getElementById
        Element el = doc.getElementById("city_bj");
        System.out.println("获取的元素内容："+el.text());

        //2通过标签--getElementsByTag
        Element el1 = doc.getElementsByTag("span").first();
        System.out.println("获取的元素内容："+el1.text());

        //3通过class--getElementsByClass
        Element el2 = doc.getElementsByClass("class_a class_b").first();
        System.out.println("获取的元素内容："+el2.text());

        //4通过属性--getElementsByAttribute
        Element el3 = doc.getElementsByAttribute("abc").first();
        System.out.println("获取的元素内容："+el3.text());

        Element el4 = doc.getElementsByAttributeValue("href", "http://www.itcast.cn").first();
        System.out.println("获取的元素内容："+el4.text());
    }





    //从元素中获取数据
    //1.从元素中获取id
    //2.从元素中获取className
    //3.从元素中获取属性值attr
    //4.从元素中获取所有的属性
    //5.从元素中获取文本的内容

    @Test
    public void testData() throws IOException {
        Document doc = Jsoup.parse(new File("C:\\Users\\26762\\Desktop\\test.html"), "utf8");
        Element test = doc.getElementById("test");
        String str = "";

        //1.从元素中获取id
        String id = test.id();
        System.out.println(id);

        //2.从元素中获取className
        String s = test.className();
        System.out.println(s);

        Set<String> strings = test.classNames();
        for (String str1: strings) {
            System.out.println(str1);
        }

        //3.从元素中获取属性值attr
        String id1 = test.attr("id");
        System.out.println(id1);

        //4.从元素中获取所有的属性attributes
        Attributes attributes = test.attributes();
        System.out.println(attributes);

        //5.从元素中获取文本的内容
        String text = test.text();
        System.out.println(text);
    }




    //用Selector选择器方式，来获取元素
    //1、tagname通过标签查找元素：比如：span
    //2、#id：通过id查找元素，比如：#city_bj
    //3、.class:通过class名查找元素，比如：.class_a
    //4、[attribute]:利用属性查找元素，比如：[abc]
    //5、[attr=value]:利用属性值来查找元素，比如：[class=s_name]

    @Test
    public void testSelector() throws IOException {
        Document doc = Jsoup.parse(new File("C:\\Users\\26762\\Desktop\\test.html"), "utf8");
        Element test = doc.getElementById("test");
        String str = "";

        //1、tagname通过标签查找元素：比如：span
        Elements span = test.select("span");
        for (Element e :span) {
            System.out.println(e.text());
        }

        //2、#id：通过id查找元素，比如：#cit_bj
        Element first = test.select("#city_bj").first();
        System.out.println(first);

        //3、.class:通过class名查找元素，比如：.class_a
        Elements select = test.select(".class_a");
        for (Element e :select) {
            System.out.println(e.text());
        }

        //4、[attribute]:利用属性查找元素，比如：[abc]
        Element first1 = test.select("[abc]").first();
            System.out.println(first1);

        //5、[attr=value]:利用属性值来查找元素，比如：[class=s_name]
        Elements select1 = test.select("[class=s_name]");
        for (Element e :select1) {
            System.out.println(e.text());
        }
    }


    //选择器的组合使用。。。。。。。


}
