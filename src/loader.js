/*
 * MagicBootTabs & colorConsole Loader
 * Quickly Load Scripts Required
 *
 * Author: Unreal Designs <contact@unreal-designs.co.uk>
 * Copyright: Unreal Designs 2015
 */

//Declare Version
var LoaderVersion = "1.07";

function loader(scripts, loadedCallback) {
	var scriptURLS = {
		"colorConsole": Array("script", "//rawgit.com/MattCowley/MagicBootTabs/master/src/colorConsole.js"),
		"MagicBootTabs": Array("script", "//rawgit.com/MattCowley/MagicBootTabs/master/src/jquery.magicBootTabs.js"),
		"jQuery": Array("script", "//ajax.googleapis.com/ajax/libs/jquery/2.0.2/jquery.min.js"),
		"bootStrapJS": Array("script", "//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"),
		"bootStrapCSS": Array("style", "//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css")
	}

	var scriptCount = scripts.length;

	function load(url, type, callback) {
	    var head = document.getElementsByTagName('head')[0];
	    var item;

	    if (type == "script") {
		    item = document.createElement('script');
		    item.type = 'text/javascript';
		    item.src = url;
		}
		if (type == "style") {
		    item = document.createElement('link');
		    item.rel = 'stylesheet';
		    item.href = url;
		}
	    
	    item.onreadystatechange = callback;
	    item.onload = callback;
	    head.appendChild(item);
	}
	function loadNext(index) {
		if (index < scriptCount) {
			loadScript(
				scriptURLS[scripts[index][1]],
				scriptURLS[scripts[index][0]],
				function(){ loadNext(index+1); }
			);
		} else {
			loadedCallback();
		}
	}
	loadNext(0);

}