let distances = {};
let prev = {};

/*
	recursive function does find solution,
	but checks nodes more times than is necessary.
	need to somehow mark nodes as done
*/

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

	console.log(distances);
}

