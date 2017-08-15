var count = 0,
    getId, p1 = 0,
    p2 = 0,
    tie = 0,
    turn1 = "X",
    turn2 = "O";
var arr = [];
var count = 0;
var flagWon = false;

// audio settings
document.getElementById("mute_sound").addEventListener('click', function(e) {
    var aid = document.getElementById("audio");
    console.log(aid);
    if (aid.muted === false) {
        aid.muted = true;
        audio.pause();
        document.getElementById("mute_sound").src = "mute.svg";
        document.getElementById("mute_sound").style.opacity = "0.4";
    } else {
        aid.muted = false;
        document.getElementById("mute_sound").src = "play.svg";
        document.getElementById("mute_sound").style.opacity = "1";
    }
});

// reset game
function newGame() {
    flagWon = false;
    arr = [];
    count = 0;
    render();
}

function render() {
    for (var i = 0; i < 9; i++) {
        document.getElementById(i).innerHTML = "";
    }
}

// switch between multiplayer and computer
// var click_arr = [singlePlayer, multiPlayer];
// document.getElementById("play-with").addEventListener('click', function(e) {
//     click_arr.reverse()[0]();
// });

singlePlayer();

document.getElementById("comp").addEventListener('click', function(e) {
    singlePlayer();
});

document.getElementById("peopl").addEventListener('click', function(e) {
    multiPlayer();
});

// single player functionality
function singlePlayer() {
    var x = document.getElementById("comp");
    var y = document.getElementById("peopl");
    x.style.display = "none";
    y.style.display = "unset";
    console.log("singlePlayer");
    newGame();
    personMove();

}

function personMove() {
    console.log("calling person move");
    var className = document.getElementsByClassName('square');
    Array.from(className).forEach(function(element) {
        element.addEventListener('click', function() {
            getId = this.id;
            if (typeof arr[getId] === 'undefined') {
                if (document.getElementById("audio").muted === false) {
                    audio.src = '';
                    audio.src = 'audio.mp3';
                    audio.play();
                }

                count++;
                console.log(count);
                var newDiv = document.createElement('div');
                newDiv.className = 'x';
                this.value = turn1;
                var newContent = document.createTextNode(turn1);
                newDiv.appendChild(newContent);

                arr[getId] = newDiv.innerHTML;
                console.log(arr[getId]);
                document.getElementById(getId).className += (" " + newDiv.className);
                document.getElementById(getId).innerHTML = newDiv.innerHTML;
                won();
            } computerMove();
        });
    });
}

function computerMove() {
  count++;
    var ran_num = randomFunction();
    arr[ran_num] = "O";
    var newDiv = setMove();
    document.getElementById(ran_num).className += (" " + newDiv.className);
    document.getElementById(ran_num).innerHTML = newDiv.innerHTML;
    won();
}

// easy level
function randomFunction() {
    var new_array = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    for (var i = 0; i < 9; i++) {
        if (arr[i] === 'X' || arr[i] === 'O') {
            new_array[i] = arr[i];
        }
    }
    var random_values = [];
    for (var i = 0; i < 9; i++) {
        if (typeof new_array[i] === 'number') {
            random_values.push(new_array[i]);
        }
    }
    var random_number = random_values[Math.floor(Math.random() * random_values.length)];
    random_values.splice(random_number, 1);
     console.log(random_values);
    return random_number;
}

// multiplayer functionality
function multiPlayer() {
    var x = document.getElementById("comp");
    var y = document.getElementById("peopl");
    y.style.display = "none";
    x.style.display = "unset";
    console.log("MultiPlayer");
    newGame();

    var className = document.getElementsByClassName('square');
    Array.from(className).forEach(function(element) {
        element.addEventListener('click', function() {
            getId = this.id;
            if (typeof arr[getId] === 'undefined') {
                if (document.getElementById("audio").muted === false) {
                    audio.src = '';
                    audio.src = 'audio.mp3';
                    audio.play();
                }

                count++;
                var newDiv = setMove();
                arr[getId] = newDiv.innerHTML;
                console.log(arr[getId]);
                document.getElementById(getId).className += (" " + newDiv.className);
                document.getElementById(getId).innerHTML = newDiv.innerHTML;
                won();
            }
        });
    });

}

function setMove() {
    if (count % 2 !== 0) {
        var newDiv = document.createElement('div');
        newDiv.className = 'x';
        this.value = turn1;
        var newContent = document.createTextNode(turn1);
        newDiv.appendChild(newContent);
    } else {
        var newDiv = document.createElement('div');
        newDiv.className = 'o';
        this.value = turn2;
        var newContent = document.createTextNode(turn2);
        newDiv.appendChild(newContent);
    }
    return newDiv;
}

function setScore(num, scores) {
    if (num === 1) {
        document.getElementById('p1').innerHTML = scores;
    } else if (num === 3) {
        document.getElementById('ties').innerHTML = scores;
    } else if (num === 2) {
        document.getElementById('p2').innerHTML = scores;
    }
    count = 0;
}

function won() {
    for (var i = 0; i < 7; i++) {
        if (arr[i] !== undefined && (
                (arr[i] === arr[0] && arr[i] === arr[1] && arr[i] === arr[2]) ||
                (arr[i] === arr[3] && arr[i] === arr[4] && arr[i] === arr[5]) ||
                (arr[i] === arr[6] && arr[i] === arr[7] && arr[i] === arr[8]) ||
                (arr[i] === arr[0] && arr[i] === arr[3] && arr[i] === arr[6]) ||
                (arr[i] === arr[1] && arr[i] === arr[4] && arr[i] === arr[7]) ||
                (arr[i] === arr[2] && arr[i] === arr[5] && arr[i] === arr[8]) ||
                (arr[i] === arr[0] && arr[i] === arr[4] && arr[i] === arr[8]) ||
                (arr[i] === arr[2] && arr[i] === arr[4] && arr[i] === arr[6]))) {
            if (arr[i] == "X" && flagWon === false) {
                p1++;
                setScore(1, p1);
                console.log("p1(X) Won");
                flagWon = true;
                break;
            } else if (arr[i] == "O" && flagWon === false) {
                p2++;
                setScore(2, p2);
                console.log("p2(0) Won");
                flagWon = true;
                break;
            }

        } else if (count === 9) {
            tie++;
            setScore(3, tie);
            console.log("Match Tied" + tie);
        }
    }

    if (p1 > 0 || p2 > 0 || tie > 0) {
        document.getElementById("reset-board").style.display = "block";
    }
}
// reset the board on click
document.getElementById('reset-board').addEventListener('click', function() {
    newGame();
});
