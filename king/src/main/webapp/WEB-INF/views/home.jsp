<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>

<table class='wrap'>
     <tr >
        <td colspan=2 >
        	<%@include file='common/title.jsp' %>
        </td>
       
    </tr>
    <tr>
        <td colspan=2 align='left' height='34px'>
        	<%@include file='common/gnb.jsp' %>
        </td>
    </tr>
    <tr>
        <td colspan=2 align="center">
        	<%@include file='common/slider.jsp' %>
        </td>
    </tr>
    <tr>
        <td rowspan=2 style='vertical-align: top;padding-right: 10px;'>
        	<table id ='pjt_list'>
	        	<tr>
	        		<th>번호</th>
	        		<th>제목</th>
	        		<th>작성일</th>
	        		<th>비고</th>
	        	</tr>
	       		<tr>
		       		<td>2</td>
		       		<td>MGML</td>
		       		<td></td>
		       		<td></td>
	   			</tr>
	   			<tr>
	       			<td>1</td>
		       		<td>EOM</td>
		       		<td></td>
		       		<td></td>
	       		</tr>
        	</table>
       	</td>
        <td width='300px;'>
        	<%@include file='admin/login.jsp' %>
        </td>
   
     <tr>
       	<td>
        	 <%@include file='common/ad.jsp' %>
       	</td>
     </tr>
        
        
    <tr>
        <td colspan=2>
        	<%@include file='common/footer.jsp' %>
         </td>
    </tr>
</table>	


</body>
<script>
member.init();
login.init();
menu.init();

</script>	
</html>