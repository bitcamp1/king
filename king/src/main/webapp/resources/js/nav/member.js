var member = {};
member.init = function(){
	
};  //init

/*내정보 보기 상세페이지*/
member.infoList = function(){
	$.getJSON(
			'ajax/member/detail.do',
			
			function(data){
				
				$( '#myInfoProfileImg' ).attr('src','img/profileImg/'+data.member.photoUrl);
				
				var phoneNum11,
					phoneNum12,
					phoneNum13,
					phoneNum = null;
				
				if(data.member.phoNo.length == 11) {
					phoneNum1 = (data.member.phoNo).slice(0,3);
					phoneNum2 = (data.member.phoNo).slice(3,7);
					phoneNum3 = (data.member.phoNo).slice(7);
				} else {
					phoneNum1 = (data.member.phoNo).slice(0,3);
					phoneNum2 = (data.member.phoNo).slice(3,6);
					phoneNum3 = (data.member.phoNo).slice(6);
				}
				
				phoneNum = phoneNum1 + ' - ' + phoneNum2 + ' - ' + phoneNum3;
				
				$( '#info_list' ).append( $( '<div>' ).addClass('myInfoUnderLine')
								.append( $( '<span>' ).addClass( 'simpleMyInfo' ).text( data.member.email ) ) )
								.append( $( '<div>' ).addClass('myInfoUnderLine')
								.append( $( '<span>' ).addClass( 'simpleMyInfo' ).text( phoneNum ) ) )
								.append( $( '<div>' ).addClass('myInfoUnderLine')
								.append( $( '<span>' ).addClass( 'simpleMyInfo' ).text( data.member.addr1 ) ) )
								.append( $( '<div>' ).addClass('myInfoUnderLine')
								.append( $( '<span>' ).append( $('<a>', 
										{text :'양도',
										 href : '#myInfoPoint'})
									.attr( 'id','handOver' ) ) ) );

				console.log(data);
					
			}
		);
};



/*관리자 회원목록 조회*/
member.listMember = function(){
	$.ajax({
			
			url : 'ajax/member/getMemberList.do',
			type : 'POST',
			dataType : 'json',
			data : {
				pageNo : 1  //변수로 바꿔야 함
			},
			success : function(data){
			//전역변수.[$(#).val()] = data.모델객체 키값
				console.log('회원목록 Data :');
				console.log(data);
				
				member.pageNo = data.pageNo;
				member.recordCount = data.recordCount;
				member.pageSize = data.pageSize;
				
				var totalPage = parseInt(member.recordCount/member.pageSize);
				if((member.recordCount % member.pageSize)>0){
					totalPage ++;
				}
				member.totalPage = totalPage;
				member.clearList();
				
				$('#searchDiv').load('pages/content/searchDiv.html');
				var memberTable = $('#memberTable');
				for(var i in data.memberList){
					
				$('<tr>').append($('<td>').append($('<input>').attr('type','checkbox').attr('id','memberCheckbox')))
						.append($('<td>').append(1))
						.append($('<td>').append($('<a>',{
							text:data.memberList[i].id,
							href:'#'  ,
							id : 't_userId'
						}).addClass('memberList_id')))
						.append($('<td>').append($('<a>',{
							text:data.memberList[i].email,
							href : '#'
						})))
						.append($('<td>').text(2013)
						)
						.appendTo(memberTable);
				/*$('#paging').load('pages/content/paging.html');*/
				$('.paging').paging({
					current:1,  // 현재 페이지는 서버에서 처리해줘야
					max:45, 
					onclick:function(e,page){
						console.log('going to page '+page);
					}
				});
				
				} //for 
				
			},
			error : function(xhr, status, error){
				console.log(error);
				alert('getMemberList.do 요청 실패');
			}
		});
	
};
/*관리자 회원상세정보 보기*/
member.detail = function(){
	$.ajax({
		url : 'ajax/member/detail.do',
		type : 'POST',
		dataType :'json',
		data : {
			id : 'b' /*$('#t_userId').val() 이것이 변수값인 줄 알았는데...*/
		},
		success : function(data){
			console.log(data);
			var memberData = data.member;
				var admin_member_detail = $('#admin_member_detail');
				
				$('<ul>',{
					css : {  // jQuery1.4 에서 추가된 기능
						height : '100px',
						width : '100px',
						border : '1px solid blue',
						
					},
					click : function(){
						$(this).css('border','3px solid black');
					}
				})
				.append($('<li>').html(memberData.id))
				.append($('<li>').html(memberData.name))
				.append($('<li>').html(memberData.email))
				.append($('<li>').html(memberData.regDate))
				.appendTo(admin_member_detail);
				
		},
		error : function(xhr, status, error){
			console.log(error);
		}
});
e.stopImmediatePropagation();
};
/*리스트 지우기 : 버블링 방지*/
member.clearList = function(){
	var tagTable = $('#memberTable');
	var memberList = document.getElementsByClassName('memberRow');
	
	for(var i = memberList.length - 1; i= 0; i--){
		tagTable.removeChild(memberList[i]);
	}
};
/* 회원 탈퇴*/
member.deleteMember = function(){
	$.ajax('ajax/member/delete.do?id='+$('#id').value,{
		type : 'GET',
		success : function(data){
			member.clearForm();
			member.listMember();
		},
		error : function(){}
	});
};

/*회원 사진 올리기*/
member.imageUpload=function(e){
	 $.ajax('ajax/member/imgUpload.do',{
		 type : 'POST',
		 dataType : 'json',
		 data : {
			 imgSrc : $('#prev_myProfileImg').attr('src')
		 },
		 success : function(data){
			 console.log('imgUpload.do 의 ');
			 console.log(data);
			 indexGlobal.userInfo();  //indexGlobal은 index.js 에서 전역변수로 선언 
			 alert('개인 이미지 등록 수정 성공입니다.');
		 },
		 error : function(xhr, status, message){
			 alert('개인 이미지 등록 수정 실패입니다.');
		 }
	 });
	 
};
/*테이블 초기화 -----------------------------------------------------------------------------------------------*/

/*테이블이 중복되서 append되지 않도록 로딩될 때마다 table 초기화*/

member.initializing = function() {
	$( '.myPageTableTr' ).remove();
};











