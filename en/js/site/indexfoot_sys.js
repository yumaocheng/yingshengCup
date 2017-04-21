
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
