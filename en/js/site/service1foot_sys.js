/*narrow_category_static_product*/
$(function() {
	$(".ygtvlp .ygtvspacer").toggle(function() {
		$(this).parents(".ygtvitem:first").find(".ygtvchildren:first").show();
		var $parent = $(this).parent();
		if (!$parent.hasClass("ygtvlm")) $parent.addClass("ygtvlm");
		$parent.removeClass("ygtvlp");
		return false
	}, function() {
		$(this).parents(".ygtvitem:first").find(".ygtvchildren:first").hide();
		var $parent = $(this).parent();
		if (!$parent.hasClass("ygtvlp")) $parent.addClass("ygtvlp");
		$parent.removeClass("ygtvlm");
		return false
	})
});
/*wide_products*/
$(function(){var setProCookies=function(obj){var url=$(obj).find(".glitzPic a").attr("href"),img=$(obj).find(".glitzPic a img").attr("src"),title=$(obj).find(".txt div .p_name").html(),type=$(obj).find(".txt div .p_type").html();saveCookie(url,title,type,img)};$("#tip_close").click(function(){$(".key_tip").slideUp("fast")})});
/*wide_message*/
function messageSuccess() {
	var $form = $("#mainMessageForm");
	$form[0].reset();
	$form.find(":input").blur().removeClass("error");
	$form.find(".tip .error").remove();
	alert("Success！");
	refreshCode()
}
function refreshCode1() {
	$(".validate-num").attr("src", document.getElementById("verifyPic").src + "?" + Math.random())
}
function messageFail() {
	$("<span>", {
		'class': 'error',
		innerHTML: lan['valiCodeError']
	}).appendTo(".errorVerCode");
	refreshCode()
}
function messageFailure() {
	$("<span>", {
		'class': 'error',
		innerHTML: lan['valiCodeError']
	}).appendTo("#authcodeSpan");
	refreshCode()
}
$(function() {
	$("#mainMessageForm").validate({
		errorElement: "span",
		errorPlacement: function(error, element) {
			error.appendTo(element.parent().find(".tip"))
		},
		success: function(label) {
			label.remove()
		},
		submitHandler: function(form) {
			var $form = $(form);
			$form.ajaxSubmit({
				type: "get",
				dataType: "script",
				data: {
					domain: document.domain,
					userDomain: document.domain
				}
			})
		}
	});
	$("#valiCode").bind("keyup",
	function() {
		if ($("#authcodeSpan").empty()) {}
	})
});
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
