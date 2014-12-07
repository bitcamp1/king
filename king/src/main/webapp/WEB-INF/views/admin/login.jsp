<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
	    
	<style>
	    #loginBox{
		width: 100%;
		position : relative;
		
	}
	#userNavBox{    /* 로그인 성공시 나타남 */
		width: 100%;
		height: 100px;
		position : relative;
		display : none;
	}
	#adminNavBox{   /* 관리자 로그인 성공시 나타남 */
		width: 100%;
		height:100px;
		position : relative;
		display : none;
	}
	    
    </style>

	<div id='loginBox'>
		<h3 class='title'>User login</h3>
		<form method='POST' action='Login' name='loginForm' >
			<p style='width : 170px; float:left' >
				<input type='text' id='id'   onkeypress='hitEnterkey("id")' placeholder='USER NAME'>
				<input type='password' id='pwd'  placeholder='PASSWORD'>
			</p>
			<input type='submit' id='loginBtn' class='button' value='Log In'/>
		</form>
		<h4 style='clear : both; padding:10px 0;'> <a href='#' id='createAccount' style='strong'>▶ Create Account</a></h4>
	</div>
	
	
	


<script>
$(document).ready(function(){
	$(document).on('click','#mem_list',function(e){ // 관리자화면 :: 회원리스트 이동
		$('#content').load('pages/nav/member/member.html');
		 member.listMember();
	});
	
	$(document).on('click','a.memberList_id',function(e){ //관리자화면 :: ID클릭시 상세정보보기
		member.detail();
	});
	$(document).on('click','#selectImgBtn',function(e){  /*이미지 등록버튼*/
		// 이미지 선택버튼을 클릭하면 이전 이미지를 가려라
		$('#myInfoProfileImg').attr('style','display:none');
		e.stopImmediatePropagation();
	});
	$(document).on('click','#imgUpload_AddBtn',function(e){   
		member.imageUpload();  //이미지 업로드 등록버튼 클릭
	});
	$(document).on('click','#myImg_ResetBtn',function(e){
		e.stopImmediatePropagation();// 개인 이미지 취소 버튼 클릭.....취소버튼을 클릭하면 reset 됨
	});
	$(document).on('click','#myInfoUpdateBtn',function(e){ 
		$('#myInfo').hide();  // 내정보 수정 페이지 이동
		$('#infoUpdateForm').show();
		e.stopImmediatePropagation();
	});
	$(document).on('click','#withdrawalBtn',function(e){
		member.deleteMember(); //회원탈퇴
		e.stopImmediatePropagation();
	});
	$(document).on('click','#loginBtn',function(){
		$.ajax('',{
			data : {},
			type : 'post',
			dataType : 'json',
			success : function(){},
		});
	});
	
	
	
	/*member.clearList();  버블링방지. 회원리스트 목록 지우기*/
	/*member.loadMember(); EOM버전 회원상세정보 보기 :: 필요없어진 듯*/
	/*member.initializing(); 테이블 초기화*/

});
</script>