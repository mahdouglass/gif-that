const topics = ['funny', 'sad', 'angry', 'emotions'];

for(var i = 0; i < topics.length; i++) {
    var button = document.createElement("button");
    var text = document.createTextNode(topics[i]);
    button.appendChild(text);
    var element = document.getElementById("gif-buttons")
    element.appendChild(button);
}