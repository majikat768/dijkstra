var PseudocodeText = ["<span style=\"color: #0000ff;\">function<\/span> <span style=\"color: #ff0000;\">Dijkstra<\/span>(<span style=\"color: #33cccc;\">Graph<\/span>, <span style=\"color: #33cccc;\">source<\/span>):",
"<br \/>&nbsp;&nbsp;&nbsp;create a vertex queue <span style=\"color: #33cccc;\">Q<\/span>",
"<br \/> &nbsp;&nbsp;&nbsp;<span style=\"color: #ff00ff;\">for<\/span> each vertex <span style=\"color: #33cccc;\">v<\/span> in <span style=\"color: #33cccc;\">Graph<\/span>:",
"<br \/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;distance[<span style=\"color: #33cccc;\">v<span id=\"PSid1\"><\/span><\/span>] &larr; &infin;",
"<br \/> &nbsp;&nbsp;&nbsp;<span style=\"color: #33cccc;\">Q<\/span>.<span style=\"color: #ff0000;\">enqueue<\/span>(<span style=\"color: #33cccc;\">source<\/span>)",
"<br \/> &nbsp;&nbsp;&nbsp;<span style=\"color: #ff00ff;\">while<\/span> <span style=\"color: #33cccc;\">Q<\/span> is not empty:",
"<br \/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style=\"color: #33cccc;\">v\{<span id=\"PSid2\"><\/span>\}<\/span> &larr; <span style=\"color: #33cccc;\">Q<\/span>.<span style=\"color: #ff0000;\">dequeue<\/span>()",
"<br \/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style=\"color: #ff00ff;\">for<\/span> each neighbor <span style=\"color: #33cccc;\">n<\/span> of <span style=\"color: #33cccc;\">v\{<span id=\"PSid3\"><\/span>\}<\/span>:",
"<br \/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style=\"color: #33cccc;\">dist\{<span id=\"PSid10\"><\/span>\}<\/span> &larr; distance[<span style=\"color: #33cccc;\">v\{<span id=\"PSid4\"><\/span>\}<\/span>] + <span style=\"color: #ff0000;\">length<\/span>(<span style=\"color: #33cccc;\">v\{<span id=\"PSid5\"><\/span>\}<\/span>,<span style=\"color: #33cccc;\">n\{<span id=\"PSid6\"><\/span>\}<\/span>)",
"<br \/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style=\"color: #ff00ff;\">if<\/span> <span style=\"color: #33cccc;\">dist\{<span id=\"PSid11\"><\/span>\}<\/span> &lt; distance[<span style=\"color: #33cccc;\">n\{<span id=\"PSid7\"><\/span>\}<\/span>]:",
"<br \/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;distance[<span style=\"color: #33cccc;\">n\{<span id=\"PSid8\"><\/span>\}<\/span>] &larr; <span style=\"color: #33cccc;\">dist\{<span id=\"PSid12\"><\/span>\}<\/span>",
"<br \/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style=\"color: #33cccc;\">Q<\/span>.<span style=\"color: #ff0000;\">enqueue<\/span>(<span style=\"color: #33cccc;\">n\{<span id=\"PSid9\"><\/span>\}<\/span>)"];

var VarDict = {
    vUpper:["",[[3,"PSid1"]]],
   vLower:["vL",[[6,"PSid2"],[7,"PSid3"],[8,"PSid4"],[8,"PSid5"]]],
   n:["n",[[8,"PSid6"],[9,"PSid7"],[10,"PSid8"],[11,"PSid9"]]],
   dist:["",[[8,"PSid10"],[9,"PSid11"],[10,"PSid12"]]]
   };
/*
var VarDict = {
    n: [1,[[1,"id1"],[2,"id5"]]],
    k: [2,[[3,"id9"],[6,"id4"],[5,"id8"]]]
  };
  
  for(var key in VarDict) {
    var value = VarDict[key];
    console.log(value)
    let result = VarDict[key][0];
    console.log("result:"+result);
    let inner = VarDict[key][1];
    console.log(inner[0]);
    for(let i = 0; i<inner.length;i++){
      let lineNum = inner[i][0];
      let lineID = inner[i][1];
      
      console.log("linenum:"+lineNum+"lineID:"+lineID);
    }
  }
  */
 //more advanced way to do variables
