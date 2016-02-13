/*
 * colorConsole
 * Make console look amazing with colored messages
 *
 * Author: Unreal Designs <contact@unreal-designs.co.uk>
 * Copyright: Unreal Designs 2015
 */

//Declare Version
var colorConsoleVersion = "1.01";

function captureConsole(title, titlecolor, bgcolor) {
	var original = console['log'];
	console['orgLog'] = function() {
		if (original.apply){
            // Do this for normal browsers
            original.apply(console, arguments)
        }else{
            // Do this for IE
            var message = Array.prototype.slice.apply(arguments).join(' ')
            original(message)
        }
    }
	console['log'] = function() {
		if (original.apply){
            // Do this for normal browsers
            original.apply(console, colorConsole(title, titlecolor, bgcolor, arguments))
        }else{
            // Do this for IE
            var message = Array.prototype.slice.apply(arguments).join(' ')
            original(message)
        }
	}
}

function colorConsole(title, titlecolor, bgcolor, message) {
	if ( message !== null && typeof message === 'object' ) {
		message = message[0];
	}
	if (message instanceof Array) {
		var messages = Array();
		var styles = Array();

		messages.push("%c"+title);
		styles.push("background: "+bgcolor+"; color: "+titlecolor+";");

		for (index = 0; index < message.length; ++index) {
			args = message[index];
			args[0] = args[0].toString();
			msg = args[0].trim();
			color = args[1].trim();
			if (args.length == 3) {
				bg = args[2].trim();
			} else {
				bg = bgcolor;
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
		return Array(message);
	}
}