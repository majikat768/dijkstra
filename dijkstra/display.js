// CONSTANTS

const colors = [
  "#96ceb4",
  "#ffeead",
  "#ff6f69",
  "#ffcc5c",
  "#88d8b0",
  "#e1f7d5",
  "#ffbdbd",
  "#c9c9ff",
  "#f1cbff",
  "#fb2e01",
  "#6fcb9f",
  "#ffe28a",
]

// HELPERS

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

// IMPL.

class Display { 

  constructor({ container, msg1, msg2, msg3, msg4, solver}) {
    this.state = { 
      el: void 0,
      nodes: [],
      lines: {},
      colors: [...colors],
      startNode: void 0,
      endNode: void 0,
      winningPath: [],
      currentGraph: void 0,
      mouseTimeout: void 0,
      mouseInterval: void 0,
      userMouseDown: {x: 0, y: 0},
      userTargetNode: void 0 // This is the node the user is dragging.
    }

    this.props = {
      container,
      msg1, 
      msg2,
      msg3, 
      msg4,
      solver
    }

    shuffle(this.state.colors);
  }

  reset() {
    this.state.startNode = void 0;
    this.state.endNode = void 0;
    this.state.winningPath = [];
    clearTimeout(this.state.mouseTimeout)
    clearInterval(this.state.mouseInterval)
    this.state.userMouseDown = {x: 0, y: 0};
    this.state.userTargetNode = void 0;
    this._wipe();
  }

  _wipe() {
    if (this.state.el) {
      this.state.el.parentElement.removeChild(this.state.el);
    }

    if (!this.state.userTargetNode) {
      this.state.nodes = []; 
    }

    this.state.lines = {};
    this.state.colors = [...colors];
    this.state.currentGraph = void 0;

    shuffle(this.state.colors);

    this.props.msg1.style.display = 'block';
    this.props.msg2.style.display = 'none';
    this.props.msg3.style.display = 'none';
    this.props.msg4.style.display = 'none';
  }

  _randomColor(){ 
    return this.state.colors.pop();
  }

  _getCenter(id) {
    for (let item of this.state.nodes) {
      let node = item.n;
      if (node.id == id) {
        return { 
          x: item.x,
          y: item.y,
        }
      }
    }
  }

  _overlap(a) {
    for (let b of this.state.nodes) {
      if (b.n.id == a.id) {
        continue;
      }

      let xDistance = a.x - b.x;
      let yDistance = a.y - b.y;
      let sumOfRadii = a.r + b.r;
      let distanceSquared = xDistance * xDistance + yDistance * yDistance;
      let isOverlapping = distanceSquared  < sumOfRadii * sumOfRadii;
      if (isOverlapping) {
        return true;
      }
    }

    return false;
  }

  _rand(radius) {
    let ctx = this.state.el.getContext("2d");
    let { width, height } = ctx.canvas;
    return {
      x: (() => {
        let max = width - radius;
        let min = 0 + radius;
        return Math.floor(Math.random()*(max-min+1)+min);
      })(),
      y: (() => {
        let max = height - radius;
        let min = 0 + radius;
        return Math.floor(Math.random()*(max-min+1)+min);
      })(),
    }
  }

  _onMouseMove(event) { 
    event.preventDefault();
    event.stopPropagation();

    if (this.state.userTargetNode) {
      // Get user click position.
      let rect = this.state.el.getBoundingClientRect()
      let x = event.clientX - rect.left
      let y = event.clientY - rect.top
      this.state.userMouseDown = {x, y};

      // Draw new node graph.
      this.draw({ graph: this.state.currentGraph })
    }
  }

  _onMouseDown(event) { 
    event.preventDefault();
    event.stopPropagation();

    // Get user click position.
    let rect = this.state.el.getBoundingClientRect()
    let x = event.clientX - rect.left
    let y = event.clientY - rect.top
    this.state.userMouseDown = {x, y};

    let targetNode = void 0;

    // Check if we're actually clicking a node.
    for (let n of this.state.nodes) {
      let nx1 = n.x - (n.r);
      let nx2 = n.x + (n.r);
      let ny1 = n.y - (n.r);
      let ny2 = n.y + (n.r);

      if ((nx1 < x && x < nx2) && (ny1 < y && y < ny2)) {
        targetNode = n;
      }
    }

    if (!targetNode) {
      return;
    }

    clearTimeout(this.state.mouseTimeout);
    this.state.mouseTimeout = setTimeout(() => { 
      this.state.userTargetNode = targetNode;
    }, 100);
  }

  _onMouseUp(event) { 
    event.preventDefault();
    event.stopPropagation();

    clearTimeout(this.state.mouseTimeout);
    clearInterval(this.state.mouseInterval);

    if (this.state.userTargetNode) {
      // Get user click position.
      let rect = this.state.el.getBoundingClientRect()
      let x = event.clientX - rect.left
      let y = event.clientY - rect.top
      this.state.userMouseDown = {x, y};

      // Draw new node graph.
      this.draw({ graph: this.state.currentGraph })

      this.state.userTargetNode = void 0;
      return
    }

    // Get user click position.
    let rect = this.state.el.getBoundingClientRect()
    let x = event.clientX - rect.left
    let y = event.clientY - rect.top

    // Find the node we clicked.
    for (let n of this.state.nodes) {
      let nx1 = n.x - (n.r);
      let nx2 = n.x + (n.r);
      let ny1 = n.y - (n.r);
      let ny2 = n.y + (n.r);

      if ((nx1 < x && x < nx2) && (ny1 < y && y < ny2)) {

        // Determine if we are click a start node or end node.
        switch (true) {

          case typeof this.state.startNode == "undefined": {
            this.startNode(n.n, true);
            break;
          }

          case typeof this.state.endNode == "undefined": {
            if (n.n.id == this.state.startNode.id) {
              alert("Cannot choose same node as both start and end node. " +
                    "Press clear to choose a new start node.");
              return;
            }
            this.endNode(n.n, true);
            let path = this.props.solver(
              this.state.startNode,
              this.state.endNode,
              this.state.currentGraph
            );
            this._drawSolved(path)
            break;
          }

          default: {
            // Do nothing.
            break;
          }

        }
      }
    }
  }

  startNode(node, set) {
    if (set) SetStartingVertex(node.id)
    this.props.msg3.style.display = 'none';
    this.props.msg4.style.display = 'block';
    this.state.startNode = node;

    let ctx = this.state.el.getContext("2d");

    // Draw only this node.
    for (let canvasNode of this.state.nodes) {
      if (canvasNode.n.id === node.id) {
        let circle = [0, 2*Math.PI];
        let offset = 5;
        ctx.beginPath();
        ctx.arc(canvasNode.x, canvasNode.y, canvasNode.r, ...circle);
        ctx.closePath();
        ctx.fillStyle = canvasNode.c;
        ctx.fill();
        ctx.fillStyle = "black";
        ctx.font = `${canvasNode.r * 0.5}px Arial`;
        ctx.fillText(canvasNode.n.id, canvasNode.x-offset, canvasNode.y+offset);
        // Border.
        ctx.lineWidth = 30 / this.state.currentGraph.nodes.length;
        ctx.strokeStyle = "blue";
        ctx.stroke();
      }
    }
  }

  endNode(node, set) {
    if (set) SetEndingVertex(node.id)
    this.props.msg4.style.display = 'none';
    this.state.endNode = node;
  }

  _drawSolved(path /* Array<String> */ ) {
    this.state.winningPath = path;
    let ctx = this.state.el.getContext("2d");

    // Draw lines.
    for (let n of this.state.currentGraph.nodes) {
      n.id = n.id.toString() // TODO: This is very inconsistent. 
      for (let id in n.edges) {
        // This line is on optimal path. Draw it.
        if (path.indexOf(n.id) != -1 &&
            path.indexOf(n.id) + 1 == path.indexOf(id)) {
          let a = this._getCenter(n.id)
          let b = this._getCenter(id)
          ctx.beginPath();
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.lineWidth = 30 / this.state.currentGraph.nodes.length;
          ctx.strokeStyle = "blue";
          ctx.stroke();
        }
      }
    }

    // Draw nodes.
    for (let canvasNode of this.state.nodes) {
      canvasNode.n.id = canvasNode.n.id.toString() // TODO: This is very inconsistent. 
      if (path.indexOf(canvasNode.n.id) != -1) {
        let circle = [0, 2*Math.PI];
        let offset = 5;
        ctx.beginPath();
        ctx.arc(canvasNode.x, canvasNode.y, canvasNode.r, ...circle);
        ctx.closePath();
        ctx.fillStyle = canvasNode.c;
        ctx.fill();
        ctx.fillStyle = "black";
        ctx.font = `${canvasNode.r * 0.5}px Arial`;
        ctx.fillText(canvasNode.n.id, canvasNode.x-offset, canvasNode.y+offset);
        // Border.
        ctx.lineWidth = 30 / this.state.currentGraph.nodes.length;
        ctx.strokeStyle = "blue";
        ctx.stroke();
      }
    }

  }

  draw(props) {
    // Check msg one display.
    if (!props || !props.graph || props.graph.nodes.length < 1) {
      this.props.msg1.style.display = 'block';
      return;
    }

    this._wipe();
    this.props.msg1.style.display = 'none';
    this.state.currentGraph = props.graph;

    let el = document.createElement("canvas");
    this.props.container.appendChild(el);
    this.state.el = el;
    
    let ctx = el.getContext("2d");
    let width = ctx.canvas.height = this.props.container.offsetHeight;
    let height = ctx.canvas.width = this.props.container.offsetWidth;

    let largestDistance = props.graph.nodes.reduce(
      (final, node) => {
        let keys = Object.keys(node.edges)
        let local = keys.reduce(
          (final, key) => node.edges[key] > final ? node.edges[key] : final,
          -1,
        )
        return local > final ? local : final
      },
      -1,
    )

    if (largestDistance < 0) {
      // TODO: add a message here telling user to add weights.
      this.props.msg2.style.display = 'block';
      return;
    }
    this.props.msg2.style.display = 'none';

    // Create nodes. 
    if (this.state.userTargetNode) {
      // We're currently dragging a node, that means don't redraw the world,
      // just update our single node.
      for (let i = 0; i < this.state.nodes.length; i++) {
        let n = this.state.nodes[i]
        if (n.n.id == this.state.userTargetNode.n.id) { 
          this.state.nodes[i].x = this.state.userMouseDown.x;
          this.state.nodes[i].y = this.state.userMouseDown.y;
        }
      }
    }
    else {
      for (let n of graph.nodes) {
        let createNode = () => {
          let r = width / graph.nodes.length * 0.2;
          let {x, y} = this._rand(r)
          let c = this._randomColor();
          return {x, y, r, n, c};
        }

        let canvasNode = createNode()
        while (this._overlap(canvasNode)) {
          canvasNode = createNode()
        }

        this.state.nodes.push(canvasNode)
      }
    }

    // Draw lines.
    for (let n of graph.nodes) {
      if (!this.state.lines[n.id]) {
        this.state.lines[n.id] = {}
      }

      for (let id in n.edges) {
        id = parseInt(id)

        if (!this.state.lines[id]) {
          this.state.lines[id] = {}
        }

        if (!this.state.lines[n.id][id]) {
          // Draw the line! It's currently not on screen. 
          this.state.lines[n.id][id] = true; // Don't draw the same line twice.
          this.state.lines[id][n.id] = true;

          let a = this._getCenter(n.id)
          let b = this._getCenter(id)

          ctx.beginPath();
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.lineWidth = 20 / graph.nodes.length;
          ctx.stroke();

          // Draw line weight
          let r = width / graph.nodes.length * 0.2;
          ctx.fillStyle = "blue";
          ctx.font = `bold ${r * 0.6}px Arial`;
          ctx.fillText(n.edges[id], (a.x+b.x)/2, (a.y+b.y)/2)
        }
      }
    }

    // Draw nodes.
    for (let canvasNode of this.state.nodes) {
      let circle = [0, 2*Math.PI];
      let offset = 5;
      ctx.beginPath();
      ctx.arc(canvasNode.x, canvasNode.y, canvasNode.r, ...circle);
      ctx.closePath();
      ctx.fillStyle = canvasNode.c;
      ctx.fill();
      ctx.fillStyle = "black";
      ctx.font = `${canvasNode.r * 0.5}px Arial`;
      ctx.fillText(canvasNode.n.id, canvasNode.x-offset, canvasNode.y+offset);
    }

    // Setup events.
    this.state.el.addEventListener('mousemove', this._onMouseMove.bind(this));
    this.state.el.addEventListener('mousedown', this._onMouseDown.bind(this));
    this.state.el.addEventListener('mouseup', this._onMouseUp.bind(this));

    // Show user message, click to set start node.
    this.props.msg3.style.display = 'block';

    // Redraw winning path and nodes if applicable.
    if (this.state.winningPath.length > 0) this._drawSolved(this.state.winningPath);
    if (this.state.startNode) this.startNode(this.state.startNode);
    if (this.state.endNode) this.endNode(this.state.endNode);
  }
}
