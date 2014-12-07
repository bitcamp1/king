var join={};
join.init=function(){
	$('#zipcodeLooking').click(function(){
		console.log('zipcodeLooking踰꾪듉 �대┃');
		search_post();
	});
};

$(document).ready(function(){
	if($('#memberId').val()==''){
		alert('�꾩씠�붾뒗 �꾩닔�낅젰 �ы빆�낅땲��');
		$('#memberId').focus();
		
	} else if($('#memberPwd').val()==''){
	/*	alert('鍮꾨�踰덊샇���꾩닔�낅젰 �ы빆�낅땲��);
*/		$('#memberPwd').focus();
		
	} else if($('#memberPwd').val()!=$('#confirmPwd').val()){
		
		$('.equalPwd').remove();
		$('#joinMemberPassword').append( $('<a>', {text : '鍮꾨�踰덊샇媛��쇱튂�섏� �딆뒿�덈떎', href : '#'}).css('color','red').addClass('equalPwd') );
		
		$('#memberPwd').val('');
		$('#confirmPwd').val('');
		$('#memberPwd').focus();
		
		
	} else if($('#name').val()==''){
		/*alert('�대쫫���꾩닔�낅젰 �ы빆�낅땲��);
*/		$('#memberId').focus();
		
		
	} else {
		
		/*var postFront = $('#joinMemberZipCode1').val().slice(0,3); �ㅻ쪟�뚮Ц���쇱떆�뺤� �쒗궡*/
		/*var postBack = $('#joinMemberZipCode1').val().slice(4);*/
	
	$('#content').on('click','#btn_join');
	
		$.ajax('ajax/member/add.do',{
			type : 'POST',
			dataType : 'json',
			data : {
				id : $('input#id').val(),
				password : $('input#password').val(),
				name : $('input#name').val(),
				email : $('input#email').val(),
				telephone : $('input#telephone').val(),
				celphone : $('input#celphone').val(),
			/*	zipcode : postFront + postBack,*/
				addr1 : $('input#addr1').val(),
				addr2 : $('input#addr2').val()
			},
			success : function(data){
				console.log('ajax/member/add.do ��data : ');
				console.log(data);
				alert('媛�엯�꾨즺');
				//indexGlobal.userInfo();
				$('#home').trigger('click');
			},
			error : function(xhr, status, error){
				console.log(error);
				alert('�뚯썝媛�엯�ㅽ뙣');
			}
		});
	
	}});
function search_post(){
	
	window.open('pages/nav/zipcode.html','search_open','top=0, left=0, width=470,height=340,resizable=1, scrollbars=no');
};