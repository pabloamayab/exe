var myTheme = {
	collapseActivities : true, // Minimize interactive activities
	// Activities (to minify if collapseActivities is true)
	// Activities using any of these icons will be minified too: icon_collapse_idevice
	activities : [
		/*"FileAttachIdeviceInc",
		"RubricIdevice",
		"download-packageIdevice",
		"WikipediaIdevice",
		"ExternalUrlIdevice",*/
		"RssIdevice"
	],
	init : function(){
		var ie_v = $exe.isIE();
		if (ie_v && ie_v<8) return false;
		setTimeout(function(){
			$(window).resize(function() {
				myTheme.reset();
			});
		},1000);
		var tit = $exe_i18n.menu+" ("+$exe_i18n.hide.toLowerCase()+")";
		var navToggler = '<p id="header-options">';
				navToggler += '<a href="#" class="hide-nav" id="toggle-nav" title="'+tit+'">';
					navToggler += '<span>'+$exe_i18n.menu+'</span>';
				navToggler += '</a>';
			navToggler += '</p>';
		var l = $(navToggler);
		var nav = $("#siteNav");
		nav.before(l);
		$("#toggle-nav").click(function(){
			myTheme.toggleMenu(this);
			return false;
		});
		$("#print-page").click(function(){
			window.print();
			return false;
		});		
		if ( $("A",nav).attr("class").indexOf("active")==0 ) $("BODY").addClass("home-page");
		var url = window.location.href;
		url = url.split("?");
		if (url.length>1){
			if (url[1].indexOf("nav=false")!=-1) {
				myTheme.hideMenu();
			}
		}
		// Set the min-height for the content wrapper
		$("#main-wrapper").css("min-height",(nav.height()+25)+"px");
	},
	init2 : function(){
		var ie_v = $exe.isIE();
		if (ie_v && ie_v<8) return false;
		setTimeout(function(){
			$(window).resize(function() {
				myTheme.reset();
			});
		},1000);
		var tit = $exe_i18n.menu+" ("+$exe_i18n.hide.toLowerCase()+")";
		var navToggler = '<p id="header-options">';
				navToggler += '<a href="#" class="hide-nav" id="toggle-nav" title="'+tit+'">';
					navToggler += '<span>'+$exe_i18n.menu+'</span>';
				navToggler += '</a>';
			navToggler += '</p>';
		var l = $(navToggler);
		var nav = $("#siteNav");
		nav.before(l);
		$("#toggle-nav").click(function(){
			myTheme.toggleMenu(this);
			return false;
		});
		$("#print-page").click(function(){
			window.print();
			return false;
		});		
		if ( $("A",nav).attr("class").indexOf("active")==0 ) $("BODY").addClass("home-page");
		var url = window.location.href;
		url = url.split("?");
		if (url.length>1){
			if (url[1].indexOf("nav=false")!=-1) {
				myTheme.hideMenu();
			}
		}
		// Set the min-height for the content wrapper
		$("#main-wrapper").css("min-height",(nav.height()+25)+"px");
		myTheme.hideMenu();
	
	},
	hideMenu : function(){
		$("#siteNav").hide();
		$(document.body).addClass("no-nav");
		myTheme.params("add");
		var tit = $exe_i18n.menu+" ("+$exe_i18n.show.toLowerCase()+")";
		$("#toggle-nav").attr("class","show-nav").attr("title",tit);
	},
	toggleMenu : function(e){
		if (typeof(myTheme.isToggling)=='undefined') myTheme.isToggling = false;
		if (myTheme.isToggling) return false;
		
		var l = $("#toggle-nav");
		
		if (!e && $(window).width()<900 && l.css("display")!='none') return false; // No reset in mobile view
		if (!e) {
			var tit = $exe_i18n.menu+" ("+$exe_i18n.show.toLowerCase()+")";
			l.attr("class","show-nav").attr("title",tit); // Reset
		}
		
		myTheme.isToggling = true;
		
		if (l.attr("class")=='hide-nav') {  
			var tit = $exe_i18n.menu+" ("+$exe_i18n.show.toLowerCase()+")";
			l.attr("class","show-nav").attr("title",tit);
			$("#siteFooter").hide();
			$("#siteNav").slideUp(400,function(){
				$(document.body).addClass("no-nav");
				$("#siteFooter").show();
				myTheme.isToggling = false;
			}); 
			myTheme.params("add");
		} else {
			var tit = $exe_i18n.menu+" ("+$exe_i18n.hide.toLowerCase()+")";
			l.attr("class","hide-nav").attr("title",tit);
			$(document.body).removeClass("no-nav");
			$("#siteNav").slideDown(400,function(){
				myTheme.isToggling = false;
			});
			myTheme.params("delete");			
		}
		
	},
	param : function(e,act) {
		if (act=="add") {
			var ref = e.href;
			var con = "?";
			if (ref.indexOf(".html?")!=-1) con = "&";
			var param = "nav=false";
			if (ref.indexOf(param)==-1) {
				ref += con+param;
				e.href = ref;					
			}			
		} else {
			// This will remove all params
			var ref = e.href;
			ref = ref.split("?");
			e.href = ref[0];
		}
	},
	params : function(act){
		$("A",".pagination").each(function(){
			myTheme.param(this,act);
		});
	},
	reset : function() {
		myTheme.toggleMenu();		
	},
	common : {
		init : function(c){
			var iDevices = $(".iDevice_wrapper");
			var firstIsText = false;
			iDevices.each(function(i){
				if (iDevices.length>1 && i==0 && this.className.indexOf("FreeTextIdevice")!=-1) {
					$(".iDevice",this).css("margin-top",0);
					firstIsText = true;
				}
				// Use common CSS class names (so they have a similar presentation)
				if (!$(this).hasClass("UDLcontentIdevice")) {
					var header = $(".iDevice_header",this);
					var icon = header.css("background-image");
					if (typeof(icon)=='string'){
						if (icon.indexOf("icon_udl_eng")!=-1) $(this).addClass("em_iDevice_udl_eng_like");
						if (icon.indexOf("icon_udl_exp")!=-1) $(this).addClass("em_iDevice_udl_exp_like");
						if (icon.indexOf("icon_udl_rep")!=-1) $(this).addClass("em_iDevice_udl_rep_like");
					}
				}
			}); 
			if (myTheme.collapseActivities) {
				var as = myTheme.activities;
				var editor = $("#activeIdevice");
				if (typeof(_)!='function' || editor.length!=1) {
					if ($(".iDevice").length>1) {
						for (var z=0;z<as.length;z++){
							var a = as[z];
							// Minimize those iDevices (like clicking on .toggle-idevice a)
							var aW = $(".iDevice_wrapper."+a);
							aW.addClass("hidden-idevice");
							$(".toggle-idevice a",aW).attr("class","show-idevice");
							$(".iDevice_inner",aW).hide();
							if(a=='GeoGebra') $("div.auto-geogebra",aW).addClass("disableAutoScale"); // Prevent zoom problems when the iDevice is minified
						}
						// The iDevices with the icon_collapse_idevice are minified too
						$(".iDevice_wrapper").each(function(){
							var header = $(".iDevice_header",this);
							if (header.length==1) {
								var img = header.attr("style");
								//quito los originales y pongo el nuevo
								if (typeof(img)=='string' && (img.indexOf("icon_collapse_idevice")!=-1)) {
									var aW = $(this);
									aW.addClass("hidden-idevice");
									$(".toggle-idevice a",aW).attr("class","show-idevice");
									$(".iDevice_inner",aW).hide();
								}
							}
						});
						// You can toggle the iDevice clicking on any part of its header
						$(".iDevice_header").click(function(){
							$(".toggle-idevice a",this).trigger("click");
							var i = $(this).closest(".iDevice");
							if (i.length==1) {
								// H5P dynamic size
								$("iframe",i).each(function(){
									if (this.src && (this.src.indexOf("https://h5p.org/")==0 || this.src.indexOf("/wp-admin/admin-ajax.php?action=h5p_embed")!=-1)) {
										if (!this.style || !this.style.height || this.style.height=="") {
											this.src = this.src;
										}
									}
								});
							}							
						}).css("cursor","pointer");
					}
				}
			}   
			// "Do it here" will be the default title of the Interactive Activities
			if (document.body.className.indexOf("exe-authoring-page")==0) {
				if (typeof(top._)!='undefined') {
					var d = [
						"DropDown Activity",
						"SCORM Quiz",
						"Scrambled List",
						"Multi-choice",
						"Multi-select",
						"True-False Question",
						"Cloze Activity",
						"Interactive Video",
						"GeoGebra Activity"
					];					
					var l = [
						"ListaIdevice",
						"QuizTestIdevice",
						"ScrambledListIdevice",
						"MultichoiceIdevice",
						"MultiSelectIdevice",
						"TrueFalseIdevice",
						"ClozeIdevice",
						"interactive-videoIdevice",
						"GeoGebraIdevice"
					];
					var editor = $("#activeIdevice");
					if (editor.length!=1) return;
					var c = editor.attr("class");
					var i = l.indexOf(c);
					if (i==-1) return;
					var t = $("input[type='text']",editor).eq(0);
					if (t.length!=1) return;
					if (t.val()==_(d[i])) t.val(_("Do it here"));
				}
			}			
		}
	},
	
	zoom_init : function(element) {
		const zoomout = document.createElement('a');
		zoomout.href  = '#';
		zoomout.id = 'zoomout';
		zoomout.innerText=""; 
		document.getElementById(element).appendChild(zoomout);	
		
		const letraszoom = document.createElement('a');
		letraszoom.href  = '#';
		letraszoom.id = 'letraszoom';
		letraszoom.innerText=""; 
		document.getElementById(element).appendChild(letraszoom);	
		
		const zoomin = document.createElement('a');
		zoomin.href  = '#';
		zoomin.id = 'zoomin';
		zoomin.innerText="";
		document.getElementById(element).appendChild(zoomin);	

		const span1 = document.createElement('span');
		span1.innerText="Zoom+";
		span1.id = 'zoominspan';
		document.getElementById('zoomin').appendChild(span1);	

		const span2 = document.createElement('span');
		span2.innerText='Zoom-';
		span2.id = 'zoomoutspan';
		document.getElementById('zoomout').appendChild(span2);	

		$('#letraszoom').click(function() {
			zoomLvl=1.15
			updtZoom(0,-pts);
			pts=0;
		});

		$('#zoomin').click(function() {
			updtZoom(0.1,2);
		});
		 
		$('#zoomout').click(function() {
			updtZoom(-0.1,-2);
		});
		 
		zoomLvl = 1.15;
		pts=0;
		
		var updtZoom = function(zoom,points) {
			if(((zoomLvl>2.35) && zoom<0) || ((zoomLvl<0.45) && zoom>0) || ((zoomLvl<2.35) && (zoomLvl>0.45))) 
			{
				 zoomLvl+=zoom;
				 pts+=points;
				 $("body *[style*='font-size']").each(function() {$(this).css('font-size',parseInt($(this).css('font-size'),10)+points);});
				 if(element=="nodeDecoration") $('.iDevice_wrapper').css({ 'font-size':zoomLvl +'em'});
				 else	$('body').css({ 'font-size':zoomLvl +'em'});
			}
		}
	},
	delete_first_word_pagecounter : function() {
		document.getElementsByClassName("page-counter")[0].innerHTML=document.getElementsByClassName("page-counter")[0].innerHTML.replace("Página","");
		document.getElementsByClassName("page-counter")[1].innerHTML=document.getElementsByClassName("page-counter")[1].innerHTML.replace("Página","");
	},
	insert_logos : function() {
		if ($("body").hasClass("exe-web-site")) {
			const logocrea = document.createElement('img');
			logocrea.src  = 'exe.png';
			logocrea.id = 'logoexe';
			document.getElementById('siteNav').prepend(logocrea);	
		} else {
			$('#nodeDecoration').addClass('logocrea');
		}
	},
	addPageCounter:function() {
		var html = "<span><strong>$a de $b</strong></span>";
		var as = $("#siteNav a");
		html = html.replace("$b",as.length);
		$("#siteNav a").each(function(i){
			if ($(this).hasClass("active")) html = html.replace("$a",(i+1));
		});
		$("#bottomPagination nav").prepend(html);
		$("#topPagination nav").prepend(html);
		$("#topPagination nav span").addClass("page-counter");
		$("#bottomPagination nav span").addClass("page-counter");
		
	}
}

$(function(){
	if ($("body").hasClass("exe-web-site")) {
		if($(window).width()<829 && $(window).height()<1800){
			myTheme.init2();
		} else {
			myTheme.init();
		}
		if ($("#topPagination nav span.page-counter").length<=0) myTheme.addPageCounter();
		else myTheme.delete_first_word_pagecounter();
		myTheme.zoom_init("header-options");
	}
	else {
		if (!$("body").hasClass("exe-authoring-page")) myTheme.zoom_init("nodeDecoration");
	}
	myTheme.common.init();
	myTheme.insert_logos();
});


/*!
 * ScrewDefaultButtons v2.0.6
 * http://screwdefaultbuttons.com/
 *
 * Licensed under the MIT license.
 * Copyright 2013 Matt Solano http://mattsolano.com
 *
 * Date: Mon February 25 2013
*/(function(e,t,n,r){var i={init:function(t){var n=e.extend({image:null,width:50,height:50,disabled:!1},t);return this.each(function(){var t=e(this),r=n.image,i=t.data("sdb-image");i&&(r=i);r||e.error("There is no image assigned for ScrewDefaultButtons");t.wrap("<div >").css({display:"none"});var s=t.attr("class"),o=t.attr("onclick"),u=t.parent("div");u.addClass(s);u.attr("onclick",o);u.css({"background-image":r,width:n.width,height:n.height,cursor:"pointer"});var a=0,f=-n.height;if(t.is(":disabled")){a=-(n.height*2);f=-(n.height*3)}t.on("disableBtn",function(){t.attr("disabled","disabled");a=-(n.height*2);f=-(n.height*3);t.trigger("resetBackground")});t.on("enableBtn",function(){t.removeAttr("disabled");a=0;f=-n.height;t.trigger("resetBackground")});t.on("resetBackground",function(){t.is(":checked")?u.css({backgroundPosition:"0 "+f+"px"}):u.css({backgroundPosition:"0 "+a+"px"})});t.trigger("resetBackground");if(t.is(":checkbox")){u.on("click",function(){t.is(":disabled")||t.change()});u.addClass("styledCheckbox");t.on("change",function(){if(t.prop("checked")){t.prop("checked",!1);u.css({backgroundPosition:"0 "+a+"px"})}else{t.prop("checked",!0);u.css({backgroundPosition:"0 "+f+"px"})}})}else if(t.is(":radio")){u.addClass("styledRadio");var l=t.attr("name");u.on("click",function(){!t.prop("checked")&&!t.is(":disabled")&&t.change()});t.on("change",function(){if(t.prop("checked")){t.prop("checked",!1);u.css({backgroundPosition:"0 "+a+"px"})}else{t.prop("checked",!0);u.css({backgroundPosition:"0 "+f+"px"});var n=e('input[name="'+l+'"]').not(t);n.trigger("radioSwitch")}});t.on("radioSwitch",function(){u.css({backgroundPosition:"0 "+a+"px"})});var c=e(this).attr("id"),h=e('label[for="'+c+'"]');h.on("click",function(){u.trigger("click")})}if(!e.support.leadingWhitespace){var c=e(this).attr("id"),h=e('label[for="'+c+'"]');h.on("click",function(){u.trigger("click")})}})},check:function(){return this.each(function(){var t=e(this);i.isChecked(t)||t.change()})},uncheck:function(){return this.each(function(){var t=e(this);i.isChecked(t)&&t.change()})},toggle:function(){return this.each(function(){var t=e(this);t.change()})},disable:function(){return this.each(function(){var t=e(this);t.trigger("disableBtn")})},enable:function(){return this.each(function(){var t=e(this);t.trigger("enableBtn")})},isChecked:function(e){return e.prop("checked")?!0:!1}};e.fn.screwDefaultButtons=function(t,n){if(i[t])return i[t].apply(this,Array.prototype.slice.call(arguments,1));if(typeof t=="object"||!t)return i.init.apply(this,arguments);e.error("Method "+t+" does not exist on jQuery.screwDefaultButtons")};return this})(jQuery);

/* SCORM: When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
	if ($("body").hasClass("exe-scorm") ||$("body").hasClass("exe-authoring-page")) {
		var sm = window.matchMedia("(min-width: 50px) and  (max-width: 768px)");
/*		if ($("div.mce-tinymce.mce-fullscreen").length>0)  {$("#nodeDecoration").hide(); console.log("entra en hide") }
		else $("#nodeDecoration").show(); */
			
		if(!sm.matches)  
		 {
			document.getElementById("nodeDecoration").style.position="fixed";
			var currentScrollPos = window.pageYOffset;
			if (prevScrollpos > currentScrollPos) {
				document.getElementById("nodeDecoration").style.top = "0";
			} else {
				document.getElementById("nodeDecoration").style.top = "-70px";
			}
				prevScrollpos = currentScrollPos;
	 	 }
		else {
			document.getElementById("nodeDecoration").style.position="absolute";
			document.getElementById("nodeDecoration").style.top = "0px";
		}
	}
}

window.onclick = function () {
	console.log("entra en click")
	if ($("div.mce-tinymce.mce-fullscreen").length>0)  {$("#nodeDecoration").hide(); console.log("entra en hide") }
	else $("#nodeDecoration").show(); 
}