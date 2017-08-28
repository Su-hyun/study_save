'use strict';
var flag = true,timer = null,
    fnSet = {   
       defaultContainer : function(){  
          var w = $(window).height(),
              h = $("#header").outerHeight(true),
              f = $("#footer").outerHeight(true),
              t = $("#mainContainer"),
              hei = w - h - f;  t.css("min-height", hei);
       },   
       openSite : function(t){ // 관련 사이트
          var u = t.siteUrl.value;
          if(u === "none" ) return false;
          else{
            t.action = u;
            return true;
          }
       }, // openSIte end
       toggleOn : function(s){ // type check
          var t = (typeof s === "object") ? s : document.querySelector(s);
          t.classList.toggle("on");
       }, // toggleOn end
       blindEffect : function(){
          var $body = $("body"),$blind = '<div class="blind"></div>';
          if(flag === true){
            flag = false;
            $body.append($blind).find('.blind').fadeTo(500, 0.5);
          }else{   
            flag = true;
            $body.find('.blind').fadeTo(500, 0, function () {
              $(this).remove();   });    
          }   
       }, // blindEffect end
       lnbMenu : function(s, t){ // lnb menu button
          this.toggleOn(s);
          this.toggleOn(t);
          this.blindEffect();
          if(!$('#lnb').hasClass('on')){
            $('#lnb').find('.on').removeClass('on');
            $('#lnb li').find("div").slideUp();
          }
       },
       lnbResize : function(){ // right 에서 이동할 경우 이 함수 사용 안함, css 로 처리
          var navHei = $('#navigation').outerHeight(true);
          $('#navigation').css({top :  -navHei, transition : "all 0.5s ease"});
       }, // layoutSize end
       classOn : function(s){
          (s.hasClass("on")) ? s.removeClass("on") : s.addClass("on").siblings().removeClass('on');
       }, // classOn end
       lnbClick : function(t){
          t.on('click', 'a', function(e){
            var $this = $(this),thisLeng = $this.siblings().length;
            switch(thisLeng){
              case 0 : 
                  break;
              default :
                  var $thisParent = $this.parent();
                  fnSet.classOn($thisParent);
                  if($thisParent.hasClass("on")){
                    e.preventDefault();
                    $this.next().slideDown();
                    $thisParent.siblings().find("div").slideUp();
                    $thisParent.siblings().find(".on").removeClass("on");
               }
            }
           }); // click end
       }, // lnb a event
       lnbClick : function(t, c){
          if(c === true){
            t.off().on('click', 'a', function(e){
              var $this = $(this),thisLeng = $this.siblings().length;
              switch(thisLeng){
                case 0 :
                    break;
                default :
                    var $thisParent = $this.parent();
                    fnSet.classOn($thisParent);
                    if($thisParent.hasClass("on")){
                      e.preventDefault();
                      $this.next().slideDown();
                      $thisParent.siblings().find("div").slideUp();
                      $thisParent.siblings().find(".on").removeClass("on");
                }
              }
            }); // click end
          }else{
            t.off("click", "a");
          }
       }, // lnb a event end
       lnbHover : function(s, c){
          var box = s.children('.div_2'),el = box.find(".li_2"),i = el.length, num = null, n = 2;
          if(c === true){
            $("#navigation").addClass("afterBg");
            fnSet.classOn(s);
            box.show();
            while(i--){
              num = el.eq(i).width();
              box.css('width', n += num);
            }
          }else{
            box.hide();
            $("#navigation").removeClass("afterBg");
            s.removeClass("on");
          }
       }, // lndHover end : web-size
       resizeDone : function(){
          var w = window.innerWidth;
          if(w < 861){
            fnSet.lnbResize();
            $("#lnb div").removeAttr("style");
            $("#lnb .li_1").off("mouseenter mouseleave");
            fnSet.lnbClick($("#lnb"), true);
          }
       } // resizeDone end 
    } // fnSet end
    
$(window).on("resize", function(){
  var w = window.innerWidth;
  fnSet.defaultContainer();
  clearTimeout(timer);
  timer = setTimeout( fnSet.resizeDone, 300 );
  if(w > 861){
    flag = true;
    $(".btn-lnb").removeClass("on");
    $("#navigation").removeClass("on").removeAttr("style");
    $("#lnb div").removeAttr("style");
    $(".blind").remove();
    fnSet.lnbClick($("#lnb"), false);
    $("#lnb .li_1").on({ 
      mouseenter : function(){
        fnSet.lnbHover($(this), true);
      },
      mouseleave : function(){
        fnSet.lnbHover($(this), false);
      }
    });
}}); // window fn end

$(document).ready(function(){
  $(window).trigger("resize");
    var $notLink = $("body [href='#']"),
        $lnb = $("#lnb"),
        leng = $lnb.find(".li_1").length;
    $lnb.find('.li_1').eq(leng - 3).addClass("lnbLast");
    $lnb.find('.li_1').eq(leng - 4).addClass("lnbLast");
    $notLink.click(function(e){
      if("[href='#']") console.log("###");
    }); // href #
}); // document end
