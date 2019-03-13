// Array that will show as buttons on the site
let topics = ['Leslie Knope', 'Liz Lemon', 'April Ludgate', 'Nick Offerman', 'Michael Scott'];

// Run through topics array and create a button for each element
function topicsButtons() {
    // Clear all buttons before rendering them
    $("#gif-buttons").empty();
    for(var i = 0; i < topics.length; i++) {
        var gifButton = $("<button class='gif-btn'>");
        gifButton.text(topics[i]);
        $("#gif-buttons").append(gifButton);
    }
}

$(document).on("click", ".gif-btn", function() {
    // Grab name from button
    var gifSelected = $(this).text();
    // Connect to api and get data
    var apiKey = "ICPdxSFFdZlkvUdwAnEaJyosRmdukebU";
    var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + gifSelected + "&api_key=" + apiKey + "&limit=10";

    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(result) {
        let data = result;
        // Clear all gifs each time a button is clicked, don't want to append for days
        $("#display-gifs").empty();

        // Loop through each result item //
        for (var i = 0; i < result.data.length; i++) {
            // JSON data array
            let results = result.data;
                
            // Create a div to hold the gif //
            var gifContainer = $("<div class='gif'>");
            
            // Create an element to hold the image //
            var gifImage = $("<img>");

            // Add still gif/image source 
            gifImage.attr("src", results[i].images.fixed_height_still.url);

            // Add gif rating
            // var ratingText = $("<p>").text("Caption: " + results[i].rating);

            // Add the gif to the view //
            gifContainer.append(gifImage);
            // gifContainer.append(ratingText);

            // Putting the gifs at the beginning //
            $("#display-gifs").prepend(gifContainer);
        }
    });
});

// Pause and play gifs
$("#display-gifs").on("click", ".gif img", function() {
    // Click toggling between static and animated
    var src = $(this).attr("src");
    if($(this).hasClass("animate")){
        // Replacing image path with static path and removing .animate
        $(this).attr("src", src.replace(/\.gif/i, "_s.gif"))
        $(this).removeClass("animate");
    } else {
        // Add .animate and replacing image with gif path
        $(this).addClass("animate");
        $(this).attr("src", src.replace(/\_s.gif/i, ".gif"))
    }
});

// Make button out of input value
$("button#enter-value").click(function(event) {
    // Prevent button click from refreshing the page
    event.preventDefault();

    // Assign value from input to variable
    var inputValue = $("input").val();
    
    // Add input value to the topics array
    topics.push(inputValue);

    // Run topics buttons function to recreate array and buttons
    topicsButtons();

    //Clear input field of text
    $("input").val("");
});

// $(document).click(".gif-btn", displayGifs);

// Call topicsButtons function to populate buttons
topicsButtons();