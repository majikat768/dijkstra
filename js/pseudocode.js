//global array holding the current psudocode text
var CodeTextArr = [];
var countA = 0;

function PushText(text) 
{
    CodeTextArr.push(text);
}
function UpdateText()
{
    //document.getElementById("codeList").innerHTML = textA.join("");
    document.getElementById("codeList").innerHTML = textA[countA];
    countA += 1;
}
function PopText()
{
    CodeTextArr.pop();
}


function PushTest()
{
    var testInput = document.getElementById("testText").value;
    PushText(testInput);
}
function PopTest()
{
    PopText();
}
function Test1()
{
    UpdateText();
}