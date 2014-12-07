var member = {};

member.init = function() {
	this.changeButtonStatus('new');
	this.listMember();
	
	$('#prevList').click(function(event) {
		event.preventDefault();
		if (member.pageNo > 1) {
			member.pageNo--;
			member.listMember();
		}
	});
	
	$('#nextList').click(function(event) {
		event.preventDefault();
		if (member.pageNo < member.totalPage) {
			member.pageNo++;
			member.listMember();
		}
	});
	
	$('#resetBtn').click(function(event) {
		member.changeButtonStatus('new');
	});
	
	$('#deleteBtn').click(function(event) {
		var result = window.confirm('정말 삭제하시겠습니까?');
		if(result) {
			member.deleteMember();
		}
	});
	
	$('#addBtn').click(function(event) {
		$.ajax('ajax/member/add.do', {
			type : 'POST',
			data : {
				email : $('#email').value,
				name : $('#name').value,
				tel : $('#tel').value,
				password : $('#password').value
			},
			success : function() {
				member.clearForm();
				member.listMember();
			},
			error : function(error) {
				window.alert('등록 실패입니다.');
				console.log(error);
			}
		});
	});
	
	$('#changeBtn').click(function(event) {
		$.ajax('ajax/member/update.do', {
			type : 'POST',
			data : {
				email : $('#email').value,
				name : $('#name').value,
				tel : $('#tel').value,
				password : $('#password').value
			},
			success : function() {
				member.clearForm();
				member.listMember();
			},
			error : function(error) {
				window.alert('변경 실패입니다.');
				console.log(error);
			}
		});
	});
};

member.listMember = function() {
	if (member.pageNo == undefined) {
		member.pageNo = 1;
	}
	
	$.ajax('ajax/member/list.do?pageNo=' + member.pageNo,	{
		type: 'GET',
		success: function(data) {
			member.pageNo = data.pageNo;
			member.recordCount = data.recordCount;
			member.pageSize = data.pageSize;
			
			var totalPage = parseInt(member.recordCount / member.pageSize);
			if ((member.recordCount % member.pageSize) > 0) {
				totalPage++;
			}
			member.totalPage = totalPage;
			
			member.clearList();
			
			var tagTable = $("#memberTable");
			var tagTr = null;
			for(var i in data.list) {
				tagTr = $("<tr>");
				tagTr.className = "memberRow";
				
				var tagLink = $('<a>', data.list[i].name);
				tagLink.href = '#';
				tagLink.setAttribute('data-email', data.list[i].email);
				tagLink.click(member.loadMember);
				
				var tagTd = $('<td>');
				tagTd.appendChild(tagLink);
				
				tagTr.appendChild( tagTd );
				
				tagTr.appendChild( $('<td>', data.list[i].email));
				tagTr.appendChild( $('<td>', data.list[i].tel));
				
				tagTable.appendChild(tagTr);
			}
			
			$('#currPageNo', member.pageNo);
		},
		error: function(data) {
			window.alert(data);
		}
	});
};

member.clearList = function() {
	var tagTable = $('#memberTable');
	var memberList = document.getElementsByClassName('memberRow');
	
	for(var i = memberList.length - 1; i >= 0; i--) {
		tagTable.removeChild(memberList[i]);
	}
};

member.loadMember = function() {
	$.ajax('ajax/member/detail.do?email=' + this.getAttribute('data-email'), {
		type: 'GET',
		success: function(data) {
			var memberData = data.member;
			var projectsData = data.projects;
			
			$('#email').value = memberData.email;
			$('#name').value = memberData.name;
			$('#tel').value = memberData.tel;
			$('#regDate').value = new Date(memberData.regDate)
											.format('yyyy-MM-dd');
			
			var tagUl = $('#projects');
			var projectList = tagUl.getElementsByTagName('li');
			for(var i = projectList.length - 1; i >= 0; i--) {
				tagUl.removeChild(projectList[i]);
			}
			
			for(var i in projectsData) {
				tagUl.appendChild(
						$('<li>', projectsData[i].title));
			}

			member.changeButtonStatus('load');
		},
		error: function(data) {
			window.alert(data);
		}
	});
};

member.deleteMember = function() {
	$.ajax('ajax/member/delete.do?email=' + $('#email').value, {
		type: 'GET',
		success: function(data) {
			member.clearForm();
			member.listMember();
		},
		error: function(data) {
			window.alert(data);
		}
	});
};

member.clearForm = function() {
	this.changeButtonStatus('new');
	
	var clickEvent = document.createEvent("MouseEvents");
	clickEvent.initMouseEvent("click", true, true, window,
	    0, 0, 0, 0, 0, false, false, false, false, 0, null);
	$('#resetBtn').dispatchEvent(clickEvent);
};

member.changeButtonStatus = function(state) {
	if (state == 'load') {
		$('#addBtn').style.display = 'none';
		$('#changeBtn').style.display = '';
		$('#deleteBtn').style.display = '';
		$('#email').readOnly = true;
	} else {
		$('#addBtn').style.display = '';
		$('#changeBtn').style.display = 'none';
		$('#deleteBtn').style.display = 'none';
		$('#email').readOnly = false;
	}
};