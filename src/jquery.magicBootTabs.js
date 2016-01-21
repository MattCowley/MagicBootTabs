/*
 * MagicBootTabs
 * A nice way of styling and using Bootstrap tabs for content
 *
 * Author: Unreal Designs <contact@unreal-designs.co.uk>
 * Copyright: Unreal Designs 2015
 */

//Declare Version
var magicBootTabsVersion = "1.08";

// Colored Console Logging Function
function consolelog(message) {
	if (message != "") {
		var messages = Array();
		var styles = Array();

		messages.push("%cMagicBootTabs");
		styles.push("background: #222; color: #bada55;");

		for (index = 0; index < message.length; ++index) {
			args = message[index].split(" -- ");
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

		console.log.apply(console, arguments);
	} else {
		console.log("");
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

			// Check If Line Color Is Defined
			linecolorDef = typeof options.lnColor !== 'undefined' ? true : false;
			linecolor = typeof options.lnColor !== 'undefined' ? options.lnColor : "#4183D7";

			// Check If Active Color Is Defined
			activecolorDef = typeof options.acColor !== 'undefined' ? true : false;
			activecolor = typeof options.acColor !== 'undefined' ? options.acColor : "#4183D7";

			// Check If Animate Speed Is Defined
			animateSpeedDef = typeof options.speed !== 'undefined' ? true : false;
			animateSpeed = typeof options.speed !== 'undefined' ? options.speed : 400;

			// Check If Advanced Animation Is Defined
			advAnimation = typeof options.advanced !== 'undefined' ? options.advanced : false;

			// Create Usable Plugin Variables
			$tabId = this;
			tabIdAttr = this.attr("id");
			$tabId.append("<li id='magic-line' magic-tab='" + tabIdAttr + "'></li>");
			var $magicLine = $("#magic-line[magic-tab='" + tabIdAttr + "']");
		
			//Create Line Break Before Tab Info
			consolelog(""); 

			// Set Colours To Each other If One Not Defined, Log Results Of Check
			if (linecolorDef && !activecolorDef) {
				consolelog(Array(
					"Tab -- #F27935",
					"#" + tabIdAttr + " -- #F27935",
					"Active Color Not Defined, Using Line Color! -- #6BB9F0"
				));
				activecolor = linecolor;
			} else if (!linecolorDef && activecolorDef) {
				consolelog(Array(
					"Tab -- #F27935",
					"#" + tabIdAttr + " -- #F27935",
					"Line Color Not Defined, Using Active Color! -- #6BB9F0"
				));
				linecolor = activecolor;
			} else if (!linecolorDef && !activecolorDef) {
				consolelog(Array(
					"Tab -- #F27935",
					"#" + tabIdAttr + " -- #F27935",
					"Line & Active Colors Not Defined, Using Defaults! -- #6BB9F0"
				));
				linecolor = activecolor;
			} else {
				consolelog(Array(
					"Tab -- #F27935",
					"#" + tabIdAttr + " -- #F27935",
					"Using Line Color -- #6BB9F0",
					linecolor + " -- " + linecolor + " -- #fff",
					", Using Active Color -- #6BB9F0",
					activecolor + " -- " + activecolor + " -- #fff"
				));
			}

			if (animateSpeedDef) {
				consolelog(Array(
					"Tab -- #F27935",
					"#" + tabIdAttr + " -- #F27935",
					"Using Animation Speed -- #6BB9F0",
					animateSpeed + " -- #4183D7" + " -- #fff"
				));
			} else {
				consolelog(Array(
					"Tab -- #F27935",
					"#" + tabIdAttr + " -- #F27935",
					"Animation Speed Not Defined, Using Default! -- #6BB9F0"
				));
			}

			if (advAnimation) {
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

			// Set Custom Colors For MagicTab
			$("head style#magicBootTabsStyles").append(".nav-tabs#" + tabIdAttr + " > li.active > a { color: " + activecolor + " }\n");
			$("head style#magicBootTabsStyles").append(".nav-tabs#" + tabIdAttr + " > li#magic-line { background: " + linecolor + " }\n");

			// Log Tab Info In Console
			consolelog(Array(
				"Tab -- #F27935",
				"#" + tabIdAttr + " -- #F27935",
				"MagicTab Created! -- #6BB9F0"
			));

			//Begin - Set Original Values
			$magicLine
				.width($(".active").width())
				.css("left", $(".active a").position().left)
				.css("z-index", $tabId.css("z-index")-10)
				.data("origLeft", $magicLine.position().left)
				.data("origWidth", $magicLine.width());

			if (!advAnimation) {
				//Hover Event
				$tabId.find("li a").hover(function() {
					$el = $(this);
					leftPos = $el.position().left;
					newWidth = $el.parent().width();
					$magicLine.stop().animate({
						left: leftPos,
						width: newWidth
					}, animateSpeed);
				}, function() {
					$magicLine.stop().animate({
						left: $magicLine.data("origLeft"),
						width: $magicLine.data("origWidth")
					}, animateSpeed);
				});

				//Click Event
				$tabId.find("li a").click(function() {
					$el = $(this);
					leftPos = $el.position().left
					newWidth = $el.parent().width();
					$magicLine.stop().animate({
						left: leftPos,
						width: newWidth
					}, animateSpeed, function() {
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
				}, animateSpeed, function() {
					$magicLine.data("origHeight", $magicLine.height());
				});

				//Hover Event
				$tabId.find("li a").hover(function() {
					$el = $(this);
					leftPos = $el.position().left;
					newWidth = $el.parent().width();
					newHeight = $el.parent().height();
					$magicLine.stop().animate({
						height: 2
					}, animateSpeed, function() {
						$magicLine.stop().animate({
							left: leftPos,
							width: newWidth
						}, animateSpeed, function() {
							$magicLine.stop().animate({
								height: newHeight
							}, animateSpeed);
						});
					});
				}, function() {
					$magicLine.stop().animate({
						height: 2
					}, animateSpeed, function() {
						$magicLine.stop().animate({
							left: $magicLine.data("origLeft"),
							width: $magicLine.data("origWidth")
						}, animateSpeed, function() {
							$magicLine.stop().animate({
								height: $magicLine.data("origHeight")
							}, animateSpeed);
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
						height: 2
					}, animateSpeed, function() {
						$magicLine.stop().animate({
							left: leftPos,
							width: newWidth
						}, animateSpeed, function() {
							$magicLine.stop().animate({
								height: newHeight
							}, animateSpeed, function() {
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
