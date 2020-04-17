function dijkstra(s) {
    start = s;
    pathTable = document.getElementById("pathTable");
    // queue is a sorted list of nodes with path discovered,
    // but haven't yet checked their neighbors yet.
    queue = new Queue();
    logger.do("starting at node " + start.id);
//ROB create a vertex set Q
//ROB for each vertex v in Graph:
//ROB dist[v] ← INFINITY
    // set distance of every vertex to Infinity.
    for (let i = 0; i < graph.nodes.length; i += 1) {
        let n = graph.nodes[i];
        distances[n.id] = Infinity;
        pathTable.rows[i + 1].cells[1].innerText = Infinity;
    }
    //set distance of start vertex to zero, 
    // and add it to queue of known distances.
    distances[start.id] = 0;

    pathTable.rows[start.id + 1].cells[1].innerText = 0;
    pathTable.rows[start.id + 1].cells[2].innerText = start.id;
    queue.push(start);

    queue.print();

    let iterations = 0;


    while (queue.length() > 0) {
        // pop nearest node.
        let current = queue.pop();

        // check every neighboring node of current.
        logger.do("checking neighbors of node " + current.id);
        for (let neighborID in current.edges) {
            logger.do("checking neighbor node " + neighborID);
            let dist = distances[current.id] + current.edges[neighborID];
            logger.do("total distance from node " + start.id + " to node " + neighborID + " is " + dist);
            // if new found distances is shorter,
            // update it's distance and add it to the queue.
            if (dist < distances[neighborID]) {
                let cellNo = parseInt(neighborID) + parseInt(1);
                pathTable.rows[cellNo].cells[1].innerText = dist;
                pathTable.rows[cellNo].cells[2].innerText = pathTable.rows[current.id + 1].cells[2].innerText + "," + neighborID;
                distances[neighborID] = dist;
                queue.push(graph.GetNode(neighborID));
            }
        }
        queue.print();
    }

}