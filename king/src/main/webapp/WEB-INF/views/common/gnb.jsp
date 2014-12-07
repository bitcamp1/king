<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<style>

#gnb {
	width: 960px;
	height : 40px;
	color: black;
	text-align:center;
	border : 1px solid black;
	font-weight: bold;
	background-color: black;
	
	/*백그라운드 이미지 넣으려면  url(../images_grims/bg_menu.png) 0 0 no-repeat */
}



#gnb li {
	float: left;
	display: inline;
	width : 25%;
}

.gnb span {
	display: inline-block;
	color: #fff;
	padding: 10px 12px;  
	font-weight: bold;
	/* background: url(../images_grims/bg_line.gif) 0 0 no-repeat; */
	position: relative;
	 z-index: 10 
}
.gnb{
	text-decoration:none;
}
	

 .sub {
	/* top: 35px; */
	left: 0;
	width: 100%;
	height : 200px;
	
	
}

.sub {
	display: block;
	list-style-type: disc;
	background-color: orange;
	text-align : left;
	margin : 0;
	-webkit-margin-before: 0;
	-webkit-margin-after: 0;
	-webkit-margin-start: 0;
	-webkit-margin-end: 0;
	-webkit-padding-start: 0;
}

.sub li {
	float: left;
	display: block;
	padding : 10px;
}

	

	
</style>
<div>
   <ul id='gnb'>
    	<li class="gnb"><a href='#gnb1'><span>IT</span></a> 
			<ul class='sub'>
				<li><a href="#sub1">jQuery</a></li>
                <li><a href="#sub2">JSP</a></li>
                <li><a href="#sub3">Java</a></li>
                <li><a href="#sub4">Alumini-Ph.D</a></li>
                <li><a href="#sub5">Alumini-Master</a></li>
			</ul>
		</li>
                
    <li class="gnb"><span>IT Infomation</span>
	                <ul class="sub" >
	                  <li><a href="#" >Professor</a></li>
	                  <li><a href="#">Ph.D course</a></li>
	                  <li><a href="#">Master Course</a></li>
	                  <li><a href="#">Post Docter</a></li>
	                  <li><a href="#">Alumini-Ph.D</a></li>
	                  <li><a href="#">Alumini-Master</a></li>
	               </ul>
                </li>
                
    <li class="gnb"><span>Bookmark</span>
                 <ul class="sub">
	              	<li><a href="#" >유용한 블로그</a></li>
	                 <li><a href="#">Domestic Conference</a></li>
	                 <li><a href="#">NML Workshop</a></li>
	                 <li><a href="#">NML group meetiong</a></li>
             	</ul>
    </li>
                
    <li class="gnb"><span>Uncategorized</span>
                <ul class="sub">
              <li><a href="#" >SCI Joumals</a></li>
                 <li><a href="#">Domestic Journals</a></li>
                 <li><a href="#">Conferenice Proceedings</a></li>
                 <li><a href="#">Dissertation</a></li>
                 <li><a href="#">Research Reports</a></li>
             </ul>
   </li>
                
   </ul>
             
</div>
<script>
	$('#it').click(function(){
		window.location.href='../it/gnb.html';
	});
	$('.gnbList').hover(function(){
		$(this).css('color','blue');
	});
	
	stuHover = function() {
		var cssRule;
		var newSelector;
		for (var i = 0; i < document.styleSheets.length; i++)
			for (var x = 0; x < document.styleSheets[i].rules.length ; x++)
				{
				cssRule = document.styleSheets[i].rules[x];
				if (cssRule.selectorText.indexOf("LI:hover") != -1)
				{
					 newSelector = cssRule.selectorText.replace(/LI:hover/gi, "LI.iehover");
					document.styleSheets[i].addRule(newSelector , cssRule.style.cssText);
				}
			}
		var getElm = document.getElementById("nav").getElementsByTagName("LI");
		for (var i=0; i<getElm.length; i++) {
			getElm[i].onmouseover=function() {
				this.className+=" iehover";
			}
			getElm[i].onmouseout=function() {
				this.className=this.className.replace(new RegExp(" iehover\\b"), "");
			}
		}
	}
	if (window.attachEvent) window.attachEvent("onload", stuHover);


	
</script>
