let distances = {};
let prev = {};

/*
	recursive function does find solution,
	but checks nodes more times than is necessary.
	need to somehow mark nodes as done
*/
function dijkstraRecursive(start) {
	let table = document.getElementById("vertexTable");
	let status = document.getElementById("status");
	status.innerHTML += "<br>checking neighbors of " + start.id;
	let queue = new Queue();

	for(let neighborID in start.edges) {
		// total distance to neighbor is 
		//distance to start + length of start->neighbor edge
		let neighbor = graph.GetNode(neighborID);
		let total = start.distance + start.edges[neighborID]
		if(total < neighbor.distance) {
			status.innerHTML += "<br>....distance from " + start.id + " to " + neighborID + " is " + start.edges[neighborID];
			status.innerHTML += "<br>....total distance from start to " + neighborID + " is " + total;
			table.rows[neighborID].cells[1].innerText = total;
			table.rows[neighborID].cells[2].innerText = table.rows[start.id].cells[2].innerText + "," + neighborID;
			neighbor.distance = total;
			queue.enqueue(neighbor);
		}
	}
	while(queue.set.length > 0) {
	let v = queue.dequeue();
	console.log(v.id);
	dijkstraRecursive(v);
	}
}

function dijkstra(start,end) {
	let table = document.getElementById("vertexTable");
	let status = document.getElementById("status");
	let queue = new Queue();

	for(let i = 0; i < graph.nodes.length; i += 1) {
		let n = graph.nodes[i];
		table.rows[i+1].cells[1].innerText = Infinity;
		table.rows[i+1].cells[2].innerText = Infinity;
		distances[n.id] = Infinity;
		prev[n.id] = null;
		if(n.id == start.id)
			distances[n.id] = 0;
		queue.enqueue(n);
	}
	table.rows[start.id].cells[1].innerText = distances[start.id];
	table.rows[start.id].cells[2].innerText = start.id;
	distances[start.id] = 0;

	let iterations = 0;
	while(queue.set.length > 0) {
		iterations += 1;
		if(iterations > 100)
			break;
		queue.print();
		let current = queue.dequeue();
		if(current === end) {
			console.log('found path');
			console.log(distances);
			console.log(prev);
			return distances,prev;
		}
		console.log("checking " + current.id);
		status.innerHTML += "<br>checking neighbors of " + current.id;

		for(let neighborID in current.edges) {
				let total = distances[current.id] + current.edges[neighborID];
				if(total < distances[neighborID]) {
				console.log("distance from " + current.id + " to " + neighborID + " is " + current.edges[neighborID]);
				status.innerHTML += "<br>distance from " + current.id + " to " + neighborID + " is " + current.edges[neighborID];
				status.innerHTML += "<br>total distance to " + neighborID + " is " + total;
				table.rows[neighborID].cells[1].innerText = total;
				table.rows[neighborID].cells[2].innerText = table.rows[current.id].cells[2].innerText + "," + neighborID;
				console.log("total " + total);
				console.log("current dist to " + neighborID + " is " + distances[neighborID]);
					distances[neighborID] = total;
					prev[neighborID] = current.id;
					queue.enqueue(graph.GetNode(neighborID));
					console.log(neighborID + " added to queue");
				}
		}


	}

	console.log(distances);
}

function printpath(vertex) {
	console.log(vertex.id);
	let par = path[vertex];
	if(par == null)	return;
	printpath(par);

}


function Queue() {
	this.set = [];

	this.contains = function(v) {
		console.log("neighbor " + v.id);
		for(let i = 0; i < this.set.length; i += 1) {
			console.log(this.set[i].id);
			if(this.set[i].id == v.id) {
				return true;
			}
		}
		return false;
	}

	this.enqueue = function(vertex) {
		if(this.set.length == 0) {
			this.set.push(vertex);
		}
		else {
			let added = false;
			for(let i = 0; i < this.set.length; i += 1) {
				if(vertex.distance <= this.set[i].distance) {
					this.set.splice(i,0,vertex);
					added = true;
					break;
				}
			}
			if(!added) {
				this.set.push(vertex);
			}
		}
	}

	this.dequeue = function() {
		let v = this.set.shift();
		return v;
	}

	this.print = function() {
		for(let i = 0; i < this.set.length; i += 1) {
			console.log(this.set[i].id);
		}
	}
}
