function show_video(that){
    if ($(that).attr('data-src') != "") {
        $('.video_show video').attr('src',$(that).attr('data-src'));
        $('.video_show').addClass('active');
    }
}
function close_video(){
    $('.video_show').removeClass('active');
    $('.video_show video').attr('src','');
}
//第一屏
$(function(){
     
            var html = "";
            var listData = [{"filename":"product_行无止境","pic_path":"../../images/index/banner-1.jpg"},
			{"filename":"product_好品质才健康","pic_path":"../../images/index/banner-2.jpg"},
			{"filename":"product_要么在路上要么出发","pic_path":"../../images/index/banner-3.jpg"},
			{"filename":"product_温暖你心","pic_path":"../../images/index/banner-4.jpg"},
			{"filename":"product_远行的梦","pic_path":"../../images/index/banner-5.jpg"},
			{"filename":"product_简单自信","pic_path":"../../images/index/banner-6.jpg"},];
			console.log(listData)
            if (listData) {
                for (var i = 0;i<listData.length;i++) {
                    if (listData[i]) {
                        html += toHtml(listData[i]);
                    }                      
                }
				$(".swiper-wrapper").html(html);
				$(".swiper-container").bind({
					mouseover:function(){$(this).addClass("banner1_bg");},  
			    	mouseout:function(){$(this).removeClass("banner1_bg");}  
				});
				//执行Swiper 切换效果
                setTimeout(function(){
					var swiper = new Swiper('.swiper-container', {
					    pagination: '.swiper-pagination',
					    nextButton: '.swiper-button-next',
					    prevButton: '.swiper-button-prev',
					    paginationClickable: true,
					    spaceBetween: 0,
					    centeredSlides: true,
					    autoplay: 3500,
					    autoplayDisableOnInteraction: false,
					    loop: true
					});
					$("#section0").find(".swiper-slide").each(function(){
						var self = $(this);
						self.find("img").load(function(){
							var banner_height = $(this).height();
							var win_height = $(window).height();
							var cha = banner_height-win_height;
							console.log(banner_height+","+win_height+","+cha);
							if(banner_height > win_height){
								console.log(3);
								$(this).css("margin-top","-"+cha/2+"px");
								console.log(4);
							}else{};
						});
					});
				},250);
            }
        
    function toHtml(data) {
		var banner = data.filename.split("_");
	    var html = '<div class="swiper-slide">';
	    html += '<a href="/'+banner[0]+'.html" title="'+banner[1]+'"><img src="'+data.pic_path+'" alt="'+banner[1]+'" border="0" /></a></div>';
	    return html;
	};
});