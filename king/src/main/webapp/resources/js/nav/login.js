var login={};


login.init=function(){
	
	/*$(document).on('click','#loginBtn',function(){
		console.log('로그인버튼 클릭');
		login.login();
	});*/
	$(document).on('click','#logoutBtn',function(){
		console.log('로그아웃버튼 클릭');
		login.logout();
	});
	$(document).on('click','#a_myInfo',function(){
		$('#container').load('pages/nav/member/myInfo.html');
	});
	
};
login.login=function(){
	$.ajax({
		url : 'ajax/auth/login.do',
		type : 'post',
		dataType : 'json',
		data : {
			id : $('#input_userName').val(),
			password : $('#input_password').val()
		},
		success : function(data){
			console.log('로그인정보');
			console.log(data);
			if(data.status == 'success'){
				$('#loginBox').hide();
				$('#home').css('display','inline');
				$('#userInfoBox').show();
				$('#userNavBox').show().css('margin-top','150px');
				$('#adminNavBox').show().css('margin-top','200px');
				$('#adBox').hide();
				$('#span_userName').html(data.member.name);
			}else{
				window.alert('사용자 아이디 또는 암호가 일치하지 않습니다!');
			}
			
		},
		error : function(xhr, status, message){
			console.log(xhr);
			console.log(status);
			console.log(message);
			alert('로그인실패');
		}
	});
};
login.logout=function(){
	$.ajax({
		type : 'POST',
		dataType: 'json',
		url : 'ajax/auth/logout.do',
		data:{
			id: 'a'/*$('#span_userName').html*/,  //보내주는 키값..받는 param 값이 없는데 넘겨주는 이유는 잘 모르겠다
		},
		
		success:function(data){
			if (data.status == 'success') {
				
					location.href='index.html';
				
				
				/*	$( '#logIn_signUpForm' ).empty();
				$( '#logIn_signUpForm' ).css('display', 'none');

				$( '#state' ).empty();

				$( '#state' ).append( $( '<span>' ).attr('id','username').addClass('memberState')
								.append( $('<a>', 
								{
									text:data.member.id,
									href:'#'
								}).addClass('wide') ) );
				$( '#state' ).append( $( '<span>' ).attr('id','message')
								 .append( $('<a>', 
								 {
								 	href:'#',
								 	html: $( '<img>', {src: 'img/message03.jpg'})
								 }).addClass('wide') ) );

				console.log(data);
				*/
				
			
			} else {
				window.alert('로그아웃이 실패하셨습니다');
			}
		},

		error:function(xhr, status, message){
			window.alert('요청 실패입니다.');
			console.log(message);
		} 
	});
};



