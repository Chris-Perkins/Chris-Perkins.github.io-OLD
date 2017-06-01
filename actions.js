const loc = "chrisperkins:~$ ";
const ver = "2.0.0";
//global colors
const green = "#50e077";
const yellow = "#ede671";
const white = "white";
const red = "#ff5b5b"
// Typewriter speed if not defined
const timeConstant = 30;

// action keys (ctrl, shift, command, num lock... etc)
const actionKeycodes = [27, 16, 17, 18, 20, 144,
                        37, 38, 39, 40, 112, 113, 114,
                        115, 116, 117, 118, 119, 120,
                        121, 122, 123, 224, 91]

terminal = null;

// Current speed for typewriter
var time = 0
var curID = 0;
var overrideTypeWriter = false;

// All commands have a function and description
class Command 
{
    constructor(action, description)
    {
        this.action = function()
            {
                printToElementWithID("<span id={0} style='color:{1}'></span>".format(curID, white), "terminal");
                
                action();
            }
        this.description = description;
    }
}

// Valid user commands
const Commands = 
{
    "help": new Command(function() 
        {
            for(command in Commands)
            {
                printToElementWithID("<span style='color:{0}'>{1}</span> {2}<br>".format(
                                        yellow, command, Commands[command].description), curID);
            }
            printToElementWithID("<br>", curID);

            printInputLine();
            curID += 1;
        }, "Displays all commands and their descriptions"),

    "about": new Command(function()
        {
            printToElementWithID("<span style='color:{0}'><br>".format(yellow) + 
                                 "ADMIN'S AUTOBIOGRAPHY:<br>" + 
                                 "----------------------<br>" + 
                                 "</span>", curID);
            typeWriter([{"text": 
                            "Firstly, thank you for your interest! It means a lot. :)<br><br>" + 
                            "I am a junior computer science student at the University of Central Florida,<br>" + 
                            "and I have a passion for creative, efficient, and simple solutions.<br><br>" + 
                            "You can enter the command 'goals' to view my Computer Science goals for the year.<br><br>" + 
                            "All of my work so far has been based in Orlando, Florida.<br>" + 
                            "Despite this fact, I'm open to all options that are based in the United States.<br><br>" + 
                            "I am particularly interested in opportunities that would allow me to learn from and " + 
                            "contribute to a team's operations in a meaningful way.<br><br>",  
                        "style": 
                            "color:{0}".format(white)}],
                        function(){curID+=1;printInputLine();});
        }, "Tells you a little bit about me"),

    "contact": new Command(function()
        {
            printToElementWithID("email - christopherpaulperkins@gmail.com<br>" + 
                                 "phone number - (352)459-9716<br>" + 
                                 "<span style='color:{0}'>".format(yellow) + 
                                 "Note: I may not respond to phone calls as I may be in class or at work." + 
                                 "<br><br></span>", curID);
                
                curID += 1;
                printInputLine();
        }, "Displays my contact information"),

    "clean": new Command(function()
        {
            printToElementWithID("Cookies have been cleaned!<br><br>", curID);

            localStorage.clear();
            curID += 1;
            printInputLine();
        }, "cleans saved cookies"),

    "github": new Command(function()
        {
            printToElementWithID("<a href='https://github.com/Chris-Perkins' target='_blank'>" + 
                        "My GitHub Profile</a><br><br>", curID);

            curID += 1;
            printInputLine();
        }, 
        "Displays a clickable link to my GitHub account"),
    
    "goals": new Command(function()
        {
            
            printToElementWithID("<span style='color:{0}'><br>".format(yellow) + 
                                 "ADMIN MISSION LOG<br>" + 
                                 "-----------------<br>" + 
                                 "</span>", curID);
            curID += 1;
            typeWriter([{"text": 
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
                            "Join the UCF Programming Team<br><br>", 
                        "style": "color:{0}".format(white)}], 
                        function(){printInputLine();curID+=1;})
        }, "My goals for the year"),
        
    "resume": new Command(function()
        {
            printToElementWithID("<a href='' target='_blank'>" + 
                                 "My Resume</a><br><br>", curID);
            
            printInputLine();
            curID += 1;
        }, "Displays a clickable link to my resume (not yet active)")
}

// Get the command given the commandID
function getCommand(commandID)
{
    commandID = commandID.toLowerCase();
    // Do nothing on empty input
    if (commandID === "")
    {
        printInputLine();
    }
    else if (typeof Commands[commandID] === "undefined")
    {
        terminal.innerHTML += "<span id={0} style='color:{1}'></span>".format(curID, white);
        printToElementWithID("'{0}' is not a valid command.<br>".format(commandID) + 
                             " Enter 'help' to view a list of available commands.<br><br>", curID);
        printInputLine()
        curID += 1;
    }
    else
    {
        Commands[commandID].action();
    }
}

// When the document opens
window.onload = function ()
{
    terminal = document.getElementById("terminal");
    
    // Load external function
    loadFunctions();
    // Prevent paste
    terminal.addEventListener("paste", handlePaste);
    // Newline on enter press, focus input on keypress
    document.addEventListener("keydown", keyCheck);

    // Start launch sequence
    launchSequence();
}

// Sequence that occurs when user 
function launchSequence()
{
    printToElementWithID("<span style='color:{0}'>".format(white) + 
                         "ChrisPerkins.me - Home of your next Recruit [Version {0}]<br><br>".format(ver) +
                         "</span>", "terminal");

    if(!localStorage.visitCount)
    {
        typeWriter([{
                     "text": 
                        "ADMIN: CHRISTOPHER PERKINS<br>" + 
                        "STATUS: OPEN TO INTERNSHIP OPPORTUNITIES FOR SUMMER 2018<br><br>" +
                        "MISSION STATEMENT:<br>" + 
                        "Beauty lies in an overarching simplicity;<br>" + 
                        "The best code makes complex ideas simple.<br>" + 
                        "Code should say and do more with less.<br><br>" + 
                        "Enter 'help' to get started.<br><br>", 
                     "style": 
                        "color:{0}".format(yellow)
                    }], 
                   function(){curID+=1;printInputLine();});

        localStorage.visitCount = 1;
    }
    else
    {
        typeWriter(
                    [{
                        "text": 
                            "ADMIN: CHRISTOPHER PERKINS<br>" + 
                            "STATUS: OPEN TO INTERNSHIP OPPORTUNITIES FOR SUMMER 2018<br><br>" +
                            "MISSION STATEMENT:<br>" + 
                            "Beauty lies in an ove-<br><br>", 
                        "style": 
                            "color:{0}".format(yellow),
                        "time": 10
                    },
                    {
                        "text": 
                            " ...",
                            "style": 
                            "color:{0}".format(red),
                        "time": 1000
                    },
                    {
                        "text": 
                            "<br> Oh. You've been here before.",
                        "style": 
                            "color:{0}".format(red),
                        "time": 100
                    },
                    {
                        "text": 
                            "<br><br>Why not get in touch with me?<br>" + 
                            "Type '",
                        "style":
                            "color:{0}".format(white)
                    },
                    {
                        "text": 
                            "contact",
                        "style":
                            "color:{0}".format(yellow)
                    },
                    {
                        "text": "' to view my contact details.<br>" + 
                            "Otherwise, type '",
                      "style":
                            "color:{0}".format(white)
                    },
                    {
                        "text": 
                            "help",
                        "style":
                            "color:{0}".format(yellow)
                    },
                    {
                        "text":
                            "' to view all available commands.<br><br>",
                        "style":
                            "color:{0}".format(white)
                    }], 
                    function(){curID+=1;printInputLine();});

        localStorage.visitCount += 1;
    }
}

// Add "htmlString" to element with id "id"
function printToElementWithID(htmlString, id)
{
    document.getElementById(id).innerHTML += htmlString;
}

// Custom type writer function
function typeWriter(array, endFunction)
{   
    typeWriterHelper(array, 0, 0, "", curID, endFunction);
}

// Type writer function helper
// Prints text recursively at a set timer
// Parses out single tag html and adds to innerhtml separately.
// "<", ">"" define an html bracket
function typeWriterHelper(printArray, arrayIndex, strIndex, 
                          currentSavedString, id, endFunction)
{
    // Base case: went through all array indices
    if (arrayIndex == printArray.length)
    {
        endFunction();
        return;
    }

    // On first strIndex, create our span and set time
    if (strIndex == 0)
    {
        printToElementWithID("<span id={0} style='{1}'></span>".format(id, printArray[arrayIndex]["style"]), "terminal")
        curID += 1;
        
        time = printArray[arrayIndex]["time"]||timeConstant;
    }

    document.getElementById(id).scrollIntoView(true);

    // extra time-out used on html tag end
    extraTimeOut = 0;


    // Base case 2: reached end of string
    // Alternate case: user skipped dialogue
    if (strIndex === printArray[arrayIndex]["text"].length || overrideTypeWriter)
    {
        printToElementWithID(currentSavedString + printArray[arrayIndex]["text"].substr(strIndex), id);

        typeWriterHelper(printArray, arrayIndex + 1, 0, "", curID, endFunction);
    }
    else
    {
        // If not an html tag
        if (currentSavedString == "")
        {
            if (printArray[arrayIndex]["text"][strIndex] == "<")
            {
                currentSavedString += printArray[arrayIndex]["text"][strIndex];
            }
            else
            {
                printToElementWithID(printArray[arrayIndex]["text"][strIndex], id);
            }
        }
        else
        {
            currentSavedString += printArray[arrayIndex]["text"][strIndex];
            
            // If close an html string
            if (printArray[arrayIndex]["text"][strIndex] == ">")
            {
                printToElementWithID(currentSavedString, id);
                currentSavedString = "";
                extraTimeOut = time * 15;
            }
        }
        setTimeout(function()
        {
            typeWriterHelper(printArray, arrayIndex, strIndex + 1, currentSavedString, id, endFunction)
        }, time + extraTimeOut);
    }
}

// Print the line for user input
function printInputLine()
{
    // We know typeWriter has ended when this is called.
    overrideTypeWriter = false;

    // Terminal line
    terminal.innerHTML += "<span style='color:{0}'>{1}</span>".format(green, loc)
    printToElementWithID("<span id='input' contenteditable='true'></span>", "terminal");//editable text

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

// Focuses input area if it exists
// Otherwise, skips past dialogue animation
function keyCheck(e)
{
    if (actionKeycodes.indexOf(e.keyCode) == -1)
    {
        inputElement = document.getElementById("input");
        // If a valid entry point exists...
        if (inputElement)
        {
            // If we didn't type in the input box, force caret to end of line
            if (e.srcElement != inputElement)
            {
                placeCaretAtInputEnd();
            }
            // If we pressed enter...
            if (e.keyCode == 13)
            {
                // Line break since enter was pressed
                printToElementWithID("<br>", "terminal");

                // Make this line non-editable
                document.getElementById("input").contentEditable = false;
                // No longer a valid input, so set it to past input
                document.getElementById("input").setAttribute("id", "pastInput");

                getCommand(inputElement.textContent);
            }
        }
        // If a valid entrypoint does not exist, skip dialogue.
        else
        {
            overrideTypeWriter = true;
        }
    }
}

// Focus on input line
function focusInput()
{
    document.getElementById("input").focus();
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