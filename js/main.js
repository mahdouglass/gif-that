let topics = ['Leslie Knope', 'Liz Lemon', 'April Ludgate', 'Nick Offerman', 'Michael Scott'];

// Run through topics array and create a button for each element
function topicsButtons() {
    for(var i = 0; i < topics.length; i++) {
        var button = document.createElement("button");
        var text = document.createTextNode(topics[i]);
        button.appendChild(text);
        var element = document.getElementById("gif-buttons")
        element.appendChild(button);
    }
}

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

        var ratingText = $("<p>").text("Rating: " + results[i].rating);

        // Add the gif to the view //
        gifContainer.append(gifImage);
        gifContainer.append(ratingText);

        // Putting the gifs at the beginning //
        $("#display-gifs").prepend(gifContainer);
    }
});

$("#display-gifs").on("click", ".gif", function() {
    // Click toggling between static and animated
    var src = $(this).attr("src");
    if($(".image").hasClass("animate")){
        // Replacing image path with static path and removing .animate
        $(".image").attr("src", src.replace(/\.gif/i, "_s.gif"))
        $(".image").removeClass("animate");
    } else {
        // Add .animate and replacing image with gif path
        $(".image").addClass("animate");
        $(".image").attr("src", src.replace(/\_s.gif/i, ".gif"))
    }
});

//Call topicsButtons function to populate buttons
topicsButtons();