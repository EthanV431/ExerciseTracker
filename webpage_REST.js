

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




