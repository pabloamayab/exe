var myTheme = {
  collapseActivities: true, // Minimize interactive activities
  // Activities (to minify if collapseActivities is true)
  // Activities using any of these icons will be minified too: icon_collapse_idevice
  activities: [
    /*"FileAttachIdeviceInc",
		"RubricIdevice",
		"download-packageIdevice",
		"WikipediaIdevice",
		"ExternalUrlIdevice",*/
    "RssIdevice",
  ],
  acces_icons: [ "access","highcontrast","typo","zoomout","zoomin","speak","reset"],
  typo_fonts: [ ["Atkinson Hyperlegible","Atkinson"], ["Arial","Arial"],["Open Dyslexic","OpenDyslexic"],  ["Infantil","Infantil"]],
  access_enable:0,
  dm_enable : 0,
  zoomLvl : 1.15,
  pts : 0,
  menu_enable : 1,
  typo : "Atkinson", // del array de typo_fonts establece la de por defecto
  init: function () {
    var ie_v = $exe.isIE();
    if (ie_v && ie_v < 8) return false;
   /* 		setTimeout(function(){
			$(window).resize(function() {
				myTheme.reset();
			});
		},1000);
   */
   // ********************************************* VER que pasa con dos recursos distintos
   // *********************************** por el tema de que el localstorage tenga cosas y las URL no sean válidad
   
    const page_loaded = window.location.pathname.split("/")[window.location.pathname.split("/").length-1];
    const load_p = localStorage.getItem("load_page");
    
    if (load_p!=null && !load_p.includes(window.location.pathname.slice(0,window.location.pathname.lastIndexOf("/"))) && window.location.pathname.slice(0,window.location.pathname.lastIndexOf("/")).length>0) 
    {
            localStorage.setItem("load_page",window.location.href);
    }
    else
    if (page_loaded == "" || page_loaded==null) {
        if (load_p != "" && load_p != null && !load_p.toLowerCase().includes("index.htm"))    
              document.location.replace(load_p); 
            //console.log("window.location.replace(load_p) "+load_p);
        } else
          if (page_loaded.toLowerCase().includes("index.htm"))//&& !(document.referrer == "" || document.referrer==null))
          {  
              if (document.referrer.toLowerCase().includes(window.location.pathname.slice(0,window.location.pathname.lastIndexOf(page_loaded)).toLowerCase()))
                  localStorage.setItem("load_page",window.location.href);
              else 
                 if(load_p != "" && load_p != null)  // No se si debe ser un OR en lugar de AND*************************
                    document.location.replace(load_p);
                    //window.location.href=load_p;
                    //console.log("window.location.href= "+load_p);
                 else
                    localStorage.setItem("load_page",window.location.href); 
          }
          else
            localStorage.setItem("load_page",window.location.href);


    const menu_en = localStorage.getItem("menu_enable");
    if (menu_en != null) myTheme.menu_enable = parseInt(menu_en) ;
   
    var tit = $exe_i18n.menu + " (" + $exe_i18n.hide.toLowerCase() + ")";
    var navToggler = '<p id="header-options">';
    navToggler +=
      '<a href="#" class="hide-nav" id="toggle-nav" title="' + tit + '">';
    navToggler += "<span>" + $exe_i18n.menu + "</span>";
    navToggler += "</a>";
    navToggler += "</p>";
    var l = $(navToggler);
    var nav = $("#siteNav");
    nav.before(l);
    


    $("#toggle-nav").click(function () {
      myTheme.toggleMenu(this);
      return false;
    });
    $("#print-page").click(function () {
      window.print();
      return false;
    });
    if ($("A", nav).attr("class").indexOf("active") == 0)
      $("BODY").addClass("home-page");
    var url = window.location.href;
    url = url.split("?");
    if (url.length > 1) {
      if (url[1].indexOf("nav=false") != -1) {
        myTheme.hideMenu();
      }
    } 
    else
    {

  
      /********************* recuerda mejorar mas abajo lo que comprueba si tenemos por GET el nav porque ya no haría falta en caso de 
       * ser falso
        */
      //if (!myTheme.menu_enable) myTheme.hideMenu();
      if (!myTheme.menu_enable)
       { 

        //document.getElementById('siteNav').style.display="block";
        //myTheme.toggleMenu(this);
        myTheme.hideMenu();
      //  $("#siteNav").css("display","unset");
      }
    }
    
    // Set the min-height for the content wrapper
    $("#main-wrapper").css("min-height", nav.height() + 25 + "px");
  },
  init2: function () {
    var ie_v = $exe.isIE();
    if (ie_v && ie_v < 8) return false;
    /*		setTimeout(function(){
			$(window).resize(function() {
				myTheme.reset();
			});
		},1000);*/
    var tit = $exe_i18n.menu + " (" + $exe_i18n.hide.toLowerCase() + ")";
    var navToggler = '<p id="header-options">';
    navToggler +=
      '<a href="#" class="hide-nav" id="toggle-nav" title="' + tit + '">';
    navToggler += "<span>" + $exe_i18n.menu + "</span>";
    navToggler += "</a>";
    navToggler += "</p>";
    var l = $(navToggler);
    var nav = $("#siteNav");
    nav.before(l);
    
   
    $("#toggle-nav").click(function () {
      myTheme.toggleMenu(this);
      return false;
    });
    $("#print-page").click(function () {
      window.print();
      return false;
    });
    if ($("A", nav).attr("class").indexOf("active") == 0)
      $("BODY").addClass("home-page");
    var url = window.location.href;
    url = url.split("?");
    if (url.length > 1) {
      if (url[1].indexOf("nav=false") != -1) {
        myTheme.hideMenu();
      }
    }
    // Set the min-height for the content wrapper
    $("#main-wrapper").css("min-height", nav.height() + 25 + "px");
    /******************************************* porque hace esto??????????????? y porque hace entonces los hidemenu anteriores */
    myTheme.hideMenu();
  },
  hideMenu: function () {
    $("#siteNav").hide();
    $(document.body).addClass("no-nav");
    myTheme.params("add");
    var tit = $exe_i18n.menu + " (" + $exe_i18n.show.toLowerCase() + ")";
    $("#toggle-nav").attr("class", "show-nav").attr("title", tit);
  },
  toggleMenu: function (e) {
    if (typeof myTheme.isToggling == "undefined") myTheme.isToggling = false;
    if (myTheme.isToggling) return false;
   
    var l = $("#toggle-nav");

    if (!e && $(window).width() < 900 && l.css("display") != "none")
      return false; // No reset in mobile view
    if (!e) {
      var tit = $exe_i18n.menu + " (" + $exe_i18n.show.toLowerCase() + ")";
      l.attr("class", "show-nav").attr("title", tit); // Reset
    }

    myTheme.isToggling = true;

    if (l.attr("class") == "hide-nav") {
      var tit = $exe_i18n.menu + " (" + $exe_i18n.show.toLowerCase() + ")";
      l.attr("class", "show-nav").attr("title", tit);
      $("#siteFooter").hide();
      $("#siteNav").slideUp(400, function () {
        $(document.body).addClass("no-nav");
        $("#siteFooter").show();
        myTheme.isToggling = false;
      });
      localStorage.setItem("menu_enable",0);
      myTheme.params("add");
    } else {
      var tit = $exe_i18n.menu + " (" + $exe_i18n.hide.toLowerCase() + ")";
      l.attr("class", "hide-nav").attr("title", tit);
      $(document.body).removeClass("no-nav");
      $("#siteNav").slideDown(400, function () {
        myTheme.isToggling = false;
      });
      localStorage.setItem("menu_enable",1);
      myTheme.params("delete");
    }
  },
  param: function (e, act) {
    if (act == "add") {
      var ref = e.href;
      var con = "?";
      if (ref.indexOf(".html?") != -1) con = "&";
      var param = "nav=false";
      if (ref.indexOf(param) == -1) {
        ref += con + param;
        e.href = ref;
      }
    } else {
      // This will remove all params
      var ref = e.href;
      ref = ref.split("?");
      e.href = ref[0];
    }
  },
  params: function (act) {
    $("A", ".pagination").each(function () {
      myTheme.param(this, act);
    });
  },
 /* reset : function() { 
		myTheme.toggleMenu();		
	},*/
  common: {
    init: function (c) {
      var iDevices = $(".iDevice_wrapper");
      var firstIsText = false;
      iDevices.each(function (i) {
        if (
          iDevices.length > 1 &&
          i == 0 &&
          this.className.indexOf("FreeTextIdevice") != -1
        ) {
          $(".iDevice", this).css("margin-top", 0);
          firstIsText = true;
        }
        // Use common CSS class names (so they have a similar presentation)
        if (!$(this).hasClass("UDLcontentIdevice")) {
          var header = $(".iDevice_header", this);
          var icon = header.css("background-image");
          if (typeof icon == "string") {
            if (icon.indexOf("icon_udl_eng") != -1)
              $(this).addClass("em_iDevice_udl_eng_like");
            if (icon.indexOf("icon_udl_exp") != -1)
              $(this).addClass("em_iDevice_udl_exp_like");
            if (icon.indexOf("icon_udl_rep") != -1)
              $(this).addClass("em_iDevice_udl_rep_like");
          }
        }
      });
      if (myTheme.collapseActivities) {
        var as = myTheme.activities;
        var editor = $("#activeIdevice");
        if (typeof _ != "function" || editor.length != 1) {
          if ($(".iDevice").length > 1) {
            for (var z = 0; z < as.length; z++) {
              var a = as[z];
              // Minimize those iDevices (like clicking on .toggle-idevice a)
              var aW = $(".iDevice_wrapper." + a);
              aW.addClass("hidden-idevice");
              //$(".toggle-idevice a",aW).attr("class","show-idevice");
              $(".toggle-idevice a", aW).addClass("show-idevice");
              $(".iDevice_inner", aW).hide();
              if (a == "GeoGebra")
                $("div.auto-geogebra", aW).addClass("disableAutoScale"); // Prevent zoom problems when the iDevice is minified
            }
            // The iDevices with the double asterisc ** are minified too
            $(".iDevice_wrapper").each(function () {
              var header = $(".iDeviceTitle", this);
              if (header.length == 1) {
                var text = header.text();
                if (typeof text == "string" && text.startsWith("**") == 1) {
                  var aW = $(this);
                  aW.addClass("hidden-idevice");
                  //$(".toggle-idevice a",aW).attr("class","show-idevice");
                  $(".toggle-idevice a", aW).addClass("show-idevice");
                  $(".iDevice_inner", aW).hide();
                  header.text(header.text().substr(2));
                }
              }
            });

            $(".iDevice_wrapper").each(function () {
              var header = $(".iDevice_header", this);
              if (header.length == 1) {
                var img = header.attr("style");
                //quito los originales y pongo el nuevo
                if (
                  typeof img == "string" &&
                  img.indexOf("icon_collapse_idevice") != -1
                ) {
                  var aW = $(this);
                  aW.addClass("hidden-idevice");
                  //$(".toggle-idevice a",aW).attr("class","show-idevice");
                  $(".toggle-idevice a", aW).addClass("show-idevice");
                  $(".iDevice_inner", aW).hide();
                }
              }
            });
            // You can toggle the iDevice clicking on any part of its header
            $(".iDevice_header")
              .click(function () {
                $(".toggle-idevice a", this).addClass("rotation");
				        $(".toggle-idevice a", this).trigger("click");

                var i = $(this).closest(".iDevice");
                if (i.length == 1) {
                  // H5P dynamic size
                  $("iframe", i).each(function () {
                    if (
                      this.src &&
                      (this.src.indexOf("https://h5p.org/") == 0 ||
                        this.src.indexOf(
                          "/wp-admin/admin-ajax.php?action=h5p_embed"
                        ) != -1)
                    ) {
                      if (
                        !this.style ||
                        !this.style.height ||
                        this.style.height == ""
                      ) {
                        this.src = this.src;
                      }
                    }
                  });
                }
              })
              .css("cursor", "pointer");

          }
        }
      }
      // "Do it here" will be the default title of the Interactive Activities
      if (document.body.className.indexOf("exe-authoring-page") == 0) {
        if (typeof top._ != "undefined") {
          var d = [
            "DropDown Activity",
            "SCORM Quiz",
            "Scrambled List",
            "Multi-choice",
            "Multi-select",
            "True-False Question",
            "Cloze Activity",
            "Interactive Video",
            "GeoGebra Activity",
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
            "GeoGebraIdevice",
          ];
          var editor = $("#activeIdevice");
          if (editor.length != 1) return;
          var c = editor.attr("class");
          var i = l.indexOf(c);
          if (i == -1) return;
          var t = $("input[type='text']", editor).eq(0);
          if (t.length != 1) return;
          if (t.val() == _(d[i])) t.val(_("Do it here"));
        }
      }
    },
  }, 
  darkmode: function (dm_enable, sheet,element) {
    if (dm_enable == 1) {
      //document.getElementsByClassName("exe-web-site")[0].classList.add("darkmode");
      $("body").addClass("darkmode");
      // intentar hacer todos estos de jquery con DOM y toggle
      /***************************************************************** */
      $("div").each(function () {
        $(this).find("*").addClass("darkmode");
      });
      var icons = myTheme.acces_icons;
      for (var i = 0; i < icons.length; i++)
        document.getElementById(icons[i]).classList.add("darkmode_icons");
      $("#siteNav ul ul").each(function () {
        $(this).find("li").removeClass("darkmode");
        $(this).find("*").addClass("darkmode_gray");
      });
      $(".pagination a").each(function () {
        $(this).addClass("darkmode_icons_nav");
      });

      $(".iDevice_header p.toggle-idevice a").each(function () {
        $(this).addClass("darkmode_icons_idevice");
      });

      $(".iDevice_wrapper p.toggle-idevice a").each(function () {
        $(this).addClass("darkmode_icons_idevice");
      });
      
      $(".exe-udlContent *[class^='exe-udlContent-alt']").each(function () {
        $(this).addClass("darkmode_icons_udl");
      });        

      if($("#main-wrapper").length)
        document.getElementById("main-wrapper").classList.add("darkmode_back");
      document.getElementById("nodeDecoration").classList.add("darkmode_back");

      let stl =
        "#nodeDecoration.darkmode_back {background: white !important;background-image: none !important; background-color:  #000 !important; background: black !important;}";

      stl +=
        " .pagination a.darkmode_icons_nav{ background-image:url(_escolares_nav_iconsDM.png) !important;}";
      stl +=
        " .iDevice_header p.toggle-idevice a.darkmode_icons_idevice {background-image:url(_escolares_iconsDM.png) !important;}";
      //document.getElementById('nodeDecoration').sheet.insertRule(stl,0);
      // const addCSS = css => document.head.appendChild(document.createElement("style")).innerHTML=css;
      //addCSS(stl);
      //var sheet = document.createElement('style');
      sheet.innerHTML = stl;
      document.head.appendChild(sheet); // append in body
    } else {
      if ($("body").hasClass("darkmode")) {
        //document.getElementsByClassName("exe-web-site")[0].classList.toggle("darkmode");
        $("body").removeClass("darkmode");
        $("div").each(function () {
          $(this).find("*").removeClass("darkmode");
        });
        var icons = myTheme.acces_icons;
        for (var i = 0; i < icons.length; i++)
          document.getElementById(icons[i]).classList.toggle("darkmode_icons");

        $("#siteNav ul ul").each(function () {
          $(this).find("li").removeClass("darkmode");
          $(this).find("*").removeClass("darkmode_gray");
        });
        $(".pagination a").each(function () {
          $(this).removeClass("darkmode_icons_nav");
        });


        //.darkmode_icons_udl
// eliminar los darkmode_icons_idevice es tan facil como una query de quitar todos los darkmode_icons_idevice con una query
/*        $(".iDevice_header p.toggle-idevice a").each(function () {
          $(this).removeClass("darkmode_icons_idevice");
        });

        $(".iDevice_header p.toggle-idevice a").each(function () {
          $(this).removeClass("darkmode_icons_idevice");
        });*/
        $(".darkmode_icons_idevice").each(function () {
          $(this).removeClass("darkmode_icons_idevice");
        });


        $(".exe-udlContent *[class^='exe-udlContent-alt']").each(function () {
          $(this).removeClass("darkmode_icons_udl");
        });

        if($("#main-wrapper").length)
          document.getElementById("main-wrapper").classList.remove("darkmode_back");
        document.getElementById("nodeDecoration").classList.remove("darkmode_back");

        sheet.disabled = true;
        sheet.parentNode.removeChild(sheet);
      }
    }
  },
  texttospeech: function (text) {
    //poner a Elena o que la voz
    console.log("text to speech: "+text);
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    } else {
      const message = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(message);
    }
  },
  updtZoom : function (zoom, points,element) {
    if ((myTheme.zoomLvl >= 2.35 && zoom < 0) || (myTheme.zoomLvl <= 0.45 && zoom > 0) ||
        (myTheme.zoomLvl < 2.35 && myTheme.zoomLvl > 0.45) || (myTheme.zoomLvl <= 2.35 && myTheme.zoomLvl >= 0.45 && zoom==0) ) 
        {
          myTheme.zoomLvl =parseFloat((myTheme.zoomLvl+ zoom).toFixed(2));
          myTheme.pts += points;
          $("body *[style*='font-size']").each(function () {
            $(this).css(
              "font-size",
              parseInt($(this).css("font-size"), 10) + points
            );
          });
          if (element == "nodeDecoration")
            $(".iDevice_wrapper").css({ "font-size": myTheme.zoomLvl + "em" });
          else $("body").css({ "font-size": myTheme.zoomLvl + "em" });
    }
  },
  access_init: function (element) {
    /*var myTheme.dm_enable = 0;*/
    if (localStorage.getItem("darkmode") == "1") myTheme.dm_enable = 1;
    else myTheme.dm_enable = 0;

    if (localStorage.getItem("access_enable") == "1")  myTheme.access_enable = 1;
    else myTheme.access_enable = 0;

    const zoom_level = localStorage.getItem("zoomLvl");
    if (zoom_level != null) myTheme.zoomLvl = parseFloat(zoom_level);

    const pts_level = localStorage.getItem("pts");
    if (pts_level != null) myTheme.pts = parseInt(pts_level);

    const typo_ini = localStorage.getItem("typo");
    if (typo_ini != null) myTheme.typo = typo_ini; 
 
    var sheetDM = document.createElement("style");
    $exe.iDeviceToggler.toggle = function (e, t, n) {
	    e.classList.add("rotation");	

      if (myTheme.dm_enable==1) dark=" darkmode_icons_idevice ";
      else dark="";
      var r = $exe_i18n.hide;
      var i = $("#" + t);
      var s = ".iDevice_content";
      if (n == "em1") s = ".iDevice_inner";
      var o = $(s, i);
      var u = i.attr("class");
      if (typeof u == "undefined") return false;
      if (u.indexOf(" hidden-idevice") == -1) {
        r = $exe_i18n.show;
        u += " hidden-idevice";
        o.slideUp("fast", function () {
          e.className = "show-idevice" + dark;
          e.title = r;
          e.innerHTML = "<span>" + r + "</span>";
          i.attr("class", u);
        });
      } else {
        u = u.replace(" hidden-idevice", "");
        o.slideDown("fast", function () {
          e.className = "hide-idevice" + dark;
          e.title = r;
          e.innerHTML = "<span>" + r + "</span>";
        });
        i.attr("class", u);
      }
    };

    var icons = myTheme.acces_icons;
    for (var i = 0; i < icons.length; i++) {
      var icon = icons[i];
      const elem = document.createElement("a");
      //elem.href = "#";
      elem.id = icon;
      elem.innerText = "";
      if (icon !== "access" && icon!="reset" && myTheme.access_enable==0 ) elem.className = "ocultar";
      else 
        if (icon=="reset" && (myTheme.access_enable==0 || (myTheme.access_enable==1 && (myTheme.dm_enable == 0 &&  myTheme.zoomLvl == 1.15 && myTheme.typo=="Atkinson" )))) 
            elem.className = "ocultar";
      document.getElementById(element).appendChild(elem);
    }

    const typobox = document.createElement("div");
    typobox.id = "typobox";
    //typobox.innerText
    typobox.classList.add("typobox");
    typobox.classList.add("ocultar");
    document.getElementById(element).appendChild(typobox);  /*"header-options" */
    
    var typos = myTheme.typo_fonts;
    for (var i = 0; i < typos.length; i++) {
      var tfont = typos[i][0];
      const elem = document.createElement("a");
      //elem.href = "#";
      elem.id = typos[i][1];
      elem.innerText = typos[i][0];
      elem.style="cursor: pointer";
     // elem.style="courser:pointer";
      /*if (icon !== "access" && icon!="reset" && myTheme.access_enable==0 ) elem.className = "ocultar";
      else 
        if (icon=="reset" && (myTheme.access_enable==0 || (myTheme.access_enable==1 && (myTheme.dm_enable == 0 &&  myTheme.zoomLvl == 1.15)))) 
            elem.className = "ocultar";*/
      document.getElementById("typobox").appendChild(elem);  
      $("#"+typos[i][1]).click(function() { 
        console.log("clic: "+this.id+" actual "+myTheme.typo);
        $("body").removeClass(myTheme.typo);
        $("body").addClass(this.id); 
    
        $("body *[style*='font-family']").each(function () {
          $(this).css({"font-family":this.id});
        });
        /*$("*[font-family]").each(function () { //.styled-qc div[style*="top: 252px; left: 54px"]'
          $(this).css("font-family",this.id);
          console.log("entro en font family");
          /*input,select,textarea,.feedback{font-family:"Atkinson",​Arial,Helvetica,sans-serif;font-size:1em}
            .pre-code,.highlighted-code{font-family:"Atkinson",​Arial,Helvetica,sans-serif;font-size:.9em;border-radius:0}
            .styled-qc
            *[style] {font-family: 'Atkinson' !important;}
            document.getElementById("mytextarea").style.fontFamily = _name;
            $("*").css('font-family', '"Maven Pro" !important');
            $("body").attr('style', 'font-family:"'+fontPreference+'" !important');
            var fontvar = 'ArvoBold';
            $('.mySelector').css({'font-family':fontvar});​ 
                    });*/
        myTheme.typo=this.id; 
        localStorage.setItem("typo",myTheme.typo);
        if (( myTheme.dm_enable == 1  || myTheme.zoomLvl != 1.15 || myTheme.typo!="Atkinson" ))  document.getElementById("reset").classList.remove("ocultar");
        else document.getElementById("reset").classList.add("ocultar");

        document.getElementById("typobox").classList.add("ocultar");
      }); 
    }
    //console.log(myTheme.typo_fonts[myTheme.typo][1]);
    $("body").addClass(myTheme.typo); 
    //$("#"+ myTheme.typo_fonts[myTheme.typo][1]).trigger(click);  


    $("#access").click(function () {
      var icons = myTheme.acces_icons;

      if (myTheme.access_enable==0) {
        myTheme.access_enable=1; 
        if($("#nodeDecoration.logocrea").length) $("#nodeDecoration.logocrea").css('background-image', 'unset');
      } else { 
        myTheme.access_enable=0;
        if($("#nodeDecoration.logocrea").length) $("#nodeDecoration.logocrea").css('background-image','url(crea.png)');
      }
      localStorage.setItem("access_enable",myTheme.access_enable);

      

      for (var i = 1; i < icons.length; i++) {
        $("#" + icons[i]).slideToggle("fast");
        //('#'+icons[i]).toggle("slide", { direction: "left" }, 1000);
        setTimeout(function(icons1){
          if (icons1!== "reset")
              if (myTheme.access_enable==1) 
                document.getElementById(icons1).classList.remove("ocultar");
              else
                document.getElementById(icons1).classList.add("ocultar");
          else 
              if (( myTheme.dm_enable != 0 || myTheme.zoomLvl != 1.15) && (myTheme.access_enable==1)) 
                    document.getElementById(icons1).classList.remove("ocultar");
        }
       ,100,icons[i]);
      }    
        
    });

    $("#reset").click(function () {
      myTheme.dm_enable = 0;
      myTheme.zoomLvl = 1.15;
      myTheme.pts=0;
      $("body").removeClass(myTheme.typo);
      myTheme.typo="Atkinson";
      if (window.speechSynthesis.speaking) 
        window.speechSynthesis.cancel(); 

      document.getElementById("typobox").classList.add("ocultar");

      myTheme.darkmode(myTheme.dm_enable, sheetDM);
      myTheme.updtZoom(0,0,element);
      document.getElementById("reset").classList.add("ocultar")
      localStorage.setItem("darkmode", myTheme.dm_enable);
      localStorage.setItem("zoomLvl", myTheme.zoomLvl.toString());
      localStorage.setItem("pts", myTheme.pts.toString());
      localStorage.setItem("typo", myTheme.typo.toString());
      /****************************************** quitar lo siguiente **********************/
      //localStorage.setItem("menu_enable",1);
      localStorage.setItem("load_page","");
      $("#access").trigger("click");
    });

    myTheme.darkmode(myTheme.dm_enable, sheetDM);  /* esto debería de ir a init seguramente */
    $("#highcontrast").click(function () {

      if (myTheme.dm_enable ==0 ) myTheme.dm_enable=1; else myTheme.dm_enable=0;
      myTheme.darkmode(myTheme.dm_enable, sheetDM);
      localStorage.setItem("darkmode", myTheme.dm_enable);
      if (( myTheme.dm_enable == 1  || myTheme.zoomLvl != 1.15 || myTheme.typo!="Atkinson" ))  document.getElementById("reset").classList.remove("ocultar");
      else document.getElementById("reset").classList.add("ocultar");
    });

    $("#speak").click(function () {
      getSelectionHTML = function () {
        var userSelection;
        if (window.getSelection) {
          // W3C Ranges
          userSelection = window.getSelection ();
          // Get the range:
          if (userSelection.getRangeAt)
          var range = userSelection.getRangeAt (0);
          else {
          var range = document.createRange ();
          range.setStart (userSelection.anchorNode, userSelection.anchorOffset);
          range.setEnd (userSelection.focusNode, userSelection.focusOffset);
          }
          // And the HTML:
          var clonedSelection = range.cloneContents ();
          var div = document.createElement ('div');
          div.appendChild (clonedSelection);
          return div.innerText; //.innerHTML;
        }/* else if (document.selection) {
          // Explorer selection, return the HTML
          userSelection = document.selection.createRange ();
          return userSelection.htmlText;
        } else {
          return '';
        }*/
        };
        var text=getSelectionHTML();
        if (text.length>0) myTheme.texttospeech(text);
        else myTheme.texttospeech(document.documentElement.textContent);
    });

    /* tipografias Arial, verdana, atkinson, hyperelegible e infantil */
    /*
		const letraszoom = document.createElement('a');
		letraszoom.href  = '#';
		letraszoom.id = 'letraszoom';
		letraszoom.innerText=""; 
		document.getElementById(element).appendChild(letraszoom);	
		
		const span1 = document.createElement('span');
		span1.innerText="Zoom+";
		span1.id = 'zoominspan';
		document.getElementById('zoomin').appendChild(span1);	

		const span2 = document.createElement('span');
		span2.innerText='Zoom-';
		span2.id = 'zoomoutspan';
		document.getElementById('zoomout').appendChild(span2);	

		$('#letraszoom').click(function() {
			myTheme.zoomLvl=1.15
			updtZoom(0,-pts);
			pts=0;
		});
*/  
    $("#typo").click(function () {
      document.getElementById("typobox").classList.toggle("ocultar");
    });

    $("#zoomin").click(function () {
      myTheme.updtZoom(0.1, 2,element);
      localStorage.setItem("zoomLvl", myTheme.zoomLvl.toString());
      localStorage.setItem("pts", myTheme.pts.toString());
      if (( myTheme.dm_enable == 1  || myTheme.zoomLvl != 1.15 || myTheme.typo!="Atkinson"))  document.getElementById("reset").classList.remove("ocultar");
      else     document.getElementById("reset").classList.add("ocultar");
    });

    $("#zoomout").click(function () {
      myTheme.updtZoom(-0.1, -2,element);
      localStorage.setItem("zoomLvl", myTheme.zoomLvl.toString());
      localStorage.setItem("pts", myTheme.pts.toString());
      if (( myTheme.dm_enable == 1  || myTheme.zoomLvl != 1.15 || myTheme.typo!="Atkinson")) document.getElementById("reset").classList.remove("ocultar");
      else document.getElementById("reset").classList.add("ocultar");
    });

    myTheme.updtZoom(0,0,element);
  },
  delete_first_word_pagecounter: function () {
    document.getElementsByClassName("page-counter")[0].innerHTML = document
      .getElementsByClassName("page-counter")[0]
      .innerHTML.replace("Página", "");
    document.getElementsByClassName("page-counter")[1].innerHTML = document
      .getElementsByClassName("page-counter")[1]
      .innerHTML.replace("Página", "");
  },
  insert_logos: function () {
    const logojunta = document.createElement("img");
    logojunta.src = "logo-extremadura.png";
    logojunta.id = "logojunta";
    logojunta.style.height = "58px";

    const logoUE = document.createElement("img");
    logoUE.src = "logo_pie_eu_gris.png";
    logoUE.id = "logoUE";
    logoUE.style.height = "58px";

    if ($("body").hasClass("exe-web-site")) {
      const logocrea = document.createElement("img");
      logocrea.src = "crea.png";
      logocrea.id = "logoexelarium";
      document.getElementById("siteNav").prepend(logocrea);
      $("#bottomPagination nav").prepend(logojunta);
      $("#bottomPagination nav").prepend(logoUE);
      $("#logoUE").addClass("logosoficiales");
      $("#logojunta").addClass("logosoficiales");
    } else {
      $("#nodeDecoration").addClass("logocrea");
      if (!$("body").hasClass("exe-authoring-page")) {
        $("#packageLicense").after(logoUE);
        $("#packageLicense").after(logojunta);
      }
    }
  },
  addPageCounter: function () {
    var html = "<span><strong>$a de $b</strong></span>";
    var as = $("#siteNav a");
    html = html.replace("$b", as.length);
    $("#siteNav a").each(function (i) {
      if ($(this).hasClass("active")) html = html.replace("$a", i + 1);
    });
    $("#bottomPagination nav").prepend(html);
    $("#topPagination nav").prepend(html);
    $("#topPagination nav span").addClass("page-counter");
    $("#bottomPagination nav span").addClass("page-counter");
  },
};

$(function () {
  if ($("body").hasClass("exe-web-site")) {
  /*  if ($(window).width() < 829 && $(window).height() < 1800) {
      myTheme.init2();
    } else {
      myTheme.init();
    }*/
    myTheme.init(); // He tenido que quitar el if de antes porque el iframe sera 0 primero, pero cuando actualice el init2 ya funcionaría
    if ($("#topPagination nav span.page-counter").length <= 0)
      myTheme.addPageCounter();
    else myTheme.delete_first_word_pagecounter();
    myTheme.access_init("header-options");
    document.addEventListener("click", function(e){
      var clic = e.target;
      var div=document.getElementById('typobox'); 
      if(!div.classList.contains("ocultar") && clic.id != "typobox" && clic.id !="typo") 
       div.classList.add("ocultar");
    
    });
    myTheme.insert_logos();
//    document.body.style.display="initial";
  } else {
    if (!$("body").hasClass("exe-authoring-page"))
      myTheme.access_init("nodeDecoration");
      myTheme.insert_logos();
      
    }
  myTheme.common.init();
  
  //$("body").css("display","true");
  /*body.exe-scorm ...*/

  /* llevar el #show_exe_leftpanel con z-index 200 */
  if (myTheme.access_enable==1) 
  if($("#nodeDecoration.logocrea").length) $("#nodeDecoration.logocrea").css('background-image', 'unset');
  
  document.body.style.visibility="visible";
 

});

/*!
 * ScrewDefaultButtons v2.0.6
 * http://screwdefaultbuttons.com/
 *
 * Licensed under the MIT license.
 * Copyright 2013 Matt Solano http://mattsolano.com
 *
 * Date: Mon February 25 2013
 */ (function (e, t, n, r) {
  var i = {
    init: function (t) {
      var n = e.extend({ image: null, width: 50, height: 50, disabled: !1 }, t);
      return this.each(function () {
        var t = e(this),
          r = n.image,
          i = t.data("sdb-image");
        i && (r = i);
        r || e.error("There is no image assigned for ScrewDefaultButtons");
        t.wrap("<div >").css({ display: "none" });
        var s = t.attr("class"),
          o = t.attr("onclick"),
          u = t.parent("div");
        u.addClass(s);
        u.attr("onclick", o);
        u.css({
          "background-image": r,
          width: n.width,
          height: n.height,
          cursor: "pointer",
        });
        var a = 0,
          f = -n.height;
        if (t.is(":disabled")) {
          a = -(n.height * 2);
          f = -(n.height * 3);
        }
        t.on("disableBtn", function () {
          t.attr("disabled", "disabled");
          a = -(n.height * 2);
          f = -(n.height * 3);
          t.trigger("resetBackground");
        });
        t.on("enableBtn", function () {
          t.removeAttr("disabled");
          a = 0;
          f = -n.height;
          t.trigger("resetBackground");
        });
        t.on("resetBackground", function () {
          t.is(":checked")
            ? u.css({ backgroundPosition: "0 " + f + "px" })
            : u.css({ backgroundPosition: "0 " + a + "px" });
        });
        t.trigger("resetBackground");
        if (t.is(":checkbox")) {
          u.on("click", function () {
            t.is(":disabled") || t.change();
          });
          u.addClass("styledCheckbox");
          t.on("change", function () {
            if (t.prop("checked")) {
              t.prop("checked", !1);
              u.css({ backgroundPosition: "0 " + a + "px" });
            } else {
              t.prop("checked", !0);
              u.css({ backgroundPosition: "0 " + f + "px" });
            }
          });
        } else if (t.is(":radio")) {
          u.addClass("styledRadio");
          var l = t.attr("name");
          u.on("click", function () {
            !t.prop("checked") && !t.is(":disabled") && t.change();
          });
          t.on("change", function () {
            if (t.prop("checked")) {
              t.prop("checked", !1);
              u.css({ backgroundPosition: "0 " + a + "px" });
            } else {
              t.prop("checked", !0);
              u.css({ backgroundPosition: "0 " + f + "px" });
              var n = e('input[name="' + l + '"]').not(t);
              n.trigger("radioSwitch");
            }
          });
          t.on("radioSwitch", function () {
            u.css({ backgroundPosition: "0 " + a + "px" });
          });
          var c = e(this).attr("id"),
            h = e('label[for="' + c + '"]');
          h.on("click", function () {
            u.trigger("click");
          });
        }
        if (!e.support.leadingWhitespace) {
          var c = e(this).attr("id"),
            h = e('label[for="' + c + '"]');
          h.on("click", function () {
            u.trigger("click");
          });
        }
      });
    },
    check: function () {
      return this.each(function () {
        var t = e(this);
        i.isChecked(t) || t.change();
      });
    },
    uncheck: function () {
      return this.each(function () {
        var t = e(this);
        i.isChecked(t) && t.change();
      });
    },
    toggle: function () {
      return this.each(function () {
        var t = e(this);
        t.change();
      });
    },
    disable: function () {
      return this.each(function () {
        var t = e(this);
        t.trigger("disableBtn");
      });
    },
    enable: function () {
      return this.each(function () {
        var t = e(this);
        t.trigger("enableBtn");
      });
    },
    isChecked: function (e) {
      return e.prop("checked") ? !0 : !1;
    },
  };
  e.fn.screwDefaultButtons = function (t, n) {
    if (i[t]) return i[t].apply(this, Array.prototype.slice.call(arguments, 1));
    if (typeof t == "object" || !t) return i.init.apply(this, arguments);
    e.error("Method " + t + " does not exist on jQuery.screwDefaultButtons");
  };
  return this;
})(jQuery);

/* SCORM: When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  if (
    $("body").hasClass("exe-scorm") ||
    $("body").hasClass("exe-authoring-page")
  ) {
    var sm = window.matchMedia("(min-width: 50px) and  (max-width: 768px)");
    /*		if ($("div.mce-tinymce.mce-fullscreen").length>0)  {$("#nodeDecoration").hide(); console.log("entra en hide") }
		else $("#nodeDecoration").show(); */

    if (!sm.matches) {
      document.getElementById("nodeDecoration").style.position = "fixed";
      var currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        document.getElementById("nodeDecoration").style.top = "0";
      } else {
        document.getElementById("nodeDecoration").style.top = "-70px";
      }
      prevScrollpos = currentScrollPos;
    } else {
      document.getElementById("nodeDecoration").style.position = "absolute";
      document.getElementById("nodeDecoration").style.top = "0px";
    }
  }
};

window.onclick = function () {
  if ($("div.mce-tinymce.mce-fullscreen").length > 0) {
    $("#nodeDecoration").hide();
  } else $("#nodeDecoration").show();
};
