var obj = new Object();
var arr = new Object();
var temp = ["Joker" , "Jumanji", "The Meg" , "Black Panther", "Moonlight"];
var srcs = ["https://i.pinimg.com/originals/0e/39/d5/0e39d5956e5370dcd7fca84dcb641a58.jpg",
"https://static.wikia.nocookie.net/jumanji/images/1/1b/Jumanji_2017_Poster.jpg/revision/latest?cb=20181023182751",
"https://thumbor.forbes.com/thumbor/711x1053/https://blogs-images.forbes.com/jeffewing/files/2018/08/The-Meg-poster-2-1200x1778.jpg?width=960",
"https://terrigen-cdn-dev.marvel.com/content/prod/1x/blackpanther_lob_crd_01_4.jpg",
"https://m.media-amazon.com/images/M/MV5BNzQxNTIyODAxMV5BMl5BanBnXkFtZTgwNzQyMDA3OTE@._V1_.jpg"];
let now = new Date()
var days = now.getUTCDate();
var min = now.getHours();
function Load() {
    // The function runs when the page loads and sets up the dropdowns and table
    var month = now.getUTCMonth() + 1; // Gets the current month (0-indexed, so add 1)
    var day = now.getUTCDate() - 4; 
    var year = now.getUTCFullYear(); 
    for (var j = 0; j < 11; j++) {
        var opt = document.createElement("option"); // Creates a new option element
        nd = document.createTextNode(String((Number(day) + j) + "." + month + "." + year));
        if ((localStorage['days'] == String((Number(day) + j) + "." + month + "." + year) && localStorage["days"] != undefined) || day+j == now.getUTCDate()+1) {
            opt.setAttribute("selected", "");
        }
        opt.setAttribute("onclick", "CheckColor()");
        opt.appendChild(nd);
        document.getElementById("selectDay").appendChild(opt);
    }
    // Sets up the time options
    for (var i = 10; i <= 20; i += 2) {
        opt2 = document.createElement("option");
        nd = document.createTextNode(String(i + ".00"));
        if (localStorage['hours'] == String(i + ".00")) {
            opt2.setAttribute("selected", "");
        }
        opt2.appendChild(nd);
        document.getElementById("selectMin").appendChild(opt2);
    }
    for (var i = 0; i <= temp.length-1; i++) {
        opt2 = document.createElement("option");
        nd = document.createTextNode(temp[i]);
        if (localStorage['movie'] == temp[i]) {
            opt2.setAttribute("selected", "");
            document.getElementById("ban").setAttribute("src", srcs[i]);
            document.getElementById("ban2").setAttribute("src", srcs[i]);

        }
        opt2.appendChild(nd);
        document.getElementById("selectMovie").appendChild(opt2);
    }
    var td;
    var message = "";
    var txte = document.getElementById("selectMovie").value + " " + document.getElementById("selectDay").value + " " + document.getElementById("selectMin").value;
    if(localStorage[txte] != undefined){
    // Checks if there are any saved seat reservations for the selected options
        for(var i = 0;i<localStorage[txte].length; i++){
            if(localStorage[txte][i] != " "){
                message += localStorage[txte][i];
                if(Number(i) == Number(localStorage[txte].length)-1){
                    td = document.getElementById(message);
                    td.style.backgroundColor = "red"; // Sets the reserved seats to red
                    message = "";
                }
            }else{
                td = document.getElementById(message);
                td.style.backgroundColor = "red";
                message = "";
                obj = localStorage;
            }
        }
    }
}

function CheckColor() {
    // This function checks and updates the colors of the seats based on user selection
    localStorage.setItem('days', document.getElementById("selectDay").value );
    localStorage.setItem('hours', document.getElementById("selectMin").value );
    localStorage.setItem('movie', document.getElementById("selectMovie").value );
    var txte = document.getElementById("selectMovie").value + " " + document.getElementById("selectDay").value + " " + document.getElementById("selectMin").value;
    var td;
    var message = "";
    var x = document.getElementById("mytable").getElementsByTagName("td");
    var skip = Number(24);
    for (var i = 13; i < x.length; i++) {
        x[i].style.backgroundColor = "gray";
        if (i == skip) {
            skip += 12;
            x[i].style.backgroundColor = "white";
        }
    }
    if (localStorage[txte] != undefined) {
        for(var i = 0; i< localStorage[txte].length; i++){
            if(localStorage[txte][i] != " "){
                message += localStorage[txte][i];
                if(Number(i) == Number(localStorage[txte].length)-1){
                    td = document.getElementById(message);
                    td.style.backgroundColor = "red";
                    message = "";
                }
            }else{
                td = document.getElementById(message);
                td.style.backgroundColor = "red";
                message = "";
            }
        }
    }
    for (var i = 0; i <= temp.length-1; i++) {
        if (localStorage['movie'] == temp[i]) {
            document.getElementById("ban").setAttribute("src", srcs[i]);
            document.getElementById("ban2").setAttribute("src", srcs[i]);

        }
    }
}
function ChangeColor(id) {
     // This function changes the color of a seat when clicked
    var str = "";
    var str2 = "";
    for(var i =0; i<document.getElementById("selectDay").value.length; i++){
        if(document.getElementById("selectDay").value[i] == ".") break;
        str += document.getElementById("selectDay").value[i];
    }
    for(var i =0; i<document.getElementById("selectMin").value.length; i++){
        if(document.getElementById("selectMin").value[i] == ".") break;
        str2 += document.getElementById("selectMin").value[i];
    }
    if ((Number(str) > Number(days)) || (Number(str) == Number(days) && Number(str2) > Number(min))) {
        var check = Boolean(true);
        var txt = document.getElementById("selectMovie").value + " " + document.getElementById("selectDay").value + " " + document.getElementById("selectMin").value;
        document.getElementById(id).style.backgroundColor = "red";
        if (check == Boolean(true)) {
            if(obj[txt] == undefined && localStorage[txt] != undefined){
                localStorage[txt] += " "+id;
                obj[txt] = localStorage[txt];
                obj[txt] += " "+id;
            }else if(obj[txt] == undefined && localStorage[txt] == undefined){
                obj[txt] = id;
                localStorage[txt] = id;
            }
            else{
                obj[txt] += " "+id;
            }
            localStorage.setItem(txt, obj[txt]);

        } else {
            check = Boolean(true);
        }
    } else {
        return;
    }
}
