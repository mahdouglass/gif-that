// Array that will show as buttons on the site
let topics = ['Leslie Knope', 'Liz Lemon', 'April Ludgate', 'Nick Offerman', 'Michael Scott'];

// Run through topics array and create a button for each element
function topicsButtons() {
    $("#display-gifs").empty();
    for(var i = 0; i < topics.length; i++) {
        var button = document.createElement("button");
        var text = document.createTextNode(topics[i]);
        button.appendChild(text);
        var element = document.getElementById("gif-buttons")
        element.appendChild(button);
    }
}

// Connect to api and get data
var apiKey = "ICPdxSFFdZlkvUdwAnEaJyosRmdukebU";
var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + topics + "&api_key=" + apiKey + "&limit=10";

$.ajax({
    url: queryUrl,
    method: "GET"
}).then(function(result) {
    let data = result;
    console.log(result);

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
    event.preventDefault();
    var inputValue = $("input").val();
    topics.push(inputValue);
    topicsButtons();
    $("input").val("");
});

// Call topicsButtons function to populate buttons
topicsButtons();