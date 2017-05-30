loc = "chrisperkins:~$ ";
ver = "1.0.9";
//global colors
yellow = "#f2ef48";
white = "white";
red = "#ff5b5b"
// Speed on typewriter call
timeConstant = 30;

// Current speed for typewriter
var time = 0
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
    printToElement("<span style='color:{0}'>".format(white) + 
                    "ChrisPerkins.me - Home of your next Recruit [Version {0}]<br><br>".format(ver) +
                    "</span>", "terminal");
    
    typeWriter("ADMIN: CHRISTOPHER PERKINS<br>" + 
                "STATUS: OPEN TO INTERNSHIP OPPORTUNITIES FOR SUMMER 2018<br><br>" +
                "MISSION STATEMENT:<br>" + 
                "Beauty lies in an overarching simplicity;<br>" + 
                "The best code makes complex ideas simple.<br>" + 
                "Code should say and do more with less.<br><br>" + 
                "Enter 'help' to get started.<br><br>", "color:{0}".format(yellow), printInputLine);
}

// Add "htmlString" to element with id "id"
function printToElement(htmlString, id)
{
    document.getElementById(id).innerHTML += htmlString;
}

// Custom type writer function
function typeWriter(text, style, endFunction)
{
    // Set time to timeContant (last dialogue may have been skipped)
    time = timeConstant;
    // Create a new element
    printToElement("<span id='{0}' style='{1}'></span>".format(curID, style), "terminal");
    
    typeWriterHelper(text, 0, "", curID, function()
                                        {
                                            endFunction();
                                            curID += 1;
                                        });
    
    // Scrolls to the element the type writer is typing to.
    document.getElementById(curID).scrollIntoView(true);
}

// Type writer function helper
// Prints text recursively at a set timer
// Parses out single tag html and adds to innerhtml separately.
function typeWriterHelper(text, n, currentHTMLString, id, endFunction)
{
    // Possibility of <br> string, scroll
    document.getElementById(curID).scrollIntoView(true);

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

// Print the line for user input
function printInputLine()
{
    // Terminal line
    document.getElementById("terminal").innerHTML += "<span style='color:#50e077'>{0}</span>".format(loc)
    printToElement("<span id='input' contenteditable='true'></span>", "terminal");//editable text

    document.getElementById("input").scrollIntoView(true);
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
        }
    }
    // If a valid entrypoint does not exist, skip dialogue.
    else
    {
        time = 0;
    }
}

// Place the input caret to the end of input
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

// Parse user input for command
function getCommand(text)
{
    // span for new print
    document.getElementById("terminal").innerHTML += 
            "<span id={0} style='color:{1}'></span>".format(curID, white);
    prevID = curID;
    
    curID += 1;
    
    if (text.toLowerCase().startsWith("about"))
    {
        typeWriter("ABOUT THE AUTHOR:<br>" + 
                   "-----------------<br>" + 
                    "Firstly, thank you for your interest! It means a lot. :)<br><br>" + 
                    "I'm a junior computer science student at the University of Central Florida,<br>" + 
                    "and I have a passion for creative, efficient, and simple solutions.<br><br>" + 
                    "In the next year, I plan to accomplish the following:<br><br>" + 
                    "Complete:<br>" + 
                    "Learn Python<br>" + 
                    "Learn about Hybrid and Native mobile Development<br>" + 
                    "Learn about SalesForce<br>" + 
                    "Participate in my first hackathon<br>" +
                    "<br>" + 
                    "In Progress:<br>" + 
                    "Complete 800 CodeForces Problems (300/800)<br>" + 
                    "Complete the Coursera Machine Learning Course<br>" +
                    "<br>" + 
                    "To-Do:<br>" + 
                    "Complete the Coursera Algorithms I Course<br>" + 
                    "Complete the Stanford Databases Course<br>" + 
                    "Join the UCF Programming Team<br>" + 
                    "<br>" + 
                    "All of my work so far has been based in Orlando, Florida.<br>" + 
                    "Despite this fact, I'm open to all options that are based in the United States.<br>" + 
                    "I'm particularly looking for opportunities that would allow me to learn from and " + 
                    "contribute to a team's operations in a meaningful way.<br><br>"
                    , "color:{0}".format(white), printInputLine);
    }
    else if (text.toLowerCase().startsWith("contact"))
    {
        printToElement("email - christopherpaulperkins@gmail.com<br>" + 
                        "phone number - (352)459-9716<br>", prevID);
        
        typeWriter("Note: I may not respond to phone calls as I may be in class or at work.<br><br>", 
                   "color:{0};font-style:italic".format(yellow), printInputLine);

    }
    else if (text.toLowerCase().startsWith("help"))
    {
        printToElement("You have access to the following commands:<br>" +
                       "&nbsphelp - view available commands<br>" + 
                       "&nbspabout - tells you about me<br>" + 
                       "&nbspgithub - view my GitHub Link<br>" + 
                       "&nbspcontact - display my contact information<br>" +
                       "<br>", prevID);
        
        printInputLine();
    }
    else if (text.toLowerCase().startsWith("github"))
    {
        printToElement("<a href='https://github.com/Chris-Perkins' target='_blank'>" + 
                        "My GitHub Profile</a><br><br>", prevID);

        printInputLine();
    }
    else if (text.toLowerCase().startsWith("resume"))
    {
        printToElement("<a href='' target='_blank'>" + 
                        "My Resume</a><br><br>", prevID);
        printInputLine();
    }
    // Do nothing.
    else if (text === "")
    {
        printInputLine();
    }
    // Otherwise, invalid command
    else
    {
        printToElement("'{0}' is an invalid command.<br>".format(text) +
                        "Enter 'help' to view a list of available commands.<br><br>", prevID);
        
        printInputLine();
    }
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