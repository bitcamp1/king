var project = {};

$(document).ready(function(){
	$(document).on('click','#proj_list',function(e){
		$('#content').load('pages/nav/project/project.html');
		/*project.list();*/
	});
	$(document).on('click','#eom_proj',function(e){
		location.href='pages/nav/project/eom/index.html';
		/*project.list();*/
	});
});

project.list = function(){
$.ajax({
		
		url : 'ajax/project/getProjectList.do',
		type : 'POST',
		dataType : 'json',
		data : {
			pageNo : 1
		},
		success : function(data){
		//전역변수.[$(#).val()] = data.모델객체 키값
			console.log('success넘어옴');
			console.log(data);
			
			project.pageNo = data.pageNo;
			project.recordCount = data.recordCount;
			project.pageSize = data.pageSize;
			
			var totalPage = parseInt(project.recordCount/project.pageSize);
			if((project.recordCount % project.pageSize)>0){
				totalPage ++;
			}
			project.totalPage = totalPage;
			project.clearList();
			
			var projectTable = $('#projectTable');
			for(var i in data.projectList){
				
			$('<tr>').append($('<td>').append($('<input>').attr('type','checkbox').attr('id','projectCheckbox')))
					.append($('<td>').append(1))
					.append($('<td>').append($('<a>',{
						text:data.projectList[i].projectTitle,
						href:'#'  ,
						id : 't_projectTitle'
					}).addClass('projectList_no')))
					.append($('<td>').append($('<a>',{
						text:data.projectList[i].email,
						href : '#'
					})))
					.append($('<td>').text(2013)
					)
					.appendTo(projectTable);
			$('#paging').load('pages/content/paging.html');
			
			} //for 
			
		},
		error : function(xhr, status, error){
			console.log(error);
			alert('getMemberList.do 요청 실패');
		}
	});
};