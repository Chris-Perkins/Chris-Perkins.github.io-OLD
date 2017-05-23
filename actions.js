window.onload = function () {
    for(i = 0; i < 5 ; i += 1)
    {
        document.getElementById("terminal").innerHTML += "no<br>";
        var input = document.createElement("input");
        input.type = "text";

        document.getElementById("terminal").appendChild(input);
    }
}

alert("...");