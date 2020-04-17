//global array holding the current psudocode text
var CodeTextArr = [];
var countA = 0;

//stores which lines are displayed in the psudocode text
var DisplayLines = [false,false,false,false,false,false,false,false,false,false,false,false];
//stores which variable is on which line and which id

function PushText(text) 
{
    CodeTextArr.push(text);
}
/*
Causes the [a-b] lines to be displayed or not next time UpdateText is called, display can be set to true or false
*/
function DisplayRange2(a,b,isDisplayed)
{
    //Silently handle out of bounds errors by reseting to edge, a<=b is assumed
    if(a < 0) a = 0;
    if(b > DisplayLines.length) b = DisplayLines.length;

    for(let i = a; i<=b;i+=1)
    {
        console.log("Displaying:"+i);
        DisplayLines[i] = isDisplayed;
    }
    console.log(DisplayLines);
}
/*
Causes the [a-b] lines to be displayed or not next time UpdateText is called, display can be set to true or false
*/
function DisplayRange(n)
{
    document.getElementById("codeList").innerHTML = "<p>";
    for(let i = 0; i<12;i+=1)
    {
        DisplayLines[i] = false;
    }
    //Silently handle out of bounds errors by reseting to edge, a<=b is assumed
    for(let i = 0; i<=n;i+=1)
    {
        console.log("Displaying:"+i);
        DisplayLines[i] = true;
        document.getElementById("codeList").innerHTML += PseudocodeText[i];

    }
    document.getElementById("codeList").innerHTML += "<\/p>";
    UpdateVar();
}
/*
Updates text displayed at the bottom of screen with the lines in PseudocodeText that have the same
line number set to true on DisplayLines
*/
function UpdateText()
{
    //document.getElementById("codeList").innerHTML = textA.join("");
    //reset html area to clear
    document.getElementById("codeList").innerHTML = "";
    for(let i = 0; i<PseudocodeText.length;i+=1)
    {
        if(DisplayLines[i] === true)
        {
            document.getElementById("codeList").innerHTML += PseudocodeText[i];
        }
    }
    UpdateVar();
}
/*
updates all the variables throughout the code
*/
function UpdateVar()
{
    for(var key in VarDict) {
        console.log("Key:"+key);
        let result = VarDict[key][0];
        console.log("Result:"+result);
        let inner = VarDict[key][1];
        console.log("Inner:"+inner);
        for(let i = 0; i<inner.length;i++){
          let lineNum = inner[i][0];
          let lineID = inner[i][1];
          console.log("LineNo:"+lineNum+" LineID:"+lineID);
          //if the line is being shown, update the relevent variable at that location
          if(DisplayLines[lineNum])
          {
            console.log("DisplayLine:"+DisplayLines[lineNum]);
            document.getElementById(lineID).innerHTML = result;
            console.log("Updated variable:"+key+"at"+lineID+"with the value"+result);
          }

        }
      }
}
/*
Sets the variable with its given value
vUpper,
vLower,
n
*/
function SetVar(varname,value)
{
    console.log("Updated "+varname+"with the value"+value);
    VarDict[varname][0] = value;
}
function PopText()
{
    CodeTextArr.pop();
}
var counter = 0;
function PushTest()
{
    var testInput = document.getElementById("testText").value;
    SetVar("vUpper",testInput);
    SetVar("vLower",testInput);
    SetVar("n",testInput);
    counter += 1;
    DisplayRange(counter%12);

}
function PopTest()
{
    counter -= 2;
    DisplayRange(counter%12);
}
function Test1()
{
    DisplayRange(0,11,true);
    UpdateText();
}