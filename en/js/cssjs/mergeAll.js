//产品分类插入当前页class
$(function(){
		var _href = window.location.href;
		$.each($(".ygtvdepth0 .ygtvcontent,.ygtvdepth1 .ygtvcontent"), function(){
			if(_href.indexOf($("a",$(this)).attr("href"))>-1)
				$(this).addClass("l-pro-a");
		});
});
//侧边分类插入class
$(function(){
		var _href = window.location.href;
		$.each($(".nav_list li"), function(){
			if(_href.indexOf($("a",$(this)).attr("href"))>-1)
				$(this).addClass("currenta");
		});
});
//搜索
function toSearch111(){
if ($("#keywords_text_111").val()==""){
alert('Enter search content!')
return;
}
$.ajax({
  url : "http://en.easthardware.net/u/deleteSearch",
  data : {
	enterpriseId : enterpriseId
  },
dataType : "jsonp",
success : function(msg){
location="/search-"+$("#keywords_text_111").val()+";;.html";
}
})};

//小图永原图
$(function(){
$("#products img,#main_ads_products .jcarousel-clip li img,#newProducts img,#products_by_category img,#competitiveProducts img,#products_by_category_two img,#content1 .narrow_category_news_page299065 .showSmallPic img,#cert .tal .pic img").each(function(){
	$(this).attr("src",$(this).attr("src").replace("_5","_3"));
 })
});
$(function(){
$("div.propertyByProDetail .zoomPad img:nth-child(1)").each(function(){
	$(this).attr("src",$(this).attr("src").replace("_4","_3"));
 })
});
$(function(){
$("div.cpzs .cpzs_right li .glitzBorder img,#relatedProducts .glitzPic1 img").each(function(){
	$(this).attr("src",$(this).attr("src").replace("_8","_4"));
 })
});
$(function(){
$("#content div#container ul.thumbs img").each(function(){
	$(this).attr("src",$(this).attr("src").replace("_8","_5"));
 })
});

//插入
$(document).ready(function(){
  $("#top_nav .headerMenuList").before('<a href="index.html" class="home" title="Zhejiang feijian industry and trade Co Ltd"></a>');

  $(".hunk_breadcrumb_navigation .txt_j_15,.hunk_breadcrumb_navigation .txt_j_8,.hunk_breadcrumb_navigation .txt_j_9,.hunk_breadcrumb_navigation .txt_j5,.hunk_breadcrumb_navigation .txt_j_2,.hunk_breadcrumb_navigation .txt_j_7,.hunk_breadcrumb_navigation .txt_j_11,.hunk_breadcrumb_navigation .txt_j_12,.hunk_breadcrumb_navigation .txt_m").html("");
  $("#category_nav .treeDiv").children().addClass("list-1");
  $(".glitzPic a").removeAttr("target");
  $(".qha li:last").addClass("qha_last");
});

$(document).ready(function(){
  $("#category_nav .bodyContContent .ygtvitem1").mouseover(function(){
	$(this).find(".children2").show();
  });
  $("#category_nav .bodyContContent .ygtvitem1").mouseout(function(){
	$(this).find(".children2").hide();
  });
});
//下拉
$(document).ready(function(){
  $("#top_nav #menu-news,#top_nav #menu-contact,#content,#user_defined6,#user_defined4,#category_nav").mouseover(function(){
	$(".nav_1,.nav_2,.nav_3").hide();
  });
  $("#top_nav #menu-company").mouseover(function(){
	$(".nav_menu .nav_1").show();
	$(".nav_2,.nav_3").hide();
  });
  $(".nav_menu").mouseleave(function(){
	$(".nav_1").hide();
  });
});

$(document).ready(function(){
  $("#top_nav #menu-product").mouseover(function(){
	$(".nav_menu .nav_2").show();
	$(".nav_1,.nav_3").hide();
  });
  $(".nav_menu").mouseleave(function(){
	$(".nav_2").hide();
  });
});

$(document).ready(function(){
  $("#top_nav #menu-service").mouseover(function(){
	$(".nav_menu .nav_3").show();
	$(".nav_1,.nav_2").hide();
  });
  $(".nav_menu").mouseleave(function(){
	$(".nav_3").hide();
  });
});
//
$(function(){
	if($(window).width()<1250){
		$(".inBg").addClass("wrapper");
	}
	if($(window).width()>1250){
		$(".inBg").removeClass("wrapper");
	}

	$(window).resize(function(){
		if($(window).width()<1250){
			$(".inBg").addClass("wrapper");
		}
		if($(window).width()>1250){
			$(".inBg").removeClass("wrapper");
		}
	})
})