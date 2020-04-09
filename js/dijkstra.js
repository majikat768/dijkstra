// distances stores node id,
// and total found distance from start node.
let distances = {};
let pathTable;
let queue;
let start;

function dijkstra(s) {
	start = s;
	pathTable = document.getElementById("pathTable");
	// queue is a sorted list of nodes with path discovered,
	// but haven't yet checked their neighbors yet.
	queue = new Queue();
	console.log("starting at " + start.id);

	// set distance of every vertex to Infinity.
	for(let i = 0; i < graph.nodes.length; i += 1) {
		let n = graph.nodes[i];
		distances[n.id] = Infinity;
		pathTable.rows[i+1].cells[1].innerText = Infinity;
	}
	//set distance of start vertex to zero, 
	// and add it to queue of known distances.
	distances[start.id] = 0;

	pathTable.rows[start.id+1].cells[1].innerText = 0;
	pathTable.rows[start.id+1].cells[2].innerText = start.id;
	queue.push(start);

	queue.print();

	let iterations = 0;

	/*
	   while(queue.length() > 0) {
	// pop nearest node.
	let current = queue.pop();

	// check every neighboring node of current.
	console.log("checking neighbors of node " + current.id);
	for(let neighborID in current.edges) {
	console.log("checking neighbor " + neighborID);
	let dist = distances[current.id] + current.edges[neighborID];
	console.log("total distance from " + start.id + " to " + neighborID + " is " + dist);
	// if new found distances is shorter,
	// update it's distance and add it to the queue.
	if(dist < distances[neighborID] ) {
	let cellNo = parseInt(neighborID)+parseInt(1);
	pathTable.rows[cellNo].cells[1].innerText = dist;
	pathTable.rows[cellNo].cells[2].innerText = pathTable.rows[current.id+1].cells[2].innerText + "," + neighborID;
	distances[neighborID] = dist;
	queue.push(graph.GetNode(neighborID));
	}
	}
	queue.print();
	}
	 */
}

function TakeStep() {
	if(queue.length() <= 0)	return;
	// pop nearest node.
	let current = queue.pop();

	// check every neighboring node of current.
	console.log("checking neighbors of node " + current.id);
	for(let neighborID in current.edges) {
		console.log("checking neighbor " + neighborID);
		let dist = distances[current.id] + current.edges[neighborID];
		console.log("total distance from " + start.id + " to " + neighborID + " is " + dist);
		// if new found distances is shorter,
		// update it's distance and add it to the queue.
		if(dist < distances[neighborID] ) {
			let cellNo = parseInt(neighborID)+parseInt(1);
			pathTable.rows[cellNo].cells[1].innerText = dist;
			pathTable.rows[cellNo].cells[2].innerText = pathTable.rows[current.id+1].cells[2].innerText + "," + neighborID;
			distances[neighborID] = dist;
			queue.push(graph.GetNode(neighborID));
		}
	}
	//queue.print();
	if(queue.length() <= 0) {
		document.getElementById("ContinueButton").value = "done!";
	}
}

// not exactly a queue. more like a sorted stack.
// when node is pushed, it's sorted by it's distance from starting node.
function Queue() {
	this.set = [];

	this.contains = function(node) {
		for(let i = 0; i < this.set.length; i += 1) {
			if(this.set[i].id == node.id) {
				return true;
			}
		}
		return false;
	}

	this.push = function(node) {
		// if this node is already in queue,
		// delete it first.
		if(this.contains(node)) {
			this.remove(node);
		}

		let added = false;
		for(let i = 0; i < this.set.length; i += 1) {
			if(distances[node.id] <= distances[this.set[i].id]) {
				if(node.id != this.set[i].id) {
					console.log("added node " + node.id + " to queue at index " + i);
					this.set.splice(i,0,node);
					document.getElementById("queueTable").insertRow(i+1).insertCell(0).innerHTML = node.id;
				}
				added = true;
				break;
			}
		}
		if(!added) {
			console.log("added node " + node.id + " to end of queue");
			this.set.push(node);
			document.getElementById("queueTable").insertRow(this.set.length).insertCell(0).innerHTML = node.id;
		}
	}

	this.remove = function(node) {
		for(let i = 0; i < this.set.length; i += 1) {
			if(node.id == this.set[i].id) {
				this.set.splice(i,1);
				document.getElementById("queueTable").deleteRow(i+1);
				return;
			}
		}
	}

	this.pop = function() {
		console.log("popping " + this.set[0].id);
		document.getElementById("queueTable").deleteRow(1);
		return this.set.shift();
	}

	this.print = function() {
		console.log("queue:");
		for(let i = 0; i < this.set.length; i += 1) {
			console.log("node " + this.set[i].id + " distance " + distances[this.set[i].id]);
		}
	}

	this.length = function() {
		return this.set.length;
	}
}
