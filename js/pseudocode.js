//global array holding the current psudocode text
var CodeTextArr = [];


function PushText(text) 
{
    CodeTextArr.push(text);
}
function UpdateText()
{
    document.getElementById("codeList").innerHTML = CodeTextArr.join("<br>");
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