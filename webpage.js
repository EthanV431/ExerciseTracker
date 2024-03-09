

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



document.getElementById("create").addEventListener("submit", function (event) {
    event.preventDefault()

    let names = document.getElementById("name1").value;
    let muscleGroup = document.getElementById("muscles").value;


    console.log(names);
    console.log(muscleGroup)



    /*
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://127.0.0.1:5000/grades");
    xhttp.setRequestHeader("Content-Type", "application/json");
    let body = {};
    body[names] = grade;
    xhttp.send(JSON.stringify(body));
    */
});