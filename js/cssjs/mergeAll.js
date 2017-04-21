$(function(){
	var scrolltop = $(document).scrollTop();
	if(scrolltop > 0){
		$("#user_defined3 .side_float a.go_top").css("display","block");
	}
	else{
		$("#user_defined3 .side_float a.go_top").css("display","none");
	}
	$(window).scroll(function(){
		var scrolltop = $(document).scrollTop();
		if(scrolltop > 0){
			$("#user_defined3 .side_float a.go_top").css("display","block");
		}
		else{
			$("#user_defined3 .side_float a.go_top").css("display","none");
		}
	})
})

function go_top(){
 	$("html,body").animate({scrollTop:0},600);
}

$(function(){
	var scrolltop = $(document).scrollTop();
	if(scrolltop > 40){
		$("#user_defined2 .nav").addClass("active");
	}
	else{
		$("#user_defined2 .nav").removeClass("active");
	}
	$(window).scroll(function(){
		var scrolltop = $(document).scrollTop();
		if(scrolltop > 40){
			$("#user_defined2 .nav").addClass("active");
		}
		else{
			$("#user_defined2 .nav").removeClass("active");
		}
	})
})

$(function(){
	var href = window.location.pathname;
	$('#user_defined2 .nav .nav_block .nav_a').each(function() {
		if(href == '/'){
			$('#user_defined2 .nav .nav_block .nav_a.nav_index').addClass('active');
		}
		else if($(this).attr('href') == href){
			$(this).addClass('active');
		}
	});
})

var hover_state_1 = 0;
$(function(){
	$('#user_defined2 .nav .nav_block .nav_product').hover(function() {
		if(hover_state_1 == 0){
			hover_state_1 = 1;
			$('#user_defined2 .nav .nav_pro_content').slideDown();
			$('#user_defined2 .nav .nav_pro_content').addClass('active');
		}
	}, function() {
		hover_state_1 = 0;
		setTimeout("check_hover_1()",100);
	});

	$('#user_defined2 .nav .nav_pro_content').hover(function() {
		if(hover_state_1 == 0){
			hover_state_1 = 1;
			$('#user_defined2 .nav .nav_pro_content').slideDown();
			$('#user_defined2 .nav .nav_pro_content').addClass('active');
		}
	}, function() {
		hover_state_1 = 0;
		setTimeout("check_hover_1()",100);
	});
})

function check_hover_1(){
	if(hover_state_1 == 0){
		$('#user_defined2 .nav .nav_pro_content').slideUp();
		$('#user_defined2 .nav .nav_pro_content').removeClass('active');
	}
}

var hover_state_2 = 0;
$(function(){
	$('#user_defined2 .nav .nav_block .nav_news').hover(function() {
		if(hover_state_2 == 0){
			hover_state_2 = 1;
			$('#user_defined2 .nav .nav_news_content').slideDown();
			$('#user_defined2 .nav .nav_news_content').addClass('active');
		}
	}, function() {
		hover_state_2 = 0;
		setTimeout("check_hover_2()",100);
	});

	$('#user_defined2 .nav .nav_news_content').hover(function() {
		if(hover_state_2 == 0){
			hover_state_2 = 1;
			$('#user_defined2 .nav .nav_news_content').slideDown();
			$('#user_defined2 .nav .nav_news_content').addClass('active');
		}
	}, function() {
		hover_state_2 = 0;
		setTimeout("check_hover_2()",100);
	});
})

function check_hover_2(){
	if(hover_state_2 == 0){
		$('#user_defined2 .nav .nav_news_content').slideUp();
		$('#user_defined2 .nav .nav_news_content').removeClass('active');
	}
}

function keywords_hide(){
	$("#user_defined2 .search .keywords").css("display","none");
}
function keywords_show(){
	if($("#user_defined2 .search .search_text").val() == ""){
		$("#user_defined2 .search .keywords").css("display","block");
	}
	else{
		$("#user_defined2 .search .keywords").css("display","none");
	}
}

//显示搜索框
function show_search(){
	if($('#user_defined2 .search .search_text').val() == ''){
		if($("#user_defined2 .search").width() == 0){
			$("#user_defined2 .search").addClass("show");
		}
		else{
			$("#user_defined2 .search").removeClass("show");
		}
	}
	else{
		search_keywords();
	}
}
//搜索
function search_keywords(){
	var search_text = $('#user_defined2 .search .search_text').val();
	if (search_text == ''){
		alert('请输入您想要搜索的关键词！')
		return;
	}
	else{
		window.location = "/search.html?keywords="+ search_text +"";
	}
};

$(function(){
	 $('input').keyup(function(event){
		if($("#user_defined2 .search_content .search_text").is(":focus") == true){
			if(event.keyCode == "13"){
				search_keywords();
			}
		}
	 })
})

function show_code(){
	$('.code').addClass('active');
}
function close_code(){
	$('.code').removeClass('active');
}

$(function(){
	$("#hunk_breadcrumb_navigation .txt_j5, #hunk_breadcrumb_navigation .txt_j_2, #hunk_breadcrumb_navigation .txt_j_6, #hunk_breadcrumb_navigation .txt_j_7, #hunk_breadcrumb_navigation .txt_j_8, #hunk_breadcrumb_navigation .txt_j_9, #hunk_breadcrumb_navigation .txt_j_11, #hunk_breadcrumb_navigation .txt_j_12, #hunk_breadcrumb_navigation .txt_j_15").text("/");

	if($("#hunk_breadcrumb_navigation .hunk_breadcrumb_navigation_2").children().last().attr("class") == "txt_j5"){
		$("#hunk_breadcrumb_navigation .hunk_breadcrumb_navigation_2").children().last().remove();
	}
	$("#hunk_breadcrumb_navigation .hunk_breadcrumb_navigation_2").children().last().css("color","#00579e");
})

$(function(){
	$('#user_defined2 .nav .other_nav a.login').bind('click', function() {
		$('#topbar-v2 .account-sign-status #loginLink').click();
	});

	$('#user_defined3 .copyright li a.toAddFav').bind('click', function() {
		$('#topbar-v2 .topnav #toAddFav').click();
	});
})

//判断帐号是否登录
$(function(){
	if($("#topbar-v2 #accountId .account-signed")){
		var null1 = $("#topbar-v2 #accountId .account-signed").html();
		if(null1){
			if(null1.indexOf('null') == -1){
				$("#user_defined2 .nav .other_nav a.login").hide();//隐藏原先会员图标
				$("#user_defined2 .nav .other_nav a.login").after("<a href='/member/index.html' class='huiyuan charu'></a>");//插入会员中心和退出按钮
			}else{
				$("#user_defined2 .nav .other_nav a.login").css("display","inline-block");//显示原先会员图标
				$("#user_defined2 .nav .other_nav a.charu").remove();//移除插入会员中心和退出按钮
			}
		}
	}
});