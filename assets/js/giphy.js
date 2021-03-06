//Global Variables
// ------------------------------------------------------------
var search = "";

var actors = ["Christopher Walken",
    "Nicholas Cage",
    "Arnold Schwarzenegger",
    "Batman"
];

//Creates multiple buttons for actors array

for (var i = 0; i < actors.length; i++) {
    var button = $('<button> </button');

    $(button).html(actors[i]);

    $(".buttons").append(button);

};

// Creates gifs on click

$(document).on("click", "button", function() {
    var person = $(this).text();
    console.log(person);
    populateImages(person);

    $("#gif-display").empty();

});

function populateImages(person) {

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        person + "&api_key=dc6zaTOxFJmzC&limit=10";
    console.log(queryURL);

    $.ajax({
            url: queryURL,
            method: "GET"
        })
        .done(function(response) {
            var results = response.data;

            for (var i = 0; i < results.length; i++) {

                //Creates div for gif

                var gifDiv = $("<div class='item'>");

                //Searches for rating of gif

                var rating = results[i].rating;

                //Adds rating

                var p = $("<p>").text("Rating: " + rating);

                //Looks for gifs matching search term

                var still = results[i].images.fixed_height_still.url;
                var animated = results[i].images.fixed_height.url

                var personImage = $("<img>");
                personImage.attr("src", still);
                personImage.attr("data-state", "still");
                personImage.attr("data-still", still);
                personImage.attr("data-animate", animated);

                //Adds gif to page
                gifDiv.prepend(p);
                gifDiv.prepend(personImage);

                $("#gif-display").prepend(gifDiv);

            }


        });

};

//Click Gifs to animate

$(document).on("click", "img", function() {

    var state = $(this).attr("data-state");

    //Changes still to animate

    if (state === "still") {
        $(this).attr("src", $(this).data("animate"));
        $(this).attr("data-state", "animate");

    //Changes animate to still

    } else {
        $(this).attr("src", $(this).data("still"));
        $(this).attr("data-state", "still");
    };

});

//When clicking submit button

$("#submit").on("click ", function() {

    //Searches for query

    search = $("#gifs").val().trim();
    $("#gifs").val("");



    //Creates buttons for search terms

    var button = $('<button></button').html(search);

    $(".buttons").append(button);


});