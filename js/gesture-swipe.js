/* Plugin for jQuery 'gestureSwipe' 
 *
 * Example:
 * $('#swipe').gestureSwipe('event', eventHandler);
 * where:
 * event - 'swipeleft' or 'swiperight'
 * eventHandler - your function
 *
 * Support: ipad, iphone, android, windows, IE on PC touch devises (MSGesture)
 * Need: <meta http-equiv="X-UA-Compatible" content="IE=edge" /> and #swipe { -ms-touch-action: none; }
 *
 * @author Skakun Daria, 2014
 */

(function($) {
    $.fn.gestureSwipe = function(swipeEvent, callback) {

        var touchElem = this[0],
            IE = window.navigator.msPointerEnabled;

        if (IE && window.MSGesture) {
            //events for IE
            var eventStart = "MSGestureStart",
                eventMove = "MSGestureChange",
                touchBrowser = (window.navigator.userAgent.toLowerCase().indexOf ("touch") >= 0) ? true : false;

            var msGesture = new MSGesture();
            msGesture.target = touchElem;

            touchElem.addEventListener('MSPointerDown', function(event) {
                msGesture.addPointer(event.pointerId);
            });
        } else {
            //events for other browsers
            var eventStart = "touchstart",
                eventMove = "touchmove",
                touchBrowser = ('ontouchstart' in document.documentElement) ? true : false;
        }

        if(touchBrowser) {
            touchElem.addEventListener(eventStart, function (e) {
                swipe.init(e, eventMove);
            }, false);
        }

        var swipe = {
            init: function (e, eventMove) {
                swipe.cancelTouch();

                if(!IE) {
                    if(e.pageX || e.targetTouches[0].pageX) {
                        swipe.variable.startX = e.pageX || e.targetTouches[0].pageX;
                    }
                }

                touchElem.addEventListener(eventMove, swipe.onTouchMove, false);
            },
            variable: {
                recognized: false,
                translationX: 0,
                startX: 0
            },
            onTouchMove: function (e) {
                var variable = swipe.variable;

                e.preventDefault();

                if(!variable.recognized) {
                    if(IE) {
                        if (e.detail == e.MSGESTURE_FLAG_INERTIA) return;
                        variable.translationX += e.translationX;
                        if (Math.abs(variable.translationX) > 50) {
                            switchDirection()
                        }
                    } else {
                        var newX = e.pageX || e.targetTouches[0].pageX;
                        variable.translationX = newX - variable.startX;
                        if (Math.abs(variable.translationX) > 5) {
                            switchDirection()
                        }
                        swipe.cancelTouch();
                    }

                    function switchDirection() {
                        variable.recognized = true;
                        swipe.switchDirection();
                    }
                }
            },
            switchDirection: function () {
                var variable = swipe.variable;

                if (swipeEvent == 'swiperight' && variable.translationX > 0 || swipeEvent == 'swipeleft' && variable.translationX < 0) {
                    callback();
                }
            },
            cancelTouch: function () {
                var variable = swipe.variable;

                touchElem.removeEventListener(eventMove, swipe.onTouchMove);
                variable.translationX = variable.startX = 0;
                variable.recognized = false;
            }

        }

        return this;

    };
})(jQuery);