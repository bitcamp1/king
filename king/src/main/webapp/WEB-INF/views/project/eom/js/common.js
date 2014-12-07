function f1(p1){if(this.attachEvent){this.attachEvent('onclick',p1);}else{this.addEventListener('click',p1);}}
function f2(p1,p2){p1.click=f1;if(p2!=undefined){p1.innerHTML=p2;}}

function Java33(value, text) {
	if (value != undefined) {
		var element = null;
		
		if (value.indexOf('<') > -1) { 
			element = document.createElement( 
					value.substr(1, value.length - 2) );
		} else if (value.indexOf('#') > -1) {
			element = document.getElementById( value.substring(1) );
		} else {
			element = document.getElementsByTagName(value);
		}
		
		if (element.length) {
			for (var i = 0; i < element.length; i++) {
				f2(element[i], text);
			}
		} else {
			f2(element, text);
		}
		
		return element;
	}
}

Java33.requestXHR = function() {
	var xhr = null;
	try {
		xhr = new XMLHttpRequest();
	} catch (exception) {
		try {
			xhr = new ActiveXObject('Msxml2.XMLHTTP');
		} catch (exception2) {
			xhr = new ActiveXObject('Microsoft.XMLHTTP');
		}
	}
	
	return xhr;
};

Java33.ajax = function(url, settings) {
	var xhr = Java33.requestXHR();	
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) { 
			if (xhr.status == 200) {
				var response = JSON.parse(xhr.responseText);
				
				if (response.status == "success") {
					if (settings.success) {
						settings.success(response);
					}
				} else {
					if (settings.error) {
						settings.error(response.error);
					}
				}
			} else {
				window.alert('서버에서 오류가 발생했습니다.');
			}
		}
	}; 
	xhr.open(settings.type, url, true);
	if (settings.type == 'GET') {
		xhr.send();
	} else {
		xhr.setRequestHeader('Content-Type', 
				'application/x-www-form-urlencoded');
		var urlEncodedData = ''; // <- settings.data를 이름=값&이름=값 변환해서 
		for (var key in settings.data) {
			if (urlEncodedData.length > 0) {
				urlEncodedData += '&';
			}
			urlEncodedData += key + "=" + 
					encodeURIComponent(settings.data[key]);
		}
		xhr.send(urlEncodedData);
	}
};

Java33.load = function(elementId, url, success) {
	var xhr = Java33.requestXHR();	
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) { 
			if (xhr.status == 200) {
				var element = Java33(elementId);
				element.innerHTML = xhr.responseText;
				var script = element.getElementsByTagName('script');
				if (script.length > 0) {
					for(var i in script) {
						eval(script[i].innerHTML);
					}
				}
				
				if (success != undefined) {
					success();
				}
			} else {
				window.alert('서버에서 오류가 발생했습니다.');
			}
		}
	}; 
	xhr.open('GET', url, true);  
	xhr.send();
};


var $ = Java33;


Date.prototype.format = function(f) {
    if (!this.valueOf()) return " ";
 
    var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    var d = this;
     
    return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
        switch ($1) {
            case "yyyy": return d.getFullYear();
            case "yy": return (d.getFullYear() % 1000).zf(2);
            case "MM": return (d.getMonth() + 1).zf(2);
            case "dd": return d.getDate().zf(2);
            case "E": return weekName[d.getDay()];
            case "HH": return d.getHours().zf(2);
            case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
            case "mm": return d.getMinutes().zf(2);
            case "ss": return d.getSeconds().zf(2);
            case "a/p": return d.getHours() < 12 ? "오전" : "오후";
            default: return $1;
        }
    });
};
 
String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
Number.prototype.zf = function(len){return this.toString().zf(len);};
















