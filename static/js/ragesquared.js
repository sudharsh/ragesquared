var score = 0;
var time = 0;
var timeouts = new Array();
var timerId = 0;

function createSquare(paper, side, points, timeout) {
    coords = getRandomCoords();
    rect = paper.rect(coords['x'], coords['y'], side, side);
    rect.click(
        function() {
            score = score + points;
            $("#score").html(score);
            refreshPosition(rect, timeout);
        }
    );

    var intervalId = window.setInterval(refreshPosition, timeout + 200, rect);
    return [rect, intervalId];
}

function startGame(paper) {
    // Slow rectangle
    var rect1 = createSquare(paper, 75, 10, 500);
    rect1[0].attr("fill", "#f00");
    timeouts.push(rect1[1]);

    var rect2 = createSquare(paper, 60, 20, 400);
    rect2[0].attr("fill", "#6b0fe7");
    timeouts.push(rect2[1]);

    var troll_coords = getRandomCoords();
    troll_face = paper.image("static/trollface.svg", troll_coords['x'], troll_coords['y'], 75, 75);
    troll_face.click(
        function() {
            score = score - 25;
            $("#score").html(score);
            refreshPosition(rect, 700);
        }
    );
    var intervalId = window.setInterval(refreshPosition, 700, troll_face);
    timeouts.push(intervalId);

    timerId = window.setInterval(refreshTimer, 1000, paper);
}


function stopGame(paper, timeouts) {
    for (_id in timeouts)
        clearTimeout(_id);
    paper.clear();
    $("#game").fadeOut('fast',
                           function() {
                               $("#final_score").html("Your Score: " + score);
                               $("#play_again").click(
                                   function() {
                                       $("#summary").fadeOut('fast',
                                                             function() {
                                                                 $("#game").fadeIn(
                                                                     'fast', initialize
                                                                 );
                                                             });
                                       });

                               $("#summary").fadeIn('fast');
                           });
}


function refreshTimer(paper) {
    time = time - 1;
    $("#timer").html(time);

    if (time == 0) {
        clearInterval(timerId);
        stopGame(paper, timeouts);
    }
}


function getRandomCoords() {
    var x1 = parseInt($("#stage").css("margin-left").slice(0, -2));
    var x2 = parseInt($("#stage").css("margin-right").slice(0, -2)) + $("#stage").width();

    var y1 = parseInt($("#stage").css("margin-top").slice(0, -2));
    var y2 = parseInt($("#stage").css("margin-top").slice(0, -2)) + $("#stage").height();

    var x = Math.floor(Math.random() * (x2 - x1 + 1)) + x1;
    var y = Math.floor(Math.random() * (y2 - y1 + 1)) + y1;

    return {'x': x, 'y': y};
}


function refreshPosition(rect, timeout) {
    new_coords = getRandomCoords();

    rect.animate({scale: 0}, 300,
                 function() {
                     rect.attr({"x": new_coords['x'],
                                "y": new_coords['y']
                               });
                     rect.animate({scale: 1}, timeout);
                 });
}


click_cb = function(points, timeout) {
}


initialize = function() {
    width = $("#stage").width();
    height = $("#stage").height();
    var paper = Raphael("stage", width, height);
    score = 0;
    $("#score").html("0");
    time = 30;
    startGame(paper);
}


$(function() {
    $("#game").hide();
    $("#summary").hide();
    $("#start").fadeTo(0.2);


    $("#start").click(
        function() {
            $("#welcome").fadeOut('fast',
                                  function() {
                                      $("#game").fadeIn('fast',
                                                        initialize
                                                        );
                                      })
            });
});