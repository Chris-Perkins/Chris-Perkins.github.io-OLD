var loc = "chrisperkins:~$ ";
var ver = "1.0.6";

window.onload = function ()
{
    loadFunctions();

    // Prevent paste
    document.getElementById("terminal").addEventListener("paste", handlePaste);
    // Newline on enter press, focus input on keypress
    document.addEventListener("keydown", keyCheck);
    //document.getElementById("terminal").addEventListener("keydown", keyCheck);
    

    // Header message
    printToTerminal("<span style='color:white'>" + 
                        "ChrisPerkins.me - Home of your next Recruit [Version {0}]<br>".format(ver) +
                        "Current Status: Looking for Summer 2018 Internships<br>" +
                        "<br>" + 
                    "</span>");
    
    // Terminal line
    printToTerminal(loc +//non-editable location
            "<span id='input' contenteditable='true'></span>");//editable text
    
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

function keyCheck(e)
{
    // If we didn't type in the input box, force caret to end of line
    if (e.srcElement != document.getElementById("input"))
    {
        placeCaretAtInputEnd();
    }
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
    }
    focusInput();
}

function placeCaretAtInputEnd() {
    el = document.getElementById("input");

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

    if (text.toLowerCase().startsWith("help"))
    {
        output = "You have access to the following commands:<br>" +
                    "&nbsphelp - view available commands<br>" + 
                    "&nbspabout - tells you about me<br>" + 
                    "&nbspgithub - view my GitHub Link<br>" + 
                    "&nbspcontact - display my contact information<br>" +
                    "<br>";
    }
    // Do nothing.
    else if (text === "")
    {
    }
    // Otherwise, invalid command
    else
    {
        output = "'{0}' is an invalid command.<br>".format(text) +
                 "Enter 'help' to view a list of available commands.<br><br>";
    }

    printToTerminal(whiteSpanBegin + output + whiteSpanEnd);
}

function loadFunctions()
{
    // Create .format method
    if (!String.prototype.format)
    {
        String.prototype.format = function()
        {
            var args = arguments;
            return this.replace(/{(\d+)}/g, function(match, number)
            { 
                return typeof args[number] != 'undefined'
                ? args[number]
                : match
                ;
            });
        };
    }

    // Create "startsWith" function to check prefixes
    if (!String.prototype.startsWith) {
        String.prototype.startsWith = function(searchString, position){
            position = position || 0;
            return this.substr(position, searchString.length) === searchString;
        };
    }
}