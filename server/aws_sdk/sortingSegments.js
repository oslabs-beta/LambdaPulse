const practiceSeg = [
  {
    Document:
      '{"id":"18476b3c270cc8d2","name":"todo-list-app-dev-postTask","start_time":1.681339658206941E9,"trace_id":"1-6437350a-775b7afb3067811a4c6daade","end_time":1.681339658260729E9,"parent_id":"24ddd1434624a637","aws":{"account_id":"263792328682","function_arn":"arn:aws:lambda:us-east-1:263792328682:function:todo-list-app-dev-postTask","resource_names":["todo-list-app-dev-postTask"]},"origin":"AWS::Lambda::Function","subsegments":[{"id":"635660f683ab2b1d","name":"Overhead","start_time":1.6813396582601435E9,"end_time":1.681339658260521E9,"aws":{"function_arn":"arn:aws:lambda:us-east-1:263792328682:function:todo-list-app-dev-postTask"}},{"id":"e0f27d4a8041db12","name":"Invocation","start_time":1.6813396582070444E9,"end_time":1.6813396582601037E9,"aws":{"function_arn":"arn:aws:lambda:us-east-1:263792328682:function:todo-list-app-dev-postTask"}}]}',
    Id: '18476b3c270cc8d2',
  },
  {
    Document:
      '{"id":"24ddd1434624a637","name":"todo-list-app-dev-postTask","start_time":1.681339658203E9,"trace_id":"1-6437350a-775b7afb3067811a4c6daade","end_time":1.681339658261E9,"parent_id":"3a9497be6bb6f2a7","http":{"response":{"status":200}},"aws":{"request_id":"04b18ae7-3d34-4c77-9382-60c2532fcdae"},"origin":"AWS::Lambda","resource_arn":"arn:aws:lambda:us-east-1:263792328682:function:todo-list-app-dev-postTask"}',
    Id: '24ddd1434624a637',
  },
  {
    Document:
      '{"id":"65a5f5ef7aa9c3d2","name":"dev-todo-list-app/dev","start_time":1.68133965819E9,"trace_id":"1-6437350a-775b7afb3067811a4c6daade","end_time":1.681339658263E9,"http":{"request":{"url":"https://cm8rpw34l8.execute-api.us-east-1.amazonaws.com/dev/add-task","method":"POST","user_agent":"PostmanRuntime/7.31.3","client_ip":"172.58.229.173","x_forwarded_for":true},"response":{"status":201,"content_length":0}},"aws":{"api_gateway":{"account_id":"263792328682","rest_api_id":"cm8rpw34l8","stage":"dev","request_id":"af73b8ac-9cad-4324-9be0-754004906215"}},"annotations":{"aws:api_id":"cm8rpw34l8","aws:api_stage":"dev"},"metadata":{"default":{"extended_request_id":"DSU5oGx3IAMFhxw=","request_id":"af73b8ac-9cad-4324-9be0-754004906215"}},"origin":"AWS::ApiGateway::Stage","resource_arn":"arn:aws:apigateway:us-east-1::/restapis/cm8rpw34l8/stages/dev","subsegments":[{"id":"3a9497be6bb6f2a7","name":"Lambda","start_time":1.681339658192E9,"end_time":1.6813396582619998E9,"http":{"request":{"url":"https://lambda.us-east-1.amazonaws.com/2015-03-31/functions/arn:aws:lambda:us-east-1:263792328682:function:todo-list-app-dev-postTask/invocations","method":"POST"},"response":{"status":201,"content_length":2}},"aws":{"function_name":"todo-list-app-dev-postTask","region":"us-east-1","operation":"Invoke","resource_names":["todo-list-app-dev-postTask"]},"namespace":"aws"}]}',
    Id: '65a5f5ef7aa9c3d2',
  },
];

const secondPracticeSeg = [
  {
    Document:
      '{"id":"7d1bcaa3c1e69e02","name":"dev-todo-list-app/dev","start_time":1.681339655845E9,"trace_id":"1-64373507-1fa10d7929b63ad548165c89","end_time":1.681339657486E9,"http":{"request":{"url":"https://cm8rpw34l8.execute-api.us-east-1.amazonaws.com/dev/add-task","method":"POST","user_agent":"PostmanRuntime/7.31.3","client_ip":"172.58.229.173","x_forwarded_for":true},"response":{"status":201,"content_length":0}},"aws":{"api_gateway":{"account_id":"263792328682","rest_api_id":"cm8rpw34l8","stage":"dev","request_id":"75cafc42-d87d-4936-92b2-c30930010b2d"}},"annotations":{"aws:api_id":"cm8rpw34l8","aws:api_stage":"dev"},"metadata":{"default":{"extended_request_id":"DSU5RE77IAMFeyA=","request_id":"75cafc42-d87d-4936-92b2-c30930010b2d"}},"origin":"AWS::ApiGateway::Stage","resource_arn":"arn:aws:apigateway:us-east-1::/restapis/cm8rpw34l8/stages/dev","subsegments":[{"id":"7e4173d577ff5be2","name":"Lambda","start_time":1.681339655847E9,"end_time":1.6813396574859998E9,"http":{"request":{"url":"https://lambda.us-east-1.amazonaws.com/2015-03-31/functions/arn:aws:lambda:us-east-1:263792328682:function:todo-list-app-dev-postTask/invocations","method":"POST"},"response":{"status":201,"content_length":2}},"aws":{"function_name":"todo-list-app-dev-postTask","region":"us-east-1","operation":"Invoke","resource_names":["todo-list-app-dev-postTask"]},"namespace":"aws"}]}',
    Id: '7d1bcaa3c1e69e02',
  },
  {
    Document:
      '{"id":"4bbc4805c7f1f5bc","name":"todo-list-app-dev-postTask","start_time":1.681339655866E9,"trace_id":"1-64373507-1fa10d7929b63ad548165c89","end_time":1.681339657484E9,"parent_id":"7e4173d577ff5be2","http":{"response":{"status":200}},"aws":{"request_id":"516a738f-f972-4d5a-9be9-eb1f3e3e0667"},"origin":"AWS::Lambda","resource_arn":"arn:aws:lambda:us-east-1:263792328682:function:todo-list-app-dev-postTask"}',
    Id: '4bbc4805c7f1f5bc',
  },
  {
    Document:
      '{"id":"64db57830f6fd454","name":"todo-list-app-dev-postTask","start_time":1.6813396573927343E9,"trace_id":"1-64373507-1fa10d7929b63ad548165c89","end_time":1.6813396574838803E9,"parent_id":"4bbc4805c7f1f5bc","aws":{"account_id":"263792328682","function_arn":"arn:aws:lambda:us-east-1:263792328682:function:todo-list-app-dev-postTask","resource_names":["todo-list-app-dev-postTask"]},"origin":"AWS::Lambda::Function","subsegments":[{"id":"651be02de1388c7e","name":"Invocation","start_time":1.6813396573929079E9,"end_time":1.6813396574830668E9,"aws":{"function_arn":"arn:aws:lambda:us-east-1:263792328682:function:todo-list-app-dev-postTask"}},{"id":"6b1089d8bb667884","name":"Initialization","start_time":1.6813396566117659E9,"end_time":1.6813396573918788E9,"aws":{"function_arn":"arn:aws:lambda:us-east-1:263792328682:function:todo-list-app-dev-postTask"}},{"id":"ac27eb0115114f56","name":"Overhead","start_time":1.6813396574831686E9,"end_time":1.6813396574835873E9,"aws":{"function_arn":"arn:aws:lambda:us-east-1:263792328682:function:todo-list-app-dev-postTask"}}]}',
    Id: '64db57830f6fd454',
  },
];

const thirdSeg = [
  {
    Document:
      '{"id":"2e21546115b4c26c","name":"todo-list-app-dev-postTask","start_time":1.681400725275E9,"trace_id":"1-64382395-325767910529ad85074038bc","end_time":1.681400725306E9,"parent_id":"714627506dbbb1e4","http":{"response":{"status":200}},"aws":{"request_id":"c85b5ad4-a92f-4e16-b28a-dbc1aed6daab"},"origin":"AWS::Lambda","resource_arn":"arn:aws:lambda:us-east-1:263792328682:function:todo-list-app-dev-postTask"}',
    Id: '2e21546115b4c26c',
  },
  {
    Document:
      '{"id":"0067d8ebcc5c3e94","name":"dev-todo-list-app/dev","start_time":1.681400725263E9,"trace_id":"1-64382395-325767910529ad85074038bc","end_time":1.681400725308E9,"http":{"request":{"url":"https://cm8rpw34l8.execute-api.us-east-1.amazonaws.com/dev/add-task","method":"POST","user_agent":"PostmanRuntime/7.31.3","client_ip":"172.58.229.173","x_forwarded_for":true},"response":{"status":201,"content_length":0}},"aws":{"api_gateway":{"account_id":"263792328682","rest_api_id":"cm8rpw34l8","stage":"dev","request_id":"f9c6522b-a94c-43a9-8dd1-9bcc38c91a26"}},"annotations":{"aws:api_id":"cm8rpw34l8","aws:api_stage":"dev"},"metadata":{"default":{"extended_request_id":"DUp_XER_IAMFmVA=","request_id":"f9c6522b-a94c-43a9-8dd1-9bcc38c91a26"}},"origin":"AWS::ApiGateway::Stage","resource_arn":"arn:aws:apigateway:us-east-1::/restapis/cm8rpw34l8/stages/dev","subsegments":[{"id":"714627506dbbb1e4","name":"Lambda","start_time":1.681400725265E9,"end_time":1.6814007253070002E9,"http":{"request":{"url":"https://lambda.us-east-1.amazonaws.com/2015-03-31/functions/arn:aws:lambda:us-east-1:263792328682:function:todo-list-app-dev-postTask/invocations","method":"POST"},"response":{"status":201,"content_length":2}},"aws":{"function_name":"todo-list-app-dev-postTask","region":"us-east-1","operation":"Invoke","resource_names":["todo-list-app-dev-postTask"]},"namespace":"aws"}]}',
    Id: '0067d8ebcc5c3e94',
  },
  {
    Document:
      '{"id":"3b2f5bcd7b555134","name":"todo-list-app-dev-postTask","start_time":1.681400725279173E9,"trace_id":"1-64382395-325767910529ad85074038bc","end_time":1.681400725305393E9,"parent_id":"2e21546115b4c26c","aws":{"account_id":"263792328682","function_arn":"arn:aws:lambda:us-east-1:263792328682:function:todo-list-app-dev-postTask","resource_names":["todo-list-app-dev-postTask"]},"origin":"AWS::Lambda::Function","subsegments":[{"id":"e449134f6553eed0","name":"Overhead","start_time":1.681400725305131E9,"end_time":1.6814007253053222E9,"aws":{"function_arn":"arn:aws:lambda:us-east-1:263792328682:function:todo-list-app-dev-postTask"}},{"id":"25aeb418ca4eb7ef","name":"Invocation","start_time":1.681400725279246E9,"end_time":1.6814007253049915E9,"aws":{"function_arn":"arn:aws:lambda:us-east-1:263792328682:function:todo-list-app-dev-postTask"},"subsegments":[{"id":"15fea92cde95161f","name":"DynamoDB","start_time":1.68140072528E9,"end_time":1.681400725303E9,"http":{"response":{"status":200}},"aws":{"retries":0,"region":"us-east-1","operation":"PutItem","request_id":"MHEA573OJ45F8G82LFP1K68T1NVV4KQNSO5AEMVJF66Q9ASUAAJG","table_name":"todo-list-tasks","resource_names":["todo-list-tasks"]},"namespace":"aws"}]}]}',
    Id: '3b2f5bcd7b555134',
  },
  {
    Document:
      '{"id":"15df351900263050","name":"DynamoDB","start_time":1.68140072528E9,"trace_id":"1-64382395-325767910529ad85074038bc","end_time":1.681400725303E9,"parent_id":"15fea92cde95161f","inferred":true,"http":{"response":{"status":200}},"aws":{"retries":0,"region":"us-east-1","operation":"PutItem","request_id":"MHEA573OJ45F8G82LFP1K68T1NVV4KQNSO5AEMVJF66Q9ASUAAJG","table_name":"todo-list-tasks","resource_names":["todo-list-tasks"]},"origin":"AWS::DynamoDB::Table"}',
    Id: '15df351900263050',
  },
];

const realData = [
  {
    Document:
      '{"id":"5f8d1a23aa89bd66","name":"todo-list-app-dev-postTask","start_time":1.681574429596E9,"trace_id":"1-643aca1d-02e095f7341508e00b9b6d2b","end_time":1.681574431021E9,"parent_id":"4c17ecc1b6cd296a","http":{"response":{"status":200}},"aws":{"request_id":"372607be-98bc-4960-bcb8-352704034263"},"origin":"AWS::Lambda","resource_arn":"arn:aws:lambda:us-east-1:263792328682:function:todo-list-app-dev-postTask"}',
    Id: '5f8d1a23aa89bd66',
  },
  {
    Document:
      '{"id":"3a049070bf15849c","name":"todo-list-app-dev-sendNotification","start_time":1.681574430979E9,"trace_id":"1-643aca1d-02e095f7341508e00b9b6d2b","end_time":1.681574431012E9,"parent_id":"72196dbd1971fbad","http":{"response":{"status":200}},"aws":{"request_id":"1a61d1e3-4df6-4c2e-9beb-e150bc55ff34"},"origin":"AWS::Lambda","resource_arn":"arn:aws:lambda:us-east-1:263792328682:function:todo-list-app-dev-sendNotification"}',
    Id: '3a049070bf15849c',
  },
  {
    Document:
      '{"id":"03e476fc59b9eecd","name":"todo-list-app-dev-postTask","start_time":1.681574430822835E9,"trace_id":"1-643aca1d-02e095f7341508e00b9b6d2b","end_time":1.6815744310206673E9,"parent_id":"5f8d1a23aa89bd66","aws":{"account_id":"263792328682","function_arn":"arn:aws:lambda:us-east-1:263792328682:function:todo-list-app-dev-postTask","resource_names":["todo-list-app-dev-postTask"]},"origin":"AWS::Lambda::Function","subsegments":[{"id":"8a2b10d894511fc9","name":"Initialization","start_time":1.681574429970087E9,"end_time":1.6815744308215926E9,"aws":{"function_arn":"arn:aws:lambda:us-east-1:263792328682:function:todo-list-app-dev-postTask"}},{"id":"9a00f74249b3df61","name":"Invocation","start_time":1.6815744308230484E9,"end_time":1.6815744310199275E9,"aws":{"function_arn":"arn:aws:lambda:us-east-1:263792328682:function:todo-list-app-dev-postTask"},"subsegments":[{"id":"72196dbd1971fbad","name":"Lambda","start_time":1.68157443093E9,"end_time":1.681574431015E9,"http":{"response":{"status":200}},"aws":{"retries":0,"status_code":200,"function_name":"todo-list-app-dev-sendNotification","region":"us-east-1","operation":"Invoke","request_id":"1a61d1e3-4df6-4c2e-9beb-e150bc55ff34","resource_names":["todo-list-app-dev-sendNotification"]},"namespace":"aws"},{"id":"b65ecbebf0c80be7","name":"DynamoDB","start_time":1.681574430842E9,"end_time":1.681574430924E9,"http":{"response":{"status":200}},"aws":{"retries":0,"region":"us-east-1","operation":"PutItem","request_id":"ONUHTPGP3PBVIN2UJI284UBUA7VV4KQNSO5AEMVJF66Q9ASUAAJG","table_name":"todo-list-tasks","resource_names":["todo-list-tasks"]},"namespace":"aws"}]},{"id":"03cea9c3be41a0ba","name":"Overhead","start_time":1.6815744310199893E9,"end_time":1.6815744310205321E9,"aws":{"function_arn":"arn:aws:lambda:us-east-1:263792328682:function:todo-list-app-dev-postTask"}}]}',
    Id: '03e476fc59b9eecd',
  },
  {
    Document:
      '{"id":"4dd5002f3760b1c7","name":"todo-list-app-dev-sendNotification","start_time":1.681574430991934E9,"trace_id":"1-643aca1d-02e095f7341508e00b9b6d2b","end_time":1.6815744310281522E9,"parent_id":"3a049070bf15849c","aws":{"account_id":"263792328682","function_arn":"arn:aws:lambda:us-east-1:263792328682:function:todo-list-app-dev-sendNotification","resource_names":["todo-list-app-dev-sendNotification"]},"origin":"AWS::Lambda::Function","subsegments":[{"id":"a53cba167510c8be","name":"Invocation","start_time":1.6815744309920678E9,"end_time":1.6815744309951615E9,"aws":{"function_arn":"arn:aws:lambda:us-east-1:263792328682:function:todo-list-app-dev-sendNotification"}},{"id":"6318618ac9af4267","name":"Overhead","start_time":1.6815744309951978E9,"end_time":1.6815744310279648E9,"aws":{"function_arn":"arn:aws:lambda:us-east-1:263792328682:function:todo-list-app-dev-sendNotification"}}]}',
    Id: '4dd5002f3760b1c7',
  },
  {
    Document:
      '{"id":"66083ccfc311f302","name":"dev-todo-list-app/dev","start_time":1.681574429579E9,"trace_id":"1-643aca1d-02e095f7341508e00b9b6d2b","end_time":1.681574431023E9,"http":{"request":{"url":"https://cm8rpw34l8.execute-api.us-east-1.amazonaws.com/dev/add-task","method":"POST","user_agent":"PostmanRuntime/7.31.3","client_ip":"172.58.229.173","x_forwarded_for":true},"response":{"status":201,"content_length":0}},"aws":{"api_gateway":{"account_id":"263792328682","rest_api_id":"cm8rpw34l8","stage":"dev","request_id":"6d5f8fb5-9330-48b7-a3d7-7291dd488abb"}},"annotations":{"aws:api_id":"cm8rpw34l8","aws:api_stage":"dev"},"metadata":{"default":{"extended_request_id":"DbSEqG6OoAMFqgA=","request_id":"6d5f8fb5-9330-48b7-a3d7-7291dd488abb"}},"origin":"AWS::ApiGateway::Stage","resource_arn":"arn:aws:apigateway:us-east-1::/restapis/cm8rpw34l8/stages/dev","subsegments":[{"id":"4c17ecc1b6cd296a","name":"Lambda","start_time":1.681574429581E9,"end_time":1.681574431023E9,"http":{"request":{"url":"https://lambda.us-east-1.amazonaws.com/2015-03-31/functions/arn:aws:lambda:us-east-1:263792328682:function:todo-list-app-dev-postTask/invocations","method":"POST"},"response":{"status":201,"content_length":2}},"aws":{"function_name":"todo-list-app-dev-postTask","region":"us-east-1","operation":"Invoke","resource_names":["todo-list-app-dev-postTask"]},"namespace":"aws"}]}',
    Id: '66083ccfc311f302',
  },
  {
    Document:
      '{"id":"3dd87a2724860b51","name":"DynamoDB","start_time":1.681574430842E9,"trace_id":"1-643aca1d-02e095f7341508e00b9b6d2b","end_time":1.681574430924E9,"parent_id":"b65ecbebf0c80be7","inferred":true,"http":{"response":{"status":200}},"aws":{"retries":0,"region":"us-east-1","operation":"PutItem","request_id":"ONUHTPGP3PBVIN2UJI284UBUA7VV4KQNSO5AEMVJF66Q9ASUAAJG","table_name":"todo-list-tasks","resource_names":["todo-list-tasks"]},"origin":"AWS::DynamoDB::Table"}',
    Id: '3dd87a2724860b51',
  },
];

// console.log(realData);

// parseJSON in Document
const parseData = (segmentArray) => {
  const parsedDocumentData = segmentArray.map((segments) => {
    const doc = JSON.parse(segments['Document']);
    segments['Document'] = doc;
    return segments;
  });
  return parsedDocumentData;
};

const reuslt = parseData(realData);
console.log(reuslt);

function Node(segment) {
  this.id = segment.Document.id;
  this.name = segment.Document.name;
  this.parent_id = segment.Document.parent_id;
  this.time_taken =
    (segment.Document.end_time - segment.Document.start_time) * 1000;
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
  const root = createRoot(arrayOfSegmentNodes);
  addChildChildren(root, arrayOfSegmentNodes);
  return [root, segmentData];
};

module.exports = main;
