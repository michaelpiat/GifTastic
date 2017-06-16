$(document).ready(function() {



//variables to create buttons with
var reactions = ["high five", "eye roll", "sad", "no", "happy", "LOL", "wink", "thumbs up", "yes", "suprised", "angry", "proud"];




function makeButtons() {
	//emptys the buttons-holder div so that when we create a new button it doesn't recreate all the buttons again
  	$("#buttons-holder").empty();
  	//a loop through the array of the preset reactions
    for (i = 0; i < reactions.length; i++) {
		//setting a var to create a new button
		var reactButton = $("<button>");
		//adding a class when the button is created
		reactButton.addClass("reactGif");
		//setting the data-name for each created button from the reactions var
		reactButton.attr("data-name", reactions[i]);
		//setting the name of of the button from the reactions array
		reactButton.text(reactions[i]);
		//appending the buttons to the buttons-holder div
		$("#buttons-holder").append(reactButton);
	}
}

$("#addGif").on("click", function(event){
	//something about preventing the buttons in the form to behave weird and breake the code.
	event.preventDefault();
	//setting a var to the user input.
	var newReaction = $("#userInput").val().trim();
	//putting the user input into the reaction array.
	reactions.push(newReaction);
	//creating a button with the user input, using the makeButtons function.
	makeButtons();
});

function getGifInfo() {
	//empty the gif-holder div so that our new gifs replace the gifs on the screen and not append on top of them. 
	$("#gif-holder").empty();
	//setting the var reaction to the data-name in the button that was pressed 
	var reaction = $(this).attr("data-name");
	//setting the var queryURL to the api URL + the data-name reaction from the button that was and with a limit of 10 results
	var queryURL = "https://api.giphy.com/v1/gifs/search?q="+reaction+"&api_key=dc6zaTOxFJmzC&limit=10";
	//ajax call		
	$.ajax({
		//our URL with the selected buttons' reaction.
		url: queryURL,
		//getting info with the GET method.	
		method: "GET"
		//when the ajax gets the info.
	}).done(function(response) {
		//console logging our response so that I can see it better and call the info that I need.
		console.log(response);
		//in this API we get our response in a form of an array with objects, so we need to go through each item in the array so this is what this for loop is doing.
		for(i=0;i<response.data.length;i++) {
			//prepending the rating from our object to the gif holder div. dynamically creating an HTML <p> tag. 
			$("#gif-holder").prepend("<p>Rating: "+response.data[i].rating+"</p>");
			//prepending our gif to the gif holder div. Also dynamically a img tag with a gif class and the data-state to start and pause the gifs. 
			$("#gif-holder").prepend("<img class='gif' data-state='still' data-still="+response.data[i].images.downsized_still.url+" data-animate="+response.data[i].images.downsized.url+" src="+response.data[i].images.downsized_still.url+">");
		}
	})
}
//because we create elements dyanamically we need to set up the click on the body and then look for the gif class. 
$("body").on("click", ".gif", function() {
	//the var state gets its "state" from the data-state of the button that was clicked. 
	var state = $(this).attr("data-state");
	//if the state is "still". 
	if (state === "still") {
		//change the source to the animated gif.
		$(this).attr("src", $(this).attr("data-animate"));
		//change the state to animate.
		$(this).attr("data-state", "animate");
	} else {
		//if the state is not "still", change the source to the still gif.
		$(this).attr("src", $(this).attr("data-still"));
		//change state back to "still".
		$(this).attr("data-state", "still");
	}
});

//sets up the gifs for the new buttons created by the user. 
$(document).on("click", ".reactGif", getGifInfo);

makeButtons();

})
