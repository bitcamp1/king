$(document).ready(function(){
	requestUserInfo();
	$('#eom-proj').click(function(){
		$('#eom-contents').load('../pages/content/eom/project.html');
	});
	$('#eom-memb').click(function(){
		$('#eom-contents').load('../pages/content/eom/member.html');
	});
});
function requestUserInfo(){
	$.ajax({
		url : '../ajax/member/userInfo.do',
		type : 'GET',
		dataType : 'json',
		success : function(e){
			if(data.staus = 'fail'){
				location.href = '../pages/content/index.html';
				return;
			}else{
				var userName = $('#userName');
				var userEmail = $('#userEmail');
				userName.html(data.member.name);
				userEmail.html(data.member.email);
				requestMyProjects();
			}
		},
		error : function(xhr, status, message){
				alert(message);
		}
	});
};

function requestMyProjects(){
	$.ajax({
		url : '',
		type : 'GET',
		dateType : 'json',
		success : function(e){
			var myProjectlist = $('#myProj');
			for(var i in data.list){
				myProjectlist.append(
						$('<li>').text(data.list[i].title)
				);
			}
		},
		error : function(xhr, status, message){
			alert(message);
		}
		
	});
};
