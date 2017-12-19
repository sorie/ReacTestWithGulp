/* GNB 기능 구현을 위한 function.*/
function uiGnbSet(){
	if(!(document.compatMode && document.compatMode=="BackCompat")){
		if ( document.getElementById('GNB') != null ) {
			document.getElementById('GNB').className = "gnb_dtd";
		}
	}
	if ( document.getElementById('GNB_bx') != null ) {
	 	document.getElementById('GNB_bx').style.minWidth = document.getElementById('GNB').clientWidth + "px";
	}
}

function uiGnbMnuOn(no){
	for(var i=1;i<3;i++){
		document.getElementById('GNB_mn0'+i).getElementsByTagName('a')[0].className = "gnb_m";
		document.getElementById('GNB_mn0'+i).getElementsByTagName('div')[0].style.display = "none";
	}
	document.getElementById('GNB_mn0'+no).getElementsByTagName('a')[0].className = "gnb_m on";
	document.getElementById('GNB_mn0'+no).getElementsByTagName('div')[0].style.display = "block";
}

function uiGnbMnuOff(no){
	document.getElementById('GNB_mn0'+no).getElementsByTagName('a')[0].className = "gnb_m";
	document.getElementById('GNB_mn0'+no).getElementsByTagName('div')[0].style.display = "none";
}

var u_gnb_gameschban_tog = 1;
function uiGnbGameSchBan() {
	if(u_gnb_gameschban == 1) {
		if(u_gnb_gameschban_tog == 1) {
			u_gnb_gameschban_tog = 0;
			document.getElementById('GNB_game_ban').style.display = "none";
			document.getElementById('GNB_game_sch').getElementsByTagName('input')[0].focus();
		} else {
			u_gnb_gameschban_tog = 1;
			document.getElementById('GNB_game_ban').style.display = "block";
		}
	}else {
		try {
			if(u_gnb_gameschban_tog == 1) {
				document.getElementById('GNB_game_ban').style.display = "none";
			}
		} catch ( e ) {}
	}
}/* Netmarble Cookie */
NetmarbleCookie = {
	GetValue : function ( name ) {
		var nameOfCookie = name + "=";
		var x = 0;
		while ( x <= document.cookie.length )
		{
			var y = (x+nameOfCookie.length);
			if ( document.cookie.substring( x, y ) == nameOfCookie ) {
				if ( (endOfCookie=document.cookie.indexOf( ";", y )) == -1 )
				endOfCookie = document.cookie.length;
				return unescape( document.cookie.substring( y, endOfCookie ) );
			}

			x = document.cookie.indexOf( " ", x ) + 1;

			if ( x == 0 ) break;
		}
		return "";
	},

	GetSubValue : function ( realName, realValue ) {
		var strCookie = this.GetValue(realName, false);

		if(strCookie == "") return "";

		var nPos = strCookie.indexOf(realValue+":");
		var nLen = realValue.length + 1;
		var strTempName, strTempCookie;

		if(nPos != -1)
		{
			strTempName = strCookie.substring(nPos, nLen);
			strTempCookie = strCookie.substring(nPos+nLen, strCookie.length);
			nPos = strTempCookie.indexOf("|");

			return unescape(strTempCookie.substring(0, nPos));
		}
		else
			return "";
	},

	SetSubValue : function( name, subName, value ) {
		var todayDate = new Date();
		todayDate.setHours(8);
		todayDate.setMinutes(59);
		todayDate.setSeconds(59);
		todayDate.setDate( todayDate.getDate() + 1 );

		this.SetSubValueByExpireDate( name, subName, value, todayDate );
	},

	SetSubValueByExpireDate : function( name, subName, value, expire_date ) {

		if(name == '' || name == null) return;

		var strCookie = this.GetValue(name);
		var nPos = strCookie.indexOf(subName+":");
		var nLen = subName.length + 1;
		var strTemp1, strTemp2;

		if(value == '' || value == null)
		{
			strTemp1 = strCookie.substring(0, nPos);
			strTemp2 = strCookie.substring(nPos+nLen, strCookie.length);
			nPos = strTemp2.indexOf("|") + 1;
			strTemp2 = strTemp2.substring(nPos, strCookie.length);
			strCookie = strTemp1 + strTemp2;
		}
		else
		{
			if(nPos != -1)
			{
				strTemp1 = strCookie.substring(0, nPos+nLen);
				strTemp2 = strCookie.substring(nPos+nLen, strCookie.length);
				nPos = strTemp2.indexOf("|");
				strTemp2 = strTemp2.substring(nPos, strCookie.length);

				strCookie = strTemp1 + escape(escape(value)) +strTemp2;
			}
			else
				strCookie = strCookie + subName + ":" + escape(escape(value)) + "|";
		}
		document.cookie = name+ "=" + strCookie + "; path=/; expires=" + expire_date.toGMTString() + "; domain=.netmarble.net";
	},

	SetValue : function( name, value ) {
		var todayDate = new Date();
		todayDate.setHours(8);
		todayDate.setMinutes(59);
		todayDate.setSeconds(59);
		todayDate.setDate( todayDate.getDate() + 1 );

		this.SetSubValueByExpireDate( name, '', value, todayDate );
	},

	SetValueByExpireDate : function ( name, expire_date ) {
		this.SetSubValue( name, '', 'y', expire_date );
	}
}

/* rd 호출 기능 설정 변수 */
var __NRD_ID = '__NRD_ID';
var __CRD_ID = '__CRD_ID';
var __CRD_ENABLED__ = true;
var __NRD_ENABLED__ = true;


var nSW = screen.width;
var nSH = screen.height;
var nPointW = nSW / 2;
var nPointH = nSH / 2 - 40;
var n_gnb_popup_url = '';
var n_gnb_popup_height = 0;
var n_gnb_popup_width = 0;


var wptg_tagscript_vars = wptg_tagscript_vars || [];
var ggtg_tagscript_vars = ggtg_tagscript_vars || [];

/* 넷마블 GNB */
var NetmarbleGNB = {

	RdCode : function ( ) {
		return {
			"BI" 			:"201304110094",
			"EventBI"		:"201304110095",
			"Tving"			:"",
			"Movie"			:"",
			"Comix"			:"",
			"Cash"			:"",
			"CC"			:"",
			"Logout"		:"201304110097",
			"Login"			:"201304110096",
			"SmartGame"		:"",
			"WebGame"		:"",
			"MyGameButton"	:"",
			"CBTButton"		:"",
			"OBTButton"		:""
		};
	},

	Init : function() {

		/* 서브 도메인으로  사이트 코드 보정 (Nate)*/
		if( window.location.host == 'nate.netmarble.net') {
			NetmarbleGNB.SiteCode = '30';
		} else {
			NetmarbleGNB.SiteCode = '-1';
		}
		NetmarbleGNB.ServiceCode = '';
		NetmarbleGNB.Type = 'event';
		NetmarbleGNB.IsLogin = false;
		NetmarbleGNB.UserID = '';
		NetmarbleGNB.Width = '1000';
		NetmarbleGNB.Align = 'center';
		NetmarbleGNB.HubSiteCode = '';

		/* CSS */
		var gnb_css = document.createElement( 'link' );
			gnb_css.setAttribute( 'rel','stylesheet' );
			gnb_css.setAttribute( 'type','text/css' );
			gnb_css.setAttribute( 'href','http://c2.img.netmarble.kr/web/netmarble/gnb/v/css/gnb_v2.css' );
		(document.getElementsByTagName('head')[0]).appendChild( gnb_css );

		if ( NetmarbleGNB.Type == 'pop' ) {
			// none...
		} else {

			var div_GNB_bx = document.createElement( 'div' );
				div_GNB_bx.setAttribute( 'id', 'GNB_bx' );

			if ( NetmarbleGNB.Align == 'left' ) {
				div_GNB_bx.className = 'gnbAlignLeft';
			}

			if ( document.body == null ) {
				document.lastChild.appendChild( div_GNB_bx );
			} else {
				document.body.insertBefore(div_GNB_bx, document.body.firstChild);
			}
		}
		return true;
	},

	/* 인증 공통 Lib */
	LoadSignJs : function() {
		var auth_js = document.createElement( 'script' );
		auth_js.setAttribute( 'type','text/javascript' );
		auth_js.setAttribute( 'src','http://sign.netmarble.net/getBeacon' );

		(document.getElementsByTagName('head')[0]).appendChild( auth_js );
	},

	/* gnb 노출 시작 */
	Show : function() {

		this.Layout();		/* gnb Layout */
		this.LoadData();	/* 전체게임, 스마트폰게임, 배너 등 로드 */
		this.LoadSignJs();	/* 인증 js */


		// 바로가기 검색
		if ( NetmarbleGNB.Type == 'event' || NetmarbleGNB.Type == 'pop' || NetmarbleGNB.Type == 'simple' ) {
			// 이벤트형, 팝업형, 심플형은 노출X
		} else {
			gnbGameSearch = new NetmarbleGnbSearch();
			gnbGameSearch.setObj('gnbGameSearch','txtNetmarbleGameSearch', '', 'ifrNetmarbleGameSearch');
			gnbGameSearch.setResultFunction( 'NetmarbleGNB.ShowGameSearchResult' );
			gnbGameSearch.setData(arrNetmarbleGame);
	    	gnbGameSearch.setErrData('');
	    	gnbGameSearch.setErrKey('');

		    if ( strSchPromotionUrl != null && strSchPromotionUrl != '' ) {
	    		gnbGameSearch.setGoUrl(strSchPromotionUrl);
	 		}
	 	}


	 		try { uiGnbGameSet('bo'); } catch (e) {};
	 		try { uiGnbGameSet('web');} catch (e) {};

	 	try { uiGnbGameSchBan() } catch (e) {};
	 	uiGnbSet();
		return true;
	},

	/* GNB 레이아웃  */
	Layout : function() {

		if (  NetmarbleGNB.Type == 'pop')
		{
			// none
		}
		else
		{
			var htmlLayout = '';
			htmlLayout=	'<div id="GNB" style="width:'+ NetmarbleGNB.Width +'px;">' +
							'<div class="gnb_lt' + ( NetmarbleGNB.SiteCode == 30 ? ' gnb_lt_nate' : '')+ '">' +
								this.Logo() +
								( NetmarbleGNB.Type == 'hub' ? '<div class="gnb_hub" id="HubGnbGameList"></div>' : '' ) +	/* 허브사이트 게임 메뉴 */
							'</div>' +
							'<div class="gnb_rt">';
							if ( NetmarbleGNB.Type == 'event' ) {
								/* 노출내용 없음 */
							} else if ( NetmarbleGNB.Type == 'simple' ) {
								htmlLayout +=
								'<ul class="gnb_mnu">' +
									'<li id="GNB_mn07" class="gnb_mn gnb_mn_ty"><a href="http://helpdesk.netmarble.net" onclick="javascript:NetmarbleGNB.clickrd(' + NetmarbleGNB.RdCode().CC + ');" class="gnb_m"><span>고객센터</span></a></li>'+
								'</ul>';
							} else {
								htmlLayout +=
								'<ul class="gnb_mnu">' +
									/* [01] PC게임 메뉴*/
									'<li id="GNB_mn01" class="gnb_mn">'+
										'<a href="javascript:void(0);" class="gnb_m" onclick="{uiGnbMnuOn(\'1\');NetmarbleGNB.clickrd('+NetmarbleGNB.RdCode().WebGame+');}"><span>PC게임</span></a>'+

										'<div class="gnb_smn_ly">'+
											'<div class="gnb_smn_line"></div>'+
											'<div class="gnb_smn" id="WebGameList"></div>'+ 	/* 게임리스트 영역 */
										'</div>'+
									'</li>'+
									/* End Of [01] 전체게임 메뉴*/

									/* [02] 모바일게임 메뉴*/
									'<li id="GNB_mn02" class="gnb_mn">'+
										'<a href="javascript:void(0);" class="gnb_m" onclick="uiGnbMnuOn(\'2\');NetmarbleGNB.clickrd('+  NetmarbleGNB.RdCode().SmartGame +');"><span>모바일게임</span></a>'+
										'<div class="gnb_smn_ly">'+
											'<div class="gnb_smn_line"></div>'+
											'<div class="gnb_smn">'+
												'<div class="gnb_smn_top">'+
													'<div class="gnb_smn_lt">'+
														'<p class="gnb_smn_tx" id="SmartGameNotice"></p>'+	/* 스마트폰 공지 노출 영역 */
													'</div>'+
													'<div class="gnb_smn_rt">'+
														'<a href="http://www.netmarble.net/mobile" onclick="javascript:NetmarbleGNB.clickrd('+ this.RdCode().SmartGame +');" target="_top"  class="gnb_bt_smart">모바일게임 전체보기</a>'+
													'</div>'+
													'<div class="gnb_smn_close"><a href="javascript:void(0);" onclick="uiGnbMnuOff(\'2\');">모바일게임 닫기</a></div>'+
												'</div>'+
												'<div class="gnb_smn_cnt" id="SmartGameList"></div>'+ /* 스마트폰게임 리스트 노출 영역*/
											'</div>'+
										'</div>'+
									'</li>'+
									/* End of [02] 스마트게임 메뉴*/

									/* [03~07] 방송~고객센터 메뉴 */
									'<li id="GNB_mn05" class="gnb_mn">' + this.CashButton() + '</li>'+
									'<li id="GNB_mn06" class="gnb_mn"><a href="http://helpdesk.netmarble.net" onclick="javascript:NetmarbleGNB.clickrd(' + NetmarbleGNB.RdCode().CC + ');" class="gnb_m"><span>고객센터</span></a></li>'+
									/* End Of [03~07] 방송~고객센터 메뉴 */
								'</ul>';
							}
								htmlLayout +=
								this.LoginButton() +
							'</div>' +
							/* [GNB 이미지 배너] : 심플형,이벤트형,허브형의 경우 노출하지 않음. */
							(( NetmarbleGNB.Type == 'simple' || NetmarbleGNB.Type == 'event' ) ? '' : '<div class="gnb_ban" id="GnbBanner"></div>' );
							/* End of [GNB 이미지 배너] */
						'</div>';
			var objGNB_bx = document.getElementById('GNB_bx')
			if ( objGNB_bx == null ) {
				objGNB_bx = document.createElement('GNB_bx');
				objGNB_bx.setAttribute('id','GNB_bx');
				if ( document.body == null ) {
					document.lastChild.appendChild( objGNB_bx );
				} else {
					document.body.insertBefore( objGNB_bx,  document.body.firstChild );
				}
			}
			objGNB_bx.innerHTML = (htmlLayout + this.RD() );

			/* 본 사이트 바로가기 */
			var goBody = document.createElement('a');
				goBody.href = '#sub_contents';
				goBody.className = 'gnb_hide';
				goBody.setAttribute('alt','본 사이트 바로가기');
			document.body.insertBefore( goBody,  document.body.firstChild );
		}

		/* PV */
		document.body.insertBefore( this.PV(),  document.body.firstChild );

		/* Creteo */
		if ( NetmarbleGNB.Type == '' ) {
			var creteo_id = 8448;
			if ( creteo_id != null && creteo_id != 0 ) {
				document.body.insertBefore( this.Creteo( creteo_id ), 	document.body.firstChild );
			}
		}
		/* 타게팅 게이츠 리타게팅 코드 설정 */
		if ( NetmarbleGNB.Type == '' ) {
			var tgStart = null;	// 노출시작일
			var tgEnd = null;	// 노출종료일
			var tgTi = null;		// 광고주 코드
			var tgService = '*';	// 타게팅 노출할 서비스 : 전체(*), 특정서비스(구분자는|)
			tgStart = new Date( 2015, 0, 11);	// 노출시작일
tgEnd = new Date( 2015, 8, 30) ;	// 노출종료일(2015년 2월28일까지)
tgTi = "20220";		// 광고주 코드
tgService = "*";

			if ( tgStart != null && tgEnd != null && tgTi != null ) {
				if ( tgService == '*' ||
				    (('|'+tgService+'|').indexOf( '|'+ NetmarbleGNB.ServiceCode +'|' ) >= 0) ) {
					var now = new Date();

					if ( now >= tgStart && now <= tgEnd ) {

						var rtScript = this.RetargetingScript();
						var rtTag = this.Retargeting();

						wptg_tagscript_vars.push(
						(function() {
							return {
								ti    : tgTi,	/*광고주 코드*/
								ty    : "Home",	/*트래킹태그 타입*/
								device: "web"	/*디바이스 종류 (web 또는 mobile)*/
							};
						}));
						document.body.insertBefore( rtScript, document.body.firstChild );
						document.body.insertBefore( rtTag, rtScript );
					}
				}
			}
		}
		/* 구글 리타게팅 코드 설정 */
		if ( NetmarbleGNB.Type == '' ) {
			var ggStart = null;	// 노출시작일
			var ggEnd = null;	// 노출종료일
			var ggTi = null;		// 광고주 코드
			var ggService = '*';	// 타게팅 노출할 서비스 : 전체(*), 특정서비스(구분자는|)
			ggStart = new Date( 2015, 2, 16);	// 노출시작일

ggEnd = new Date( 2016, 2, 16) ;	// 노출종료일

ggTi = "963395494";		// 광고주 코드

ggService = "*";

			if ( ggStart != null && ggEnd != null && ggTi != null ) {
				if ( ggService == '*' ||
				    (('|'+ggService+'|').indexOf( '|'+ NetmarbleGNB.ServiceCode +'|' ) >= 0) ) {
					var now = new Date();

					if ( now >= ggStart && now <= ggEnd ) {

						var ggrtScript = this.GoogleRetargetingScript();
						var ggrtTag = this.GoogleRetargeting();

						ggtg_tagscript_vars.push(
						(function() {
							return {
								ti    : ggTi,	/*광고주 코드*/
								ty    : "Home",	/*트래킹태그 타입*/
								device: "web"	/*디바이스 종류 (web 또는 mobile)*/
							};
						}));
						document.getElementsByTagName('head')[0].appendChild(ggrtScript);
						document.getElementsByTagName('head')[0].appendChild(ggrtTag);
					}
				}
			}
		}


	} ,

	LoadData : function () {

		var Now = new Date('2017', '11','12','10','26','35' );
		var WebGameList =
			{
			"layout_display_type":"round", 	/* 2단으로 노출되는 장르 :  ceil, round, floor */
			"adult": [


						{
							"id":"22",
							"name":"신규",
							"css":"new",
							"layout":"1",


            "hidden_layout":"false",

            "game": [

			{
				"id":"eloa",
				"name":"엘로아",
				"desc":"2014년 화려하고 강력한 첫번째, 엘로아",
				"url":"http://eloa.netmarble.net",
				"target":"_top",
				"rdcode":"201405260215",
				"icon":"H"
			}
		,
			{
				"id":"houndsr",
				"name":"하운즈:리로드",
				"desc":"RPS, 새로운 장르의 시작!",
				"url":"http://hounds.netmarble.net/",
				"target":"_top",
				"rdcode":"201407170078",
				"icon":"H"
			}

								],
							"sub": {
								  }


						}
						,

						{
							"id":"1",
							"name":"RPG",
							"css":"rpg",
							"layout":"1",


            "hidden_layout":"false",

            "game": [

			{
				"id":"dho",
				"name":"대항해시대",
				"desc":"푸른 대양에 펼쳐지는 당신만의 모험과 낭만!",
				"url":"http://dho.netmarble.net/",
				"target":"_top",
				"rdcode":"201405260184",
				"icon":"N"
			}
		,
			{
				"id":"yaburi",
				"name":"야채부락리",
				"desc":"자연을 배경으로 펼쳐지는 한편의 동화 같은 캐주얼 RPG",
				"url":"http://yaburi.netmarble.net/main.asp",
				"target":"_top",
				"rdcode":"201405260245",
				"icon":""
			}
		,
			{
				"id":"ssd",
				"name":"신선도",
				"desc":"쾌속 레벨업의 짜릿함을 즐겨라!",
				"url":"http://ssd.netmarble.net/",
				"target":"_top",
				"rdcode":"201405260284",
				"icon":""
			}

								],
							"sub": {
								  }


						}
						,

						{
							"id":"2",
							"name":"액션",
							"css":"ac",
							"layout":"1",


            "hidden_layout":"false",

            "game": [

			{
				"id":"mstar",
				"name":"클럽엠스타",
				"desc":"365일 논스톱 클럽파티가 열린다! 클럽 엠스타!",
				"url":"http://mstar.netmarble.net/",
				"target":"_top",
				"rdcode":"201405260157",
				"icon":"N"
			}

								],
							"sub": {
								  }


						}
						,

						{
							"id":"16",
							"name":"스포츠/FPS",
							"css":"sports",
							"layout":"1",


            "hidden_layout":"false",

            "game": [

			{
				"id":"ma9",
				"name":"마구마구",
				"desc":"대한민국 No1 야구게임!",
				"url":"http://ma9.netmarble.net/ma9/",
				"target":"_top",
				"rdcode":"201405260166",
				"icon":"N"
			}
		,
			{
				"id":"sf2",
				"name":"스페셜포스2",
				"desc":"THE FPS RELOADED 스페셜포스2",
				"url":"http://sf2.netmarble.net/",
				"target":"_top",
				"rdcode":"201405260218",
				"icon":"N"
			}
		,
			{
				"id":"bill4",
				"name":"당구/포켓볼",
				"desc":"최고의 허슬러들이 모였다",
				"url":"http://game2.netmarble.net/igame/bill4/",
				"target":"_top",
				"rdcode":"201405260281",
				"icon":""
			}

								],
							"sub": {
								  }


						}
						,

						{
							"id":"4",
							"name":"포커",
							"css":"poker",
							"layout":"1",


            "hidden_layout":"false",

            "game": [

			{
				"id":"newpoker",
				"name":"뉴포커",
				"desc":"7+1의 짜릿한 승부",
				"url":"http://game1.netmarble.net/newpoker/",
				"target":"_top",
				"rdcode":"201405260154",
				"icon":""
			}
		,
			{
				"id":"low",
				"name":"로우바둑이",
				"desc":"블러핑의 진수",
				"url":"http://game1.netmarble.net/low/",
				"target":"_top",
				"rdcode":"201405260181",
				"icon":"N"
			}
		,
			{
				"id":"spoker2",
				"name":"7포커",
				"desc":"정통 포커의 묘미",
				"url":"http://game1.netmarble.net/spoker2/",
				"target":"_top",
				"rdcode":"201405260206",
				"icon":"N"
			}
		,
			{
				"id":"highlow",
				"name":"하이로우",
				"desc":"하이! 로우! 2명의 승부",
				"url":"http://game1.netmarble.net/7cardhighlow/",
				"target":"_top",
				"rdcode":"201405260227",
				"icon":""
			}
		,
			{
				"id":"sutda",
				"name":"섯다",
				"desc":"1940 한판승부 스토리",
				"url":"http://game1.netmarble.net/sutda/",
				"target":"_top",
				"rdcode":"201405260239",
				"icon":""
			}
		,
			{
				"id":"hoola",
				"name":"훌라",
				"desc":"쉽고, 재미있는 매직카드",
				"url":"http://game1.netmarble.net/hoola/",
				"target":"_top",
				"rdcode":"201405260266",
				"icon":""
			}
		,
			{
				"id":"texasholdem",
				"name":"텍사스홀덤",
				"desc":"올인베팅의 짜릿한 승부!",
				"url":"http://game1.netmarble.net/holdem/index.asp",
				"target":"_top",
				"rdcode":"201405260269",
				"icon":""
			}
		,
			{
				"id":"gholdem",
				"name":"넷마블홀덤",
				"desc":"색다른 캐릭터! 유쾌한 승부! 넷마블홀덤",
				"url":"http://game1.netmarble.net/gholdem/event/2015/_10/prefair/_html/",
				"target":"_top",
				"rdcode":"201410310046",
				"icon":"N"
			}

								],
							"sub": {
								  }


						}
						,

						{
							"id":"3",
							"name":"고스톱",
							"css":"gostop",
							"layout":"1",


            "hidden_layout":"false",

            "game": [

			{
				"id":"dbmatgo",
				"name":"대박맞고",
				"desc":"생활형 맞고, 대박맞고",
				"url":"http://game1.netmarble.net/dbmatgo/",
				"target":"_top",
				"rdcode":"201405260160",
				"icon":"N"
			}
		,
			{
				"id":"tazza",
				"name":"타짜",
				"desc":"이번엔 게임이다!",
				"url":"http://game1.netmarble.net/tazza/",
				"target":"_top",
				"rdcode":"201405260191",
				"icon":""
			}
		,
			{
				"id":"gostop",
				"name":"고스톱",
				"desc":"색다른 고스톱의 새로운 재미",
				"url":"http://game1.netmarble.net/gostop/",
				"target":"_top",
				"rdcode":"201405260203",
				"icon":""
			}
		,
			{
				"id":"majak",
				"name":"마작",
				"desc":"104개의 패로 즐기는 짝 맞추기 게임",
				"url":"http://game1.netmarble.net/majak/",
				"target":"_top",
				"rdcode":"201405260236",
				"icon":""
			}
		,
			{
				"id":"mdgoplus",
				"name":"플러스맞고",
				"desc":"육광? 복불복? 무엇이 걸려도 대박!",
				"url":"http://game1.netmarble.net/mdgostopplus/",
				"target":"_top",
				"rdcode":"201405260233",
				"icon":""
			}

								],
							"sub": {
								  }


						}
						,

						{
							"id":"5",
							"name":"보드/캐주얼",
							"css":"board",
							"layout":"2",


            "hidden_layout":"false",

            "game": [

			{
				"id":"baduk",
				"name":"바둑nTV",
				"desc":"바둑의 모든것 바둑nTV",
				"url":"http://baduk.netmarble.net/",
				"target":"_top",
				"rdcode":"201405260163",
				"icon":"N"
			}
		,
			{
				"id":"moma",
				"name":"모두의마블",
				"desc":"추억의 국민게임, 모두의마블!",
				"url":"http://modoo.netmarble.net/",
				"target":"_top",
				"rdcode":"201405260178",
				"icon":"N"
			}
		,
			{
				"id":"yutgame",
				"name":"윷놀이",
				"desc":"팀전으로 더욱 즐거워진 천상의",
				"url":"http://game2.netmarble.net/igame/yutgame/",
				"target":"_top",
				"rdcode":"201405260200",
				"icon":""
			}
		,
			{
				"id":"n_sachunsung",
				"name":"사천성",
				"desc":"머리가 좋아지는 유쾌한 클릭! New 사천성",
				"url":"http://game2.netmarble.net/Sachunsung/",
				"target":"_top",
				"rdcode":"201405260221",
				"icon":""
			}
		,
			{
				"id":"janggi2",
				"name":"장기",
				"desc":"대한민국 표준 장기룰 채택! 넷마블장기",
				"url":"http://game2.netmarble.net/igame/janggi/",
				"target":"_top",
				"rdcode":"201405260248",
				"icon":""
			}
		,
			{
				"id":"famchat",
				"name":"캐릭챗",
				"desc":"Music! Talk! Love! 고품격 음악방송 채팅",
				"url":"http://chat.netmarble.net/famchat/",
				"target":"_top",
				"rdcode":"201405260257",
				"icon":""
			}
		,
			{
				"id":"cmind",
				"name":"캐치마인드",
				"desc":"그림으로 통하는 색다른 재미! 캐치마인드",
				"url":"http://cmind.netmarble.net/main.asp",
				"target":"_top",
				"rdcode":"201405260275",
				"icon":""
			}
		,
			{
				"id":"game_pack",
				"name":"게임팩",
				"desc":"쉴틈없는 무한 게임의 재미",
				"url":"http://gamepack.netmarble.net/",
				"target":"_top",
				"rdcode":"201405260287",
				"icon":""
			}
		,
			{
				"id":"picture",
				"name":"틀린그림찾기",
				"desc":"꼼즈와 함께하는 틀린그림찾기",
				"url":"http://game2.netmarble.net/igame/picture/",
				"target":"_top",
				"rdcode":"201405260290",
				"icon":""
			}
		,
			{
				"id":"assult",
				"name":"어썰트기어",
				"desc":"로봇들의 파워 전투. 어썰트기어",
				"url":"http://game3.netmarble.net/cp_site/assult/",
				"target":"_top",
				"rdcode":"201405260293",
				"icon":""
			}
		,
			{
				"id":"shanghai",
				"name":"상하이",
				"desc":"두뇌 단련 클릭 상하이",
				"url":"http://game2.netmarble.net/igame/shanghai/",
				"target":"_top",
				"rdcode":"201405260296",
				"icon":""
			}
		,
			{
				"id":"bcrossplus",
				"name":"배틀가로세로+",
				"desc":"낱말퀴즈의 진수! 배틀가로",
				"url":"http://game2.netmarble.net/igame/bcrossplus",
				"target":"_top",
				"rdcode":"201405260299",
				"icon":""
			}
		,
			{
				"id":"richmarble",
				"name":"리치마블",
				"desc":"10억 만들기 주사위 보드게임! 리치마블",
				"url":"http://game2.netmarble.net/igame/richmarble/",
				"target":"_top",
				"rdcode":"201405260302",
				"icon":""
			}
		,
			{
				"id":"omok",
				"name":"오목",
				"desc":"다섯 알의 치열한 두뇌 싸움 오목",
				"url":"http://game2.netmarble.net/igame/omok/",
				"target":"_top",
				"rdcode":"201405260305",
				"icon":""
			}
		,
			{
				"id":"avatar",
				"name":"아바타",
				"desc":"무한 변신의 즐거움",
				"url":"http://avatar.netmarble.net/",
				"target":"_top",
				"rdcode":"201405260308",
				"icon":""
			}
		,
			{
				"id":"poweral",
				"name":"파워알까기",
				"desc":"일타이득의 승부 파워 알까기",
				"url":"http://game2.netmarble.net/igame/poweral/",
				"target":"_top",
				"rdcode":"201405260311",
				"icon":""
			}
		,
			{
				"id":"kkoonda",
				"name":"파워쿵쿵따",
				"desc":"사랑의 끝말잇기",
				"url":"http://game2.netmarble.net/kkoongda/",
				"target":"_top",
				"rdcode":"201407310062",
				"icon":""
			}
		,
			{
				"id":"flash",
				"name":"플래시게임",
				"desc":"심심할땐, 가볍게 즐기는 플래시게임 한판!",
				"url":"http://flashgame.netmarble.net/",
				"target":"_top",
				"rdcode":"201405260314",
				"icon":""
			}

								],
							"sub": {
								  }


						}

				   ],
			  "child": [


						{
							"id":"22",
							"name":"신규",
							"css":"new",
							"layout":"1",
							"hidden_layout":"false",
							"game": [

			{
				"id":"eloa",
				"name":"엘로아",
				"desc":"2014년 화려하고 강력한 첫번째, 엘로아",
				"url":"http://eloa.netmarble.net",
				"target":"_top",
				"rdcode":"201405260215",
				"icon":"H"
			}
		,
			{
				"id":"houndsr",
				"name":"하운즈:리로드",
				"desc":"RPS, 새로운 장르의 시작!",
				"url":"http://hounds.netmarble.net/",
				"target":"_top",
				"rdcode":"201407170078",
				"icon":"H"
			}

								],
							"sub": {
								  }

						}
						,

						{
							"id":"1",
							"name":"RPG",
							"css":"rpg",
							"layout":"1",
							"hidden_layout":"false",
							"game": [

			{
				"id":"dho",
				"name":"대항해시대",
				"desc":"푸른 대양에 펼쳐지는 당신만의 모험과 낭만!",
				"url":"http://dho.netmarble.net/",
				"target":"_top",
				"rdcode":"201405260184",
				"icon":"N"
			}
		,
			{
				"id":"yaburi",
				"name":"야채부락리",
				"desc":"자연을 배경으로 펼쳐지는 한편의 동화 같은 캐주얼 RPG",
				"url":"http://yaburi.netmarble.net/main.asp",
				"target":"_top",
				"rdcode":"201405260245",
				"icon":""
			}
		,
			{
				"id":"ssd",
				"name":"신선도",
				"desc":"쾌속 레벨업의 짜릿함을 즐겨라!",
				"url":"http://ssd.netmarble.net/",
				"target":"_top",
				"rdcode":"201405260284",
				"icon":""
			}

								],
							"sub": {
								  }

						}
						,

						{
							"id":"2",
							"name":"액션",
							"css":"ac",
							"layout":"1",
							"hidden_layout":"false",
							"game": [

			{
				"id":"mstar",
				"name":"클럽엠스타",
				"desc":"365일 논스톱 클럽파티가 열린다! 클럽 엠스타!",
				"url":"http://mstar.netmarble.net/",
				"target":"_top",
				"rdcode":"201405260157",
				"icon":"N"
			}

								],
							"sub": {
								  }

						}
						,

						{
							"id":"16",
							"name":"스포츠/FPS",
							"css":"sports",
							"layout":"1",
							"hidden_layout":"false",
							"game": [

			{
				"id":"ma9",
				"name":"마구마구",
				"desc":"대한민국 No1 야구게임!",
				"url":"http://ma9.netmarble.net/ma9/",
				"target":"_top",
				"rdcode":"201405260166",
				"icon":"N"
			}
		,
			{
				"id":"sf2",
				"name":"스페셜포스2",
				"desc":"THE FPS RELOADED 스페셜포스2",
				"url":"http://sf2.netmarble.net/",
				"target":"_top",
				"rdcode":"201405260218",
				"icon":"N"
			}
		,
			{
				"id":"bill4",
				"name":"당구/포켓볼",
				"desc":"최고의 허슬러들이 모였다",
				"url":"http://game2.netmarble.net/igame/bill4/",
				"target":"_top",
				"rdcode":"201405260281",
				"icon":""
			}

								],
							"sub": {
								  }

						}
						,

						{
							"id":"5",
							"name":"보드/캐주얼",
							"css":"board",
							"layout":"2",
							"hidden_layout":"false",
							"game": [

			{
				"id":"baduk",
				"name":"바둑nTV",
				"desc":"바둑의 모든것 바둑nTV",
				"url":"http://baduk.netmarble.net/",
				"target":"_top",
				"rdcode":"201405260163",
				"icon":"N"
			}
		,
			{
				"id":"moma",
				"name":"모두의마블",
				"desc":"추억의 국민게임, 모두의마블!",
				"url":"http://modoo.netmarble.net/",
				"target":"_top",
				"rdcode":"201405260178",
				"icon":"N"
			}
		,
			{
				"id":"yutgame",
				"name":"윷놀이",
				"desc":"팀전으로 더욱 즐거워진 천상의",
				"url":"http://game2.netmarble.net/igame/yutgame/",
				"target":"_top",
				"rdcode":"201405260200",
				"icon":""
			}
		,
			{
				"id":"n_sachunsung",
				"name":"사천성",
				"desc":"머리가 좋아지는 유쾌한 클릭! New 사천성",
				"url":"http://game2.netmarble.net/Sachunsung/",
				"target":"_top",
				"rdcode":"201405260221",
				"icon":""
			}
		,
			{
				"id":"janggi2",
				"name":"장기",
				"desc":"대한민국 표준 장기룰 채택! 넷마블장기",
				"url":"http://game2.netmarble.net/igame/janggi/",
				"target":"_top",
				"rdcode":"201405260248",
				"icon":""
			}
		,
			{
				"id":"famchat",
				"name":"캐릭챗",
				"desc":"Music! Talk! Love! 고품격 음악방송 채팅",
				"url":"http://chat.netmarble.net/famchat/",
				"target":"_top",
				"rdcode":"201405260257",
				"icon":""
			}
		,
			{
				"id":"cmind",
				"name":"캐치마인드",
				"desc":"그림으로 통하는 색다른 재미! 캐치마인드",
				"url":"http://cmind.netmarble.net/main.asp",
				"target":"_top",
				"rdcode":"201405260275",
				"icon":""
			}
		,
			{
				"id":"game_pack",
				"name":"게임팩",
				"desc":"쉴틈없는 무한 게임의 재미",
				"url":"http://gamepack.netmarble.net/",
				"target":"_top",
				"rdcode":"201405260287",
				"icon":""
			}
		,
			{
				"id":"picture",
				"name":"틀린그림찾기",
				"desc":"꼼즈와 함께하는 틀린그림찾기",
				"url":"http://game2.netmarble.net/igame/picture/",
				"target":"_top",
				"rdcode":"201405260290",
				"icon":""
			}
		,
			{
				"id":"assult",
				"name":"어썰트기어",
				"desc":"로봇들의 파워 전투. 어썰트기어",
				"url":"http://game3.netmarble.net/cp_site/assult/",
				"target":"_top",
				"rdcode":"201405260293",
				"icon":""
			}
		,
			{
				"id":"shanghai",
				"name":"상하이",
				"desc":"두뇌 단련 클릭 상하이",
				"url":"http://game2.netmarble.net/igame/shanghai/",
				"target":"_top",
				"rdcode":"201405260296",
				"icon":""
			}
		,
			{
				"id":"bcrossplus",
				"name":"배틀가로세로+",
				"desc":"낱말퀴즈의 진수! 배틀가로",
				"url":"http://game2.netmarble.net/igame/bcrossplus",
				"target":"_top",
				"rdcode":"201405260299",
				"icon":""
			}
		,
			{
				"id":"richmarble",
				"name":"리치마블",
				"desc":"10억 만들기 주사위 보드게임! 리치마블",
				"url":"http://game2.netmarble.net/igame/richmarble/",
				"target":"_top",
				"rdcode":"201405260302",
				"icon":""
			}
		,
			{
				"id":"omok",
				"name":"오목",
				"desc":"다섯 알의 치열한 두뇌 싸움 오목",
				"url":"http://game2.netmarble.net/igame/omok/",
				"target":"_top",
				"rdcode":"201405260305",
				"icon":""
			}
		,
			{
				"id":"avatar",
				"name":"아바타",
				"desc":"무한 변신의 즐거움",
				"url":"http://avatar.netmarble.net/",
				"target":"_top",
				"rdcode":"201405260308",
				"icon":""
			}
		,
			{
				"id":"poweral",
				"name":"파워알까기",
				"desc":"일타이득의 승부 파워 알까기",
				"url":"http://game2.netmarble.net/igame/poweral/",
				"target":"_top",
				"rdcode":"201405260311",
				"icon":""
			}
		,
			{
				"id":"kkoonda",
				"name":"파워쿵쿵따",
				"desc":"사랑의 끝말잇기",
				"url":"http://game2.netmarble.net/kkoongda/",
				"target":"_top",
				"rdcode":"201407310062",
				"icon":""
			}
		,
			{
				"id":"flash",
				"name":"플래시게임",
				"desc":"심심할땐, 가볍게 즐기는 플래시게임 한판!",
				"url":"http://flashgame.netmarble.net/",
				"target":"_top",
				"rdcode":"201405260314",
				"icon":""
			}

								],
							"sub": {
								  }

						}

				   ] }
		;
		var SmartGameList = [
		  			{ "id" : "",
		  			  "name" : "페이트/그랜드오더",
					  "title":"수집형RPG",
		  			  "rdcode" : "201711200057",
		  			  "url" : "http://www.netmarble.net/mobile/fgok",
					  "target" : "_top",
					  "image" : "http://c3.img.netmarble.kr/web/6N/2017/11/201000/1_appicon_AOS_512.png",
					  "icon" : "N"
		  			 }
					,
		  			{ "id" : "",
		  			  "name" : "테라M",
					  "title":"MMORPG",
		  			  "rdcode" : "201711300058",
		  			  "url" : "http://www.netmarble.net/mobile/tera?tab=popular&amp;page=1",
					  "target" : "_top",
					  "image" : "http://c3.img.netmarble.kr/web/6N/2017/11/301233/512x512.png",
					  "icon" : "N"
		  			 }
					,
		  			{ "id" : "",
		  			  "name" : "모두의마블",
					  "title":"캐주얼",
		  			  "rdcode" : "201405150359",
		  			  "url" : "http://www.netmarble.net/mobile/momak",
					  "target" : "_top",
					  "image" : "http://sgimage.netmarble.com/images/netmarble/COMMON/20170310/1489116083508.png",
					  "icon" : "H"
		  			 }
					,
		  			{ "id" : "",
		  			  "name" : "세븐나이츠",
					  "title":"액션RPG",
		  			  "rdcode" : "201405150363",
		  			  "url" : "http://www.netmarble.net/mobile/sknights",
					  "target" : "_top",
					  "image" : "http://c2.img.netmarble.kr/web/6N/2017/05/261654/17_200x200.png",
					  "icon" : "H"
		  			 }
					,
		  			{ "id" : "",
		  			  "name" : "리니지2 레볼루션",
					  "title":"MMORPG",
		  			  "rdcode" : "201703100031",
		  			  "url" : "http://www.netmarble.net/mobile/lineageII?tab=popular&amp;page=1",
					  "target" : "_top",
					  "image" : "http://sgimage.netmarble.com/images/netmarble/COMMON/20170310/1489116348442.png",
					  "icon" : "H"
		  			 }
					,
		  			{ "id" : "",
		  			  "name" : "스타워즈: 포스아레나",
					  "title":"전략",
		  			  "rdcode" : "201703100032",
		  			  "url" : "http://www.netmarble.net/mobile/starwars?tab=popular&amp;page=1",
					  "target" : "_top",
					  "image" : "http://c3.img.netmarble.kr/web/6N/2017/02/271407/swfa_200.png",
					  "icon" : ""
		  			 }
					,
		  			{ "id" : "",
		  			  "name" : "요괴",
					  "title":"RPG",
		  			  "rdcode" : "201705160030",
		  			  "url" : "http://www.netmarble.net/mobile/ghost",
					  "target" : "_top",
					  "image" : "http://c3.img.netmarble.kr/web/6N/2017/04/111454/AOS_200.png",
					  "icon" : ""
		  			 }
					,
		  			{ "id" : "",
		  			  "name" : "펜타스톰",
					  "title":"MOBA",
		  			  "rdcode" : "201705160031",
		  			  "url" : "http://www.netmarble.net/mobile/penta",
					  "target" : "_top",
					  "image" : "http://c3.img.netmarble.kr/web/6N/2017/05/101715/penta200_200.png",
					  "icon" : ""
		  			 }
					,
		  			{ "id" : "",
		  			  "name" : "데스티니6",
					  "title":"액션RPG",
		  			  "rdcode" : "201706130055",
		  			  "url" : "http://destiny6.netmarble.com/ko",
					  "target" : "_blank",
					  "image" : "http://c3.img.netmarble.kr/web/6N/2017/06/131553/destiny6_200.png",
					  "icon" : ""
		  			 }
					,
		  			{ "id" : "",
		  			  "name" : "몬스터길들이기",
					  "title":"액션RPG",
		  			  "rdcode" : "201405150358",
		  			  "url" : "http://www.netmarble.net/mobile/monster",
					  "target" : "_top",
					  "image" : "http://sgimage.netmarble.com/images/netmarble/COMMON/20161215/1481777198176.png",
					  "icon" : ""
		  			 }
					,
		  			{ "id" : "",
		  			  "name" : "이사만루2KBO",
					  "title":"스포츠",
		  			  "rdcode" : "201606080038",
		  			  "url" : "http://www.netmarble.net/mobile/full2016",
					  "target" : "_top",
					  "image" : "http://c3.img.netmarble.kr/web/6N/2017/03/271614/170320_AOS_200.png",
					  "icon" : ""
		  			 }
					,
		  			{ "id" : "",
		  			  "name" : "마구마구2016",
					  "title":"스포츠",
		  			  "rdcode" : "201606080037",
		  			  "url" : "http://www.netmarble.net/mobile/magu2",
					  "target" : "_top",
					  "image" : "http://c1.img.netmarble.kr/web/6N/2016/03/301014/200X200.png",
					  "icon" : ""
		  			 }
					,
		  			{ "id" : "",
		  			  "name" : "레이븐",
					  "title":"액션RPG",
		  			  "rdcode" : "201504090065",
		  			  "url" : "http://www.netmarble.net/mobile/rav",
					  "target" : "_top",
					  "image" : "http://c3.img.netmarble.kr/web/6N/2016/11/021411/200.jpg",
					  "icon" : ""
		  			 }
					,
		  			{ "id" : "",
		  			  "name" : "마블퓨처파이트",
					  "title":"액션RPG",
		  			  "rdcode" : "201703100033",
		  			  "url" : "http://www.netmarble.net/mobile/mherosgb",
					  "target" : "_top",
					  "image" : "http://c3.img.netmarble.kr/web/6N/2015/12/161925/mherosgb_pc.png",
					  "icon" : ""
		  			 }
					,
		  			{ "id" : "",
		  			  "name" : "백발백중",
					  "title":"슈팅액션",
		  			  "rdcode" : "201509230034",
		  			  "url" : "http://www.netmarble.net/mobile/wefire",
					  "target" : "_top",
					  "image" : "http://c3.img.netmarble.kr/web/6N/2015/12/161925/wefire_pc.png",
					  "icon" : ""
		  			 }
					,
		  			{ "id" : "",
		  			  "name" : "아덴",
					  "title":"RPG",
		  			  "rdcode" : "201703100034",
		  			  "url" : "http://www.netmarble.net/mobile/aden?tab=popular&amp;page=1",
					  "target" : "_top",
					  "image" : "http://c3.img.netmarble.kr/web/6N/2017/01/101144/aden_200.png",
					  "icon" : ""
		  			 }
					,
		  			{ "id" : "",
		  			  "name" : "스톤에이지",
					  "title":"턴제RPG",
		  			  "rdcode" : "201703100035",
		  			  "url" : "http://www.netmarble.net/mobile/stoneage7?tab=popular&amp;page=1",
					  "target" : "_top",
					  "image" : "http://c3.img.netmarble.kr/web/6N/2017/01/241352/icon_portal_200_rounding.png",
					  "icon" : ""
		  			 }
					,
		  			{ "id" : "",
		  			  "name" : "드래곤가드S",
					  "title":"MMORPG",
		  			  "rdcode" : "201606080041",
		  			  "url" : "http://www.netmarble.net/mobile/dragu",
					  "target" : "_top",
					  "image" : "http://c3.img.netmarble.kr/web/6N/2015/11/131816/dragu_pc.png",
					  "icon" : ""
		  			 }
					,
		  			{ "id" : "",
		  			  "name" : "디즈니매지컬다이스",
					  "title":"캐주얼",
		  			  "rdcode" : "201606080039",
		  			  "url" : "http://www.netmarble.net/mobile/momag",
					  "target" : "_top",
					  "image" : "http://c3.img.netmarble.kr/web/6N/2016/04/281614/AOS_200x200.png",
					  "icon" : ""
		  			 }
					,
		  			{ "id" : "",
		  			  "name" : "길드오브아너",
					  "title":"RPG",
		  			  "rdcode" : "201510210040",
		  			  "url" : "http://www.netmarble.net/mobile/goldenagegb",
					  "target" : "_top",
					  "image" : "http://c3.img.netmarble.kr/web/6N/2016/10/311546/Aos_512_e.jpg",
					  "icon" : ""
		  			 }
					,
		  			{ "id" : "",
		  			  "name" : "이데아",
					  "title":"액션RPG",
		  			  "rdcode" : "201511060028",
		  			  "url" : "http://www.netmarble.net/mobile/afive",
					  "target" : "_top",
					  "image" : "http://c3.img.netmarble.kr/web/6N/2015/11/051050/afive_pc.png",
					  "icon" : ""
		  			 }
					,
		  			{ "id" : "",
		  			  "name" : "모두의퍼즐펫",
					  "title":"퍼즐",
		  			  "rdcode" : "201512030035",
		  			  "url" : "http://www.netmarble.net/mobile/nemous",
					  "target" : "_top",
					  "image" : "http://c3.img.netmarble.kr/web/6N/2015/11/201630/nemous_pc.png",
					  "icon" : ""
		  			 }
					,
		  			{ "id" : "",
		  			  "name" : "다함께붕붕붕",
					  "title":"레이싱",
		  			  "rdcode" : "201405150368",
		  			  "url" : "http://www.netmarble.net/mobile/boong",
					  "target" : "_top",
					  "image" : "http://c3.img.netmarble.kr/web/6N/2015/10/281038/boong_pc.png",
					  "icon" : ""
		  			 }
					,
		  			{ "id" : "",
		  			  "name" : "넷마블바둑",
					  "title":"보드",
		  			  "rdcode" : "201606080040",
		  			  "url" : "http://www.netmarble.net/mobile/n2baduk",
					  "target" : "_top",
					  "image" : "http://c1.img.netmarble.kr/web/6N/2016/05/131529/pc_baduk.png",
					  "icon" : ""
		  			 }
					,
		  			{ "id" : "",
		  			  "name" : "나이스샷 골프",
					  "title":"스포츠",
		  			  "rdcode" : "201511260045",
		  			  "url" : "http://www.netmarble.net/mobile/golfg",
					  "target" : "_top",
					  "image" : "http://c3.img.netmarble.kr/web/6N/2015/11/301201/golfg_pc.png",
					  "icon" : ""
		  			 }
					,
		  			{ "id" : "",
		  			  "name" : "마구마구2015",
					  "title":"스포츠",
		  			  "rdcode" : "201503300044",
		  			  "url" : "http://www.netmarble.net/mobile/ma92013",
					  "target" : "_top",
					  "image" : "http://c3.img.netmarble.kr/web/6N/2015/03/301630/ma92013_PC.png",
					  "icon" : ""
		  			 }
					,
		  			{ "id" : "",
		  			  "name" : "레전드나인",
					  "title":"스포츠",
		  			  "rdcode" : "201504100037",
		  			  "url" : "http://www.netmarble.net/mobile/ma9rm",
					  "target" : "_top",
					  "image" : "http://c3.img.netmarble.kr/web/6N/2015/04/101519/ma9rm_pc.png",
					  "icon" : ""
		  			 }
					,
		  			{ "id" : "",
		  			  "name" : "다함께던전왕",
					  "title":"액션RPG",
		  			  "rdcode" : "201405150365",
		  			  "url" : "http://www.netmarble.net/mobile/heroes",
					  "target" : "_top",
					  "image" : "http://c3.img.netmarble.kr/web/6N/2015/08/041635/heroes_pc.png",
					  "icon" : ""
		  			 }
					,
		  			{ "id" : "",
		  			  "name" : "크로노블레이드",
					  "title":"액션RPG",
		  			  "rdcode" : "201506180064",
		  			  "url" : "http://www.netmarble.net/mobile/chrono",
					  "target" : "_top",
					  "image" : "http://c3.img.netmarble.kr/web/6N/2015/08/041637/chrono_pc.png",
					  "icon" : ""
		  			 }
					,
		  			{ "id" : "",
		  			  "name" : "리벤져스",
					  "title":"SNG",
		  			  "rdcode" : "201507140039",
		  			  "url" : "http://www.netmarble.net/mobile/wewar",
					  "target" : "_top",
					  "image" : "http://c1.img.netmarble.kr/web/6N/2015/07/061033/AOS_200_kakako.png",
					  "icon" : ""
		  			 }
					,
		  			{ "id" : "",
		  			  "name" : "스텔라사가",
					  "title":"비행어드벤쳐",
		  			  "rdcode" : "201508250061",
		  			  "url" : "http://www.netmarble.net/mobile/thflight",
					  "target" : "_top",
					  "image" : "http://c3.img.netmarble.kr/web/6N/2015/03/131640/thflight_pc.png",
					  "icon" : ""
		  			 }
					,
		  			{ "id" : "",
		  			  "name" : "퀵보이",
					  "title":"어드벤처",
		  			  "rdcode" : "201510080057",
		  			  "url" : "http://www.netmarble.net/mobile/quickboy",
					  "target" : "_top",
					  "image" : "http://c3.img.netmarble.kr/web/6N/2015/10/081234/quickboy_pc.png",
					  "icon" : ""
		  			 }
					,
		  			{ "id" : "",
		  			  "name" : "매직캣스토리",
					  "title":"퍼즐",
		  			  "rdcode" : "201512010032",
		  			  "url" : "http://www.netmarble.net/mobile/mcskr",
					  "target" : "_top",
					  "image" : "http://c3.img.netmarble.kr/web/6N/2015/12/011546/mcskr_pc.png",
					  "icon" : ""
		  			 }
					,
		  			{ "id" : "",
		  			  "name" : "블레이드왈츠",
					  "title":"RPG",
		  			  "rdcode" : "201512030045",
		  			  "url" : "http://www.netmarble.net/mobile/mist",
					  "target" : "_top",
					  "image" : "http://c3.img.netmarble.kr/web/6N/2015/12/031656/mist_pc.png",
					  "icon" : ""
		  			 }
					,
		  			{ "id" : "",
		  			  "name" : "다함께차차차",
					  "title":"레이싱",
		  			  "rdcode" : "201405150388",
		  			  "url" : "http://www.netmarble.net/mobile/chachacha",
					  "target" : "_top",
					  "image" : "http://c3.img.netmarble.kr/web/6N/2015/03/131552/chachacha_pc.png",
					  "icon" : ""
		  			 }
					,
		  			{ "id" : "",
		  			  "name" : "넷마블경마",
					  "title":"스포츠",
		  			  "rdcode" : "201412190036",
		  			  "url" : "http://www.netmarblederby.com/",
					  "target" : "_top",
					  "image" : "http://c3.img.netmarble.kr/web/6N/2014/12/171928/derby_pc.png",
					  "icon" : ""
		  			 }
					,
		  			{ "id" : "",
		  			  "name" : "맞고팜",
					  "title":"온라인전통맞고",
		  			  "rdcode" : "201410290039",
		  			  "url" : "http://www.netmarble.net/mobile/mfarm",
					  "target" : "_top",
					  "image" : "http://c3.img.netmarble.kr/web/6N/2014/10/161858/netmarblePC_200x200.png",
					  "icon" : ""
		  			 }
					,
		  			{ "id" : "",
		  			  "name" : "다함께차차차2",
					  "title":"캐주얼",
		  			  "rdcode" : "201506100041",
		  			  "url" : "http://www.netmarble.net/mobile/chachacha2",
					  "target" : "_top",
					  "image" : "http://c3.img.netmarble.kr/web/6N/2015/06/101050/chachacha2_png.png",
					  "icon" : ""
		  			 }
					,
		  			{ "id" : "",
		  			  "name" : "KON",
					  "title":"RPG",
		  			  "rdcode" : "201606080036",
		  			  "url" : "http://www.netmarble.net/mobile/kon",
					  "target" : "_top",
					  "image" : "http://c1.img.netmarble.kr/web/6N/2016/03/241014/AOS_netmarble_200x200.png",
					  "icon" : ""
		  			 }
					,
		  			{ "id" : "",
		  			  "name" : "하늘아래영웅",
					  "title":"액션RPG",
		  			  "rdcode" : "201510010112",
		  			  "url" : "http://www.netmarble.net/mobile/worldhd",
					  "target" : "_top",
					  "image" : "http://c3.img.netmarble.kr/web/6N/2015/10/011800/worldhd_pc.png",
					  "icon" : ""
		  			 }
					,
		  			{ "id" : "",
		  			  "name" : "행복한피아니스트",
					  "title":"리듬액션",
		  			  "rdcode" : "201405150387",
		  			  "url" : "http://www.netmarble.net/mobile/theplayer",
					  "target" : "_top",
					  "image" : "http://c2.img.netmarble.kr/web/_event/2014/nmb/icon/pianist_pc.png",
					  "icon" : ""
		  			 }
					,
		  			{ "id" : "",
		  			  "name" : "삼국지퍼즐대전",
					  "title":"퍼즐RPG",
		  			  "rdcode" : "201405150385",
		  			  "url" : "http://www.netmarble.net/mobile/zeus",
					  "target" : "_top",
					  "image" : "http://c2.img.netmarble.kr/web/_event/2014/nmb/icon/sampuzzle_pc.png",
					  "icon" : ""
		  			 }
					 ];
		var HubGameList = [
			{ "id":"21","game": [
		  		{
		  		"area":"21",
		  		"areaname":"FPS",
		  		"name":"스페셜포스2",
		  		"rdcode":"201103300021",
		  		"image":"http://c1.img.netmarble.kr/web/6N/2013/04/2228/sf2.gif",
		  		"url":"http://sf2.netmarble.net",
		  		"target":"_top"
		  		}
				,
		  		{
		  		"area":"21",
		  		"areaname":"FPS",
		  		"name":"쉐도우컴퍼니",
		  		"rdcode":"201110040014",
		  		"image":"http://c1.img.netmarble.kr/web/6N/2013/04/2228/shadow.gif",
		  		"url":"http://shadow.netmarble.net/",
		  		"target":"_top"
		  		}
				] },
			{ "id":"22","game": [ ] },
			{ "id":"25","game": [ ] },
			{ "id":"54","game": [
		  		{
		  		"area":"54",
		  		"areaname":"마구마구",
		  		"name":"마구마구",
		  		"rdcode":"201204030142",
		  		"image":"http://c1.img.netmarble.kr/web/6N/2013/04/2230/ma9.gif",
		  		"url":"http://ma9.netmarble.net",
		  		"target":"_top"
		  		}
				,
		  		{
		  		"area":"54",
		  		"areaname":"마구마구",
		  		"name":"마구더리얼",
		  		"rdcode":"201204030144",
		  		"image":"http://c1.img.netmarble.kr/web/6N/2013/04/2230/ma9real.gif",
		  		"url":"http://ma9real.netmarble.net/",
		  		"target":"_top"
		  		}
				,
		  		{
		  		"area":"54",
		  		"areaname":"마구마구",
		  		"name":"마구:감독이되자",
		  		"rdcode":"201204030145",
		  		"image":"http://c1.img.netmarble.kr/web/6N/2013/04/2230/ma9gm.gif",
		  		"url":"http://ma9gm.netmarble.net",
		  		"target":"_top"
		  		}
				] }
	  	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     ];
		var BannerList = [
			{"GnbBanner"      : [

	  		] ,
			 "HubBanner"      : [

			] ,
			 "SmartGameNotice": [

			] ,
			 "WebGameNotice"  : [

			] ,
			 "SearchBanner"   : [

			] }
	  	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 ];
		var BestGameList = {
		  			"moma": {
		  			  "name" : "모두의마블",
		  			  "rdcode" : "201203050092",
		  			  "url" : "http://modoo.netmarble.net/",
					  "target" : "_top"
		  			 } ,
		  			"bf": {
		  			  "name" : "브릭포스",
		  			  "rdcode" : "201312300127",
		  			  "url" : "http://bf.netmarble.net/",
					  "target" : "_top"
		  			 } ,
		  			"ma9": {
		  			  "name" : "마구마구",
		  			  "rdcode" : "201312300128",
		  			  "url" : "http://ma9.netmarble.net/ma9/",
					  "target" : "_top"
		  			 } ,
		  			"mstar": {
		  			  "name" : "클럽엠스타",
		  			  "rdcode" : "201312300129",
		  			  "url" : "http://mstar.netmarble.net/",
					  "target" : "_top"
		  			 } ,
		  			"dho": {
		  			  "name" : "대항해시대",
		  			  "rdcode" : "201312300130",
		  			  "url" : "http://dho.netmarble.net/",
					  "target" : "_top"
		  			 }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      };
		var Popup = [
					{
					id:'0',
					startDate:'2015-10-30 11:00',
					finishDate:'2017-02-28 00:00',
					login_yn:'n',
					url:'http://gnb.netmarble.net/event/2015/1030_windowsxp/index.asp',
					width:'542',
					height:'369',
					cookie:'gnb20151102',
					autoCookie:'N',
					externalCheck:'Y',
					externalCheckUrl:'http://gnb.netmarble.net/event/2015/1030_windowsxp/windowsxp_check.asp'}
					                                                                                                                                                                                                                                                                                                                                                                                                                               ];

		/* 허브사이트 게임리스트 */
		NetmarbleGNB.ShowHubSiteMenu( HubGameList );

		/* 전체게임 리스트 */
		NetmarbleGNB.ShowWebGameList( WebGameList, BestGameList );

		/* 스마트폰게임 리스트 */
		NetmarbleGNB.ShowSmartGameList( SmartGameList );

		/* 전체게임 공지, 스마트폰게임 공지, 일반GNB배너, 허브GNB배너, 게임검색배너 */
		NetmarbleGNB.ShowBanner( BannerList[0] );

		/* TODO : GNB 팝업 */
		NetmarbleGNB.ShowPopup( Now, Popup );
	} ,

	/* 랜덤 정수 추출 */
	GetRandom : function ( iMin, iMax ) {
		return Math.floor(Math.random() * (iMax - iMin + 1)) + iMin;
	},
	/* 날짜 Object 반환 */
	GetDate : function ( pDateStr ) {
		if ( pDateStr == null ) {
			return new Date();
		} else {
			var tempStr = pDateStr.split('-');

			var tempDate = new Date();
			tempDate.setYear( tempStr[0] );
			tempDate.setMonth( eval(tempStr[1])-1 );

			tempStr = tempStr[2].split(' ');
			tempDate.setDate( tempStr[0] );
			if ( tempStr.length < 3 ) {	/* '2010-11-23' 형식 */
				tempDate.setHours( 0 );
				tempDate.setMinutes( 0 );
				tempDate.setSeconds( 0 );
			} else if ( tempStr.length == 3 ) {	/* '2010-11-23 오후 4:00:00' 형식 */
				if ( tempStr[1] == '오후' ) {
					tempStr = tempStr[2].split(':');
					if ( eval(tempStr[0]) == 12 ) { /* 오후 12시 */
						tempDate.setHours( eval(tempStr[0]));
					} else {
						tempDate.setHours( 12 + eval(tempStr[0]));
					}
				} else {
					tempStr = tempStr[2].split(':');
					if ( eval(tempStr[0]) == 12 ) { /* 오전 12시 */
						tempDate.setHours( eval(tempStr[0]) - 12);
					} else {
						tempDate.setHours( eval(tempStr[0]));
					}
				}

				tempDate.setMinutes( eval(tempStr[1]));
				tempDate.setSeconds( eval(tempStr[2]));
			} else { /* '2010-11-23 16:00'  형식 */
				tempStr = tempStr[1].split(':');
				tempDate.setMinutes( eval(tempStr[0]));
				tempDate.setSeconds( eval(tempStr[1]));
			}

			return tempDate;
		}
	},

	/* 넷마블 BI  */
	Logo : function() {
		if (  NetmarbleGNB.Type == 'pop') {
			return '';
		} else if ( NetmarbleGNB.Type == 'event' ) {
			if ( NetmarbleGNB.SiteCode == 30 ) {
				return '<a class="gnb_logo"  href="http://www.nate.com" onclick="javascript:NetmarbleGNB.clickrd('+ NetmarbleGNB.RdCode().BI +');"      target="_top"><h1>Nate</h1></a>'+
					   '<a class="gnb_event" href="http://game.nate.com" onclick="javascript:NetmarbleGNB.clickrd('+ NetmarbleGNB.RdCode().EventBI +');" target="_top"><em>게임</em></a>';
			} else {
				return '<a class="gnb_logo"  href="http://www.netmarble.net"            onclick="javascript:NetmarbleGNB.clickrd('+ NetmarbleGNB.RdCode().BI +');"      target="_top"><h1>Netmarble</h1></a>'+
					   '<a class="gnb_event" href="http://event.netmarble.net/EventZone/" onclick="javascript:NetmarbleGNB.clickrd('+ NetmarbleGNB.RdCode().EventBI +');" target="_top"><em>이벤트</em></a>';
			}

		} else {
			return '<a href="http://www.netmarble.net" target="_top" onclick="javascript:NetmarbleGNB.clickrd('+ NetmarbleGNB.RdCode().BI +');" class="gnb_logo"><h1>Netmarble</h1></a>';
		}
	},

	/* 공통팝업 */
	ShowPopup : function( dtNow,  aPopupList ) {

		if ( aPopupList != null && aPopupList.length != null ) {

			for ( var i = 0 ; i < aPopupList.length; i++ ) {

				if ( this.GetDate(aPopupList[i].startDate) <= dtNow &&
					 this.GetDate(aPopupList[i].finishDate) > dtNow ) {

					if (( aPopupList[i].login_yn == 'y' && true == NetmarbleGNB.IsLogin ) ||
				    	( aPopupList[i].login_yn == 'n' && false== NetmarbleGNB.IsLogin )) {

						//cookie check
						var gnb_cookie_value = NetmarbleCookie.GetSubValue( 'netmarble_gnb_popup', aPopupList[i].cookie );

						var check_cookie = false;
						if (aPopupList[i].login_yn == 'y' ) {
							if ( gnb_cookie_value != NetmarbleGNB.UserID ) {
								check_cookie = true;
							}
						} else {
							if ( gnb_cookie_value != 'y' ) {
								check_cookie = true ;
							}
						}
						if ( check_cookie ) {
							// 1번만 노출
							if ( aPopupList[i].autoCookie.toLowerCase() == 'y' ) {
								var exp_date = this.GetDate( aPopupList[i].finishDate );
							    	exp_date.setFullYear( exp_date.getFullYear()+1 );
								if ( aPopupList[i].login_yn == 'y' ) {
									NetmarbleCookie.SetSubValueByExpireDate( 'netmarble_gnb_popup', aPopupList[i].cookie, NetmarbleGNB.UserID, exp_date );
								} else {
									NetmarbleCookie.SetSubValueByExpireDate( 'netmarble_gnb_popup', aPopupList[i].cookie, 'y', exp_date );
								}

							} else {
								if ( aPopupList[i].login_yn == 'y' ) {
									NetmarbleCookie.SetSubValue( 'netmarble_gnb_popup', aPopupList[i].cookie, NetmarbleGNB.UserID );
								} else {
									NetmarbleCookie.SetSubValue( 'netmarble_gnb_popup', aPopupList[i].cookie, 'y' );
								}
							}

							if ( aPopupList[i].externalCheck != null && aPopupList[i].externalCheck == 'Y' ) {

								var check_js = document.createElement('script');
									check_js.setAttribute( 'type','text/javascript' );
									check_js.setAttribute( 'charset', 'euc-kr' );
									check_js.setAttribute( 'src', aPopupList[i].externalCheckUrl+"?callback=GnbPopupCallBack" );
								(document.getElementsByTagName('head')[0]).appendChild( check_js );

								n_gnb_popup_url = aPopupList[i].url;
								n_gnb_popup_height = aPopupList[i].height;
								n_gnb_popup_width= aPopupList[i].width;
							} else {
								// open window
								window.open( aPopupList[i].url, 'gnb_popup','resizable=no, scrollbars=no,toolbar=no, channelmode=no, location=no, directories=no, menubar=no, width='+aPopupList[i].width+', height='+aPopupList[i].height+', top=' + nPointH + ', left=' + nPointW );
							}
							break;
						}
					}
				}
			}
		}
	},

	/* 허브사이트 게임리스트 */
	ShowHubSiteMenu : function( aGameList ) {
		if (  NetmarbleGNB.Type == 'hub') {
			var oHubGnbGameList = document.getElementById('HubGnbGameList');
			if ( oHubGnbGameList != null ) {
				if ( aGameList != null && aGameList.length != null ) {
					for ( var i = 0 ; i < aGameList.length ; i++ ) {
						if ( aGameList[i].id == NetmarbleGNB.HubSiteCode ) {
							var html = '';
							for ( var j = 0 ; j < aGameList[i].game.length ; j++ ) {
								html += '<li class="gnb_hub'+(j+1)+'"><a href="'+aGameList[i].game[j].url+'" target="'+ aGameList[i].game[j].target +'" onclick="javascript:NetmarbleGNB.clickrd('+ aGameList[i].game[j].rdcode +');">'+
										'<img src="'+aGameList[i].game[j].image+'" alt="'+aGameList[i].game[j].name+'" height="33"></a></li>';
							}
							oHubGnbGameList.innerHTML = '<ul>'+ html + '</ul>';
							break;
						}
					}
				}

			}
		}
	},

	/* 전체게임 공지, 스마트폰게임 공지, 일반GNB배너, 허브GNB배너, 게임검색배너 */
	ShowBanner : function( aBannerList ) {
		var objShow;
		var intRand;
		// 전체게임 공지
		if ( aBannerList.WebGameNotice != null && aBannerList.WebGameNotice.length != null && aBannerList.WebGameNotice.length > 0 ) {
			objShow = document.getElementById('WebGameNotice');
			if ( objShow != null )
			{
				intRand = this.GetRandom( 0,aBannerList.WebGameNotice.length - 1 );
				NetmarbleGNB.DefaultWebGameNotice = '<a href="' + aBannerList.WebGameNotice[intRand].url + '" '+
			    								' target="' + aBannerList.WebGameNotice[intRand].target + '" '+
			    								' onclick="javascript:NetmarbleGNB.clickrd('+ aBannerList.WebGameNotice[intRand].rdcode +');">'+
			    								aBannerList.WebGameNotice[intRand].title +
			    							'</a>';
				objShow.innerHTML = NetmarbleGNB.DefaultWebGameNotice ;
			}
		}
		// 스마트폰게임 공지
		if ( aBannerList.SmartGameNotice != null && aBannerList.SmartGameNotice.length != null && aBannerList.SmartGameNotice.length > 0 ) {
			objShow = document.getElementById('SmartGameNotice');
			if ( objShow != null )
			{
				intRand = this.GetRandom( 0,aBannerList.SmartGameNotice.length - 1 );
				objShow.innerHTML =	'<a href="' + aBannerList.SmartGameNotice[intRand].url + '" '+
							    		' target="' + aBannerList.SmartGameNotice[intRand].target + '" '+
							    		' onclick="javascript:NetmarbleGNB.clickrd('+ aBannerList.SmartGameNotice[intRand].rdcode +');">'+
										aBannerList.SmartGameNotice[intRand].title +
									'</a>';
			}

		}
		// 허브GNB배너
		if ( NetmarbleGNB.Type == 'hub' ) {
			if ( aBannerList.HubBanner != null && aBannerList.HubBanner.length != null && aBannerList.HubBanner.length > 0 ) {
				if ( objShow != null )
				{
					intRand = this.GetRandom( 0,aBannerList.HubBanner.length - 1 );
					objShow.innerHTML =	'<a href="' + aBannerList.HubBanner[intRand].url + '" '+
								    		' target="' + aBannerList.HubBanner[intRand].target + '" '+
								    		' onclick="javascript:NetmarbleGNB.clickrd('+ aBannerList.HubBanner[intRand].rdcode +');">'+
											'<img src="'+ aBannerList.HubBanner[intRand].image + '" alt="'+ aBannerList.HubBanner[intRand].title + '"/>'+
										'</a>';
				}
			}
		} else {
			// 일반GNB배너
			if ( aBannerList.GnbBanner != null && aBannerList.GnbBanner.length != null && aBannerList.GnbBanner.length > 0 ) {
				objShow = document.getElementById('GnbBanner');
				if ( objShow != null )
				{
					intRand = this.GetRandom( 0,aBannerList.GnbBanner.length - 1 );
					objShow.innerHTML =	'<a href="' + aBannerList.GnbBanner[intRand].url + '" '+
								    		' target="' + aBannerList.GnbBanner[intRand].target + '" '+
								    		' onclick="javascript:NetmarbleGNB.clickrd('+ aBannerList.GnbBanner[intRand].rdcode +');">'+
											'<img src="'+ aBannerList.GnbBanner[intRand].image + '" alt="'+ aBannerList.GnbBanner[intRand].title + '"/>'+
										'</a>';
				}
			}
		}

		// 게임검색배너
		if ( aBannerList.SearchBanner != null && aBannerList.SearchBanner.length != null && aBannerList.SearchBanner.length > 0) {
			objShow = document.getElementById('GNB_game_ban');
			if ( objShow != null ) {
				intRand = this.GetRandom( 0,aBannerList.SearchBanner.length - 1 );
				objShow.style.backgroundImage = "url(\'" + aBannerList.SearchBanner[intRand].image + "\')";
				objShow.style.backgroundRepeat = "no-repeat";
				objShow.innerHTML = ('<span onclick="uiGnbGameSchBan();">'+aBannerList.SearchBanner[intRand].title+'</span>'+
									 '<a alt="'+ aBannerList.SearchBanner[intRand].title +' 바로가기" href="'+aBannerList.SearchBanner[intRand].url+'" target="' + aBannerList.SearchBanner[intRand].target+ '" onclick="javascript:NetmarbleGNB.clickrd('+ aBannerList.SearchBanner[intRand].rdcode +');">GO</a>');
				u_gnb_gameschban = 1;	/* 바로가기검색 있음. */
			}
		}
	},
	/* 전체게임 상단 [OBT],[CBT],[내게임] 버튼 클릭 초기화 */
	InitGameSelectButton : function () {
		/* 버튼 OFF */
		var objList = document.getElementsByName('ButtonGameSelect');
		for ( var i = 0; i < objList.length ; i++ ) {
			objList[i].className = '';
		}

		/* 게임에 적용된 class 제거 */
		objList = document.getElementsByName( 'game' );
		for ( var i = 0; i < objList.length ; i++ ) {
			objList[i].className = '';
		}

		/* 전체게임 공지 */
		if ( NetmarbleGNB.DefaultWebGameNotice == null ) {
			NetmarbleGNB.DefaultWebGameNotice = '';
		}
		document.getElementById('WebGameNotice').innerHTML = NetmarbleGNB.DefaultWebGameNotice;
	},
	/* 전체게임 상단 [OBT],[CBT],[내게임] 버튼 클릭 이벤트 */
	ClickGameSelectButton : function ( pType ) {
		/* 초기화 */
		this.InitGameSelectButton();

		/* 선택한 버튼 on */
		var objButton =  document.getElementById(pType);
		objButton.className = 'gnb_gm_on';

		var classType = 'gnb_g_'+ pType;
		var noticeMessage = '';

		// class 적용
		var objGameList = document.getElementsByName('game');
		var iTrueCount = 0;
		for ( var i = 0; i < objGameList.length ; i++ ) {
			if ( objGameList[i].getAttribute( pType ) == 'true') {
				objGameList[i].className = classType;
				iTrueCount++;
			}
		}

		if ( iTrueCount == 0 ) {
			if ( pType == 'my' ) {

				pType ='issue'; /* 비로그인/내게임이 없다.-->이슈게임으로 적용 */
				noticeMessage = '로그인하면 내게임을 확인할 수 있습니다.';
				classType = 'gnb_g_'+ pType;

				// Css 재적용
				for ( var i = 0; i < objGameList.length ; i++ ) {
					if ( objGameList[i].getAttribute( pType ) == 'true') {
						objGameList[i].className = classType;
						iTrueCount++;
					}
				}
			} else if ( pType == 'obt' ) {
				noticeMessage = 'OBT 중인 게임이 없어요.';
			} else if ( pType == 'cbt' ) {
				noticeMessage = 'CBT 중인 게임이 없어요.';
			}
		}
		if ( noticeMessage != '' ) {
			document.getElementById('WebGameNotice').innerHTML = noticeMessage;
		}
	},

	/* 전체게임 리스트 */
	Game : function( gameInfo, aBestGameList ) {
		/* 바로가기 검색을 위해 게임리스트 변수 세팅 */
		arrNetmarbleGame[ arrNetmarbleGame.length ] = [ gameInfo.id, gameInfo.name, gameInfo.url, gameInfo.rdcode ]; 		/* TODO : 검색용 RDCODE */

		var obt = '';	/* OBT */
		var cbt = '';	/* CBT */
		var issue = '';	/* issue : 비로그인시 디폴트 세팅 */
		var best = '';	/* 추천게임 */

		if ( gameInfo.icon == 'B') {
			cbt = 'true';
		} else if ( gameInfo.icon == 'N' || gameInfo.icon == 'S' ) {
			obt = 'true';
		} else if ( gameInfo.icon == 'H' ) {

			issue = 'true';

		}

		best = (eval('aBestGameList.'+gameInfo.id ) == null ? '' : 'true' );

		return '<li>'+
					'<a href="'+gameInfo.url+'" target="'+gameInfo.target+'" onclick="javascript:NetmarbleGNB.clickrd('+gameInfo.rdcode+');" '+
						( issue== 'true' ? ' class="gnb_g_issue" ' : '' ) +
						' title="'+gameInfo.desc+'" name="game" obt="'+obt+'" cbt="'+cbt+'" issue="'+issue+'" best="'+best+'" gamecode="'+gameInfo.id+'">'+
					gameInfo.name +
					'</a>'+
				'</li>';
	},

	ShowWebGameList : function ( pWebGameList, aBestGameList ) {

		var objWebGameList = document.getElementById('WebGameList') ;

		if ( objWebGameList != null ) {
			var html = '<div class="gnb_smn_top">'+
							'<div class="gnb_smn_lt">'+
								'<p class="gnb_smn_tx" id="WebGameNotice"></p>'+
							'</div>'+
							'<div class="gnb_smn_rt">'+
								/* [게임검색] */
								'<fieldset class="gnb_game_find_bx">'+
									'<legend>게임바로가기</legend>'+
									'<div id="GNB_game_sch" class="gnb_game_find">'+
										'<input type="text" title="PC게임 검색" maxlength="10" value=""  '+
											' class="gnb_find_int bgon" onFocus="this.className=\'gnb_find_int bgnone\'" onBlur="this.className=(this.value!=\'\') ?  \'gnb_find_int bgnone\' : \'gnb_find_int bgon\'" '+
											' id="txtNetmarbleGameSearch" name="txtNetmarbleGameSearch" />'+
										'<a id="btnNetmarbleGameSearchGo" href="javascript:void(0);" class="">GO</a>'+
									'</div>'+
									'<iframe id="ifrNetmarbleGameSearch" name="ifrNetmarbleGameSearch" width="0" height="0" frameborder="0" title="빈프레임" style="visibility:hidden;position:absolute;"></iframe>'+
								'</fieldset>'+
								/* End Of [게임검색]*/
							'</div>'+
							'<div class="gnb_smn_close"><a href="javascript:void(0);" onclick="uiGnbMnuOff(\'1\');">PC게임 닫기</a></div>'+
						'</div>';



				aWebGameList = pWebGameList.adult;
				html += '<div id="GNB_game_ad" class="gnb_smn_cnt">';


			html += '<div class="gnb_game">';
			var ac_dp_count = 0; /* 액션RPG/액션스포츠 장르의 게임리스트 갯수에 따라 2단으로 분리하기 위해... */
			if ( aWebGameList != null && aWebGameList.length != null ) {
				for ( var i = 0; i < aWebGameList.length ; i++ ) {


					html += '<div id="GNB_game_'+ aWebGameList[i].css +'" class="gnb_game_li" title="'+aWebGameList[i].name+'">'+
								'<div class="gnb_g_tl"><strong>'+ aWebGameList[i].name +'</strong></div>';

					/* 1단으로 노출되는 장르 */
					if (  aWebGameList[i].layout == 1 ) {
						html += '<ul class="gnb_g_left">';
						for ( var j = 0; j < aWebGameList[i].game.length ; j++ ) {
							html += this.Game( aWebGameList[i].game[j], aBestGameList );
						}
						if( aWebGameList[i].sub.id != null ) {
							html += '<li class="gnb_game_tit">'+  aWebGameList[i].sub.name +'</li>';
							for ( var j = 0 ; j < aWebGameList[i].sub.game.length ; j++ ) {
								html += this.Game( aWebGameList[i].sub.game[j], aBestGameList );
							}
						}
						html += '</ul>';
					/* 2단으로 노출되는 장르 */
					} else {

						var dp_count = aWebGameList[i].game.length;	/* 전체 게임 갯수 */
						if ( pWebGameList.layout_display_type != null && pWebGameList.layout_display_type == 'ceil' ) {
							dp_count = Math.ceil( (dp_count / 2.0)); /* 2단으로 노출 -> 올림 */
						} else if ( pWebGameList.layout_display_type != null && pWebGameList.layout_display_type == 'floor' ) {
							dp_count = Math.floor( (dp_count / 2.0)); /* 2단으로 노출 -> 버림 */
						} else {
							dp_count = Math.round( (dp_count / 2.0)); /* 2단으로 노출 -> 반올림 */
						}

						/* 1단 */
						html += '<ul class="gnb_g_left">';
						for ( var j = 0; j < dp_count ; j++ ) {
							html +=this.Game( aWebGameList[i].game[j], aBestGameList );
						}
						/* 2단 */
						html += '</ul><ul class="gnb_g_right">';
						for ( var j = dp_count ; j < aWebGameList[i].game.length ; j++ ) {
							html +=this.Game( aWebGameList[i].game[j], aBestGameList );
						}

						html += '</ul>';
					}
					html += '</div>';
				}
			}
			html += '</div></div>';
			objWebGameList.innerHTML = html;
		}
	},

	/* 스마트폰 게임 리스트 */
	ShowSmartGameList : function ( aGameList ) {
		var objSmartGameList = document.getElementById('SmartGameList');

		if ( objSmartGameList != null && aGameList!= null && aGameList.length != null ) {
			var html = '<ul class="gnb_modile">';
			for ( var i = 0 ; i < aGameList.length ; i++ ) {
				html += '<li><dl>'+
							'<dt>'+
								( aGameList[i].icon == 'N' ? '<em class="gnb_modile_new"></em>' : ( aGameList[i].icon == 'H' ? '<em class="gnb_modile_hot"></em>' : '' ) ) +
								'<img src="'+aGameList[i].image+'" alt="'+aGameList[i].name+'" style="width:82px;height:82px;">'+
								'<a href="'+aGameList[i].url+'" target="'+aGameList[i].target+'" onclick="javascript:NetmarbleGNB.clickrd('+aGameList[i].rdcode+');">'+aGameList[i].name+'</a></dt>'+
							'<dd class="t1"><a href="'+aGameList[i].url+'" target="'+aGameList[i].target+'" onclick="javascript:NetmarbleGNB.clickrd('+aGameList[i].rdcode+');">'+aGameList[i].name+'</a></dd>'+
							'<dd class="t2">'+aGameList[i].title+'</dd>'+
						'</dl></li>';
				if ( i >= 15 ) { break; }
			}
			html += '</ul>';
			objSmartGameList.innerHTML = html;
		}
	},
	/* 캐쉬충전버튼 */
	CashButton : function() {
		if ( NetmarbleGNB.IsLogin ) {
			return '<a href="https://nbill.netmarble.net/Cash/Payment/Main.aspx?calltype=web" '+
							'onclick="javascript:{NetmarbleGNB.clickrd(' + NetmarbleGNB.RdCode().Cash + ');'+
							'window.open( this.href, \'WinCash\', \'toolbar=no,location=no,directories=no,status=0,menubar=no,copyhistory=no,scrollbars=no,resizable=no,top=150,left=\'+(screen.width - 504) / 2+\',width=504,height=560\');return false};" '+
							' class="gnb_m"><span>캐쉬충전</span></a>';
		} else {
			return '<a href="http://login.netmarble.net/login/login.asp?l_url='+ encodeURIComponent('http://nbill.netmarble.net/Cash/MyCash/CashInfoTotalLog.aspx') +'" '+
							'onclick="javascript:NetmarbleGNB.clickrd(' + NetmarbleGNB.RdCode().Cash + ');" class="gnb_m"><span>캐쉬충전</span></a>';
		}
	},


	/* 로그인 버튼 */
	LoginButton : function () {
		if ( NetmarbleGNB.Type == 'event' && NetmarbleGNB.SiteCode == '30' ) {
			return '';
		} else {
			var loginText = '로그인';
			var loginClass = 'gnb_bt_login';
			var loginUrl = 'http://login.netmarble.net/login/login.asp?l_url=';
			var loginClick = 'javascript:{window.open( this.href,\'popuplogin\',\'resizable=yes,width=370,height=327,top=\'+(screen.height-327)/2+\',left=\'+(screen.width-370)/2);NetmarbleGNB.clickrd(201304110096);return false;}';
			var loginRdCode = this.RdCode().Login;
			var loginTarget = '';
			if ( NetmarbleGNB.IsLogin ) {
				loginText = '로그아웃';
				loginClass = 'gnb_bt_logout';
				loginRdCode = this.RdCode().Logout;
				
				if ( NetmarbleGNB.Type == 'event') {
					loginTarget = __CRD_ID;
					if ( loginUrl.indexOf( 'r_url=' ) >= 0 ) {
						var start_idx = loginUrl.indexOf( 'r_url=' )+6;
						var last_idx  = loginUrl.indexOf( '&', start_idx );
						if ( last_idx < 0 ) {
							last_idx = loginUrl.length;
						}

						loginUrl = loginUrl.substring( 0,start_idx ) +
									encodeURIComponent( 'http://'+location.hostname+'/nmasp/gnb/LogoutEnd.asp')+
									loginUrl.substring( last_idx, loginUrl.length ) ;
					}
				}
			} else {
				var l_url = '';
				if ( NetmarbleGNB.Type == 'simple') {
					l_url = 'http://www.netmarble.net';
					loginUrl = 'http://login.netmarble.net/login/login.asp?l_url='+ encodeURIComponent(l_url);
				} else if ( NetmarbleGNB.Type == 'event') {
					l_url = '';
					loginUrl = 'http://login.netmarble.net/popuplogin/PopupLogin.Asp?returnURL=' +
								encodeURIComponent( 'http://'+location.hostname+'/nmasp/gnb/LoginEnd.asp') + '&IsNewWindow=Y';

				} else {
					try {
						l_url = top.location.href;
					} catch ( e ) {
						l_url = document.location.href;
					}
					if ( l_url.indexOf( 'l_url=' ) >= 0 ) {
						var start_idx = l_url.indexOf( 'l_url=' )+6;
						var last_idx = l_url.indexOf( '&', start_idx );
						if ( last_idx < 0 ) {
							last_idx = l_url.length;
						}
						l_url = l_url.substring( start_idx,last_idx );
					} else {
						l_url = encodeURIComponent(l_url);
					}
					loginUrl = 'http://login.netmarble.net/login/login.asp?l_url='+ encodeURIComponent(l_url);
				}
			}

			return 	'<div class="gnb_rt_btn">'+
						'<a href="' + loginUrl + '" onclick="'+ loginClick +';NetmarbleGNB.clickrd('+ loginRdCode +');" target="'+loginTarget+'" class="'+loginClass+'" id="LoginButton"><em>'+loginText+'</em></a>'+
					'</div>';
		}
	},

	/* PV 집계용 iframe */
	PV : function() {
		var pvUrl = 'http://nls.netmarble.net/pv.asp?nls_site='+NetmarbleGNB.SiteCode +'&nls_cate='+NetmarbleGNB.ServiceCode +'&nls_url='+document.URL+'&nls_ref='+document.referrer+'&nls_screen='+screen.availWidth+'_'+screen.availHeight ;

		var goPV = document.createElement('iframe');
			goPV.setAttribute('src',pvUrl);
			goPV.setAttribute('width',0);
			goPV.setAttribute('height',0);
			goPV.setAttribute('frameborder',0);
			goPV.setAttribute('style','display:none;position:absolute;left:0;top:-100px;width:0;height:0;border:0px solid #f00;');
		return goPV;
	},

	Creteo : function( id ) {
		var ifr = document.createElement('iframe');
			ifr.setAttribute('src', 'http://gnb.netmarble.net/gnb/creteo.asp?id='+id );
			ifr.setAttribute('width',0);
			ifr.setAttribute('height',0);
			ifr.setAttribute('frameborder',0);
			ifr.setAttribute('style','display:none;position:absolute;left:0;top:-100px;width:0;height:0;border:0px solid #f00;');
		return ifr;
	},
	Retargeting : function(  ) {
		var tag = document.createElement('div');
			tag.setAttribute('id', 'wp_tg_cts' );
			tag.setAttribute('style','display:none;position:absolute;left:0;top:-100px;width:0;height:0;border:0px solid #f00;');
		return tag;
	},
	RetargetingScript : function () {
		var js = document.createElement( 'script' );
		    js.setAttribute( 'type','text/javascript' );
		    js.setAttribute( 'src','//astg.widerplanet.com/js/wp_astg_3.0.js' );
		    js.async = true;
		    js.defer = true;
		return js;
	},
	GoogleRetargeting : function(  ) {
		var tag = document.createElement('div');
			tag.setAttribute('style','display:inline;');
		var tag_img = document.createElement('img');
			tag_img.setAttribute('height','1');
			tag_img.setAttribute('width','1');
			tag_img.setAttribute('style','border-style:none;');
			tag_img.setAttribute('src','//googleads.g.doubleclick.net/pagead/viewthroughconversion/963395494/?value=0&guid=ON&script=0');
		return tag.appendChild(tag_img);
	},
	GoogleRetargetingScript : function () {
		var js = document.createElement( 'script' );
		    js.setAttribute( 'type','text/javascript' );
		    js.setAttribute( 'src','//www.googleadservices.com/pagead/conversion.js' );
		    js.async = true;
		    js.defer = true;
		return js;
	},
	/* RD 호출용 iframe */
	nrd : function (rdcode,elem,target) {
		try {
			if (__NRD_ENABLED__) {
				var frm = document.getElementById( __NRD_ID );
				frm.action = "http://nrd.netmarble.net/" + rdcode + ".rd";
				frm.url.value = (elem != null ? elem.href : "");
				frm.target = (target == null ? "_self" : target);
				frm.submit();
				return false;
			}
		} catch(x) { }
		return true;
	},

	clickrd : function ( rdcode ) {
		try
		{
			if ( rdcode != null && rdcode != '' ) {
				if (__CRD_ENABLED__)
				{
			    	var clink, ifrm;
			    	clink = "http://nrd.netmarble.net/" + rdcode + ".cr";
	            	ifrm = document.getElementById( __CRD_ID );
	            	ifrm.src = clink;
	            	return true;
				}
			}
		} catch(x) { }
		return true;
	},

	RD : function() {
		return 	'<iframe title="빈프레임" id="'+ __CRD_ID +'" name="'+__CRD_ID+'" frameborder="0" width="0px" height="0px" style="position:absolute;left:0px;top:-100px;width:0px;height:0px;border:0px solid #f00;display:none;" />' +
				'<form id="'+__NRD_ID +'" name="'+__NRD_ID+'" method="post"><input type="hidden" name="url"/></form>';
	},

	/* 바로가기 검색 결과 노출 */
	ShowGameSearchResult : function( Resultlist ) {
	    /* Go 버튼 OFF  */

	    /* 게임리스트 기능 초기화 */
		NetmarbleGNB.InitGameSelectButton();

	    /* 검색된 게임에 선택처리 */
	    var selectedGameCount = 0;     /* 선택된 게임 */
	    var selectedGameObj;
	    var objGame = document.getElementsByName('game');
	    if ( Resultlist != null && Resultlist.length != null ) {
	        for (var i = 0; i < Resultlist.length; i++) {
	        	for ( var k = 0; k < objGame.length ; k++ ) {
	        		if ( objGame[k].getAttribute('gamecode') == Resultlist[i][0] ) {
	        			objGame[k].className = 'gnb_g_sch';
	        			selectedGameCount++;
	        			if ( selectedGameCount > 0 ) {
							selectedGameObj = objGame[k];
						}
	        		}
	        	}
			}
		}

		/* 검색결과가 1개이면 Go 버튼 ON */
		if ( selectedGameCount == 1 ) {
			document.getElementById('btnNetmarbleGameSearchGo').click( function() { selectedGameObj.click(); });
			document.getElementById('btnNetmarbleGameSearchGo').className = 'gnb_sch_on';
		} else {
			document.getElementById('btnNetmarbleGameSearchGo').click( function() { void(0); } );
			document.getElementById('btnNetmarbleGameSearchGo').className = '';
		}
	}
}
/* [바로가기 검색 용 변수] */
var arrNetmarbleGame = new Array() ;
var strSchPromotionUrl = '';
var u_gnb_gameschban = 0; //배너가 없을 경우 '0', 있을경우 1
var gnbGameSearch ; 	/* [바로가기 검색] */


if ( NetmarbleGNB.Init() ) {	/* 초기화 */
	NetmarbleGNB.Show();	/* GNB 노출 */
}
/* 기타  */
function clickrd(rdcode)
{
	try
	{
		if ( rdcode != null && rdcode != '' ) {
			if (__CRD_ENABLED__)
			{
			    var clink, ifrm;
			    clink = "http://nrd.netmarble.net/" + rdcode + ".cr";
	            ifrm = document.getElementById( __CRD_ID );
	            ifrm.src = clink;
	            return true;
			}
		}
	}
	catch(x)
	{
	}
	return true;
}
/* gnb 공통팝업용 callback function */
function GnbPopupCallBack( data ) {
	try {
		if ( data.popYn == 'True' ) {
			window.open(n_gnb_popup_url, 'gnb_popup','resizable=no, scrollbars=no,toolbar=no, channelmode=no, location=no, directories=no, menubar=no, width='+n_gnb_popup_width+', height='+n_gnb_popup_height+', top=' + nPointH + ', left=' + nPointW );
		}
	} catch ( ex ) {
	}
}
