
function previewImage(targetObj, previewId) {
	// 	크로스브라우징 처리 
	var preview = document.getElementById(previewId); //div id   
	var ua = window.navigator.userAgent;

	if (ua.indexOf("MSIE") > -1) {//ie일때

		targetObj.select();

		try {
			var src = document.selection.createRange().text; // get file full path 
			var ie_preview_error = document
			.getElementById("ie_preview_error_" + previewId);

			if (ie_preview_error) {
				preview.removeChild(ie_preview_error); //error가 있으면 delete
			}

			var img = document.getElementById(previewId); //이미지가 뿌려질 곳 

			img.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"
				+ src + "', sizingMethod='scale')"; 
			// 이미지 로딩, sizingMethod는 div에 맞춰서 사이즈를 자동조절 하는 역할
		} catch (e) {
			if (!document.getElementById("ie_preview_error_" + previewId)) {
				var info = document.createElement("<p>");
				info.id = "ie_preview_error_" + previewId;
				info.innerHTML = "a";             
				preview.insertBefore(info, null);            
			}
		}
		//크로스브라우징 처리 끝
	} else { //ie가 아닐때      ...크롬 사파리 일 경우 
		var files = targetObj.files;                    
		for ( var i = 0; i < files.length; i++) {             

			var file = files[i];

			var imageType = /image.*/; //이미지 파일일경우만.. 뿌려준다.
			if (!file.type.match(imageType))
				continue;

			var prevImg = document.getElementById("prev_" + previewId); //이전에 미리보기가 있다면 삭제
			if (prevImg) {
				preview.removeChild(prevImg);
			}

			var img = document.createElement("img"); //크롬은 div에 이미지가 뿌려지지 않는다. 그래서 자식Element를 만든다.
			img.id = "prev_" + previewId;
			img.classList.add("obj");
			img.file = file;
			img.style.width = '150px'; //기본설정된 div의 안에 뿌려지는 효과를 주기 위해서 div크기와 같은 크기를 지정해준다.
			img.style.height = '150px';
			img.style.border = '1px #D3D4D5 solid';

			preview.appendChild(img);

			if (window.FileReader) { // FireFox, Chrome , Opera 확인.
				var reader = new FileReader();
				reader.onloadend = (function(aImg) {
					return function(e) {
						aImg.src = e.target.result;
					};
				})(img);
				reader.readAsDataURL(file);
			} else { // safari is not supported FileReader
				//alert('not supported FileReader');
				if (!document.getElementById("sfr_preview_error_"
						+ previewId)) {
					var info = document.createElement("p");
					info.id = "sfr_preview_error_" + previewId;
					info.innerHTML = "not supported FileReader";
					preview.insertBefore(info, null);
				}
			}
		}
	}
}

