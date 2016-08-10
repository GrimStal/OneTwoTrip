function handleVars() {
    if (isInt) {
        min = parseInt(min);
        max = parseInt(max);
    } else {
        min = Number(min);
        max = Number(max);
    }
    n = parseInt(n);

    if (isNaN(min)) {
        alert("Недопустимое значение min");
        return false;
    } else if (isNaN(max)) {
        alert("Недопустимое значение max");
        return false;
    } else if (min >= max) {
        alert("Недопустимые значение min и max");
        return false;
    } else if (isNaN(n) || n < 2) {
        alert("Введено недопустимое значение n");
        return false;
    }

    alert("n принято как " + n);
    size = (2 * n) - 1;

    return true;
}

function buildMatrix() {
    var matrix = new Array();
    for (var i = 0; i < size; i++) {
        matrix[i] = new Array();
        for (var m = 0; m < size; m++) {
            if (isInt) {
                matrix[i].push(Math.floor(Math.random() * (max - min + 1)) + min);
            } else {
                matrix[i].push(parseFloat((Math.random() * (max - min) + min).toFixed(2)));
            }
        }
    }
    return matrix;
}

function showMatrix(matrix) {
    for (var i = 0; i < matrix.length; i++) {
        var str = matrix[i].join(" ");
        console.log(str);
    }

    var number = 0;
    var table = document.createElement('table');
    table.id = "matrix-table";
    table.class = "table";

    for (var n = 0; n < matrix.length; n++) {
        var tr = document.createElement('tr');
        for (var m = 0; m < matrix[n].length; m++) {
            var td = document.createElement('td');
            td.id = "td-" + ++number;
            td.innerHTML = matrix[n][m];
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    document.body.appendChild(table);
}

function getSpiral(matrix) {
    var size = matrix.length - 1;
    var center = Math.round(matrix.length / 2) - 1;
    var active = [center, center];
    var str = matrix[active[0]][active[1]] + ", ";
    var move = ["left", "bottom", "right", "top"];
    var currentMove = -1;
    var steps = 0;
    var currentStep = 0;

    do {
        if (currentStep === steps) {
            currentStep = 1;
            currentMove++;

            if (move[currentMove % move.length] === "left" ||
                    move[currentMove % move.length] === "right") {
                steps++;
            }

        } else {
            currentStep++;
        }

        switch (move[currentMove % move.length]) {
            case "left":
                active[1]--;
                break;
            case "bottom":
                active[0]++;
                break;
            case "right":
                active[1]++;
                break;
            case "top":
                active[0]--;
                break;
            default:
                alert("Что-то пошло не так!");
                return false;
        }

        str += matrix[active[0]][active[1]];
        if (active[0] !== 0 || active[1] !== 0) {
            str += ", ";
        }
    } while (active[0] !== 0 || active[1] !== 0);
    return str;
}

function showSpiral(string) {
    var p = document.createElement('p');
    p.id = "spiral";
    p.innerHTML = "Ответ: " + string;
    document.body.appendChild(p);
    console.log(string);
}

var n = prompt("Введите целое неотрицательное n (>=2) для создания матрицы 2n-1 x 2n-1");
var min = prompt("Введите минимум для чисел в матрице");
var max = prompt("Введите максимум для чисел в матрице");
var isInt = confirm("Использовать только целые числа?");
var matrix;
var spiralString;
var size;

console.clear();

if (handleVars()) {
    matrix = buildMatrix();
    spiralString = getSpiral(matrix);
    showMatrix(matrix);
    showSpiral(spiralString);
}
