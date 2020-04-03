let table,graph;
function init() {
	table = document.getElementById('graphTable');
	graph = new Graph();
}

function SetNumberVertices(v) {
	let verts = parseInt(v);
	for(let i = 1; i < verts+1; i += 1) {
		graph.AddNode(new Node(i));
	}
	BuildNodes();

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
		let col = headRow.insertCell(i);
		col.innerHTML = i;
		col.style.width = '40px';
		col.style.height = '40px';
		let newRow = table.insertRow(i);
		let c = newRow.insertCell(0);
		c.innerHTML = i;
		for(let j = 1; j < verts+1; j += 1) {
			let c = newRow.insertCell(j);
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
		let n = graph.GetNode(i);
		for(let j = i+1; j < v+1; j += 1) {
			let cell = table.rows[i].cells[j];
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
			table.rows[j].cells[i].innerHTML = len;
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

