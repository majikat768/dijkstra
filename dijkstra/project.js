let table,graph;
function init() {
	table = document.getElementById('graphTable');
	console.log(table);
	graph = new Graph();
}

function SetNumberVertices(v) {
	let verts = parseInt(v);
	console.log("number of vertices set to " + v);
	let starts = document.getElementById("ChooseStart");
	let ends = document.getElementById("ChooseEnd");
	for(let i = 1; i < verts+1; i += 1) {
		let opt = document.createElement("option");
		opt.value = i;
		opt.textContent = i;
		starts.append(opt);
	}

	document.getElementById('step2').style.display = 'block';

	let headRow = table.insertRow(0);
	headRow.insertCell(0);	

	for(let i = 1; i < verts+1; i += 1) {
		headRow.insertCell(i).innerHTML = i;
		let newRow = table.insertRow(i);
		let c = newRow.insertCell(0);
		c.innerHTML = i;
		for(let j = 1; j < verts+1; j += 1) {
			let c = newRow.insertCell(j);
			if(i < j) {
				c.innerHTML = "<input type='text' size='1' class='edgeLen' value='-1'>";
			}
			else if(i == j){
				c.innerHTML = 0;
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
				if(Math.random() < 0.55) {
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

	for(let i = 1; i < v+1; i += 1) {
		graph.AddNode(new Node(i));
	}

	for(let i = 1; i < v+1; i += 1) {
		let n = graph.GetNode(i);
		for(let j = i+1; j < v+1; j += 1) {
			let cell = table.rows[i].cells[j];
			let len = cell.getElementsByClassName('edgeLen')[0].value;
			if(len != -1) {
				n.connect(j,len);
				if(graph.GetNode(j) != -1) {
					graph.GetNode(j).connect(n.id,len);
				}
			}
		}
	}
	//graph.debug();
	BuildEdges();
	document.getElementById('step3').style.display = 'block';
}

function SetStartingVertex(start) {
	console.log("starting at: " + parseInt(start));
	document.getElementById("step4").style.display = 'block';
	document.getElementById("startvert").innerText = start;
}

