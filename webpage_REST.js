/*
document.getElementById("login").addEventListener("submit", function (event) {
    event.preventDefault()
    console.log("a")
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    var request = new XMLHttpRequest();
    request.open('GET', 'https://jasony33.pythonanywhere.com/grades');
    console.log(request)
    request.onload = function () {
        const ourData = JSON.parse(request.responseText);
        console.log(request.responseText);
        console.log(request)
        console.log(ourData)
        console.log("b")
    }
    console.log("c")

    request.send();

});
*/


document.getElementById("create").addEventListener("submit", function (event) {
    event.preventDefault()

    let names = document.getElementById("name1").value;
    let muscleGroup = document.getElementById("muscles").value;


    var request = new XMLHttpRequest();
    request.open('GET', 'https://jasony33.pythonanywhere.com/data');
    request.onload = function () {
        const ourData = JSON.parse(request.responseText);

        length = Object.keys(ourData).length
        console.log(length)


        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "https://jasony33.pythonanywhere.com/data");
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.onload = function () {



        }
        const body = { "id": length, "name": names, "muscle": muscleGroup };
        console.log("b")
        xhttp.send(JSON.stringify(body));

    }
    console.log("a")
    request.send();
    //let reps = document.getElementById("reps").checked;
    //let time = document.getElementById("time").checked;




});



function showAll() {
    //let x = "";
    var request = new XMLHttpRequest();
    request.open('GET', 'https://jasony33.pythonanywhere.com/data');

    request.onload = function () {
        const ourData = JSON.parse(request.responseText);
        //console.log(ourData)

        tbl = document.getElementById("text");

        let size = tbl.rows.length;
        for (j = 0; j < size; j = j + 1) {
            tbl.deleteRow(0);
            //console.log(j)
        }


        for (let i = 0; i < Object.keys(ourData).length; i++) {
            const tr = tbl.insertRow();

            const td = tr.insertCell();
            td.appendChild(document.createTextNode(ourData[i]["id"]))

            const td2 = tr.insertCell();
            td2.appendChild(document.createTextNode(ourData[i]["name"]))

            const td3 = tr.insertCell();
            td3.appendChild(document.createTextNode(ourData[i]["muscle"]))


        }

    };
    request.send();
    //console.log()

}

document.getElementById("delete").addEventListener("submit", function (event) {
    event.preventDefault()
    console.log("a");
    let names = document.getElementById("delete_exercise").value;
    let string = "https://jasony33.pythonanywhere.com/data/" + names;
    console.log(names);
    console.log(string);
    var request = new XMLHttpRequest();
    request.open('POST', string);
    // console.log("a")
    request.send();
});


