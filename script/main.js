let topics = ['Leslie Knope', 'Liz Lemon', 'April Ludgate', 'Nick Offerman', 'Michael Scott'];

// Run through topics array and create a button for each element
for(var i = 0; i < topics.length; i++) {
    var button = document.createElement("button");
    var text = document.createTextNode(topics[i]);
    button.appendChild(text);
    var element = document.getElementById("gif-buttons")
    element.appendChild(button);
}
var apiKey = "ICPdxSFFdZlkvUdwAnEaJyosRmdukebU";
var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + topics + "&api_key=" + apiKey + "&limit=10";

$.ajax({
    url: queryUrl,
    method: "GET"
})