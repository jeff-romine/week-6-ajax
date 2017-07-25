const API_KEY = 'b6c3a4726a144242a074e0ef8d296e48';

const TOPICS = [
    "ant",
    "spider",
    "wasp",
    "bee",
    "beatle",
    "fly",
    "worm",
    "dragonfly",
    "scorpion",
    "mantis",
    "ladybug",
    "moth",
    "butterfly"
];


$(document).ready(
    function () {
        var topics = TOPICS.slice(0);


        function handleTopicButton(event) {

            var topic = $(event.target).attr("data-topic");

            var queryUrl = "https://api.giphy.com/v1/gifs/search?api_key=b6c3a4726a144242a074e0ef8d296e48&q=" +
                topic + "&limit=3&offset=0&rating=G&lang=en";

            $.ajax({
                url: queryUrl,
                method: 'GET'
            }).done(function(response) {

                console.log(response);

                response.data.forEach(function (giphyItem) {
                    var imgUrl = giphyItem.images.downsized.url;

                    var img = $("<img>")
                        .addClass("col-md-4")
                        .attr("src",imgUrl);

                    $("#img-area").prepend(img);
                });

            });
        }

        function refreshButtons() {
            var buttonPanel = $("#button-panel");
            buttonPanel.text("");
            topics.forEach(function (topic) {
                $("#button-panel").append(
                    $("<button>")
                        .addClass("topic-button btn btn-primary")
                        .attr("data-topic",topic.toLowerCase())
                        .text(topic));
            });
            $(".topic-button").unbind("click",handleTopicButton);
            $(".topic-button").click(handleTopicButton);
        }


        refreshButtons();
    }
);
