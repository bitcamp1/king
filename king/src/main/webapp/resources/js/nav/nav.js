var nav = {};
nav.init = function(){
	$('.accord_head').click(function(){
		$(this).next().slideToggle(400);
	},function(){
		$(this).next().slideToggle(400);
	}
	);
	$('#accordion').accordion({
		heightStyle:'content',
		clearStyle:true,
		icons:{'header' : '.ui-accordion-header'}
		
	});
	
	$(document).on('click','#createAccount',function(){
		$('#slider').hide();
		$('#container').load('pages/nav/member/join.html');
	});
	
	$(document).on('click','#bookNavigation',function(e){
		$('#content').load('pages/nav/book/book.html');
	});
	$(document).on('click','#taskNavigation',function(e){
		$('#content').load('pages/nav/task/task.html');
	});

	$(document).on('click','img#message',function(){
		$('#container').load('pages/nav/message/message.html');
	});
	$(document).on('click','#resume_list',function(){
		location.href='pages/nav/member/resume.html';
	});
	
	
};