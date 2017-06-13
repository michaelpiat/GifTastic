$(document).ready(function() {

var reactions = ["high five", "eye roll", "sad", "no", "happy", "LOL", "wink", "thumbs up", "yes", "suprised", "angry", "proud"];




function makeButtons() {

  	$("#buttons-holder").empty();

    for (i = 0; i < reactions.length; i++) {
		var reactButton = $("<button>");

		reactButton.addClass("reactGif");

		reactButton.attr("data-name", reactions[i]);

		reactButton.text(reactions[i]);

		$("#buttons-holder").append(reactButton);
	}
}

$("#addGif").on("click", function(event){
	event.preventDefault();

	var newReaction = $("#userInput").val().trim();

	reactions.push(newReaction);

	makeButtons();
});

function getGifInfo() {
	$("#gif-holder").empty();



	var reaction = $(this).attr("data-name");
	var queryURL = "http://api.giphy.com/v1/gifs/search?q="+reaction+"&api_key=dc6zaTOxFJmzC&limit=10";
		console.log(queryURL);
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {
		console.log(response);
		for(i=0;i<response.data.length;i++) {
			$("#gif-holder").prepend("<p>Rating: "+response.data[i].rating+"</p>");

			$("#gif-holder").prepend("<img class='gif' data-state='still' data-still="+response.data[i].images.downsized_still.url+" data-animate="+response.data[i].images.downsized.url+" src="+response.data[i].images.downsized_still.url+">");
		}
	})
}

$("body").on("click", ".gif", function() {

	var state = $(this).attr("data-state");

	if (state === "still") {
		$(this).attr("src", $(this).attr("data-animate"));
		$(this).attr("data-state", "animate");
	} else {
		$(this).attr("src", $(this).attr("data-still"));
		$(this).attr("data-state", "still");
	}
});


$(document).on("click", ".reactGif", getGifInfo);

makeButtons();

})
