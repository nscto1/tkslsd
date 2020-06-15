/**
 * jQuery Plugin to obtain touch gestures from iPhone, iPod Touch and iPad, should also work with Android mobile phones (not tested yet!)
 * Common usage: wipe images (left and right to show the previous or next image)
 * 
 * @author Andreas Waltl, netCU Internetagentur (http://www.netcu.de)
 * @version 1.1.1 (9th December 2010) - fix bug (older IE's had problems)
 * @version 1.1 (1st September 2010) - support wipe up and wipe down
 * @version 1.0 (15th July 2010)
 
 
 * ALREADY MODIFIED BY Iqbal (aiqbal.tech@gmail.com)
   "I add toucah at (startX_at && startY_until) to check wheter the touch is at the range position or not before function is running"
   "and I make preventDefaultEvents set to always FALSE"
   
 */
(function($) { 
   $.fn.touchwipe = function(settings) {
     var config = {
    		min_move_x: 30,
    		min_move_y: 30,
 			wipeLeft: function(){},
 			wipeRight: function(){},
 			wipeUp: function(){},
 			wipeDown: function(){},
            startX_at: false,
            startX_until: false,
            startY_at: false,
            startY_until: false,
			preventDefaultEvents: false,
            max_time_wipe: 700
	 };
     
     if (settings) $.extend(config, settings);
 
     this.each(function() {
    	 var startX, startY, isMoving = false, clicked_at, endX, endY;

    	 function cancelTouch() {
    		 this.removeEventListener('touchmove', onTouchMove);
    		 this.removeEventListener('touchend', onTouchMove);
    		 startX = null;
    		 isMoving = false;
    	 }	
    	 
    	 function onTouchMove(e){
    		 if(config.preventDefaultEvents) e.preventDefault();
    		 if(isMoving){
                 var temp = e.touches[0];
                 endX = temp.pageX;
                 endY = temp.pageY;
    		 }
    	 }
    	 function onTouchEnd(){
             var x = endX, y = endY, dx = startX - x, dy = startY - y, max_time_wipe = config.max_time_wipe,
                 startX_at = config.startX_at, startX_until = config.startX_until, sendStartX = startX, sendStartY = startY;
             if(Math.abs(dx) >= config.min_move_x) {
                cancelTouch();
                if((startX_at !== false && startX_until !== false) && (!(sendStartX >= startX_at && sendStartX <= startX_until))) return;
                if(max_time_wipe){var now = Date.now();if(now - clicked_at > max_time_wipe)return;}
                if(dx > 0) config.wipeLeft(sendStartX, sendStartY); else config.wipeRight(sendStartX, sendStartY);
             }
             else if(Math.abs(dy) >= config.min_move_y){
                cancelTouch();
                if(dy > 0) config.wipeDown(sendStartX, sendStartY); else config.wipeUp(sendStartX, sendStartY);
             }
         }
    	 function onTouchStart(e){
    		 if (e.touches.length == 1) {
    			 startX = e.touches[0].pageX;
    			 startY = e.touches[0].pageY;
                 clicked_at = Date.now();
    			 isMoving = true;
    			 this.addEventListener('touchmove', onTouchMove, false);
    			 this.addEventListener('touchend', onTouchEnd, false);
    		 }
    	 }    	 
    	 if ('ontouchstart' in document.documentElement)
    		 this.addEventListener('touchstart', onTouchStart, false);
     });
 
     return this;
   };
})(jQuery);