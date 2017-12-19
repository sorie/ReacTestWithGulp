netUi.webviewZoom = function(){
		var agent = navigator.userAgent;
		var os="";
		var osVer="";
		var fIndex;
		var checkText;
		var checkTextLen;
		var checkSep;
		var minusBorder = 0;

		try {
			if( agent.match( /iPad/i ) || agent.match( /iPhone/i ) || agent.match( /iPod/i ) ){
				checkText = "OS ";
				checkSep = "_";
				os = "ios";
			}else if( agent.match( /Android/i ) ){
				checkText = "Android ";
				checkSep = ".";
				os = "aos";
			}

			fIndex = agent.indexOf(checkText);
			checkTextLen = checkText.length;
			osVer = (agent.substr(fIndex+checkTextLen,agent.indexOf(' ',fIndex+checkTextLen)-fIndex-checkTextLen));
			osVer = (osVer.substr(0,osVer.indexOf(checkSep)+2));
			if(os == "ios") osVer = osVer.replace("_",".");
			osVer = Number(osVer);
		} catch(err) {}

		function zooming(){
			var intContWidth = $(".section .cont").eq(0).width();
			var intWindowWidth = $(window).width();
			var intZoomIn, intZoomOut;

			if(intContWidth == "320"){
				intZoomIn = 480;
				intZoomOut = 320;
			}else{ // 480
				intZoomIn = 640;
				intZoomOut = 480;
			}

			if(intWindowWidth > intZoomIn){
				$("#appView").css({
					"width":intZoomIn+"px",
					"zoom":intWindowWidth/intZoomIn
				});
			}else if(intWindowWidth < intZoomOut){
				if(os=="ios"){
					$("body").css("padding","6px");
					minusBorder = 12;
				}
				$("#appView").css({
					"width":intZoomOut+"px",
					"zoom":(intWindowWidth-minusBorder)/intZoomOut
				});
			}else{
				$("#appView").css({
					"width":"100%",
					"zoom":1
				});
			}
		}

		if( (os=="aos" && osVer>=2.1) || (os=="ios" && osVer>=4.1) ){
			$(document).ready(zooming);
			$(window).resize(zooming);
		}
	}
