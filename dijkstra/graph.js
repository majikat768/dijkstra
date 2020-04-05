
function Node(id) {
	this.id = id;
	// this.edges is an adjacency list.
	// a dictionary containing neighboring nodes, and their distance.
	this.edges = {};
	this.distance = Infinity;

	// dictionaries in js can't store data objects as keys
	// so store the node's id instead
	this.AddEdge = function(i,l) {
		this.edges[i] = parseInt(l);
	}

	//ignore this
	this.draw = function(x,y) {
		this.x = x;
		this.y = y;
	}
}

function Graph(n) {
	this.nodes = [];

	this.AddNode = function(n) {
		this.nodes.push(n);
	}
	// just outputs nodes and their edges
	this.debug = function() {
		console.log("edges:");
		for(let i = 0; i < this.nodes.length; i += 1) {
			let n = this.nodes[i];
			console.log("node " + n.id + ": "); 
			console.log(n.edges);
		}
	}

	this.GetNode = function(id) {
		for(let i = 0; i < this.nodes.length; i += 1) {
			if(this.nodes[i].id == id) {
				return this.nodes[i];
			}
		}	
		return -1;
	}
}
