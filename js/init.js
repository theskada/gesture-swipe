$(document).ready(function () {
	var $block = $('.block__in'),
		$arrowLeft = $('.block__arrow_left'),
		$arrowRight = $('.block__arrow_right'),
		
		classArrowHide = 'block__arrow_hide',

		imgs = $block.find('img'),
		imgWidth = imgs.eq(0).width(),
		imgsLength = imgs.length,
		positionNow = 0;
	
	checkArrow ();

	// When you swipe
	$block.gestureSwipe('swiperight', function() { 
		if (!$arrowLeft.hasClass(classArrowHide)) previous();
	});
	$block.gestureSwipe('swipeleft', function() {
		if (!$arrowRight.hasClass(classArrowHide)) next();
	});
	
	// When you click
	$arrowLeft.on('click', previous);
	$arrowRight.on('click', next);
	 
	function previous () {
		positionNow = positionNow + imgWidth;
		$block.animate({ 'left': positionNow });
		checkArrow ();
	}
	function next () {
		positionNow = positionNow - imgWidth;
		$block.animate({ 'left': positionNow });
		checkArrow ();
	}
	function checkArrow () { 
		if (positionNow == 0) $arrowLeft.addClass(classArrowHide);
		if (positionNow == - imgWidth) $arrowLeft.removeClass(classArrowHide);
		if (positionNow == imgWidth - imgWidth * imgsLength) $arrowRight.addClass(classArrowHide);
		if (positionNow == 2 * imgWidth - imgWidth * imgsLength) $arrowRight.removeClass(classArrowHide);
	}
});