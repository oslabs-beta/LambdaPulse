import React from 'react';
import Tree from 'react-d3-tree';
import dynamoDBIcon from '../assets/dynamoDB.svg'
import lambdaFuncIcon from '../assets/lambdaFunc.svg'
import simpleNotificationIcon from '../assets/simpleNotification.svg'
import apiGatewayEndpointIcon from '../assets/apigatewayendpoint.svg'
import sesIcon from '../assets/sesIcon.svg'
import errorIcon from '../assets/error-905.svg'
import errorIcon2 from '../assets/error-svgrepo-com.svg'
import rs from '../assets/react.svg'
import clientIcon from '../assets/client-svgrepo-com.svg'
import './custom-tree.css';

/*
  name = ""
  id = ""
  origin = ""
  fullData -> Document = {}
  children = []

*/

const NodeTree = (props) => {
  const getDynamicPathClass = ({ source, target }, orientation) => {
      if (!target.children) {
        // Target node has no children -> this link leads to a leaf node.
        return 'link__to-leaf';
      }
  
      // Style it as a link connecting two branch nodes by default.
      return 'link__to-branch';
    };
  
  const getIcon = (nType) => {
    if (nType == 'AWS::Lambda') return lambdaFuncIcon;
    else if (nType == 'AWS::Lambda::Function') return lambdaFuncIcon;
    else if (nType == 'AWS::DynamoDB::Table') return dynamoDBIcon;
    else if (nType == 'AWS::ApiGateway::Stage') return apiGatewayEndpointIcon;
    else if (nType == 'AWS::SES') return sesIcon;
    else if (nType == 'simpleNotification') return simpleNotificationIcon;
    else if (nType == 'thrownError') return errorIcon;
    else if (nType == 'client') return clientIcon;
    else {
      console.log('Got unknown origin: ' + nType)
      return rs;
    }
  }

  const getColor = (nType) => {
    if (nType == 'AWS::Lambda') return 'orange';
    else if (nType == 'AWS::Lambda::Function') return 'red';
    else if (nType == 'AWS::DynamoDB::Table') return 'blue';
    else if (nType == 'AWS::ApiGateway::Stage') return '#4D27AA';
    else if (nType == 'AWS::SES') return 'blue';
    else if (nType == 'simpleNotification') return 'pink';
    else if (nType == 'thrownError') return 'gray';
    else return 'gray';
  }

  const handleClick = (e,logs) => {
    props.setLData({logs:logs});
  }

  const handleMouseEnter = (e,curNode) => {
    props.setNds({top: e.clientY+10, left: e.clientX+10, display: 'inline', curNode: curNode});
  }

  const handleMouseLeave = (e) => {
    props.setNds({top: e.clientY+10, left: e.clientX+10, display: 'none', curNode: null});
  }

  const getErrorDim = (e) => {
    if (e) return 24;
    else return 0;
  }
  

  const renderRectSvgNode = ({ nodeDatum, toggleNode }) => (
  <g>
      <circle r="20" fill='gray' 
          strokeWidth="0"
          onClick={(e) => handleClick(e,nodeDatum.logs)}
          />
      <circle r="19" fill='#191919' 
          strokeWidth="0"
          onClick={(e) => handleClick(e,nodeDatum.logs)}
          />
      <circle r="16" fill={getColor(nodeDatum.origin)} 
          strokeWidth="0"
          onClick={(e) => handleClick(e,nodeDatum.logs)}/>
      <image x="-16" y="-16" width="32" height="32" 
        href={getIcon(nodeDatum.origin)} onClick={(e) => handleClick(e,nodeDatum.logs)}
          onMouseEnter={(e) => handleMouseEnter(e, nodeDatum)}
          onMouseLeave={(e) => handleMouseLeave(e)}
          />
      <circle r={(nodeDatum.fullData ? getErrorDim(nodeDatum.fullData.Document.error)/2.5 : 1)} fill='#ff0000' cx="12" cy="12" />
      <image x="0" y="0" width={(nodeDatum.fullData ? getErrorDim(nodeDatum.fullData.Document.error) : 1)}
        href={errorIcon2} />
      <text stroke="#dddddd" strokeWidth="1" x="-50" y="40" fontSize="x-small">
      {nodeDatum.name}
      </text>
  </g>
  );

  const initialTranslate = {x:150, y:100};
  const textLayout = {textAnchor: "start", x: 10, y: 50, transform: undefined }
  const nodeSize = {x:160+40, y:80};

  let nodeData;
  if (!props.nData) {
    nodeData = {
      children: [],
      http: {request: {}, response: {}},
      id: "abc123",
      name: "no-traces-found",
      origin: "thrownError",
      parent_id: undefined,
      subsegments: [{}]}
  }
  else nodeData = props.nData;


  return (
    // `<Tree />` will fill width/height of its container; in this case `#treeWrapper`.
    <div id="treeWrapper" style={{ width: '50em', height: '50em' }}>
      <Tree data={nodeData}
              orientation={"vertical"}
              pathClassFunc={getDynamicPathClass}
              translate={initialTranslate}
              collapsible={false} 
              zoom={1}
              textLayout={textLayout}  //not working
              allowForeignObjects={true}
              renderCustomNodeElement={renderRectSvgNode}
              nodeSize={nodeSize}
              styles={{
                links: {
                     
                      stroke: 'red',
                      strokeWidth: "2px",
                    },
             }}
              
      />
      
    </div>
  );
}

export default NodeTree;