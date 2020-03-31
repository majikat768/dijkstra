function Node(id) {
	this.id = id;
	this.edges = {};
	this.distance = Infinity;
	this.connect = function(i,l) {
		this.edges[i] = parseInt(l);
	}
	this.draw = function(x,y) {
		this.x = x;
		this.y = y;
	}
}

function Graph() {
	this.nodes = [];

	this.AddNode = function(n) {
		this.nodes.push(n);
	}

	this.debug = function() {
		console.log("edges:");
		for(let i = 0; i < this.nodes.length; i += 1) {
			let n = this.nodes[i];
			console.log(n.id + ": "); 
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
