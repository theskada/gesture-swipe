# Plugin for jQuery 'gestureSwipe'
Swipe gestures with MSGestures in Internet Explorer 10+ and other browsers

## Example:

```html
$('#swipe').gestureSwipe('swipeleft|swiperight', function(){
    console.log('swipe!');
});
```

## Need:
```html
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
```
```html
#swipe { -ms-touch-action: none; }
```

## Support:
ipad, iphone, android, windows, IE on PC touch devises (MSGesture)

## License
Copyright (c) 2014 Skakun Daria
Licensed under the MIT, GPL licenses.
