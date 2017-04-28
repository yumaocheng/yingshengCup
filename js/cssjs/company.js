/* 荣誉证书 */

        $(function(){
        var rongyuData={"list": [
                            {
                                "filename": "",
                                "pic_path": "/images/company/rongyu1.jpg"
                            },{
                                "filename": "",
                                "pic_path": "/images/company/rongyu2.jpg"
                            },{
                                "filename": "",
                                "pic_path": "/images/company/rongyu3.jpg"
                            },{
                                "filename": "",
                                "pic_path": "/images/company/rongyu4.jpg"
                            },{
                                "filename": "",
                                "pic_path": "/images/company/rongyu5.jpg"
                            },{
                                "filename": "",
                                "pic_path": "/images/company/rongyu6.jpg"
                            },{
                                "filename": "",
                                "pic_path": "/images/company/rongyu7.jpg"
                            },{
                                "filename": "",
                                "pic_path": "/images/company/rongyu8.jpg"
                            }
                        ]};
            var html = '',
                length = 8;

            for (var i=0;i<length;i++) {
                var cert_url = rongyuData.list[i].pic_path.replace(".jpg","_4.jpg");
                html += '<div class="swiper-slide"><a href="javascript:;" data-url="'+ rongyuData.list[i].pic_path +'" onclick="show_cert(this)"><img src="'+ cert_url +'"></a></div>'; 
            }
            $("#user_defined9 .cert-container .swiper-wrapper").html(html);

            var mySwiper_1 = new Swiper('.cert-container',{
            	autoplay: 5000,
				autoplayDisableOnInteraction: false,
				roundLengths: true,
				slidesPerView: 'auto',
				speed: 750,
				followFinger: false,
				prevButton:'.swiper-button-prev',
				nextButton:'.swiper-button-next',
				slidesOffsetBefore: -16,
				loop: true
			})
        })     



function show_cert(that){
	$('#user_defined9 .pic_content span').html('<img src="'+ $(that).attr('data-url') +'">');
	$('#user_defined9 .show_content').addClass('show');
}
function close_cert(){
	$('#user_defined9 .show_content').removeClass('show');
}


/* 资质证书 */
$(function(){
    var url = "http://wechat.ykit.net/jihuiapi/album/index/71249/1/20"; 
    $.ajax({
        type: "get",
        url: url,
        dataType: "jsonp",
        jsonp: "callback",
        jsonpCallback: "jsonCallback" + new Date().getTime(),
        success : function(data){
            var html = '',
                length = data.list.length;

            for (var i=0;i<length;i++) {
                var cert_url = data.list[i].pic_path.replace(".jpg","_4.jpg");
                html += '<div class="swiper-slide"><a href="javascript:;" data-url="'+ data.list[i].pic_path +'" onclick="show_qualification(this)"><img src="'+ cert_url +'"></a></div>'; 
            }
            $("#user_defined17 .qualification-container .swiper-wrapper").html(html);

            var mySwiper_2 = new Swiper('.qualification-container',{
                autoplay: 5000,
                autoplayDisableOnInteraction: false,
                roundLengths: true,
                slidesPerView: 'auto',
                speed: 750,
                followFinger: false,
                prevButton:'.swiper-button-prev',
                nextButton:'.swiper-button-next',
                loop: true
            })
        },
        error:function(data){
            
        }
    });
})

function show_qualification(that){
    $('#user_defined17 .pic_content span').html('<img src="'+ $(that).attr('data-url') +'">');
    $('#user_defined17 .show_content').addClass('show');
}
function close_qualification(){
    $('#user_defined17 .show_content').removeClass('show');
}


function show_more(){
    $('#user_defined8 .profile_block .profile_info p.more_p').css('display','none');
    $('#user_defined8 .profile_block .profile_info p.hide_p').css('display','block');
    $('#user_defined8 .profile_block .profile_info').addClass('scroll_box');
}