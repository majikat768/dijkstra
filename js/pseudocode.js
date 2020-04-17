//global array holding the current psudocode text
var CodeTextArr = [];
var countA = 0;

//stores which lines are displayed in the psudocode text
var DisplayLines = [false,false,false,false,false,false,false,false,false,false,false,false];
function PushText(text) 
{
    CodeTextArr.push(text);
}
/*
Causes the [a-b] lines to be displayed or not next time UpdateText is called
*/
function DisplayRange(a,b,display)
{
    //Silently handle out of bounds errors by reseting to edge, a<=b is assumed
    if(a < 0) a = 0;
    if(b > DisplayLines.length) b = DisplayLines.length;

    for(let i = a; i<=b;i+=1)
    {
        DisplayLines[i] = display;
    }
}
/*
Updates text displayed at the bottom of screen with the lines in PseudocodeText that have the same
line number set to true on DisplayLines
*/
function UpdateText()
{
    //document.getElementById("codeList").innerHTML = textA.join("");
    //reset html area to clear
    document.getElementById("codeList").innerHTML = " ";
    for(let i = 0; i<PseudocodeText.length;i+=1)
    {
        if(DisplayLines[i] === true)
        {
            document.getElementById("codeList").innerHTML += PseudocodeText[i];
        }
    }
}
function PopText()
{
    CodeTextArr.pop();
}

function PushTest()
{
    var testInput = document.getElementById("testText").value;
    document.getElementById("testS").innerHTML = testInput;
}
function PopTest()
{
    PopText();
}
function Test1()
{
    DisplayRange(0,11,true);
    UpdateText();
}