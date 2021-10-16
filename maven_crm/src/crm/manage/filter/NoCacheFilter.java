package crm.manage.filter;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebFilter("*.html")
public class NoCacheFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletResponse hsr = (HttpServletResponse) servletResponse;
        hsr.setHeader("Cache-Control", "No-cache"); // HTTP 1.1.
        hsr.setHeader("Pragma", "No-cache"); // HTTP 1.0.
        hsr.setDateHeader("Expires", -1); // Proxies.
        filterChain.doFilter(servletRequest,servletResponse);

    }

    @Override
    public void destroy() {

    }
}
