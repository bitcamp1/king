<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
	<form action='com.jk.controls.CalcController'  method="post">
	
		<table align="center">
			<tr>
				<td><input type="text" name="num1" value="0"></td>
				<td><select name = "operator">
					<option value="+">+</option>
					<option value="-">-</option>
					<option value="*">*</option>
					<option value="/">/</option>
				
				</select></td>
				<td><input type="text" name="num2" value="0"></td>
			</tr>
			<tr>
			<td>
				<input type="submit" value="계산">
			</td>
			</tr>
		</table>
	</form>

</body>
</html>