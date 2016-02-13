/*
 * MagicBootTabs & colorConsole Loader
 * Quickly Load Scripts Required
 *
 * Author: Unreal Designs <contact@unreal-designs.co.uk>
 * Copyright: Unreal Designs 2015
 */

//Declare Version
var MBTCCLoaderVersion = "1.01";

function loader(scripts, loadedCallback) {
	var scriptURLS = {
		"colorConsole": "//rawgit.com/MattCowley/MagicBootTabs/master/src/colorConsole.js",
		"MagicBootTabs": "//rawgit.com/MattCowley/MagicBootTabs/master/src/jquery.MagicBootTabs.js"
	}

	var scriptCount = scripts.length;
	var loadedCount = 0;

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
	function countAdd(script) {
		loadedCount += 1
		if (scriptCount == loadedCount) {
			loadedCallback;
		}
	}

	for (index = 0; index < scripts.length; ++index) {
    	loadScript(scriptURLS[scripts[index]], function(){ countAdd(scripts[index]); });
	}

}