//parse JSON data within a given array of segments
const parseData = (segmentArray) => {
  const parsedDocumentData = segmentArray.map((segments) => {
    const doc = JSON.parse(segments['Document']);
    segments['Document'] = doc;
    return segments;
  });
  return parsedDocumentData;
};

//create node. adjust data as needed
function Node(segment) {
  this.id = segment.Document.id;
  this.name = segment.Document.name;
  this.parent_id = segment.Document.parent_id;
  this.time_taken = Math.round(
    (segment.Document.end_time - segment.Document.start_time) * 1000
  );
  this.subsegments = segment.Document.subsegments;
  this.children = [];
  this.origin = segment.Document.origin;
  this.http = segment.Document.http;
  this.fullData = segment;
}

// create individual node for an array of related segments
const createAllNodes = (segmentarray) => {
  return segmentarray.map((segment) => {
    return new Node(segment);
  });
};

// create root node
const createRoot = (arr) => {
  let rootNode;
  for (let i = 0; i < arr.length; i++) {
    if (!arr[i].parent_id) {
      rootNode = arr[i];
    }
  }
  return rootNode;
};

// create parent/child relationship from an array of nodes starting from root
const addChildChildren = (tree, nodeArray) => {
  let currNode = tree;
  if (!currNode) return;
  nodeArray.forEach((node) => {
    if (node.parent_id === currNode.id) {
      currNode.children.push(node);
    } else if (currNode.subsegments) {
      currNode.subsegments.forEach((subSegment) => {
        if (node.parent_id === subSegment.id) {
          currNode.children.push(node);
        }
        if (subSegment.subsegments) {
          if (checkForSubsegments(node, subSegment.subsegments) === true) {
            currNode.children.push(node);
          }
        }
      });
    }
  });
  for (let i = 0; i < currNode.children.length; i++) {
    addChildChildren(currNode.children[i], nodeArray);
  }
};

// checks nodes subsegments for relationship between nodes if subsegment exists
const checkForSubsegments = (node, subsegment) => {
  for (let i = 0; i < subsegment.length; i++) {
    if (node.parent_id === subsegment[i].id) return true;
    if (subsegment[i].subsegments) {
      const result = checkForSubsegments(node, subsegment[i].subsegments);
      if (result) return true;
    }
  }
};

const getAverageOfTrace = (nodeArray) => {
  let total = 0;
  nodeArray.forEach((node) => {
    total += node.time_taken;
  });
  return total / nodeArray.length;
};

const main = (segment) => {
  if (!segment) return;
  const segmentData = parseData(segment);
  const arrayOfSegmentNodes = createAllNodes(segmentData);
  const averageTimeTaken = getAverageOfTrace(arrayOfSegmentNodes);
  const root = createRoot(arrayOfSegmentNodes);
  root.averageTime = averageTimeTaken;
  addChildChildren(root, arrayOfSegmentNodes);
  return [root, segmentData];
};

module.exports = main;
