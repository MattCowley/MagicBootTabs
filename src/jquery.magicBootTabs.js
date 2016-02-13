/*
 * MagicBootTabs
 * A nice way of styling and using Bootstrap tabs for content
 *
 * Author: Unreal Designs <contact@unreal-designs.co.uk>
 * Copyright: Unreal Designs 2015
 */

//Declare Version
var magicBootTabsVersion = "1.35";
var displayargs = {};

// Colored Console Logging Function
(function() {
	var original = console['log'];
	console['orgLog'] = function() {
		if (original.apply){
            // Do this for normal browsers
            displayargs = arguments
            original.apply(console, arguments)
        }else{
            // Do this for IE
            var message = "Debug: " + Array.prototype.slice.apply(arguments).join(' ')
            original(message)
        }
    }
	console['log'] = function() {
		if (original.apply){
            // Do this for normal browsers
            original.apply(console, consolelog(arguments))
        }else{
            // Do this for IE
            var message = Array.prototype.slice.apply(arguments).join(' ')
            original(message)
        }
	}
}());

function consolelog(message) {
	if (message != "") {
		var messages = Array();
		var styles = Array();

		messages.push("%cMagicBootTabs");
		styles.push("background: #222; color: #bada55;");
			
		console.orgLog(message);

		for (index = 0; index < message.length; ++index) {
			args = message[index];
			console.orgLog(args);
			args = args.split(" -- ");
			msg = args[0].trim();
			color = args[1].trim();
			if (args.length == 3) {
				bg = args[2].trim();
			} else {
				bg = "#222";
			}
			messages.push(" %c" + msg);
			styles.push("background: " + bg + "; color: " + color);
		}

		var arguments = Array();
		arguments.push(messages.join(""));
		for (index = 0; index < styles.length; ++index) {
			arguments.push(styles[index]);
		}

		return arguments;
	} else {
		return "";
	}
}

// JQuery Check
if (typeof jQuery != 'undefined') {

	// Bootstrap JS Tabs Check
	if (typeof($.fn.tab) != 'undefined') {

		// Log - Plugin Loaded And Version In Console
		consolelog(Array(
			"A magical way of styling and using Bootstrap tabs for content. -- #6BB9F0"
		));
		consolelog(Array(
			"Version -- #6BB9F0",
			magicBootTabsVersion + " -- #F27935",
			"Loaded! -- #6BB9F0"
		));

		// Load in CSS File
		$("head").append("<link>");
		var css = $("head").children(":last");
		css.attr({
			rel: "stylesheet",
			type: "text/css",
			href: "//rawgithub.com/MattCowley/MagicBootTabs/master/src/jquery.magicBootTabs.css"
		});

		// Create Style Tag For MagicBootTab Colors
		$("head").append("<style></style>");
		var styles = $("head").children(":last");
		styles.attr({
			id: "magicBootTabsStyles",
			type: "text/css"
		});

		// Log Styles Loaded In Console
		consolelog(Array(
			"CSS File Linked In Head, Style Holder Created! -- #6BB9F0"
		));

		// Begin magicBootTab JQuery Function
		$.fn.magicBootTab = function(options) {

			//Check Options Is Passed
			options = options || {};

			// Set Option Defaults If Not Set
			options.lnColor 	= options.hasOwnProperty('lnColor') 	? options.lnColor 	: "#4144FF";
			options.acColor 	= options.hasOwnProperty('acColor') 	? options.acColor 	: "#4183D7";
			options.speed 		= options.hasOwnProperty('speed') 	? options.speed 	: 400;
			options.advAnimation 	= options.hasOwnProperty('advAnimation') 	? options.advAnimation 	: false;

			// Create Usable Plugin Variables
			$tabId = this;
			tabIdAttr = this.attr("id");
			$tabId.append("<li id='magic-line' magic-tab='" + tabIdAttr + "'></li>");
			var $magicLine = $("#magic-line[magic-tab='" + tabIdAttr + "']");
		
			//Create Line Break Before Tab Info
			consolelog("");

			// Log Basic MagicBootTab Info
			consolelog(Array(
				"Tab -- #F27935",
				"#" + tabIdAttr + " -- #F27935",
				"Using Line Color -- #6BB9F0",
				options.lnColor + " -- " + options.lnColor + " -- #fff",
				", Using Active Color -- #6BB9F0",
				options.acColor + " -- " + options.acColor + " -- #fff"
			));

			consolelog(Array(
				"Tab -- #F27935",
				"#" + tabIdAttr + " -- #F27935",
				"Using Animation Speed -- #6BB9F0",
				options.speed + " -- #4183D7" + " -- #fff"
			));

			if (options.advAnimation) {
				consolelog(Array(
					"Tab -- #F27935",
					"#" + tabIdAttr + " -- #F27935",
					"Advanced Animation Mode Enabled -- #6BB9F0"
				));
			} else {
				consolelog(Array(
					"Tab -- #F27935",
					"#" + tabIdAttr + " -- #F27935",
					"Advanced Animation Mode Disabled -- #6BB9F0"
				));
			}

			// Set Custom Colors For MagicBootTab
			$("head style#magicBootTabsStyles").append(".nav-tabs#" + tabIdAttr + " > li.active > a { color: " + options.acColor + "; }\n");
			$("head style#magicBootTabsStyles").append(".nav-tabs#" + tabIdAttr + " > li#magic-line { background: " + options.lnColor + " }\n");

			// Log Tab Info In Console
			consolelog(Array(
				"Tab -- #F27935",
				"#" + tabIdAttr + " -- #F27935",
				"MagicBootTab Created! -- #6BB9F0"
			));

			//Begin - Set Original Values
			$magicLine
				.width($(".active").width())
				.height(3)
				.css("left", $(".active a").position().left)
				.css("zIndex", 0)
				.data("origLeft", $magicLine.position().left)
				.data("origWidth", $magicLine.width());

			if (!options.advAnimation) {
				//Hover Event
				$tabId.find("li a").hover(function() {
					$el = $(this);
					leftPos = $el.position().left;
					newWidth = $el.parent().width();
					$magicLine.stop().animate({
						left: leftPos,
						width: newWidth
					}, options.speed);
				}, function() {
					$magicLine.stop().animate({
						left: $magicLine.data("origLeft"),
						width: $magicLine.data("origWidth")
					}, options.speed);
				});

				//Click Event
				$tabId.find("li a").click(function() {
					$el = $(this);
					leftPos = $el.position().left
					newWidth = $el.parent().width();
					$magicLine.stop().animate({
						left: leftPos,
						width: newWidth
					}, options.speed, function() {
						$magicLine
							.width($el.parent().width())
							.css("left", $el.position().left)
							.data("origLeft", $magicLine.position().left)
							.data("origWidth", $magicLine.width());
					});
				});
			} else {
				//Set Org Height
				$magicLine.stop().animate({
					height: $tabId.find("li.active").height()
				}, options.speed/1.5, function() {
					$magicLine.data("origHeight", $magicLine.height());
				});

				//Hover Event
				$tabId.find("li a").hover(function() {
					$el = $(this);
					leftPos = $el.position().left;
					newWidth = $el.parent().width();
					newHeight = $el.parent().height();
					$magicLine.stop().animate({
						height: 3
					}, options.speed/1.5, function() {
						$magicLine.animate({
							left: leftPos,
							width: newWidth
						}, options.speed/1.5, function() {
							$magicLine.animate({
								height: newHeight
							}, options.speed/1.5);
						});
					});
				}, function() {
					$magicLine.stop().animate({
						height: 3
					}, options.speed/1.5, function() {
						$magicLine.animate({
							left: $magicLine.data("origLeft"),
							width: $magicLine.data("origWidth")
						}, options.speed/1.5, function() {
							$magicLine.animate({
								height: $magicLine.data("origHeight")
							}, options.speed/1.5);
						});
					});
				});

				//Click Event
				$tabId.find("li a").click(function() {
					$el = $(this);
					leftPos = $el.position().left
					newWidth = $el.parent().width();
					newHeight = $el.parent().height();
					$magicLine.stop().animate({
						height: 3
					}, options.speed/1.5, function() {
						$magicLine.animate({
							left: leftPos,
							width: newWidth
						}, options.speed/1.5, function() {
							$magicLine.animate({
								height: newHeight
							}, options.speed/1.5, function() {
								$magicLine
									.width($el.parent().width())
									.css("left", $el.position().left)
									.data("origLeft", $magicLine.position().left)
									.data("origHeight", $magicLine.height())
									.data("origWidth", $magicLine.width());
							});
						});
					});	
				});
			}

			// Return JQuery Selector For Function Chaining
			return this;
		}


	} else {

		// Log Bootstrap JS Error In Console
		consolelog(Array(
			"Plugin Requires Bootstrap 3 (JS - Tabs)! -- #F53C2B"
		));
	}

} else {

	// Log JQuery Error In Console
	consolelog(Array(
		"Plugin Requires JQuery! -- #F53C2B"
	));
}
