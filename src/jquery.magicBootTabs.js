/*
 * MagicBootTabs
 * A nice way of styling and using Bootstrap tabs for content
 *
 * Author: Unreal Designs <contact@unreal-designs.co.uk>
 * Copyright: Unreal Designs 2015
 */

//Declare Version
var magicBootTabsVersion = "1.52";

// Colored Console Logging Function
document.write('<script type="text/javascript" src="//rawgit.com/MattCowley/MagicBootTabs/master/src/colorConsole.js"></script>');
captureConsole("MagicBootTabs", "#bada55", "#222");

// JQuery Check
if (typeof jQuery != 'undefined') {

	// Bootstrap JS Tabs Check
	if (typeof($.fn.tab) != 'undefined') {

		// Log - Plugin Loaded And Version In Console
		console.log(Array(
			Array("A magical way of styling and using Bootstrap tabs for content.", "#6BB9F0")
		));
		console.log(Array(
			Array("Version", "#6BB9F0"),
			Array(magicBootTabsVersion, "#F27935"),
			Array("Loaded!", "#6BB9F0")
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
		console.log(Array(
			Array("CSS File Linked In Head, Style Holder Created!", "#6BB9F0")
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
			console.log("");

			// Log Basic MagicBootTab Info
			console.log(Array(
				Array("Tab", "#F27935"),
				Array("#" + tabIdAttr, "#F27935"),
				Array("Using Line Color", "#6BB9F0"),
				Array(options.lnColor, options.lnColor, "#fff"),
				Array(", Using Active Color", "#6BB9F0"),
				Array(options.acColor, options.acColor, "#fff")
			));

			console.log(Array(
				Array("Tab", "#F27935"),
				Array("#" + tabIdAttr, "#F27935"),
				Array("Using Animation Speed", "#6BB9F0"),
				Array(options.speed, "#4183D7", "#fff")
			));

			if (options.advAnimation) {
				console.log(Array(
					Array("Tab", "#F27935"),
					Array("#" + tabIdAttr, "#F27935"),
					Array("Advanced Animation Mode Enabled", "#6BB9F0")
				));
			} else {
				console.log(Array(
					Array("Tab", "#F27935"),
					Array("#" + tabIdAttr, "#F27935"),
					Array("Advanced Animation Mode Disabled", "#6BB9F0")
				));
			}

			// Set Custom Colors For MagicBootTab
			$("head style#magicBootTabsStyles").append(".nav-tabs#" + tabIdAttr + " > li.active > a { color: " + options.acColor + "; }\n");
			$("head style#magicBootTabsStyles").append(".nav-tabs#" + tabIdAttr + " > li#magic-line { background: " + options.lnColor + " }\n");

			// Log Tab Info In Console
			console.log(Array(
				Array("Tab", "#F27935"),
				Array("#" + tabIdAttr, "#F27935"),
				Array("MagicBootTab Created!", "#6BB9F0")
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
		console.log(Array(
			"Plugin Requires Bootstrap 3 (JS - Tabs)! -- #F53C2B"
		));
	}

} else {

	// Log JQuery Error In Console
	console.log(Array(
		"Plugin Requires JQuery! -- #F53C2B"
	));
}
