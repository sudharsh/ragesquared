var score = 0;
var time = 59;

function startGame(paper) {
    coords = getRandomCoords();
    rect = paper.rect(coords['x'], coords['y'], 75, 75);
    rect.attr("fill", "#f00");
    rect.click(function() {
        score = score + 10;
        $("#score").html(score);
        refreshPosition(rect);
    });
    var intervalId = window.setInterval(refreshPosition, 1000, rect);
    var timerId = window.setInterval(refreshTimer, 1000);
    var timeOut = window.setTimeout(stopGame, 60000, rect, intervalId, timerId)
}


function stopGame(rect, intervalId, timerId) {
    clearInterval(timerId);
    clearInterval(intervalId);
    rect.remove();
}
    

function refreshTimer() {
    time = time - 1;
    $("#timer").html(time);
}


function getRandomCoords() {
    var x1 = parseInt($("#stage").css("margin-left").slice(0, -2));
    var x2 = parseInt($("#stage").css("margin-right").slice(0, -2)) + $("#stage").width();

    var y1 = parseInt($("#stage").css("margin-top").slice(0, -2));
    var y2 = parseInt($("#stage").css("margin-top").slice(0, -2)) + $("#stage").height();
    
    var x = Math.round(Math.random() * 1000);
    var y = Math.round(Math.random() * 1000);

    var _x = x; var _y = y;
    if (x < x1)
        x = x + x1;
    else if (x > x2)
        x = x - x2;

    if (y > y2)
        y = y - y2;
    else if (y < y1)
        y = y + y1;

    return {'x': x, 'y': y};
}


function refreshPosition(rect) {
    new_coords = getRandomCoords();

    rect.animate({scale: 0}, 200,
                 function() {
                     this.attr({"x": new_coords['x'],
                                "y": new_coords['y']
                               });
                     this.animate({scale: 1}, 500);        
                 });
}


$(function() {
    width = $("#stage").width();
    height = $("#stage").height();
    var paper = Raphael("stage", width, height);
    startGame(paper);
});