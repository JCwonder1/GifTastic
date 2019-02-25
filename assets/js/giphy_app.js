"use strict";

/*--------Functions-----------*/
function buildPresetButtons(arrayOfItems, dataType){
   var build = "";
    $(arrayOfItems).each(function(i , val) {
        if (arrayOfItems !== undefined) {
            build += "<button class='btn-primary btn m-1' data-" + dataType + "='" + val + "'>" + val + "</button>";
        }
    });
    $("#"+dataType).html(build);
}

/*-----TOPIC ARRAYS --------*/
var animalFails = [
    'Dog',
    'Cat',
    'Elephant',
    'Squirrel',
    'Horse',
    'Penguin',
];

var sportFails = [
    'Basketball',
    'Baseball',
    'Football',
    'Skateboard',
    'Water Sports',
    'Snowboarding'
];

var epicFails = [
    'Excercise',
    'Ramps',
    'Kids',
    'Drunk',
    'BBQ'
];

var userFails = [];

//Initiating the topic buttons
buildPresetButtons(animalFails, 'animalFails');
buildPresetButtons(sportFails, 'sportFails');
buildPresetButtons(epicFails, 'epicFails');

/*---------Event Listeners------*/

//Event that will listen for a button pressed and load the related gifs
$(document).on('click', 'button', function(evt){
    var topicPressed = evt.currentTarget.innerHTML.toLocaleLowerCase();
    if (topicPressed === 'submit'){
       var userValue = $('input').val();
       userFails.push(userValue);
       $('input').val('');
       buildPresetButtons(userFails, 'userFails');

    }else{
        $("#giphyPlacement").empty();
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            topicPressed + " fail&api_key=WRY8y1li18n1949dMqWmTduGQn8J8wtj&limit=10";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
                var data = response.data;
                $(data).each(function(i,val){
                    var newDiv = $("<div>");
                    newDiv.addClass("ext-center m-4");
                    var newP = $("<p>");
                    newP.text("Rating "+ data[i].rating.toUpperCase());
                    var newImg = $("<img>");
                    newImg.attr("src", data[i].images.fixed_height.url);
                    newImg.addClass("rounded").addClass("playing");
                    newDiv.append(newP);
                    newDiv.append(newImg);
                    $("#giphyPlacement").prepend(newDiv);
                });
            });
    };
});

//Event that listens to image clicks and once clicked checks state and changes img based on state.
//Giphy's object has a stopped gif and its notated as _s.gif
$(document).on('click', 'img', function(evt) {
    var src = $(evt.currentTarget).attr("src");
    if($(evt.currentTarget).hasClass('playing')){
        $(evt.currentTarget).attr('src', src.replace(/\.gif/i, "_s.gif"));
        $(evt.currentTarget).removeClass('playing');
    } else {
        $(evt.currentTarget).addClass('playing');
        $(evt.currentTarget).attr('src', src.replace(/\_s.gif/i, ".gif"));
    }
});