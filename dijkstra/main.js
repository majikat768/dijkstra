var table,
    graph,
    display;

// Redraw canvas on resize event. 
window.addEventListener('resize', function() { 
  display.draw({ graph: graph });
});

function init() {
	table = document.getElementById('graphTable');
	graph = new Graph();

  display = new Display({ 
    container: document.getElementById("sketch"),
    msg1: document.querySelector(".canvas-msg-1"),
    msg2: document.querySelector(".canvas-msg-2"),
    msg3: document.querySelector(".canvas-msg-3"),
    msg4: document.querySelector(".canvas-msg-4"),
    // Dependency injection so we can swap impl. later.
    solver: function(startNode, endNode, ourGraph) {
      let arrayOfNodeIDs = _solve(startNode, endNode, ourGraph);
      return arrayOfNodeIDs // E.G. [0, 1, 2, 3] // Would imply there is an edge
                                                 // from zero to one, from one
                                                 // to two, and from two to
                                                 // three.
    }
  });
  display.draw();
}

function SetNumberVertices(v) {
	let verts = parseInt(v);
	for(let i = 0; i < verts; i += 1) {
		graph.AddNode(new Node(i));
	}

  display.draw({ graph: graph })

	console.log("number of vertices set to " + v);
	let starts = document.getElementById("ChooseStart");
	for(let i = 0; i < verts; i += 1) {
		let opt = document.createElement("option");
		opt.value = i;
		opt.textContent = i;
		starts.append(opt);
	}

	document.getElementById('step2').style.display = 'block';

	let headRow = table.insertRow(0);
	headRow.insertCell(0);	

	let pathTable = document.getElementById("pathTable");
	pathTable.insertRow(0);
	pathTable.rows[0].insertCell(0).innerHTML = "vertex";
	pathTable.rows[0].insertCell(1).innerHTML = "distance";
	pathTable.rows[0].insertCell(2).innerHTML = "path";

	for(let i = 0; i < verts; i += 1) {
		let col = headRow.insertCell(i+1);
		col.innerHTML = i;
		pathTable.insertRow(i+1);
		pathTable.rows[i+1].insertCell(0).innerHTML = i;
		pathTable.rows[i+1].insertCell(1);
		pathTable.rows[i+1].insertCell(2);
		col.style.width = '40px';
		col.style.height = '40px';
		let newRow = table.insertRow(i+1);
		let c = newRow.insertCell(0);
		c.innerHTML = i;
		for(let j = 0; j < verts; j += 1) {
			let c = newRow.insertCell(j+1);
			c.style.width = '40px';
			c.style.height = '40px';
			if(i < j) {
				c.innerHTML = "<input type='text' size='1' class='edgeLen' value='-1'>";
			}
			else if(i == j){
				c.innerHTML = '';
			}
		}
	}
}

function AutoFill() {
	let v = table.rows.length-1;

	for(let i = 1; i < v+1; i += 1) {
		for(let j = i+1; j < v+1; j += 1) {
			let cell = table.rows[i].cells[j];
			if(i != j) {
				let box = cell.getElementsByClassName('edgeLen')[0];
				if(Math.random() < 0.35) {
					box.value = -1;
				}
				else {
					box.value = Math.floor(Math.random() * 10)+1;
				}
			}
		}
	}
}

function BuildGraph() {
	let v = table.rows.length-1;

	for(let i = 0; i < v; i += 1) {
		let n = graph.GetNode(i);
		for(let j = i+1; j < v; j += 1) {
			let cell = table.rows[i+1].cells[j+1];
			let len = cell.getElementsByClassName('edgeLen')[0].value;
			if(len != -1) {
				n.AddEdge(j,len);
				if(graph.GetNode(j) != -1) {
					graph.GetNode(j).AddEdge(n.id,len);
				}
			}
			cell.innerHTML = len;
			cell.style.width = '40px';
			cell.style.height = '40px';
			table.rows[j+1].cells[i+1].innerHTML = len;
		}
	}

  display.draw({ graph: graph })

	document.getElementById('step3').style.display = 'block';
}

function SetStartingVertex(start) {
	document.getElementById("step4").style.display = 'block';
	document.getElementById("startvert").innerText = start;
	let d = dijkstra(graph.GetNode(start));
  display.startNode(graph.GetNode(start));
}

function SetEndingVertex(end) {
	console.log("ending at: " + parseInt(end));
	document.getElementById("step5").style.display = 'block';
	document.getElementById("endvert").innerText = end;
  console.log("starting at " + document.getElementById("startvert"));
	let startnode = graph.GetNode(document.getElementById("startvert").innerText);
	let endnode = graph.GetNode(document.getElementById("endvert").innerText);
	let d = dijkstra(startnode,endnode);
  display.endNode(graph.GetNode(end));
}

