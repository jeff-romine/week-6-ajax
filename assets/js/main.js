const API_KEY = 'b6c3a4726a144242a074e0ef8d296e48';


$(document).ready(
    function () {
        // bug theme topics
        var topics = [
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
            "butterfly"];

        // keep track of offsets by topic so it isn't the same
        // set every time
        var   offsets = {};
        // changed this to 12 so it would fit better
        const QUANTITY = 12;

        function handleTopicButton(event) {
            $("#img-area").empty();
            var topic = $(event.target).attr("data-topic");
            var offset = (offsets[topic] || 0);

            offsets[topic] = offset + QUANTITY;

            var queryUrl = "https://api.giphy.com/v1/gifs/search?api_key=b6c3a4726a144242a074e0ef8d296e48&" +
                "q=" + topic +
                "&limit=" + QUANTITY +
                "&offset=" + offset +
                "&rating=G&lang=en";

            $.ajax({
                url: queryUrl,
                method: 'GET'
            }).done(function(response) {

                console.log(response);

                if (offsets[topic]) {
                    offsets[topic] += QUANTITY;
                }
                else {
                    offsets[topic] = QUANTITY;
                }

                response.data.forEach(function (giphyItem) {
                    var containerDiv = $("<div>")
                        .addClass("col-lg-3")
                        .addClass("col-md-4")
                        .addClass("col-sm-6")
                        .addClass("col-xs-6")
                        .addClass("thumbnail-wrapper");
                    var thumbnailDiv = $("<div>").addClass("thumbnail");
                    var animateUrl = giphyItem.images.downsized.url;
                    var stillUrl = giphyItem.images.downsized_still.url;
                    var img = $("<img>")
                        .addClass("gif")
                        .attr("data-still",stillUrl)
                        .attr("data-animate",animateUrl)
                        .attr("data-state","still")
                        .css("height","150px")
                        .css("width","100%")
                        .attr("src",stillUrl);

                    var caption = $("<div>")
                        .addClass("caption")
                        .html($("<p>").text("Rating: " + giphyItem.rating));

                    thumbnailDiv.append(img);
                    thumbnailDiv.append(caption);

                    containerDiv.append(thumbnailDiv);
                    $("#img-area").prepend(containerDiv);
                });
                // Need to refreesh the click handlers after modifying the topic array
                refreshGifClickHandlers();
            });
        }

        function refreshGifClickHandlers() {
            $(".gif").click(gifClickHandler);
        }

        function gifClickHandler() {
            var img = $(this);
            var state = img.attr("data-state");

            if (state === "still") {
                img.attr("src",img.attr("data-animate"));
                img.attr("data-state","animate");
            }
            else {
                img.attr("src",img.attr("data-still"));
                img.attr("data-state","still");
            }
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


        $("#add-topic-submit").click(function (event) {

            event.preventDefault();

            var newTopic = $("#new-topic").val().toLowerCase();
            if (newTopic && !topics.find(function (topic) {return topic === newTopic;})) {
                topics.push(newTopic);
                refreshButtons();
            }
            $("#new-topic").val("");
            }
        );

        refreshButtons();
    }
);
