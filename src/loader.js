/*
 * MagicBootTabs & colorConsole Loader
 * Quickly Load Scripts Required
 *
 * Author: Unreal Designs <contact@unreal-designs.co.uk>
 * Copyright: Unreal Designs 2015
 */

//Declare Version
var LoaderVersion = "1.06";

function loader(scripts, loadedCallback) {
	var scriptURLS = {
		"colorConsole": "//rawgit.com/MattCowley/MagicBootTabs/master/src/colorConsole.js",
		"MagicBootTabs": "//rawgit.com/MattCowley/MagicBootTabs/master/src/jquery.magicBootTabs.js",
		"jQuery": "//ajax.googleapis.com/ajax/libs/jquery/2.0.2/jquery.min.js",
		"bootStrap": "//netdna.bootstrapcdn.com/bootstrap/3.0.3/js/bootstrap.min.js"
	}

	var scriptCount = scripts.length;

	function loadScript(url, callback) {
	    // Adding the script tag to the head as suggested before
	    var head = document.getElementsByTagName('head')[0];
	    var script = document.createElement('script');
	    script.type = 'text/javascript';
	    script.src = url;

	    // Then bind the event to the callback function.
	    // There are several events for cross browser compatibility.
	    script.onreadystatechange = callback;
	    script.onload = callback;

	    // Fire the loading
	    head.appendChild(script);
	}
	function loadNext(index) {
		if (index < scriptCount) {
			loadScript(
				scriptURLS[scripts[index]],
				function(){ loadNext(index+1); }
			);
		} else {
			loadedCallback();
		}
	}
	loadNext(0);

}