package crm.manage.filter;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 登录过滤器
 */
@WebFilter("/*")
public class LoginFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        //0.强制转换
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        //1.1.获取资源请求路径
        String uri = ((HttpServletRequest) servletRequest).getRequestURI();
        //2.判断是否是登录相关的资源路径,注意要排除掉css/js/图片/验证码等资源，不然以后封装后页面会显示不全

            if (uri.contains("/login.html") || uri.contains("login.do") || uri.contains("reload") || uri.contains("/pc-geetest/register") || uri.contains("/pc-geetest/validate") ||
                    uri.contains("/common/") || uri.contains("/crmjs/") || uri.contains("/hongcheng/")){
                //用户需要登录，放行
                filterChain.doFilter(servletRequest,servletResponse);
            }else {
                //不包含，需要用户验证是否登录
                //3.从Session中获取user
                Object user = request.getSession().getAttribute("crmuser");
                if (user != null){
                    //已经登录，放行
                    filterChain.doFilter(servletRequest,servletResponse);
                }else {
                    if (uri.equals("/crm/")){
                        servletRequest.getRequestDispatcher("login.html").forward(servletRequest,servletResponse);
                    }
                }
            }
    }

    @Override
    public void destroy() {

    }
}
