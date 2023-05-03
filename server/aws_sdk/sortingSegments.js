
// parseJSON in Document
const parseData = (segmentArray) => {
  const parsedDocumentData = segmentArray.map((segments) => {
    const doc = JSON.parse(segments['Document']);
    segments['Document'] = doc;
    return segments;
  });
  return parsedDocumentData;
};


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

// creates Nodes from each segment
const createAllNodes = (segmentarray) => {
  return segmentarray.map((segment) => {
    return new Node(segment);
  });
};

// create the root. Only one root in each trace
const createRoot = (arr) => {
  let rootNode;
  for (let i = 0; i < arr.length; i++) {
    if (!arr[i].parent_id) {
      rootNode = arr[i];
    }
  }
  return rootNode;
};

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
        // experimental below
        // if (subSegment.subsegments) {
        //   if (subSegment.subsegments[0].id === node.parent_id) {
        //     console.log(node);
        //   }
        // }
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

// function will only be called if subsegment has subsegments
// i am already checking if the node.parent_id is equal to the subsegment id
// dont need to check for it again just pass in subsegment of subsegment
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
// problem
// if a segment has a child, it might not be a subsegment,
// but a subsegment of the subsegment
// create a function that can recursively identify subsegment ids
// and match them to children. if there is a match then add node to children array

// check if the current subsegments id is equal to the nodeArray id

// solution
// so my function needs to check if the subsegments have an subsegments
// go into those subsegments and check if the subsegment id is equal to the
// parent id of the currentNode, if returned true push to the children array

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
