window.onload = function ()
{
        document.getElementById("terminal").innerHTML += "<p>C:/chrisperkins/me " +//non-editable location
            "<span id=\"input\" contenteditable=\"true\"></span></p>";//editable text
        document.getElementById("terminal").addEventListener("paste", handlePaste);
        document.getElementById("terminal").addEventListener("click", focusInput());

        focusInput();
}

// Disallow html paste
function handlePaste (e)
{
    // Stop data being directly pasted into div
    e.stopPropagation();
    e.preventDefault();

    /* Get pasted data via clipboard API
    clipboardData = e.clipboardData || window.clipboardData;
    pastedData = clipboardData.getData('Text');

    insertAtCaret(pastedData)*/
}

function focusInput()
{
    document.getElementById("input").focus();
}

function brIfEnter(e)
{
    alert("...");
    if (e.keyCode == 13)
    {
        alert("???");
        document.getElementById("input").className = "pastInput";
        document.getElementById("terminal").innerHTML = "<br>";
        
        document.getElementById("terminal").innerHTML += "<p>C:/chrisperkins/me " +//non-editable location
                "<span id=\"input\" contenteditable=\"true\"></span></p>";//editable text
    } 
}