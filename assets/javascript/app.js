var favShows = ["The Office", "Parks and Recreation", "30 Rock", "It's Always Sunny in Philadelphia", "Archer", "Seinfeld", "South Park"];




function makeButtons() {

  	$("#buttons-holder").empty();

    for (i = 0; i < favShows.length; i++) {
		var showButton = $("<button>");

		showButton.addClass("show");

		showButton.attr("data-name", favShows[i]);

		showButton.text(favShows[i]);

		$("#buttons-holder").append(showButton);
	}
}

$("#addGif").on("click", function(event){
	event.preventDefault();

	var newShow = $("#userInput").val().trim();

	favShows.push(newShow);

	makeButtons();
});

function getShowInfo() {
	var show = $(this).attr("data-name");
	var queryURL = "http://api.giphy.com/v1/gifs/search?q="+show+"&api_key=dc6zaTOxFJmzC&limit=10";
		console.log(queryURL);
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {
		console.log(response);
		for(i=0;i<response.data.length;i++) {
			$("#gif-holder").prepend("<p>Rating: "+response.data[i].rating+"</p>");

			$("#gif-holder").prepend("<img src="+response.data[i].images.downsized.url+">");
		}
	})
}

$(document).on("click", ".show", getShowInfo);

makeButtons();


