/*
 * Item Loader
 * Quickly Load Scripts & Styles Required
 *
 * Author: Unreal Designs <contact@unreal-designs.co.uk>
 * Copyright: Unreal Designs 2015
 */

//Declare Version
var LoaderVersion = "1.22";

var urlscript = document.currentScript || (function() {
    var scripts = document.getElementsByTagName("script");
    return scripts[scripts.length - 1];
})();

function loader(items, loadedCallback) {

	var elmscript = document.currentScript || (function() {
	    var scripts = document.getElementsByTagName("script");
	    return scripts[scripts.length - 1];
	})();

	var itemURLS = {
		"colorConsole": Array("script", "//rawgit.com/MattCowley/MagicBootTabs/master/src/colorConsole.js"),
		"MagicBootTabs": Array("script", "//rawgit.com/MattCowley/MagicBootTabs/master/src/jquery.magicBootTabs.js"),
		"jQuery": Array("script", "//ajax.googleapis.com/ajax/libs/jquery/2.0.2/jquery.min.js"),
		"bootStrapJS": Array("script", "//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"),
		"bootStrapCSS": Array("style", "//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"),
		"bootSwatchSuperhero": Array("style", "//bootswatch.com/superhero/bootstrap.css"),
		"bootSwatchDarkly": Array("style", "//bootswatch.com/darkly/bootstrap.css"),
		"bootSwatchJournal": Array("style", "//bootswatch.com/journal/bootstrap.css"),
		"bootSwatchLumen": Array("style", "//bootswatch.com/lumen/bootstrap.css"),
	}

	var itemCount = items.length;

	function loadItem(url, type, callback) {
	    var head = document.getElementsByTagName('head')[0];

	    if (type == "script") {
		    var item = document.createElement('script');
		    item.type = 'text/javascript';
		    item.src = url;
		    item.onreadystatechange = callback;
		    item.onload = callback;
		    head.appendChild(item);
		}
		if (type == "style") {
		    var item = document.createElement('link');
		    item.rel = 'stylesheet';
		    item.href = url;
		    item.onreadystatechange = callback;
		    item.onload = callback;
		    head.appendChild(item);
		}
	}
	function loadNext(index) {
		if (index < itemCount) {
			if (itemURLS[items[index]] != null) {
				loadItem(
					itemURLS[items[index]][1],
					itemURLS[items[index]][0],
					function(){ loadNext(index+1); }
				);
			} else {
				loadNext(index+1);
			}
		} else {
			loadedCallback();
			urlscript.remove();
			elmscript.remove();
		}
	}
	loadNext(0);

}