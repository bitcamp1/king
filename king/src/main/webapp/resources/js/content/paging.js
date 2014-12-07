/**************************************************************************************
 * jQuery Paging 0.1.7
 * by composite (ukjinplant@msn.com)
 * http://composite.tistory.com
 * This project licensed under a MIT License.
 *************************************************************************************
 
 移섑솚��(format,next,prev,href,first,last �띿꽦 �꾩슜)
 {0} = �대┃ ���섏씠吏�
 {1} = �섏씠吏�湲몄씠
 {2} = 泥섏쓬 �섏씠吏�
 {3} = 留덉�留��섏씠吏�
 {4} = �댁쟾 �뚰듃��留덉�留��섏씠吏�
 {5} = �ㅼ쓬 �뚰듃��泥섏쓬 �섏씠吏�
 {6} = 留�留덉�留��섏씠吏�/
 
(function($){
	//default properties.
	var a=/a/i,
		defs={  
			item:'a',
			next:'[&gt;{5}]',
			prev:'[{4}&lt;]',
			format:'[{0}]', //�섏씠吏��붿냼 �쒓렇紐� 湲곕낯媛�"a".
			itemClass:'paging-item',  // �섏씠吏��붿냼 以��섏씠吏���CSS �대옒��
			sideClass:'paging-side',  // �ㅼ쓬 �먮뒗 �댁쟾 踰꾪듉 CSS �대옒��
			itemCurrent:'selected', // �꾩옱 �섏씠吏�� �섑��대뒗 CSS �대옒�ㅼ씠硫��섏씠吏��붿냼��以묒꺽��
			length:10,  //�섏씠吏��쒖떆��媛쒖닔. 湲곕낯媛�10.
			max:1,  //理쒕� �쒗쁽���섏씠吏���
			current:1,  //�꾩옱 �섏씠吏�
			append:false,  // true �ㅼ젙 �� 湲곗〈 �댁슜����젣�섏� �딄퀬 �섏씠吏뺤쓣 �ы븿�쒗궡. 
			href:'#{0}',  // a �쒓렇����留곹겕 二쇱냼瑜��뺤쓽. 湲곕낯媛�"#%d"
			event:true,   //湲곕낯 �대깽���쒖꽦�� �덈줈怨좎묠 �놁씠 �숈쟻�쇰줈 �섏씠吏�珥덇린�붾맖. ajax���좎슜. 湲곕낯媛�true.
			first:'[1&lt;&lt;]',   //泥��섏씠吏��댁슜. 湲곕낯媛�"[1&lt;&lt;]"
			last:'[&gt;&gt;{6}]'   //留덉�留��섏씠吏��댁슜. 湲곕낯媛�"[&gt;&gt;{6}]"
	},
	format=function(str){  //format : �섏씠吏�� �섑����댁슜, 湲곕낯媛�"[%d]".
		var arg=arguments;
		return str.replace(/\{(\d+)\}/g,function(m,d){
			if(+d<0) return m;
			else return arg[+d+1]||"";
		});
	},
	item,
	make=function(op,page,cls,str){
		item=document.createElement(op.item);
		item.className=cls;
		item.innerHTML=format(str,page,op.length,op.start,op.end,op.start-1,op.end+1,op.max);
		if(a.test(op.item)) item.href=format(op.href,page);
		if(op.event){
			$(item).bind('click',function(e){
				var fired=true;
				if($.isFunction(op.onclick)) fired=op.onclick.call(item,e,page,op);
				if(fired==undefined||fired)
					op.origin.paging($.extend({},op,{current:page}));
				return fired;
			}).appendTo(op.origin);
			//bind event for each elements.
			var ev='on';
			switch(str){
				case op.prev:ev+='prev';break;
				case op.next:ev+='next';break;
				case op.first:ev+='first';break;
				case op.last:ev+='last';break;
				default:ev+='item';break;
			}
			if($.isFunction(op[ev])) op[ev].call(item,page,op);
		}
		return item;
	};

	$.fn.paging=function(op){
		op=$.extend({origin:this},defs,op||{});this.html('');
		if(op.max<1) op.max=1; if(op.current<1) op.current=1;
		op.start=Math.floor((op.current-1)/op.length)*op.length+1;
		op.end=op.start-1+op.length;
		if(op.end>op.max) op.end=op.max;
		if(!op.append) this.empty();
		//prev button
		if(op.current>op.length){
			if(op.first!==false) make(op,1,op.sideClass,op.first);
			make(op,op.start-1,op.sideClass,op.prev);
		}
		//pages button
		for(var i=op.start;i<=op.end;i++)
			make(op,i,op.itemClass+(i==op.current?' '+op.itemCurrent:''),op.format);
		//next button
		if(op.current<=Math.floor(op.max/op.length)*op.length){
			make(op,op.end+1,op.sideClass,op.next);
			if(op.last!==false) make(op,op.max,op.sideClass,op.last);
		}
			
		//last button
	};
})(jQuery);

*/