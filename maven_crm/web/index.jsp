<%--
  Created by IntelliJ IDEA.
  User: 26762
  Date: 2020/1/9
  Time: 15:15
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
  ${requestScope.login_msg}
<script>
    setTimeout(function () {
      location.href = "login.html";
    },30)
</script>
</body>
</html>
