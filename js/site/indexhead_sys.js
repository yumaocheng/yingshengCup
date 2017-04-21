
/*page_message*/
function showMessageBox() {
	var $box = $("#ecustomerboxFF");
	if (!$box.data("minwidth"))
		$box.data("minwidth", $box.width());
	if ($box.width() < 222) {
		$box.width($box.width() + 12);
		setTimeout(showMessageBox, 10);
	} else {
		$("#ecustomerbuttonFF").css("background-position", "-226px -215px");
		$("#ecustomerbuttonFF").one("click", hideMessageBox)
	}
}

function hideMessageBox() {
	var $box = $("#ecustomerboxFF");
	if ($box.width() > $box.data("minwidth")) {
		$box.width($box.width() - 12);
		setTimeout(hideMessageBox, 10);
	} else {
		$("#ecustomerbuttonFF").css("background-position", "-168px -215px");
		$("#ecustomerbuttonFF").one("click", showMessageBox)
	}
}

function leaveSuccess() {
	var $form = $("#leave");
	$form[0].reset();
	$form.find(":input").blur();
	$form.find("div.error").remove();
	$("#leaveWord").removeData("input").css("color", '').val(
			lan["leave.success"]);
	refreshCode('checkPic');
}
function leaveFail() {
	$("<div>", {
		'class' : 'error',
		innerHTML : lan["leave.valiCodeError"]
	}).appendTo("#authcodeLi");
	refreshCode('checkPic');
}
function leaveFailure() {
	$("<div>", {
		'class' : 'error',
		innerHTML : lan["leave.valiCodeError"]
	}).appendTo("#authcodeLi");
	refreshCode('checkPic');
}
function check_leave(){
	if(!validator.required($("#leaveWord").val())){
		alert("留言内容不能为空！");
		return false;
	}
	else if(!validator.required($("#sendName").val())){
		alert("姓名不能为空！");
		return false;
	}else if(!validator.isEmail($("#emailAdd").val())||!validator.required($("#emailAdd").val())){
		alert("邮箱不能为空或邮箱格式不正确！");
		return false;
	}else if(!validator.required($("#valiCode").val())){
		alert("验证码不能为空！");
		return false;
	}
	
}
$(function() {
	$("#ecustomerbuttonFF").one("click", showMessageBox);

	$("#leaveWord").focus(function() {
		if (!$(this).data("input")) {
			this.value = "";
			$(this).data("input", 1);
			$(this).css("color", "black");
		}
	});

	$("#leave").validate( {
		errorElement : "div",
		errorPlacement : function(error, element) {
			error.appendTo(element.parents("li:first").next("li"));
		},
		success : function(label) {
			label.remove();
		},
		submitHandler : function(form) {
			var $form = $(form);
			$form.ajaxSubmit( {
				type : "get",
				dataType : "script"
			});
			//leaveSuccess();
		}
	});
});

/*narrow_ranking_product*/
function setRelProCookies(obj){
	var url=$(obj).find(".glitzPic1 a").attr("href");
	var img = $(obj).find(".glitzPic1 a img").attr("src");
	var title = $(obj).find(".txt div .p_name").html();
	var type = $(obj).find(".txt div .p_type").html();
	saveCookie(url,title,type,img);
}


(function($) {
	/**
	 * @class Class for calculating pagination values
	 */
	$.PaginationCalculator = function(maxentries, opts) {
		this.maxentries = maxentries;
		this.opts = opts;
	}

	$.extend($.PaginationCalculator.prototype, {
		/**
		 * Calculate the maximum number of pages
		 * 
		 * @method
		 * @returns {Number}
		 */
		numPages : function() {
			return Math.ceil(this.maxentries / this.opts.items_per_page);
		},
		/**
		 * Calculate start and end point of pagination links depending on
		 * current_page and num_display_entries.
		 * 
		 * @returns {Array}
		 */
		getInterval : function(current_page) {
			var ne_half = Math.ceil(this.opts.num_display_entries / 2);
			var np = this.numPages();
			var upper_limit = np - this.opts.num_display_entries;
			var start = current_page > ne_half ? Math.max(Math.min(current_page
					- ne_half, upper_limit), 0) : 0;
			var end = current_page > ne_half ? Math.min(current_page + ne_half,
					np) : Math.min(this.opts.num_display_entries, np);
			return {
				start : start,
				end : end
			};
		}
	});

	// Initialize jQuery object container for pagination renderers
	$.PaginationRenderers = {}

	/**
	 * @class Default renderer for rendering pagination links
	 */
	$.PaginationRenderers.defaultRenderer = function(maxentries, opts) {
		this.maxentries = maxentries;
		this.opts = opts;
		this.pc = new $.PaginationCalculator(maxentries, opts);
	}
	$
			.extend(
					$.PaginationRenderers.defaultRenderer.prototype,
					{
						/**
						 * Helper function for generating a single link (or a
						 * span tag if it's the current page)
						 * 
						 * @param {Number}
						 *            page_id The page id for the new item
						 * @param {Number}
						 *            current_page
						 * @param {Object}
						 *            appendopts Options for the new item: text
						 *            and classes
						 * @returns {jQuery} jQuery object containing the link
						 */
						createLink : function(page_id, current_page, appendopts) {
							var lnk, np = this.pc.numPages();
							page_id = page_id < 0 ? 0 : (page_id < np ? page_id
									: np - 1); // Normalize page id to sane
							// value
							appendopts = $.extend({
								text : page_id + 1,
								classes : ""
							}, appendopts || {});
							if (page_id == current_page) {
								lnk = $("<a class='danaiPageCurrent'>"
										+ appendopts.text + "</a>");
							} else {
								lnk = $(
										"<a class='danaiPageNum'>"
												+ appendopts.text + "</a>")
										.attr(
												'href',
												this.opts.link_to.replace(
														/__id__/, page_id));
							}
							if (appendopts.classes) {
								lnk.addClass(appendopts.classes);
							}
							lnk.data('page_id', page_id);
							return lnk;
						},
						// Generate a range of numeric links
						appendRange : function(container, current_page, start,
								end) {
							var i;
							for (i = start; i < end; i++) {
								this.createLink(i, current_page).appendTo(
										container);
							}
						},
						getLinks : function(current_page, eventHandler) {
							var begin, end, interval = this.pc
									.getInterval(current_page), np = this.pc
									.numPages(), fragment = $("<div class='pagination'></div>");

							// Generate "Previous"-Link
							if (this.opts.prev_text
									&& (current_page > 0 || this.opts.prev_show_always)) {
								fragment.append(this.createLink(
										current_page - 1, current_page, {
											text : this.opts.prev_text,
											classes : "danaiPageUp"
										}));
							}
							// Generate starting points
							if (interval.start > 0
									&& this.opts.num_edge_entries > 0) {
								end = Math.min(this.opts.num_edge_entries,
										interval.start);
								this
										.appendRange(fragment, current_page, 0,
												end);
								if (this.opts.num_edge_entries < interval.start
										&& this.opts.ellipse_text) {
									jQuery(
											"<span>" + this.opts.ellipse_text
													+ "</span>").appendTo(
											fragment);
								}
							}
							// Generate interval links
							this.appendRange(fragment, current_page,
									interval.start, interval.end);
							// Generate ending points
							if (interval.end < np
									&& this.opts.num_edge_entries > 0) {
								if (np - this.opts.num_edge_entries > interval.end
										&& this.opts.ellipse_text) {
									jQuery(
											"<span>" + this.opts.ellipse_text
													+ "</span>").appendTo(
											fragment);
								}
								begin = Math.max(np
										- this.opts.num_edge_entries,
										interval.end);
								this.appendRange(fragment, current_page, begin,
										np);

							}
							// Generate "Next"-Link
							if (this.opts.next_text
									&& (current_page < np - 1 || this.opts.next_show_always)) {
								fragment.append(this.createLink(
										current_page + 1, current_page, {
											text : this.opts.next_text,
											classes : "danaiPageDown"
										}));
							}
							$('a', fragment).click(eventHandler);
							return fragment;
						}
					});

	// Extend jQuery
	$.fn.pagination = function(maxentries, opts) {

		// Initialize options with default values
		opts = jQuery.extend({
			items_per_page : 10,
			num_display_entries : 10,
			current_page : 0,
			num_edge_entries : 0,
			link_to : "#",
			prev_text : "Prev",
			next_text : "Next",
			ellipse_text : "...",
			prev_show_always : true,
			next_show_always : true,
			renderer : "defaultRenderer",
			callback : function() {
				return false;
			}
		}, opts || {});

		var containers = this, renderer, links, current_page;

		/**
		 * This is the event handling function for the pagination links.
		 * 
		 * @param {int}
		 *            page_id The new page number
		 */
		function pageSelected(evt) {
			var links, current_page = $(evt.target).data('page_id');
			containers.data('current_page', current_page);
			links = renderer.getLinks(current_page, pageSelected);
			containers.empty();
			links.appendTo(containers);
			var continuePropagation = createHtml(current_page, containers);
			if (!continuePropagation) {
				if (evt.stopPropagation) {
					evt.stopPropagation();
				} else {
					evt.cancelBubble = true;
				}
			}
			return continuePropagation;
		}

		current_page = opts.current_page;
		containers.data('current_page', current_page);
		// Create a sane value for maxentries and items_per_page
		maxentries = (!maxentries || maxentries < 0) ? 1 : maxentries;

		if (!$.PaginationRenderers[opts.renderer]) {
			throw new ReferenceError("Pagination renderer '" + opts.renderer
					+ "' was not found in jQuery.PaginationRenderers object.");
		}
		renderer = new $.PaginationRenderers[opts.renderer](maxentries, opts);

		containers.each(function() {
			// Attach control functions to the DOM element
			this.selectPage = function(page_id) {
				pageSelected(page_id);
			}
			this.prevPage = function() {
				var current_page = containers.data('current_page');
				if (current_page > 0) {
					pageSelected(current_page - 1);
					return true;
				} else {
					return false;
				}
			}
			this.nextPage = function() {
				var current_page = containers.data('current_page');
				if (current_page < numPages() - 1) {
					pageSelected(current_page + 1);
					return true;
				} else {
					return false;
				}
			}
		});
		// When all initialisation is done, draw the links
		function createHtml(current_page, containers) {
			// 数据源
			var products = [];
			$("#" + opts.sign + " " + opts.childName).each(function(i) {
				products.push($(this).clone());
			});

			var max_elem = Math.min((current_page + 1) * opts.items_per_page,
					products.length);
			$('#Searchresult' + opts.sign).empty().show();
			// 构建结果集
			for ( var i = current_page * opts.items_per_page; i < max_elem; i++) {
				$('#Searchresult' + opts.sign).append(products[i])
			}
			return false;
		}
		if ((opts.items_per_page == 0)) {
			opts.items_per_page = 100;
			if (opts.page == 'index') {
				opts.items_per_page = 8;
			}
		}
		if (maxentries - opts.items_per_page > 0) {
			if (opts.page != 'index') {
				$("#Pagination"+opts.sign).show();
				links = renderer.getLinks(current_page, pageSelected);
				containers.empty();
				links.appendTo(containers);
			}
			createHtml(current_page, containers);
		} else {
			$("#" + opts.sign).show();
		}
	}
})(jQuery);
