/*
 * Item Loader
 * Quickly Load Scripts & Styles Required
 *
 * Author: Unreal Designs <contact@unreal-designs.co.uk>
 * Copyright: Unreal Designs 2015
 */

//Declare Version
var LoaderVersion = "1.16";

function loader(items, loadedCallback) {
	var target = event.target || event.srcElement;
	console.log(target);

	var itemURLS = {
		"colorConsole": Array("script", "//rawgit.com/MattCowley/MagicBootTabs/master/src/colorConsole.js"),
		"MagicBootTabs": Array("script", "//rawgit.com/MattCowley/MagicBootTabs/master/src/jquery.magicBootTabs.js"),
		"jQuery": Array("script", "//ajax.googleapis.com/ajax/libs/jquery/2.0.2/jquery.min.js"),
		"bootStrapJS": Array("script", "//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"),
		"bootStrapCSS": Array("style", "//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"),
		"bootSwatchSuperhero": Array("style", "//bootswatch.com/superhero/bootstrap.css"),
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
			loadItem(
				itemURLS[items[index]][1],
				itemURLS[items[index]][0],
				function(){ loadNext(index+1); }
			);
		} else {
			loadedCallback();
		}
	}
	loadNext(0);

}