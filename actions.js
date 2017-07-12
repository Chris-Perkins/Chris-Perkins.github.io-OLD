const loc = "recruitor@CHRIS:~$ ";
const ver = "4.2.1";
//global colors
const green = "#50e077";
const yellow = "#ede671";
const white = "white";
const red = "#ff5b5b";
// Typewriter speed if not defined
const timeConstant = 30;
// Whether we have LocalStorage permissions
var localStorageAccess = false;
// action keys (ctrl, shift, command, num lock... etc)
const actionKeycodes = [27, 16, 17, 18, 20, 144,
                        37, 38, 39, 40, 112, 113, 114,
                        115, 116, 117, 118, 119, 120,
                        121, 122, 123, 224, 91];
// Punctuation marks
const punctuation = [",", ".", "!", "?", ":", ";"];
// Current speed for typewriter
var time = 0;
// Skip typewriter
var overrideTypeWriter = false;
var curID = 0;
var terminal = null;

/* !-- COMMAND DECLARATIONS --! */

// Format of command: TYPE: Description_String
const commandTypes = {
                        PERSONAL: "Get to Know Me Better",
                        LINK: "External Links",
                        MISC: "Miscellaneous Commands", 
                     };

// All commands have a function and description
class Command 
{
    constructor(action, description, commandType)
    {
        this.action = action;
        this.description = description;
        this.commandType = commandType;
    }
}

// Valid user commands
const Commands = 
{
    "help": new Command(function() 
        {
            printToElementWithID("<span id={0} style='color:{1}'></span>".format(curID, white),
                                 "terminal");
            
            // First create a dictionary of command types with empty arrays as values
            dict_commands = {};
            for (commandType in commandTypes)
            {
                dict_commands[commandTypes[commandType]] = [];
            }

            // Go through every command, append it to the corresponding commany type array
            for(command in Commands)
            {
                dict_commands[Commands[command].commandType].push(command);
            }

            // Print out every command type and it's corresponding commands
            for (commandType in commandTypes)
            {
                // Dashed line between command type description and actual commands
                separateLine = "";
                for (index in commandTypes[commandType]){separateLine += "-"};

                printToElementWithID("<div style='color:{0}'>{1}<br>{2}<br></span>".format(
                                     yellow, commandTypes[commandType], separateLine), curID);
                
                for (index in dict_commands[commandTypes[commandType]])
                {
                    command = dict_commands[commandTypes[commandType]][index];
                    printToElementWithID("<span style='color:{0}'>{1}</span> {2}<br>".format(
                                         yellow, command, Commands[command].description), curID);
                }
                printToElementWithID("<br>", curID);
            }
            printToElementWithID("<br>", curID);

            curID += 1;
            printInputLine();
        }, "Displays all commands and their descriptions", commandTypes.MISC),

    "about": new Command(function()
        {
            printToElementWithID("<span id={0} style='color:{1}'></span>".format(curID, white),
                                 "terminal");
            printToElementWithID("<span style='color:{0}'><br>".format(yellow) + 
                                 "ADMIN'S AUTOBIOGRAPHY:<br>" + 
                                 "----------------------<br>" + 
                                 "</span>", curID);
            curID += 1;

            typeWriter([{
                            "text": 
                                "Firstly, thank you for your interest! It means a lot. :)<br>" +
                                "<br>" +  
                                "I am a junior computer science student at the University of Central Florida,<br>" +
                                "and I am a member of the Burnett Honors College and admittant to the accelerated BS to MS program.<br>" +
                                "<br>" +  
                                "More importantly, I have a passion for creative, efficient, and simple solutions.<br>" + 
                                "I've recently come to love building applications such as EyeBot, Spot my New Song, or Shadobot.<br>" + 
                                "These applications can be viewed on my GitHub.<br>" + 
                                "<br>",
                            "style": 
                                "color:{0}".format(white)
                        },
                        {
                            "text":
                                "I also like breaking things...",
                            "style":
                                "color:{0}".format(red),
                            "time":
                                150
                        },
                        {
                            "text":
                                "<br>In a good way!<br>" +
                                "When put on a project, I first like to break everything to figure it out.<br>" +
                                "<br>" +  
                                "All of my work so far has been based in Orlando, Florida.<br>" + 
                                "Despite this fact, I'm open to all options that are based in the United States.<br>" +
                                "<br>" +  
                                "I am particularly interested in opportunities that would allow me to learn from and " + 
                                    "contribute to a team's operations in a meaningful way.<br>" +
                                "<br>",
                            "style":
                                "color:{0}".format(white)
                        },
                        {
                            "text":
                                "... Did I mention I bring doughnuts to the office? :)<br><br>",
                            "style":
                                "color:{0}".format(yellow),
                            "time":
                                timeConstant * 2
                        }],
                        printInputLine);
        }, "Tells you a little bit about me", commandTypes.PERSONAL),

    "clean": new Command(function()
        {
            printToElementWithID("<span id={0} style='color:{1}'></span>".format(curID, white),
                                 "terminal");

            if(localStorageAccess)
            {
                localStorage.clear();
                printToElementWithID("Cookies have been cleaned!<br><br>", curID);
            }
            else
            {
                printToElementWithID("There are no cookies to clean.<br><br>", curID);
            }

            curID += 1;
            printInputLine();
        }, "cleans saved cookies", commandTypes.MISC),

    "clear": new Command(function()
        {
            terminal.innerHTML = "";
            printInputLine();
        }, "clears the screen", commandTypes.MISC),

    "contact": new Command(function()
        {
            printToElementWithID("<span id={0} style='color:{1}'></span>".format(curID, white),
                                 "terminal");
            
            printToElementWithID("email - christopherpaulperkins@gmail.com<br>" +
                                 "phone number - (352)459-9716<br>" +  
                                 "<span style='color:{0}'>".format(yellow) + 
                                 "Note: I may not respond to phone calls as I don't answer at class or at work." + 
                                 "<br><br></span>", curID);
                
                curID += 1;
                printInputLine();
        }, "Displays my contact information", commandTypes.PERSONAL),

    "github": new Command(function()
        {
            printToElementWithID("<span id={0} style='color:{1}'></span>".format(curID, white),
                                 "terminal");
            
            printToElementWithID("<a href='https://github.com/Chris-Perkins' target='_blank'>" + 
                                 "My GitHub Profile</a><br><br>", curID);

            curID += 1;
            printInputLine();
        }, 
        "Displays a clickable link to my GitHub account", commandTypes.LINK),
    
    "goals": new Command(function()
        {
            typeWriter([
                        {
                            "text": 
                                "Complete:<br>" + 
                                "---------<br>", 
                            "style": 
                                "color:{0}".format(yellow)
                        },
                        {
                            "text":
                                "Learn Python<br>" + 
                                "Learn about hybrid and native mobile development<br>" + 
                                "Participate in my first hackathon<br>" +
                                "'Spot my New Song' project<br>" + 
                                "Complete Stanford University's machine learning course<br>", 
                            "style":
                                "color:{0}".format(white),
                        },
                        {
                            "text":
                                "<br>" + 
                                "In Progress:<br>" + 
                                "------------<br>",
                            "style":
                                "color:{0}".format(yellow)
                        },
                        {
                            "text":
                                "Complete Princeton University's Algorithms I course<br>" + 
                                "Complete 800 Codeforces problems (425+/800)<br>",
                            "style":
                                "color:{0}".format(white),

                        },
                        {
                            "text":
                                "<br>" + 
                                "To-Do:<br>" + 
                                "------<br>",
                            "style":
                                "color:{0}".format(yellow)
                        },
                        {
                            "text":
                                "Complete Stanford's Databases course<br>" + 
                                "Join the UCF programming team<br>" + 
                                "'Lift Buddy', an iOS application to help with gym tracking<br>" +  
                                "<br>",
                            "style":
                                "color:{0}".format(white)
                        }], 
                        printInputLine);
        }, "My personal computer-science goals", commandTypes.PERSONAL),
        
    "resume": new Command(function()
        {
            printToElementWithID("<span id={0} style='color:{1}'></span>".format(curID, white),
                                 "terminal");
            printToElementWithID("<a href='Chris-Perkins-Resume.pdf' target='_blank'>" + 
                                 "My Resume" + 
                                 "</a><br><br>", curID);
            curID += 1;
            printInputLine();
        }, "Displays a clickable link to my resume", commandTypes.LINK),
    "skills": new Command(function()
        {
            typeWriter([
                {
                    "text":
                        "Languages:<br>" + 
                        "----------<br>",
                    "style":
                        "color:{0}".format(yellow)
                },
                {
                    "text":
                        "Python Java C C++ C# " +
                        "Objective-C Swift SQL " +
                        "Javascript HTML CSS",
                    "style":
                        "color:{0};word-spacing:10px".format(white),
                    "time":
                        timeConstant * 2
                },
                {
                    "text":
                        "<br><br>" + 
                        "Tools:<br>" + 
                        "------<br>",
                    "style":
                        "color:{0}".format(yellow)
                },
                {
                    "text":
                        "Git AccuRev XCode Android_Studio " + 
                        "Unity Angular.js Node.js Cordova",
                    "style":
                        "color:{0};word-spacing:10px".format(white),
                    "time":
                        timeConstant * 2
                },
                {
                    "text":
                        "<br><br>" + 
                        "Miscellaneous Technologies<br>" + 
                        "--------------------------<br>",
                    "style":
                        "color:{0}".format(yellow)
                },
                {
                    "text":
                        "PhotoShop After_Effects Illustrator Word PowerPoint Excel Mac Windows<br><br>",
                    "style":
                        "color:{0};word-spacing:10px".format(white),
                    "time":
                        timeConstant * 2
                }],
                printInputLine)
        }, "Displays a list of my core skills", commandTypes.PERSONAL)
}

function getCommand(commandID)
{
    commandID = commandID.toLowerCase();
    // Do nothing on empty input to replicate terminal behavior
    if (commandID === "")
    {
        printInputLine();
    }
    else if (typeof Commands[commandID] === "undefined")
    {
        printToElementWithID("<span id={0} style='color:{1}'></span>".format(curID, white),
                                "terminal");
        printToElementWithID("'{0}' is not a valid command.<br> ".format(commandID) + 
                             "Enter '<span style='color:{0}'>help</span>' ".format(yellow) +
                             "to view a list of available commands.<br><br>", curID);

        curID += 1;
        printInputLine();
    }
    else
    {
        Commands[commandID].action();
    }
}

/* !-- ON START FUNCTIONS --! */

// Entry-point
window.onload = function ()
{
    localStorageAccess = determineLocalStorageAccess();

    terminal = document.getElementById("terminal");
    // wipe out html to remove default page that displays if JS could not load
    // If you want to see this page, just load it in internet explorer.
    terminal.innerHTML = "";
    
    loadFunctions();
    // Prevent paste
    terminal.addEventListener("paste", handlePaste);
    // If on mobile, click = skip dialogue or focus input box.
    terminal.addEventListener("click", clickMobileHandler);
    // Newline on enter press, focus input on keypress
    document.addEventListener("keydown", keyCheck);

    launchSequence();
}

// Sequence that occurs when user's javascript runs properly 
function launchSequence()
{
    mobileString = "<span style='color:{0}'>".format(yellow) + 
                    "You're on a mobile device! Please click anywhere to begin typing<br>" + 
                    "(If on iOS Safari, you need to click next to the '$' symbol to begin).<br><br>"
                    "<br><br></span>".format(white)

    printToElementWithID("<span style='color:{0}'>".format(white) + 
                         "ChrisPerkins.me - Home of your next Recruit [Version {0}]<br><br>".format(ver) +
                         "</span>", "terminal");

    if(!localStorageAccess || !localStorage.visitCount)
    {
        typeWriter([{
                     "text": 
                        "ADMIN: CHRISTOPHER PERKINS<br>" + 
                        "STATUS: OPEN TO INTERNSHIP OPPORTUNITIES FOR SUMMER 2018<br>" +
                        "<br>" + 
                        "MISSION STATEMENT:<br>" + 
                        "Beauty lies in an overarching simplicity;<br>" + 
                        "The best code makes complex ideas simple.<br>" + 
                        "Code should say and do more with less.<br>" + 
                        "<br>", 
                     "style": 
                        "color:{0}".format(yellow)
                    },
                    {
                        "text":
                            "Enter '",
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
                            "' to get started.<br><br>",
                        "style":
                            "color:{0}".format(white)
                    }], 
                   function()
                   {
                        if (mobileAndTabletcheck())
                        {
                           printToElementWithID(mobileString, "terminal")
                        }

                       printInputLine();
                    });
        
        if (localStorageAccess)
        {
            localStorage.visitCount = 1;
        }
    }
    else
    {
        typeWriter(
                    [{
                        "text": 
                            "ADMIN: CHRISTOPHER PERKINS<br>" + 
                            "STATUS: OPEN TO INTERNSHIP OPPORTUNITIES FOR SUMMER 2018<br>" +
                            "<br>" + 
                            "MISSION STATEMENT:<br>" + 
                            "Beauty lies in an ove-<br>" + 
                            "<br>", 
                        "style": 
                            "color:{0}".format(yellow),
                        "time": 
                            10
                    },
                    {
                        "text": 
                            " ...",
                            "style": 
                            "color:{0}".format(red),
                        "time": 
                            500
                    },
                    {
                        "text": 
                            "<br> Oh. You've been here before.",
                        "style": 
                            "color:{0}".format(red),
                        "time": 
                            75
                    },
                    {
                        "text": 
                            "<br><br>Why not get in touch with me?<br>" + 
                            "Enter '",
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
                        "text": 
                            "' to view my contact details,<br>" + 
                            "or enter '",
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
                    function()
                    {
                        if (mobileAndTabletcheck())
                        {
                           printToElementWithID(mobileString, "terminal")
                        }

                       printInputLine();
                    });
        
        localStorage.visitCount += 1;
    }
}

/* !-- PRINTING FUNCTIONS --! */

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

// doubly-recursive function to print text in an array
// "<", ">"" define an html bracket
function typeWriterHelper(printArray, arrayIndex, strIndex, 
                          currentSavedString, id, endFunction)
{
    // Base case 1: went through all array indices
    if (arrayIndex == printArray.length)
    {
        endFunction();
        return;
    }
    // On first strIndex, create our span and set time
    if (strIndex == 0)
    {
        printToElementWithID("<span id={0} style='{1}'>".format(id, printArray[arrayIndex]["style"]) +
                             "</span>", "terminal");
        curID += 1;
        
        time = printArray[arrayIndex]["time"]||timeConstant;
    }
    // Base case 2: reached end of string
    // Alternate case: user skipped dialogue
    if (strIndex === printArray[arrayIndex]["text"].length || overrideTypeWriter)
    {
        printToElementWithID(currentSavedString + 
                             printArray[arrayIndex]["text"].substr(strIndex), id);
        // Move to next array index
        typeWriterHelper(printArray, arrayIndex + 1, 0, "", curID, endFunction);

        return;
    }

    var objDiv = document.getElementById("terminal");
    objDiv.scrollTop = objDiv.scrollHeight;

    // extra time-out used on html tag end
    extraTimeOut = 0;

    // If not an html tag
    if (currentSavedString == "")
    {
        if (printArray[arrayIndex]["text"][strIndex] == "<")
        {
            currentSavedString += printArray[arrayIndex]["text"][strIndex];
        }
        else
        {
            // If we printed a punctuation mark
            if(punctuation.indexOf(printArray[arrayIndex]["text"][strIndex]) != -1)
            {
                extraTimeOut += 200
            }

            printToElementWithID(printArray[arrayIndex]["text"][strIndex], id);
        }
    }
    else
    {
        currentSavedString += printArray[arrayIndex]["text"][strIndex];
        
        // Skip timed print while parsing through html bracket
        extraTimeOut = -time
        // If close an html string
        if (printArray[arrayIndex]["text"][strIndex] == ">")
        {
            printToElementWithID(currentSavedString, id);
            currentSavedString = "";

            // On end of html bracket, take extra time
            // Gives feeling of proper typing on <br>
            extraTimeOut = time * 15;
        }
    }
    setTimeout(function()
    {
        typeWriterHelper(printArray, arrayIndex, strIndex + 1, 
                            currentSavedString, id, endFunction)
    }, time + extraTimeOut);

    return;
}

// Print the line for user input
function printInputLine()
{
    // We know typeWriter has ended when this is called.
    overrideTypeWriter = false;

    // Terminal line
    terminal.innerHTML += "<span style='color:{0}'>{1}</span>".format(green, loc)
    printToElementWithID("<span id='input' contenteditable='true'></span>", 
                         "terminal");//editable text

    document.getElementById("input").scrollIntoView(true);
    focusInput();
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

/* !-- EVENT LISTENER FUNCTIONS --! */

// handle paste as plain text
function handlePaste (e)
{
    // Stop data being directly pasted into div
    e.preventDefault();

    var text = e.clipboardData.getData("text/plain")
    // insert text manually
    document.execCommand("insertHTML", false, text);
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

function clickMobileHandler()
{
    if (mobileAndTabletcheck())
    {
        inputElement = document.getElementById("input");
        // If a valid entry point exists, we do not skip.
        if (inputElement)
        {
            focusInput();
        }
        else
        {
            overrideTypeWriter = true;
        }
    }
}

/* !-- HELPER FUNCTIONS --! */

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
    if (!String.prototype.startsWith)
    {
        String.prototype.startsWith = function(searchString, position)
        {
            position = position || 0;
            return this.substr(position, searchString.length) === searchString;
        };
    }
}

// Detect mobile browser. Found at:
// https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
window.mobileAndTabletcheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

// Determine if we have access to localstorage
function determineLocalStorageAccess()
{
    var mod = "test"
    try
    {
        localStorage.setItem(mod, mod);
        localStorage.removeItem(mod);
        return true;
    }
    catch(e)
    {
        return false;
    }
}
