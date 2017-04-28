//自定义19
$(function(){
	$(".sy_banner").bind({
		mouseover:function(){$(this).addClass("banner_bg");},  
    	mouseout:function(){$(this).removeClass("banner_bg");}  
	});
	$(".sy_banner").slide({
		titCell:".hd ul",
  		mainCell:".banner_list ul",
  		autoPage:"<li></li>",
		effect:"left",
		autoPlay:true,
		scroll:1,
		vis:1,
		easing:"linear",
		interTime:2700,
		delayTime:500,
		pnLoop:true,
		trigger:"mouseover",
		startFun:function(i,c){ 
			$('.banner_list li').each(function(){
				$(this).removeClass('on');
			})
			$('.banner_list li.banner'+ i +'').addClass('on');
		},
		mouseOverStop:true
	});
	$(".ser_list1").find("a").mouseover(function(){
		$(this).parent("li").siblings("li").removeClass("pro_bg");
		$(this).parent("li").addClass("pro_bg");
		$("#user_defined21").css({"height":"500px"});
		$("#user_defined23").css({"height":"0"});
	});
	$(".ser_list2").find("a").mouseover(function(){
		$(this).parent("li").siblings("li").removeClass("pro_bg");
		$(this).parent("li").addClass("pro_bg");
		$("#user_defined23").css({"height":"1520px"});
		$("#user_defined21").css({"height":"0"});
	});
});

//插入class
$(document).ready(function(){
	$(".ser_list li").each(function(index){
		var liNode = $(this);
		$(this).mouseover(function(){
			liNode.addClass("pro_bg");
		}).mouseout(function(){
			liNode.removeClass("pro_bg");
		});
	});
});