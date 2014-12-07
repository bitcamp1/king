var project = {};

project.init = function() {
	this.changeButtonStatus('new');
	this.listProject();
	
	$('#prevList').click(function(event) {
		event.preventDefault();
		if (project.pageNo > 1) {
			project.pageNo--;
			project.listProject();
		}
	});
	
	$('#nextList').click(function(event) {
		event.preventDefault();
		if (project.pageNo < project.totalPage) {
			project.pageNo++;
			project.listProject();
		}
	});
	
	$('#resetBtn').click(function(event) {
		project.changeButtonStatus('new');
	});
	
	$('#deleteBtn').click(function(event) {
		var result = window.confirm('정말 삭제하시겠습니까?');
		if(result) {
			project.deleteProject();
		}
	});
	
	$('#addBtn').click(function(event) {
		$.ajax('ajax/project/add.do', {
			type : 'POST',
			data : {
				//no : '',
				title : $('#title').value,
				description : $('#description').value,
				startDate : $('#startDate').value,
				endDate : $('#endDate').value,
				emailList : $('#emailList').value
			},
			success : function() {
				project.clearForm();
				project.listProject();
			},
			error : function(error) {
				window.alert('등록 실패입니다.');
				console.log(error);
			}
		});
	});
	
	$('#changeBtn').click(function(event) {
		$.ajax('ajax/project/update.do', {
			type : 'POST',
			data : {
				no : $('#no').value,
				title : $('#title').value,
				description : $('#description').value,
				startDate : $('#startDate').value,
				endDate : $('#endDate').value,
				emailList : $('#emailList').value
			},
			success : function() {
				project.clearForm();
				project.listProject();
			},
			error : function(error) {
				window.alert('변경 실패입니다.');
				console.log(error);
			}
		});
	});
};

project.listProject = function() {
	if (project.pageNo == undefined) {
		project.pageNo = 1;
	}
	
	$.ajax('ajax/project/list.do?pageNo=' + project.pageNo,	{
		type: 'GET',
		success: function(data) {
			project.pageNo = data.pageNo;
			project.recordCount = data.recordCount;
			project.pageSize = data.pageSize;
			
			var totalPage = parseInt(project.recordCount / project.pageSize);
			if ((project.recordCount % project.pageSize) > 0) {
				totalPage++;
			}
			project.totalPage = totalPage;
			
			project.clearList();
			
			var tagProjectTable = $("#projectTable");
			var tagTr = null;
			for(var i in data.list) {
				tagTr = $("<tr>");
				tagTr.className = "projectRow";
				tagTr.appendChild( $('<td>', data.list[i].no));
				
				var tagTitle = $('<a>', data.list[i].title);
				tagTitle.href = '#';
				tagTitle.setAttribute('data-no', data.list[i].no);
				tagTitle.click(project.loadProject);
				
				var tagTitleTd = $('<td>');
				tagTitleTd.appendChild(tagTitle);
				
				tagTr.appendChild( tagTitleTd );
				
				tagTr.appendChild( $('<td>', 
						new Date(data.list[i].startDate).format('yyyy-MM-dd')));
				tagTr.appendChild( $('<td>', 
						new Date(data.list[i].endDate).format('yyyy-MM-dd')));
				
				tagProjectTable.appendChild(tagTr);
			}
			
			$('#currPageNo', project.pageNo);
		},
		error: function(data) {
			window.alert(data);
		}
	});
};

project.clearList = function() {
	var projectTable = $('#projectTable');
	var projectList = document.getElementsByClassName('projectRow');
	
	for(var i = projectList.length - 1; i >= 0; i--) {
		projectTable.removeChild(projectList[i]);
	}
};

project.loadProject = function() {
	$.ajax('ajax/project/detail.do?no=' + this.getAttribute('data-no'), {
		type: 'GET',
		success: function(data) {
			var projectData = data.project;
			var membersData = data.project.members;
			
			$('#no').value = projectData.no;
			$('#title').value = projectData.title;
			$('#description').value = projectData.description;
			$('#startDate').value = new Date(projectData.startDate)
											.format('yyyy-MM-dd');
			$('#endDate').value = new Date(projectData.startDate)
											.format('yyyy-MM-dd');
			
			var membersValue = '';
			for(var i in membersData) {
				if (membersData[i].level != 0) {
					if (membersValue.length > 0) {
						membersValue += ',';
					}
					membersValue += membersData[i].email;
				}
			}
			
			$('#emailList').value = membersValue;

			project.changeButtonStatus('load');
		},
		error: function(data) {
			window.alert(data);
		}
	});
};

project.clearForm = function() {
	this.changeButtonStatus('new');
	
	var clickEvent = document.createEvent("MouseEvents");
	clickEvent.initMouseEvent("click", true, true, window,
	    0, 0, 0, 0, 0, false, false, false, false, 0, null);
	$('#resetBtn').dispatchEvent(clickEvent);
};

project.deleteProject = function() {
	$.ajax('ajax/project/delete.do?no=' + $('#no').value, {
		type: 'GET',
		success: function(data) {
			project.clearForm();
			project.listProject();
		},
		error: function(data) {
			window.alert(data);
		}
	});
};

project.changeButtonStatus = function(state) {
	if (state == 'load') {
		$('#addBtn').style.display = 'none';
		$('#changeBtn').style.display = '';
		$('#deleteBtn').style.display = '';
	} else {
		$('#addBtn').style.display = '';
		$('#changeBtn').style.display = 'none';
		$('#deleteBtn').style.display = 'none';
	}
};







