var menu = {};

menu.init = function(){
	 $(".gnbsub").hide();
     $(".gnb>ul>li").hover(function() {
	   $(this).children("div").fadeIn();
	 },function() {
	   $(".gnbsub").hide();
	   $(".gnbList").children(".over").show();
	 });
     
     $('#jquery').click(function(){
    	 $('#slider').css('display','none');
    	$('#container').load('pages/menu/jqueryBoard.html');
     });
 
 /*$(".gnbsub").children(".over").fadeIn(slow);*/
	
};