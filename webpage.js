

function showAll() {
    //let x = "";
    var request = new XMLHttpRequest();
    request.open('GET', 'http://127.0.0.1:5000/grades');

    request.onload = function () {
        const ourData = JSON.parse(request.responseText);

        console.log(Object.keys(ourData[0]))
        console.log(Object.values(ourData[0]))

        tbl = document.getElementById("text");
        console.log(tbl.rows.length)
        let size = tbl.rows.length;
        for (j = 0; j < size; j = j + 1) {
            tbl.deleteRow(0);
            console.log(j)
        }

        for (y in ourData) {
            const tr = tbl.insertRow();
            const td = tr.insertCell();
            const td2 = tr.insertCell();
            td.appendChild(document.createTextNode(Object.keys(ourData[y])))
            td2.appendChild(document.createTextNode(Object.values(ourData[y])))
            console.log(y)
        }
    };
    request.send();
    //console.log()

}


document.getElementById("indv_grade").addEventListener("submit", function (event) {
    event.preventDefault()
    //console.log("a");
    let names = (document.getElementById("name").value).toLowerCase();
    //console.log(names);
    let string = "http://127.0.0.1:5000/grades/" + names;
    var request = new XMLHttpRequest();
    request.open('GET', string);
    // console.log("a")

    request.onload = function () {
        //console.log("a");
        const ourData = JSON.parse(request.responseText);
        console.log(typeof (ourData));

        y = Object.values(ourData)
        //console.log(y)
        document.getElementById("indv").innerHTML = "Grade:" + y;
        //document.getElementById("indv").innerHTML = "grades: " + ourData.names;
    }
    request.send();
})

document.getElementById("create").addEventListener("submit", function (event) {
    event.preventDefault()

    let names = document.getElementById("name1").value;
    let grade = document.getElementById("grade").value;
    console.log(names);
    console.log(typeof (names))

    console.log(grade);
    /*
    const body = { "name": names, "grade": grade };

    const request = new XMLHttpRequest();
    request.open("POST", 'grades.json');
    request.setRequestHeader("Content-Type", "application/json");

    request.addEventListener('load', function () {
        if (request.status === 201 && request.readyState === 4) {
            const res = JSON.parse(request.responseText)
            console.log(res);
        }
        else {
            throw new Error("Bad Request")
        }
    })
    request.send(JSON.stringify(body));
    */

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://127.0.0.1:5000/grades");
    xhttp.setRequestHeader("Content-Type", "application/json");
    let body = {};
    body[names] = grade;
    xhttp.send(JSON.stringify(body));

});
document.getElementById("edit").addEventListener("submit", function (event) {
    event.preventDefault()
    //console.log("a");
    let names = document.getElementById("name2").value;
    let grade = document.getElementById("grade2").value
    console.log(names);
    console.log(grade)

    const body = { "name": names, "grade": grade };
    console.log(body)

    const request = new XMLHttpRequest();

    let string = "https://amhep.pythonanywhere.com/grades/" + names;

    request.open("PUT", string);
    request.setRequestHeader("Content-Type", "application/json");

    request.send(JSON.stringify(body));

});


document.getElementById("delete").addEventListener("submit", function (event) {
    event.preventDefault()
    console.log("a");
    let names = document.getElementById("name3").value;
    let string = "https://amhep.pythonanywhere.com/grades/" + names;
    console.log(names);
    console.log(string);
    var request = new XMLHttpRequest();
    request.open('DELETE', string);
    // console.log("a")
    request.send();



})