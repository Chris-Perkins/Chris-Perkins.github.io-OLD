var loc = "chrisperkins:~$ ";
var ver = "1.0.8";
var time = 25;
var curID = 0;

// When the document opens
window.onload = function ()
{
    loadFunctions();

    // Prevent paste
    document.getElementById("terminal").addEventListener("paste", handlePaste);
    // Newline on enter press, focus input on keypress
    document.addEventListener("keydown", keyCheck);
    
    launchSequence();
}

// Sequence that occurs when user 
function launchSequence()
{
    printToElement("<span style='color:white'>" + 
                    "ChrisPerkins.me - Home of your next Recruit [Version {0}]<br><br>".format(ver) +
                    "</span>", "terminal");
    
    time = 30;
    
    typeWriter("Hi, my name is Chris.<br>" + 
                "I'm currently looking for summer 2018 internships.<br><br>" +
                "I believe beauty lies in an overarching simplicity;<br>" + 
                "I believe the best code makes complex ideas simple.<br>" + 
                "Code should say and do more with less.<br><br>" + 
                "Enter 'help' to get started.<br><br>", "color:#f2ef48", printInputLine);
}

// Print the line for user input
function printInputLine()
{
    // Terminal line
    document.getElementById("terminal").innerHTML += "<span style='color:#50e077'>{0}</span>".format(loc)
    printToElement("<span id='input' contenteditable='true'></span>", "terminal");//editable text

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

// Focuses input area if it exists
// Otherwise, skips past dialogue animation
function keyCheck(e)
{
    // If a valid entry point exists...
    if (document.getElementById("input"))
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
            printToElement("<br>", "terminal");

            // Get the command for the text entered
            getCommand(document.getElementById("input").textContent);

            // Make this line non-editable
            document.getElementById("input").contentEditable = false;
            // No longer a valid input, so set it to past input
            document.getElementById("input").setAttribute("id", "pastInput");
            
            // Print next line of input
            printInputLine();
        }
        focusInput();
    }
    // If a valid entrypoint does not exist, skip dialogue.
    else
    {
        time = 0;
    }
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

// Custom type writer function
function typeWriter(text, style, endFunction)
{
    printToElement("<span id='{0}' style='{1}'></span>".format(curID, style), "terminal");
    typeWriterHelper(text, 0, "", curID, endFunction);
    curID += 1;
}

// Type writer function helper
// Prints text recursively at a set timer
// Parses out single tag html and adds to innerhtml separately.
function typeWriterHelper(text, n, currentHTMLString, id, endFunction)
{
    // extra time-out used on html tag end
    extraTimeOut = 0;

    // Base case: reached end of string
    // Alternate case: user skipped dialogue
    if (n === text.length || time === 0)
    {
        // Print remaining string if skipped
        printToElement(currentHTMLString + text.substr(n), id);

        endFunction();

        return;
    }
    else
    {
        // If not an html tag
        if (currentHTMLString == "")
        {
            // If start of tag
            if (text[n] == "<")
            {
                currentHTMLString += text[n];
            }
            else
            {
                printToElement(text[n], id);
            }
        }
        else
        {
            currentHTMLString += text[n];
            
            // If close an html string
            if (text[n] == ">")
            {
                printToElement(currentHTMLString, id);
                currentHTMLString = ""
                extraTimeOut = 200;
            }
        }
        setTimeout(function()
        {
            typeWriterHelper(text, n + 1, currentHTMLString, id, endFunction)
        }, time + extraTimeOut);
    }
}

// Add "htmlString" to element with id "id"
function printToElement(htmlString, id)
{
    document.getElementById(id).innerHTML += htmlString;
}

// Parse user input for command
function getCommand(text)
{
    if (text.toLowerCase().startsWith("help"))
    {
        output = "You have access to the following commands:<br>" +
                    "&nbsphelp - view available commands<br>" + 
                    "&nbspabout - tells you about me<br>" + 
                    "&nbspgithub - view my GitHub Link<br>" + 
                    "&nbspcontact - display my contact information<br>" +
                    "<br>";
    }
    else if (text.toLowerCase().startsWith("github"))
    {
        output = "<a href='https://github.com/Chris-Perkins' target='_blank'>" + 
                    "My GitHub Profile</a><br><br>"
    }
    else if (text.toLowerCase().startsWith("contact"))
    {
        output = "email - christopherpaulperkins@gmail.com<br>" + 
                 "phone number - (352)459-9716<br>" + 
                 "<i>&nbspIf not discussed prior, please email instead of calling.</i><br><br>"
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

    document.getElementById("terminal").innerHTML += "<span id={0} style='color:white'></span>".format(curID);
    printToElement(output, curID);

    // Increment curID
    curID += 1
}

// Load non-standard javascript functions
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