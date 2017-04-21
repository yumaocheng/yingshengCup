
/*narrow_search*/
$(function() {
	$("#searchBtnSide").click(function(){toSearch();})
	$(".topSearch li a").click(function() {
		$(".proNameInput").val($(this).html());
		$("#searchBtnSide").click();
	})
	$(".proNameInput").bind('keydown', function(e) {

		var key = e.which;

		if (key == 13) {

			toSearch();
		}

	});

})
function toSearch() {
	var keywords_text_1 = $("#keywords_text_1").val()==null?"":$("#keywords_text_1").val();
	var priceLowSide = $("#priceLowSide").val()==null?"":$("#priceLowSide").val();
	var priceHighSide = $("#priceHighSide").val()==null?"":$("#priceHighSide").val();
	$
			.ajax( {
				url : "http://www.jihui88.com/u/deleteSearch",
				data : {
					enterpriseId : enterpriseId
				},
				dataType : "jsonp",
				success : function(msg) {
					if (keywords_text_1 == ''
							&& priceLowSide == ''
							&& priceHighSide == '') {
						location.href = "product.html"
						return false;
					} else {
						location = "/search-"
								+ keywords_text_1.replace(/;/g, '')
								+ ";"
								+ priceLowSide.replace(/;/g, '')
								+ ";"
								+ priceHighSide.replace(/;/g, '')
								+ ".html";
						return false;
					}
				}
			});
}
/*员工账号*/
function getUrlParam(name) {
  var url = location.search; //获取url中"?"符后的字串
  if (url.indexOf("?") != -1) {
    var str = url.substr(1);
    var strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      if (strs[i].split("=")[0] === name) {
        return strs[i].split("=")[1]
      }
    }
  }
}

function padStr(target, n, filling, opts) {
  var str, options,
    prefix = '',
    length = n,
    filling = filling || '0';

  options = $.extend({
    right: false,
    radix: 10
  }, opts);

  str = target.toString(options.radix);
  if (options.prefix) {
    length = n - options.prefix.length;
    prefix = options.prefix;
    if (length < 0) {
      throw new Error('n too small');
    }
  }
  while (str.length < length) {
    if (!options.right) {
      str = filling + str;
    } else {
      str += filling;
    }
  }
  return prefix + str;
}

function pad(id, preStr) {
  if (!id) return '';
  return preStr + padStr('0', 32 - preStr.length - id.length) + id;
}

function contactClick() {
  $('.contact-way-service .arrow').click(function () {
    $('.contact-way-list').hide();
    $('.contact-way-title').show();
  })
}
$(function () {
  $('.contact-way-title').click(function () {
    $('.contact-way-list').show();
    $('.contact-way-title').hide();
    return false;
  })
})

var _memberId = getUrlParam('memberId');
if (_memberId && _memberId !== 'undefined' && _memberId !== 'null' && _memberId !== '') {
  $.ajax({
    type: 'get',
    url: "http://jihui88.com/rest/api/comm/submember/list_p",
    data: {
      enterpriseId: window.enterpriseId,
      memberId: pad(_memberId, 'Member_'),
      type: 'pc'
    },
    dataType: "jsonp",
    jsonpCallback: "submember",
    success: function (result) {
      if (result.success) {
        var data = result.attributes.data;
        var contact_html = '';
        if (data.length > 0) {
          $('#contact-way').show()
          var phone = '',
            mobile = '',
            email = '';
          if (data[0].phone) { phone = '<span>电话：</span><a href="tel:' + data[0].phone + '">' + data[0].phone + '</a><br/>' }
          if (data[0].mobile) { mobile = '<span>手机：</span><a href="tel:' + data[0].mobile + '">' + data[0].mobile + '</a><br/>' }
          if (data[0].email) { email = '<span>邮箱：</span><a href="mailto:' + data[0].email + '">' + data[0].email + '</a><br/>' }

          contact_html += '<li><div class="contact-way-service"><div class="contact-way-logo"><img src="http://img.jihui88.com/upload/j/j2/jihui88/picture/2016/12/06/0621d090-398c-4953-adc6-43ba7550718e.png" alt="客服联系.png"/></div><div class="name"><span>' + data[0].name + '</span></div><div class="arrow">X</div></div><div class="contact-way-contain">' + phone + mobile + email + '</div></li>'
            //系统模块
          $('#contact_column .c_name').html('姓&nbsp;&nbsp;&nbsp;&nbsp;名：' + data[0].name);
          $('#contact_column .c_phone').html('电&nbsp;&nbsp;&nbsp;&nbsp;话：' + data[0].phone);
          $('#contact_column .c_cellphone').html('移动电话：' + data[0].mobile);
          $('#contact_column .c_email').html('电子邮箱：<a  href="mailto:' + data[0].email + '" title="' + data[0].email + '">' + data[0].email + '</a>');


          $('#contact_side .c_name').html(data[0].name);
          $('#contact_side .c_phone').html('电话：' + data[0].phone);
          $('#contact_side .c_cellphone').html('手机：' + data[0].mobile);
          $('#contact_side .c_email').html('邮箱：<a  href="mailto:' + data[0].email + '" title="' + data[0].email + '">' + data[0].email + '</a>');

        }
        $('.contact-way-list').html(contact_html)
        contactClick();
      } else {
        alert(result.msg);
      }
    }
  });
		$(".inBg a").each(function(){
			var href=$(this).attr("href");
			if(!href || href.indexOf('javascript:;') > -1){return false}
			if((href.indexOf('http') > -1 && href.indexOf(location.origin) > -1) || (href.indexOf('http') === -1)){
				if(href.indexOf('?') > -1){
					$(this).attr("href",href+'&memberId='+_memberId);
				}else{
					$(this).attr("href",href+'?memberId='+_memberId);
				}
			}
 		})
}
