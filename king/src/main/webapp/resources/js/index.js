var indexGlobal = {};

indexGlobal.init=function(){
	$('#eom').click(function(){
		console.log('클릭');
		$('#slider').hide();
		$('#container').load('pages/content/eom/index.html');
	});
	
};



$(document).ready(function(){
	

/*기본 로딩*/
	$('#nav').load('pages/nav/nav.html');
	$('#slider').load('pages/menu/slider.html');
	$('#content').load('pages/content/content.html');
	
/*상단 메뉴바 클릭시*/	
	$(document).on('click','#home',function(e){
		location.href = 'index.html';
		e.stopImmedatePropagation();
	});
	$(document).on('click','#searchBtn',function(){
		location.href='pages/nav/member/resume.html';
	});
	
	$(document).on('click','#category_it',function(){
		$('#menu_it').slideDown('slow');
	});
	
	
	
	

	
	
});

