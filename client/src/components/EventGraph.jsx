import { useEffect, useState } from 'react';
import NodeTree from './NodeTree';
import NodeDetail from './NodeDetail';
import LogPanel from './LogPanel';
import NavBar from './NavBar';
import LeftBar from './LeftBar';
import './event-graph.css';
import main from './sortingSegments.js';


const EventGraph = (props) => {



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
  const testData = main(realData);



  const [nodeDetailState,setNodeDetailState] = useState({left: 150, top:150, display: 'none', curNode: testData});
  const [nodeData,setNodeData] = useState(testData)
  const [logData,setLogData] = useState({logs:['LogX','LogY','LogZ']})

  console.log(testData);

  

  return (
    <div>
      <div className='EventGraph'>
        <div className='EventPanelContainer'>
          <NodeTree setNds={setNodeDetailState} setLData={setLogData} nData={nodeData} />
          <NodeDetail nds={nodeDetailState} />
        </div>
        <LogPanel lData={logData}/>
      </div>


    </div>
  )
};

export default EventGraph;
