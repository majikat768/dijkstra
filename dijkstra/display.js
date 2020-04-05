w = 800;
h = 800;
rad = w/2-20;
edges = [];
function setup() {
	let canvas = createCanvas(w,h);
	canvas.parent('sketch');
	stroke(255);
	textSize(24);
}

function draw() {
	background(51);
	for(let i = 0; i < graph.nodes.length; i += 1) {
		stroke(255);
		let n = graph.nodes[i];
		noFill();
		circle(n.x,n.y,50);
		fill(255);
		text(n.id,n.x,n.y);
	}

	for(let i = 0; i < edges.length; i += 1) {
		let e = edges[i];
		fill(e.r,e.g,e.b);
		stroke(e.r,e.g,e.b);
		text(e.len,e.mp['x'],e.mp['y']);
		line(e.x,e.y,e.x2,e.y2);
		//fill(255);
	}
}

function BuildNodes() {
	step = TWO_PI / graph.nodes.length;
	for(let i = 0; i < graph.nodes.length; i += 1) {
		let n = graph.nodes[i];
		if(n != null) {
			let theta = i*step;
			let x = w/2+rad*cos(theta);
			let y = h/2+rad*sin(theta);
			n.draw(x,y);
		}
	}

}

function BuildEdges() {
	step = TWO_PI / graph.nodes.length;
	for(let i = 0; i < graph.nodes.length; i += 1) {
		let n = graph.nodes[i];
		if(n != null) {
			for(let neighbor in n.edges) {
				let n2 = graph.GetNode(neighbor);
				let len = n.edges[neighbor];
				let theta2 = (n2.id-1)*step;
				let x2 = w/2+rad*cos(theta2);
				let y2 = h/2+rad*sin(theta2);
				let e = new edge(n.id,n.x,n.y,n2.id,n2.x,n2.y,len);
				edges.push(e);
			}
		}
	}
}

function edge(i1,x,y,i2,x2,y2,len) {
	this.len = len;
	this.n1 = graph.GetNode(i1);
	this.n2 = graph.GetNode(i2);
	this.x = x;
	this.y = y;
	this.x2 = x2;
	this.y2 = y2;
	this.mp = {'x':(x+x2)/2,'y':(y+y2)/2};
	this.r = Math.random()*255;
	this.g = Math.random()*255;
	this.b = Math.random()*255;
	
}
