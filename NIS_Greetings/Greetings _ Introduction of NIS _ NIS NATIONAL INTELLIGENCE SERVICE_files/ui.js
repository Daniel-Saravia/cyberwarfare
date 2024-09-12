$(function() {

	//GNB
	/*
	$(".gnb-wrap > ul > li").on("click",function(e){
		if( $(this).hasClass("atv") && $(".sub-menu").hasClass("atv") ){
			$(this).removeClass("atv");
			$(".sub-menu").removeClass("atv");
			$(".gnb-bg").removeClass("atv");
		}else if( $(this).hasClass("atv") && !$(".sub-menu").hasClass("atv") ){
			$(this).addClass("atv").siblings().removeClass("atv");
			$(".sub-menu").addClass("atv");
			$(".gnb-bg").addClass("atv");
			$("#search").removeClass("atv");
			$(".search-quick").find(">a").removeClass("atv");
		}else{
			$(this).addClass("atv").siblings().removeClass("atv");
			$(this).find(".sub-menu").addClass("atv");
			$(this).siblings().find(".sub-menu").addClass("atv");
			$(".gnb-bg").addClass("atv");
		}
		e.stopPropagation();
	});
	*/

	$(".gnb-wrap > ul > li > a").on("click",function(e) {
		var triggers = $(".gnb-wrap > ul > li").find(".sub-menu"),
			triggersBg = $(".gnb-bg");

		if($(this).parent("li").hasClass("current")){
			$(".gnb-wrap > ul > li").removeClass("current");
			triggers.removeClass("atv");
			triggersBg.removeClass("atv");
		} else {
			$(this).parent("li").addClass("current").siblings().removeClass("current");
			triggers.addClass("atv");
			triggersBg.addClass("atv");
			$(".search-quick > a").removeClass("atv");
			$("#search").removeClass("atv");
		}

		if($(".sub-menu").is(":visible")){
			if($(".gnb-mask").length < 1) {
				$(".gnb-wrap").append("<div class='gnb-mask'></div>");
			}
		} else {
			$("#gnb").find(".gnb-mask").remove();
		}

		$(".gnb-bg").click(function(){
			$(".gnb-wrap > ul > li").removeClass("current");
			$(".gnb-wrap").find(".sub-menu").removeClass("atv");
			$(this).removeClass("atv");
			$(".gnb-mask").remove();
		});

		$(".gnb-mask").click(function(){
			$(".gnb-wrap > ul > li").removeClass("current");
			$(".gnb-wrap").find(".sub-menu").removeClass("atv");
			$(".gnb-bg").removeClass("atv");
			$(this).remove();
		});

		e.stopPropagation();
	});

	$("#container").click(function(){
		$(".gnb-wrap > ul > li").removeClass("current");
		$(".gnb-wrap").find(".sub-menu").removeClass("atv");
		$(".gnb-wrap").find(".gnb-mask").remove();
		$(".gnb-bg").removeClass("atv");
	});

	$(".sub-menu ul li").each(function(){
		if( $(this).find(">a").hasClass("atv") ){
			$(this).find(">a img").attr({
				"src" : $(this).find(">a img").attr("src").replace("datv","atv")
			});
		}
	});
	
	var GnbDefaultIndex = $(".gnb-wrap > ul > li.atv").index();//gnb class="atv" 초기값
	$(".gnb-wrap > ul > li").on("mouseenter",function(){
		if( !$(this).find(">a").hasClass("atv") ){
			$(this).addClass("atv").siblings().removeClass("atv");
		}
	});
	
	$(".gnb-wrap > ul > li").on("mouseleave",function(){
		if( GnbDefaultIndex != -1 ){
			$(".gnb-wrap > ul > li").eq(GnbDefaultIndex).addClass("atv").siblings().removeClass("atv");
		}else if( GnbDefaultIndex == -1 && !$(".sub-menu").hasClass("atv") ){
			$(".gnb-wrap > ul > li").removeClass("atv");
		}
	});
	
	$(".gnb-wrap > ul > li").on({
		"focusin" : function() {
			$(this).addClass("atv");
		}
	});
	
	$(".gnb-wrap > ul > li").on({
		"focusout" : function() {
			$(this).removeClass("atv");
		}
	});
	
	$(".sub-menu ul li").on("mouseenter",function(){
		if( !$(this).find(">a").hasClass("atv") ){
			$(this).find(">a img").attr({
				"src" : $(this).find(">a img").attr("src").replace("datv","atv")
			});
		}
	});

	$(".sub-menu ul li").on("mouseleave",function(){
		if( !$(this).find(">a").hasClass("atv") ){
			$(this).find(">a img").attr({
				"src" : $(this).find(">a img").attr("src").replace("atv","datv")
			});
		}
	});
	
	$(".gnb-wrap > ul > li > div.sub-menu").on({
		"focusin" : function() {
			$(".sub-menu").addClass("atv");
			$(".gnb-bg").addClass("atv");
		}
	});
	
	$(".gnb-wrap > ul > li > div.sub-menu").on({
		"focusout" : function() {
			$(".sub-menu").removeClass("atv");
			$(".gnb-bg").removeClass("atv");
		}
	});
	
	//LNB
	$("#lnb > ul > li > a").hover(
		function() {
			if(!$(this).parent("li").hasClass("atv")) {
				$(this).find("img").attr({
					"src" : $(this).find("img").attr("src").replace("datv","atv")
				});
			}
		}, function() {
			if($(this).parent("li").hasClass("atv")) {
				$(this).find("img").attr({
					"src" : $(this).find("img").attr("src").replace("datv","atv")
				});
			} else {
				$(this).parent("li").find("img").attr({
					"src" : $(this).find("img").attr("src").replace("atv","datv")
				});
			}
		}
	);

	$("#lnb ul li ul li a").on("mouseenter",function(){
		if( !$(this).hasClass("atv") ){
			$(this).find("img").attr({
				"src" : $(this).find("img").attr("src").replace("-datv.","-atv.")
			});
		}
	});

	$("#lnb ul li ul li a").on("mouseleave",function(){
		if( !$(this).hasClass("atv") ){
			$(this).find("img").attr({
				"src" : $(this).find("img").attr("src").replace("-atv.","-datv.")
			});
		}
	});

	//search
	$(".search-quick a").on({
		"click" : function() {
			var trigger = $($(this).attr("href"));

			if (!$(this).hasClass("atv")) {
				$(this).addClass("atv");
				$("#search").addClass("atv");
				$("#search").show();
				$(".gnb-wrap > ul > li").removeClass("current");
				$(".sub-menu").removeClass("atv");
				$(".gnb-bg").removeClass("atv");
				$(".gnb-mask").remove();
				trigger.find("#search-in-form").focus();
			} else {
				$(this).removeClass("atv");
				$("#search").removeClass("atv");
				$("#search").hide();
			}
			return false;
		}
	});

	//search span 일 경우
	$(".search-quick span").on({
		"click" : function() {
			$("#text-input").focus();
		}
	});

	//iform
	$("input").iCheck({
		checkboxClass:"icheckbox",
		radioClass:"iradio"
	});

	//iform radio - tabs

	$(".radio-tab-area .iradio-reverse label").on("click",function(){
		var idx = $(this).parent('.iradio-reverse').index();
		$(this).parents(".radio-tabs").next(".radio-tab-contetns").find(">div").eq(idx).addClass("atv").siblings().removeClass("atv");
	});

	$(".radio-tab-area .iradio-reverse div > ins").on("click", function(){
		var idx = $(this).parents('.iradio-reverse').index();
		$(this).parents(".radio-tabs").next(".radio-tab-contetns").find(">div").eq(idx).addClass("atv").siblings().removeClass("atv");
	});

	$(".iradio.disabled").prev("label").css("cursor","default");

	//iform
	$(".iform-append").on("click",function(){
		$(".ifile-area .ifile").clone().appendTo(".iform-add-area").find(".file-name").attr("value","");
		iFormValue();
	});
	$(".iform-remove").on("click",function(){
		$(".iform-add-area .ifile:last").remove();
	});

	//select
	$("select").selectBox();

	// help layer
	$(".major-history-cont .help").mouseenter(function(){
		$(".major-history-cont").find(".help-layer").css("display","block")
	});
	$(".major-history-cont .help").mouseleave(function(){
		$(".major-history-cont").find(".help-layer").css("display","none")
	});

	// leaders pic layer
	$(".leaders-pic .pic-view").mouseenter(function(){
		$(this).siblings(".pic-view-layer").css("display","block")
	});
	$(".leaders-pic .pic-view").mouseleave(function(){
		$(this).siblings(".pic-view-layer").css("display","none")
	});

	//thum slide
	$(".slide-thum-box").each(function(){
		//thum 변수
		var container = $(this),
			thumBox = container.find(".thum-list-area"),
			thumPrevBtn = thumBox.find(">a.btn-prev"),
			thumNextBtn = thumBox.find(">a.btn-next"),
			thumSlideArea = thumBox.find(".thum-slide"),
			thumSlideList = thumSlideArea.find(".slide-thum-list"),
			thumSlideLI = thumSlideList.find(">li"),
			thumSlideBtn = thumSlideLI.find(">a"),
			thumLength = thumSlideLI.length,
			thumIndex = 0,
			thumSlideWidth = thumSlideLI.outerWidth()*2,
			thumSpeed = 500,
			isMoving = false;

		//big pic 변수
		var picBox = container.find(".big-pic-list"),
			picList = picBox.find(">li");

		//css 세팅
		thumSlideList.css({"width":thumLength*thumSlideWidth});

		//thum Next btn
		thumNextBtn.on("click",function(e){
			e.preventDefault();
			if( !isMoving ){
				isMoving = true;
				goToSlide(thumIndex+1,thumIndex+2);
			}
			indicatorMoving(thumIndex);
		});

		//thum Prev btn
		thumPrevBtn.on("click",function(e){
			e.preventDefault();
			if( !isMoving ){
				isMoving = true;
				goToSlide(thumIndex-1,thumIndex);
			}
			indicatorMoving(thumIndex);
		});

		thumSlideBtn.on("click",function(e){
			e.preventDefault();
			var thumIdx = $(this).parent().index();
			$(this).parent().addClass("on").siblings().removeClass("on");
			picList.eq(thumIdx).show().siblings().hide();
		});

		thumSlideBtn.on("keyup",function(e){
			var thumIdx = $(this).parent().index();
			if( thumIdx < thumLength-1 ){
				goToSlide(thumIdx);
			}
			thumNavi(thumIdx);
		});

		//thum slide animate
		function goToSlide(index,idx){
			if( isMoving ){
				thumSlideList.animate({"margin-left":-thumSlideWidth*index},thumSpeed,function(){
					isMoving = false;
				});
			}
			thumIndex = index;
			thumNavi();
		}

		thumPrevBtn.hide(); //초기값 Prev hidden
		if( thumLength <= 2 ){ //li개수가 2개 이하일때 양쪽 버튼 히든처리
			thumPrevBtn.hide();
			thumNextBtn.hide();
		}
		function thumNavi(index){
			//첫번째 슬라이드라면 prev 버튼 히든처리
			if( thumIndex === 0 ){
				thumPrevBtn.hide();
			}else{
				thumPrevBtn.show();
			}

			//마지막 슬라이드라면 next 버튼 히든처리
			if( thumIndex === (thumLength/2)-1 ){
				thumNextBtn.hide();
			}else if( index === thumLength-3 ){
				thumNextBtn.hide();
			}else{
				thumNextBtn.show();
			}
		}

		if( container.hasClass("indicator") ){
			var indicatorHtml = "";
			if( thumLength > 2 ){
				for( var i = 1; i <= thumLength/2; i++ ){
					indicatorHtml += "<span>"+(i)+"</span>";
				}
				container.find(".list-indicator").html(indicatorHtml);
				container.find(".list-indicator > span").eq(0).addClass("atv");
			}
		}

		function indicatorMoving(index){
			container.find(".list-indicator > span").eq(index).addClass("atv").siblings().removeClass("atv");
		}
	});

	//search - label
	searchVal();

	//tabs

	if( $(".tab-contents").length > 0 ){
		dMenuTab();
	}
	tMenuTab();
	iMenuTab();

	//scroll - to - top
	scrollToTop();

	// input - file
	iFormValue();

	//accordions
	accordions();

	//포스터 슬라이드
	$(".box-pos-wrap").each(function(){
		var _this = $(this),
			posBox = _this.find(".slide-pos-box"),
			posBtn = posBox.find(">a"),
			posListWrap = posBox.find(".slideshow-pos-box"),
			posUl = posListWrap.find(">ul"),
			posLi = posUl.find(">li"),
			posImgBtn = posLi.find(">a"),
			posLen = posLi.length,
			posWidth = posLi.outerWidth(),
			isMoving = false,
			currentIndex = 0;

		posUl.css("width",posWidth*posLen);

		posBtn.on("click",function(e){
			e.preventDefault();
			if( $(this).hasClass("btn-prev") ){
				if( !isMoving){
					isMoving = true;
					goToSlide(currentIndex-1);
				}
			}else if( $(this).hasClass("btn-next") ){
				if( !isMoving){
					isMoving = true;
					goToSlide(currentIndex+1);
				}
			}
		});

		if( posLen <= 1 ){
			posBtn.hide();
		}

		posImgBtn.on("click",function(e){
			e.preventDefault();
			var imgSrc = $(this).find(">img").attr("src");
			_this.find(".tit-pos").find(">img").attr("src",imgSrc);
			$(this).addClass("on").siblings().removeClass("on");
			$(this).parent("li").siblings().find(">a").removeClass("on");
		});

		function goToSlide(index){
			if( isMoving ){
				posUl.animate({"margin-left":-posWidth*index},500,function(){
					isMoving = false;
				});
			}
			currentIndex = index;
			Navi();
		}

		posBox.find(".btn-prev").hide();
		function Navi(index){
			//첫번째 슬라이드라면 prev 버튼 히든처리
			if( currentIndex === 0 ){
				posBox.find(".btn-prev").hide();

			}else{
				posBox.find(".btn-prev").show();
			}

			//마지막 슬라이드라면 next 버튼 히든처리
			if( currentIndex === posLen-2){
				posBox.find(".btn-next").show();
			}else if( index === posLen-1 ){
				posBox.find(".btn-next").show();
			}else{
				posBox.find(".btn-next").hide();
			}
		}
	});

	//전시관 둘러보기
	if( $(".accord-browse").length > 0 ){
		var browseLi = $(".accord-browse").find(">li");

		browseLi.on("click",function(e){
			e.preventDefault();
			var index = $(this).index();
			$(this).eq(index).addClass("on").siblings().removeClass("on");
			$(".list-view-browse").find(">li").eq(index).addClass("atv").siblings().removeClass("atv");
			$(".list-view-browse").find(">li").eq(index).addClass("on").siblings().removeClass("on");
			$(this).addClass("atv").siblings().removeClass("atv");
			$(this).find(">ul").addClass("atv").parent().siblings().find(">ul").removeClass("atv");
			$(this).siblings().find(">ul").removeClass("atv");
		});

		browseLi.on("mouseenter",function(){
			var idx = $(this).index();
			var viewIndex = $(".list-view-browse").find(">li.on").index();
			$(this).addClass("on").siblings().removeClass("on");
			if( $(".accord-browse").find(">li:first").hasClass("atv") ){
				$(".list-view-browse").find(">li:first img").eq(idx).show().siblings().hide();
			}else{
				$(".list-view-browse").find(">li").eq(viewIndex).addClass("atv").siblings().removeClass("atv");
			}
		});

		browseLi.on("mouseleave",function(){
			var viewIndex = $(".list-view-browse").find(">li.on").index();
			browseLi.eq(viewIndex).addClass("on").siblings().removeClass("on");
			$(".list-view-browse").find(">li").removeClass("atv");
			if( $(".accord-browse").find(">li:first").hasClass("atv") ){
				$(".list-view-browse").find(">li:first img").eq(0).show().siblings().hide();
			}
		});
	}

	$(".list-view-browse li div").find(">a").on("click",function(){
		var imgAlt = $(this).next().find(".slideshow-list li:first img").attr("alt");
		$(this).next().find(".tit-slide").text(imgAlt);
	});

	//국가별 테러정보 UI
	$(".box-country").find(">a").on("click",function(){
		if( $(this).text() == "닫힘" ){
			$(this).parent().animate({"right":-180},500);
			$(this).addClass("btn-country-open").removeClass("btn-country-close");
			$(this).html("<span class='invisible'>열림</span>");
		}else{
			$(this).parent().animate({"right":0},500);
			$(this).addClass("btn-country-close").removeClass("btn-country-open");
			$(this).html("<span class='invisible'>닫힘</span>");
		}
	});

	$(".list-terror-country li").find(">a").on("click",function(e){
		e.preventDefault();
		$(this).parent().addClass("on").siblings().removeClass("on");
		$(this).parents(".box-country").siblings(".ly-second").show();
	});

	$(".box-terror").find("a.btn-close").on("click",function(e){
		e.preventDefault();
		$(this).parent().hide();
	});

	$(".list-country-info li").find(">a").on("click",function(e){
		e.preventDefault();
		$(this).next().show();
	});

	//무빙툰으로 보는 대공사건
	$(".list-movingtoon li").find(">a").on("click",function(e){
		e.preventDefault();
		$(this).parent().addClass("on").siblings().removeClass("on");
	});

	//보안적합성검증
	$(".box-ccevc.more-table").find("> table").hide();
	$(".btn-ccevc").on("click",function(e){
		e.preventDefault();
		if( $(this).hasClass("close") ){
			$(".box-ccevc.more-table").animate({"height":0},500,function(){
				$(".box-ccevc.more-table").find(">table").hide();
			});
			$(this).addClass("open").removeClass("close");
			$(this).find("span").text("View All");
		}else{
			$(".box-ccevc.more-table").find(">table").show();
			$(".box-ccevc.more-table").animate({"height":1009},500);
			$(this).addClass("close").removeClass("open");
			$(this).find("span").text("Close");
		}
	});
	//보안적합성검증 두번째 테이블
	$(".box-ccevc2.more-table").find("> table").hide();
	$(".btn-ccevc2").on("click",function(e){
		e.preventDefault();
		if( $(this).hasClass("close") ){
			$(".box-ccevc2.more-table").animate({"height":0},500,function(){
				$(".box-ccevc2.more-table").find(">table").hide();
			});
			$(this).addClass("open").removeClass("close");
			$(this).find("span").text("View All");
		}else{
			$(".box-ccevc2.more-table").find(">table").show();
			$(".box-ccevc2.more-table").animate({"height":371},500);
			$(this).addClass("close").removeClass("open");
			$(this).find("span").text("Close");
		}
	});

	//기술유출현황 탭
	$(".tab-tsc ul li").find(">a").on("click",function(e){
		e.preventDefault();
		var thisId = $(this).attr("href");
		$(".tab-tsc ul li").removeClass("on");
		$(this).parent().addClass("on");
		$(".tab-cont-tsc").find("div"+thisId).show().siblings().hide();
	});

	//sitemap
	$(".list-sitemap").each(function(){
		var thisSitemap = $(this),
			listSitemap = thisSitemap.find(">li"),
			BtnSitemap = listSitemap.find("a"),
			BtnSitemapImg = BtnSitemap.find(">img");

		BtnSitemap.on("mouseenter",function(){
			$(this).find(">img").attr({
				"src" : $(this).find(">img").attr("src").replace("-datv","-atv")
			});
		});

		BtnSitemap.on("mouseleave",function(){
			$(this).find(">img").attr({
				"src" : $(this).find(">img").attr("src").replace("-atv","-datv")
			});
		});
	});
});

//scroll - to - top
function scrollToTop() {
	setWidth();
	var offset = 329;
	var duration = 200;
	$(window).scroll(function() {
		if ($(this).scrollTop() > offset) {
			$("#scroll-to-top").addClass("atv");
		} else {
			$("#scroll-to-top").removeClass("atv");
		}
	});
	$(".quick-gnb a").click(function(event) {
		event.preventDefault();
		$('html, body').animate({scrollTop: 0}, duration);

		return false;
	})
	$(window).resize(function() {
		setWidth();
	});
	function setWidth() {
		var windowWidth = $(window).innerWidth();

		if (windowWidth < 1236){
			$("#scroll-to-top").css({
				"width": "100%",
				"opacity": "0.5"
			});
			$(".quick-gnb").css("right","155px");
		} else {
			$("#scroll-to-top").css({
				"width": "1080px",
				"opacity": "1"
			});
			$(".quick-gnb").css("right","0");
		}
	};
}

$(window).load(function(){
	//slide(무한롤링, 재생정지, 인디게이터)
	$(".slide-box").each(function(){
		var _this = $(this),
			boxBtn = _this.find(".box-slide-btn"),
			btnPrev = boxBtn.find(".btn-prev"),
			btnNext = boxBtn.find(".btn-next"),
			slideBox = _this.find(".slideshow-box"),
			slideUl = slideBox.find(".slideshow-list"),
			slideLI = slideUl.find(">li"),
			slideWidth = slideLI.outerWidth(),
			slideHeight = slideLI.outerHeight(),
			slideLength = slideLI.length,
			indicator = boxBtn.find(".indicator"),
			nonindicator = boxBtn.find(".non-indicator"),
			indicatorHtml = "",
			nonindicatorHtml = "",
			pagingHtml = "",
			currentIndex = 0,
			speed = 500,
			interval = 4000,
			isMoving = true,
			thisMoving = false;

		slideBox.css({"width":slideWidth}); //slideshow-box width값
		slideUl.css({
			"width" : slideWidth*slideLength, //li개수에 따른 ul width값
			"height" : slideHeight // ul 높이값 세팅
		});

		//<div class="indicator">가 있을 경우 인디게이터 생성
		if( $(".indicator").length > 0 ){
			slideLI.each(function(i){
				indicatorHtml += "<a href='#'>"+(i+1)+"</a>";
			});
		}
		indicator.html(indicatorHtml);

		//<div class="non-indicator">가 있을 경우 인디게이터 생성(클릭 안되는)
		if( $(".non-indicator").length > 0 ){
			slideLI.each(function(i){
				nonindicatorHtml += "<span>"+(i+1)+"</span>";
			});
		}
		nonindicator.html(nonindicatorHtml);
		nonindicator.find(">span:first").addClass("atv");

		//slide li 초기 위치값
		slideLI.css("left",slideWidth);
		slideLI.eq(0).css("left",0);

		slideLI.show();

		//Next버튼
		btnNext.on("click",function(e){
			e.preventDefault();
			isMoving = true;
			Moving(currentIndex,currentIndex+1);
			nonindicator.find(">span").eq(currentIndex).addClass("atv").siblings().removeClass("atv");
			if( _this.find(".paging").length > 0 ){
				paging(currentIndex+1);
			}

			if( _this.find(".tit-slide").length > 0 || _this.parents(".layer").find(".tit-slide").length > 0 ){
				titText(currentIndex);
			}
		});

		//Prev버튼
		btnPrev.on("click",function(e){
			e.preventDefault();
			isMoving = false;
			Moving(currentIndex,currentIndex-1);
			nonindicator.find(">span").eq(currentIndex).addClass("atv").siblings().removeClass("atv");
			if( _this.find(".paging").length > 0 ){
				paging(currentIndex+1);
			}

			if( _this.find(".tit-slide").length > 0 || _this.parents(".layer").find(".tit-slide").length > 0 ){
				titText(currentIndex);
			}
		});

		//인디게이터 click 이벤트
		indicator.on("click",">a",function(e){
			e.preventDefault();
			var idx = $(this).index();
			Moving(currentIndex,idx);
		});

		//좌우 버튼 클릭시 섬네일 on 클래스 이동
		function thumEvent(index){
			if( $(".list-thum-slide").length > 0 ){
				$(".list-thum-slide").find(">a").eq(index).addClass("on").siblings().removeClass("on");
			}
		}
		//섬네일 click 이벤트
		if( $(".list-thum-slide").length > 0 ){
			$(".list-thum-slide").find(">a").on("click",function(e){
				e.preventDefault();
				var idx = $(this).index();
				$(this).addClass("on").siblings().removeClass("on");
				Moving(currentIndex,idx);
			});
		}

		//재생,정지 모드
		$(".btn-ssrm").find(">a").on("click",function(e){
			e.preventDefault();
			if ( $(this).text() == "정지" ){
				$(this).text("재생");
				stopSlide();
			}else if( $(this).text() == "재생" ){
				$(this).text("정지");
				autoSlide();
			}
		});

		//마우스 오버시 자동슬라이드 정지
		slideLI.on("mouseenter",function(){
			stopSlide();
		});

		//마우스 아웃 자동슬라이드 실행
		slideLI.on("mouseleave",function(){
			if( $(".btn-ssrm").find(">a").text() == "정지" ){
				autoSlide();
			}else if( $(".btn-ssrm").find(">a").text() == "재생" ){
				stopSlide();
			}
		});

		slideLI.on("focusin",function(){
			stopSlide();
		}).on("focusout",function(){
			if( $(".btn-ssrm").find(">a").text() == "정지" ){
				autoSlide();
			}else if( $(".btn-ssrm").find(">a").text() == "재생" ){
				stopSlide();
			}
		});

		//paging 필요한 경우 : 자동슬라이드,인디게이터가 필요없고 좌우버튼만 있고 paging이 들어가야 하는 경우
		function paging(index){
			if( index == undefined ){
				pagingHtml += "<span class='font-brown'>1</span> / <span>"+slideLength+"</span>";
			}else{
				pagingHtml += "<span class='font-brown'>"+index+"</span> / <span>"+slideLength+"</span>";
			}
			$(".paging").html(pagingHtml);
			return pagingHtml = "";
		}
		paging();

		//슬라이드 작동 함수
		function Moving(index,afterIndex){
			if( slideLength <= afterIndex ){
				afterIndex = 0;
			}else if( afterIndex < 0 ){
				afterIndex = slideLength-1;
			}

			if(isMoving){//Next Btn
				if( !thisMoving ){
					thisMoving = true;
					slideLI.not(':eq('+index+')').css("left",slideWidth);
					slideLI.eq(index).stop().animate({"left":slideWidth*-1},speed,function(){
						$(this).css("left",slideWidth);
					});

					slideLI.eq(afterIndex).stop().animate({"left":0},speed,function(){
						thisMoving = false;
					});

					if( _this.find(".btn-nonring").length > 0 ){
						btnHidden(afterIndex);
					}

					thumEvent(afterIndex);
					currentIndex = afterIndex;
				}
			}else{//Prev Btn
				if( !thisMoving ){
					thisMoving = true;
					slideLI.not(':eq('+index+')').css("left",slideWidth*-1);
					slideLI.eq(index).stop().animate({"left":slideWidth},speed,function(){
						$(this).css("left",slideWidth);
					});
					slideLI.eq(afterIndex).stop().animate({"left":0},speed,function(){
						thisMoving = false;
					});

					if( _this.find(".btn-nonring").length > 0 ){
						btnHidden(afterIndex);
					}

					thumEvent(afterIndex);
					currentIndex = afterIndex;
				}
			}
		}

		//무한 롤링이 아닐시 추가
		_this.find(".btn-nonring .btn-prev").hide(); //초기값

		if( slideLength == 1 ){//li개수가 1개일때
			_this.find(".btn-nonring a").hide();
		}

		function btnHidden(index){
			if( index === 0 ){
				btnPrev.hide()
			}else{
				btnPrev.show()
			}

			//마지막 슬라이드라면 next 버튼 히든처리
			if( index === slideLength-1 ){
				btnNext.hide();
			}else{
				btnNext.show();
			}
		}

		//자동슬라이드
		function autoSlide(){
			if( _this.find(".btn-ssrm").length > 0 ){ //class btn-ssrm 있을 경우 자동슬라이드 작동
				timer = setInterval(function(){
					Moving(currentIndex,currentIndex+1);
				},interval);
			}
		}
		autoSlide();

		//자동슬라이드 정지
		function stopSlide(){
			if( _this.find(".btn-ssrm").length > 0 ){
				clearInterval(timer);
			}
		}

		//슬라이드 타이틀이 변경되어야 하는 경우(alt값을 이용)
		function titText(index){
			var txt = slideLI.eq(index).find("img").attr("alt");
			$(".tit-slide").text(txt);
		}
	});
});

//search - label
function searchVal() {
	var iForm = $(".iform");

	iForm.each(function() {
		if(!iForm.val() == "") {
			$("label[for='" + this.id + "']").addClass("atv");
		}
	});


	//iForm.closest("form").trigger("reset");
	iForm.focus(function() {
		$("label[for='" + this.id + "']").addClass("atv");
	}).blur(function() {
		if($(this).val() == "") {
			$("label[for='" + this.id + "']").removeClass("atv");
		}
	});
};

//input - file
function iFormValue() {
	var iForm = $(".ifile-form");

	iForm.each(function() {
		$(this).change(function () {
			var filename = $(this).val().replace(/.*(\/|\\)/,"");

			if (filename.substring(3,11) == "fakepath") {
				filename = filename.substring(12); 
			}
			$(this).next(".file-name").val(filename);
		});
	});
}

//tabs - default
function dMenuTab(){
	var tab = $(".tab-area");

	tab.each(function() {
		var thisAera = $(this),
			trigger = thisAera.find(".tabs > a"),
			target = thisAera.find(".tab-contents");

		trigger.each(function() {
			var thisAera = $(this),
				thisTarget = $($(this).attr("href"));

			$(this).on({
				"click focusin" : function() {
					$(this).parents(".tabs").addClass("atv").siblings().removeClass("atv");
					thisTarget.addClass("atv");
					return false;
				}
			});
		});
	});
}

//tabs - text
function tMenuTab() {

	var tab = $(".tab-area.txt-menu");

	tab.each(function() {
		var thisAera = $(this),
			trigger = thisAera.find(".tabs li a"),
			target = thisAera.find("div");

		trigger.each(function() {
			var thisAera = $(this),
				thisTarget = $($(this).attr("href"));

			$(this).on({
				"click focusin" : function() {
					$(this).parents("li").addClass("atv").siblings().removeClass("atv");
					thisTarget.addClass("atv").siblings().removeClass("atv");
					return false;
				}
			});
		});
	});
}

//tabs - image
function iMenuTab() {

	var tab = $(".tab-area.image-menu");

	tab.each(function() {
		var thisArea = $(this),
			trigger = thisArea.find(".tabs li a"),
			target = thisArea.find(">div");

		trigger.each(function() {
			var thisArea = $(this),
				thisTarget = $($(this).attr("href"));

			$(this).on({
				"click focusin" : function() {
					trigger.parent("li").removeClass("atv");
					thisArea.parent("li").addClass("atv");
					target.removeClass("atv");
					thisTarget.addClass("atv");

					allImageOff();
					if (thisArea.parent("li").hasClass("atv")) {
						$(this).find("img").attr("src",$(this).find("img").attr("src").replace("-datv","-atv"));
					}
					return false;
				}
			});

			function allImageOff() {
				trigger.each(function(){
					$(this).find("img").attr("src",$(this).find("img").attr("src").replace("-atv","-datv"));
				});
			};
		});
	});

}

//accrdions
function accordions() {

	var acc = $(".accordion-area");

	acc.each(function() {
		var thisAera = $(this),
			trigger = thisAera.find(".acc-title"),
			target = thisAera.find(".acc-contents");

		trigger.each(function() {
			var thisTarget = $($(this).attr("href"));

			$(this).on({
				"click focusin" : function() {
					$(this).parents(".acc-section").siblings().children(".acc-contents").hide();
					$(this).parents(".acc-section").siblings().children(".acc-title").removeClass("atv");
					$(this).addClass("atv");
					thisTarget.show();
					return false;
				}
			});

		});

	});
}

// layer
function layPop(obj){
	var self = $(obj),
		target = $($(obj).attr("href"));

	var targetWidth = target.find(".layer").width(),
		targetHeight = target.find(".layer").height();
	$("#header").css("z-index",0);
	$("#footer").css("z-index",0);
	target.find(".layer").css({
		"margin-left" : - (targetWidth / 2),
		"margin-top" : - (targetHeight / 2)
	});

	target.attr("tabindex", "0").show().find(".layer-title").focus();
	target.append("<div class='mask'></div>");
	target.find(".mask").css("opacity","0.7");

	target.find(".layer-close").click(function(e){
		e.preventDefault();
		target.find(".mask").remove();
		target.hide();
		self.focus();
		$(this).off("click");
		$("#header").css("z-index",300);
		$("#footer").css("z-index",300);
	});
}

// window popup
function winPop(url, name, width, height, leftPosition, topPosition) {
	window.open (url, name, 'toolbar=no, location=yes, directories=no, status=no, menubar=no, scrollbars=yes, resizable=no, copyhistory=no, width='+width+', height='+height+', top='+topPosition+', left='+leftPosition);
}


/*** 영문 버전 ***/
function toggleSearchArea(){
        if ($('#search_area').hasClass('active')) {
            closeSearchArea();
        } else {
            $('#search_area').addClass('active');
        }
    }
    function closeSearchArea(){
        $('#search_area').removeClass('active');
    }
    function initPcMenu(){
        $('#gnb .menus .menu > .menu-link').on("click mouseover", function(e){
            e.preventDefault();
            $('#menus .menu > .menu-link').removeClass("active");
            $(this).addClass("active");
            $('#sub_menu').addClass("active");
            $('#sub_menu .sub-menu-list').removeClass('active');
            var menuId = $(e.target).data('menu-id');
            $(menuId).addClass('active');
        });
        $(window).mousemove(function(event){
            var eventTarget = event.target;
            if ( $(eventTarget).hasClass('menu-link') == false && $(eventTarget).closest('#sub_menu, #menus').length == 0 ) {
                $('#sub_menu').removeClass("active");
                $('#menus .menu > .menu-link').removeClass("active");
            }
        });
    }
    function initHeader(){
        initPcMenu();
    }
    $(function(){
        initHeader();
    });


$(function() {
	
	$(".gnb-menu").on("click",function(e){
		$(this).toggleClass('active');
		$(".mobile-menu").toggle();
		resetGnb();
	});

	$(".btn_toggle").on("click",function(e){
		$(this).next().toggle();
	});

	$(".btn_s_toggle").on("click",function(e){
		$(this).toggleClass('active');
		$(this).next().toggle();
	});

	

	function resetGnb(){
		$(".menu_2depth, .menu_3depth").hide();
		$(".btn_s_toggle").removeClass('active');
	}
	
	$(".tabWrap .nowPage").on("click",function(e){
		$(this).toggleClass('active');
		$(this).next("ul").toggle();
	});



});









