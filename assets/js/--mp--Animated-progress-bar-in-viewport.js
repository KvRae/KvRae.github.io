//this code was found on https://www.jqueryscript.net/loading/Custom-Viewport-Based-jQuery-Progress-Bar-Plugin-Progressbar-js.html	
 

// Display the progress bar calling progressbar.js
$('.progressbar1').progressBar({
		shadow : true,
		percentage : true,
		animation : true,
        height: 5,
		//animateTarget : true,
		barColor : "#FF4242",
	});
//If you wish to have different colors for every progress bar copy and past a new line
//of code like below and change the class. This will override the default settings.

	$('.progressbar2').progressBar({
		shadow : true,
		percentage : false,
		animation : true,
		barColor : "#527AF9",
	});