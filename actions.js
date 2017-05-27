var loc = "chrisperkins:~$ ";
var ver = "1.0.5";

window.onload = function ()
{
    printToTerminal("<span style='color:white'>" + 
                        "ChrisPerkins.me - Home of your next Recruit [Version 1.0.5]<br>" +
                        "Current Status: Looking for Summer 2018 Internships<br>" +
                        "<br>" + 
                    "</span>");
    
    printToTerminal(loc +//non-editable location
            "<span id='input' contenteditable='true'></span>");//editable text
    
    // Prevent paste
    document.getElementById("terminal").addEventListener("paste", handlePaste);
    // Focus on click
    document.getElementById("terminal").addEventListener("click", clickFunction);
    // New line on enter
    document.getElementById("terminal").addEventListener("keydown", enterCheck);
    focusInput();
}

function clickFunction(e)
{
    //placeCaretAtEnd(document.getElementById("input"));
    focusInput();
}

// Disallow paste
function handlePaste (e)
{
    // Stop data being directly pasted into div
    e.stopPropagation();
    e.preventDefault();
}

// Focus on input line
function focusInput()
{
    document.getElementById("input").focus();
}

function enterCheck(e)
{
    // If we pressed enter...
    if (e.keyCode == 13)
    {
        // Line break since enter was pressed
        printToTerminal("<br>")

        // Get the command for the text entered
        getCommand(document.getElementById("input").textContent);

        // Make this line non-editable
        document.getElementById("input").contentEditable = false;
        // No longer a valid input, so set it to past input
        document.getElementById("input").setAttribute("id", "pastInput");
        
        // Append our line beginning again!
        printToTerminal(loc + //non-editable location
            "<span id='input' contenteditable='true'></span>");//editable text
        focusInput();
    } 
}

function placeCaretAtEnd(el) {
    el.focus();
    if (typeof window.getSelection != "undefined"
            && typeof document.createRange != "undefined") 
    {
        var range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    } 
    else if (typeof document.body.createTextRange != "undefined")
    {
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.collapse(false);
        textRange.select();
    }
}

function printToTerminal(htmlString)
{
    document.getElementById("terminal").innerHTML += htmlString;
}

function getCommand(text)
{
    output = ""
    whiteSpanBegin = "<span style='color:white'>";
    whiteSpanEnd = "</span>"

    switch(text)
    {
    case "help":
        output = "You have access to the following commands:<br>";
        break;
    // In an actual prompt, empty lines do nothing.
    case "":
        break;
    default:
        output = "Invalid command. Enter 'help' to view available commands.<br><br>";
        break;
    }
    printToTerminal(whiteSpanBegin + output + whiteSpanEnd);
}