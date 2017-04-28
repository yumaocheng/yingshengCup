/*hunk_navigator*/
(function($){
	$.fn.hoverIntent = function(f,g) {
		var cfg = {
			sensitivity: 7,
			interval: 100,
			timeout: 0
		};
		cfg = $.extend(cfg, g ? { over: f, out: g } : f );
		var cX, cY, pX, pY;
		var track = function(ev) {
			cX = ev.pageX;
			cY = ev.pageY;
		};
		var compare = function(ev,ob) {
			ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
			if ( ( Math.abs(pX-cX) + Math.abs(pY-cY) ) < cfg.sensitivity ) {
				$(ob).unbind("mousemove",track);
				ob.hoverIntent_s = 1;
				return cfg.over.apply(ob,[ev]);
			} else {
				pX = cX; pY = cY;
				ob.hoverIntent_t = setTimeout( function(){compare(ev, ob);} , cfg.interval );
			}
		};
		var delay = function(ev,ob) {
			ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
			ob.hoverIntent_s = 0;
			return cfg.out.apply(ob,[ev]);
		};
		var handleHover = function(e) {
			var p = (e.type == "mouseover" ? e.fromElement : e.toElement) || e.relatedTarget;
			while ( p && p != this ) { try { p = p.parentNode; } catch(e) { p = this; } }
			if ( p == this ) { return false; }
			var ev = jQuery.extend({},e);
			var ob = this;
			if (ob.hoverIntent_t) { ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t); }
			if (e.type == "mouseover") {
				pX = ev.pageX; pY = ev.pageY;
				$(ob).bind("mousemove",track);
				if (ob.hoverIntent_s != 1) { ob.hoverIntent_t = setTimeout( function(){compare(ev,ob);} , cfg.interval );}
			} else {
				$(ob).unbind("mousemove",track);
				if (ob.hoverIntent_s == 1) { ob.hoverIntent_t = setTimeout( function(){delay(ev,ob);} , cfg.timeout );}
			}
		};
		return this.mouseover(handleHover).mouseout(handleHover);
	};
})(jQuery);
(function($){
	$.fn.superfish = function(op){
		var sf = $.fn.superfish,
			c = sf.c,
			$arrow = $(['<span class="',c.arrowClass,'"> &#187;</span>'].join('')),
			over = function(){
				var $$ = $(this), menu = getMenu($$);
				clearTimeout(menu.sfTimer);
				$$.showSuperfishUl().siblings().hideSuperfishUl();
			},
			out = function(){
				var $$ = $(this), menu = getMenu($$), o = sf.op;
				clearTimeout(menu.sfTimer);
				menu.sfTimer=setTimeout(function(){
					o.retainPath=($.inArray($$[0],o.$path)>-1);
					$$.hideSuperfishUl();
					if (o.$path.length && $$.parents(['li.',o.hoverClass].join('')).length<1){over.call(o.$path);}
				},o.delay);	
			},
			getMenu = function($menu){
				var menu = $menu.parents(['ul.',c.menuClass,':first'].join(''))[0];
				sf.op = sf.o[menu.serial];
				return menu;
			},
			addArrow = function($a){ $a.addClass(c.anchorClass).append($arrow.clone()); };
		return this.each(function() {
			var s = this.serial = sf.o.length;
			var o = $.extend({},sf.defaults,op);
			o.$path = $('li.'+o.pathClass,this).slice(0,o.pathLevels).each(function(){
				$(this).addClass([o.hoverClass,c.bcClass].join(' '))
					.filter('li:has(ul)').removeClass(o.pathClass);
			});
			sf.o[s] = sf.op = o;
			
			$('li:has(ul)',this)[($.fn.hoverIntent && !o.disableHI) ? 'hoverIntent' : 'hover'](over,out).each(function() {
				if (o.autoArrows) addArrow( $('>a:first-child',this) );
			})
			.not('.'+c.bcClass)
				.hideSuperfishUl();
			
			var $a = $('a',this);
			$a.each(function(i){
				var $li = $a.eq(i).parents('li');
				$a.eq(i).focus(function(){over.call($li);}).blur(function(){out.call($li);});
			});
			o.onInit.call(this);
			
		}).each(function() {
			var menuClasses = [c.menuClass];
			if (sf.op.dropShadows  && !($.browser.msie && $.browser.version < 7)) menuClasses.push(c.shadowClass);
			$(this).addClass(menuClasses.join(' '));
		});
	};
	var sf = $.fn.superfish;
	sf.o = [];
	sf.op = {};
	sf.IE7fix = function(){
		var o = sf.op;
		if ($.browser.msie && $.browser.version > 6 && o.dropShadows && o.animation.opacity!=undefined)
			this.toggleClass(sf.c.shadowClass+'-off');
		};
	sf.c = {
		bcClass     : 'sf-breadcrumb',
		menuClass   : 'sf-js-enabled',
		anchorClass : 'sf-with-ul',
		arrowClass  : 'sf-sub-indicator',
		shadowClass : 'sf-shadow'
	};
	sf.defaults = {
		hoverClass	: 'sfHover',
		pathClass	: 'overideThisToUse',
		pathLevels	: 1,
		delay		: 800,
		animation	: {opacity:'show'},
		speed		: 'normal',
		autoArrows	: true,
		dropShadows : true,
		disableHI	: false,		// true disables hoverIntent detection
		onInit		: function(){}, // callback functions
		onBeforeShow: function(){},
		onShow		: function(){},
		onHide		: function(){}
	};
	$.fn.extend({
		hideSuperfishUl : function(){
			var o = sf.op,
				not = (o.retainPath===true) ? o.$path : '';
			o.retainPath = false;
			var $ul = $(['li.',o.hoverClass].join(''),this).add(this).not(not).removeClass(o.hoverClass)
					.find('>ul').hide().css('visibility','hidden');
			o.onHide.call($ul);
			return this;
		},
		showSuperfishUl : function(){
			var o = sf.op,
				sh = sf.c.shadowClass+'-off',
				$ul = this.addClass(o.hoverClass)
					.find('>ul:hidden').css('visibility','visible');
			sf.IE7fix.call($ul);
			o.onBeforeShow.call($ul);
			$ul.animate(o.animation,o.speed,function(){ sf.IE7fix.call($ul); o.onShow.call($ul); });
			return this;
		}
	});
})(jQuery);
function Menu() {
	for ( var key in this.onload)
		$(this.onload[key])
}
Menu.prototype = {
	onload : {
		initMenu : function() {
			$(".moveMenu").each(menu.generate);
			$(".submenu li").each(menu.generate);
			$(".subsubmenu li").each(menu.generate);
		},
		superfish : function() {
			$("#list_nav").superfish({
				speed : 300,
				delay : 500
			});
		}
	},
	generate : function() {
		var $menu = $(this)
		var position = $menu.position();
		var x = $menu.data("x") || "top";
		var y = $menu.data("y") || "height";
		position[x] += $menu[y]();
		var bg = $menu.hasClass("headerMenuLiCheckBg")
				|| $menu.parent().hasClass("headerMenuLiCheckBg") ? "headerMenuLiCheckBg"
				: "";

		var subs = $("<ul>", {
			"class" : "submenu subHeaderMenuBg " ,
			css : position
		});
		var submenu = $menu.data("submenu");
		if (submenu!=undefined && submenu.length) {
			$.each(submenu, function(i, nav) {
				var $li = $("<li>", {
					id : "menu-" + nav.page,
					"class" : "subHeaderMenuLi subsubmenu",
					"data-submenu" : $.toJSON(nav.subJson),
					"data-x" : "left",
					"data-y" : "width"
				});
				var $navpage = "";
				var n_t="";
				if(nav.page==undefined)
					return;
				if (nav.page.indexOf(".html") > -1 || nav.page.indexOf("http") > -1){
					$navpage = nav.page;
					n_t="_blank";
				}					
				else
					$navpage = nav.page + ".html";
				var $a = $("<a>", {
					href : p.href($navpage),
					target:n_t
				});
				$a.html(nav.name);

				subs.append($li.append($("<span>").append($a)))
			})
			$menu.append(subs);
			$menu.addClass("branch");
		} else {
			$menu.addClass("leaf")
		}
		$menu.removeAttr("data-submenu");
	}
}
var menu = new Menu();

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
	var $div = $("<div>", {
		'class' : 'error'
	}).appendTo("#authcodeLi");
	$div.html(lan["leave.valiCodeError"]);
	refreshCode('checkPic');
}
function leaveFailure() {
	var $div = $("<div>", {
		'class' : 'error'
	}).appendTo("#authcodeLi");
	$div.html(lan["leave.valiCodeError"]);
	refreshCode('checkPic');
}
function check_leave(){
	if(!validator.required($("#leaveWord").val())){
		alert("Message content cannot be empty！");
		return false;
	}
	else if(!validator.required($("#sendName").val())){
		alert("The name cannot be empty！");
		return false;
	}else if(!validator.isEmail($("#emailAdd").val())||!validator.required($("#emailAdd").val())){
		alert("Email cannot be empty or E-mail format is not correct！");
		return false;
	}else if(!validator.required($("#valiCode").val())){
		alert("Verification code cannot be empty！");
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
/*wide_news*/
function setWNewsCookies(obj){
	var url=$(obj).attr("href");
	var title =$(obj).html();
	saveNewsCookie(url,title);
}
