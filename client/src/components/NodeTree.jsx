import React from 'react';
import Tree from 'react-d3-tree';
import dynamoDBIcon from '../assets/dynamoDB.svg'
import lambdaFuncIcon from '../assets/lambdaFunc.svg'
import simpleNotificationIcon from '../assets/simpleNotification.svg'
import rs from '../assets/react.svg'
import './custom-tree.css';


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
    if (nType == 'lambdaFunc') return lambdaFuncIcon;
    else if (nType == 'dynamoDB') return dynamoDBIcon;
    else if (nType == 'simpleNotification') return simpleNotificationIcon;
    else return rs;
  }

  const handleClick = (e,logs) => {
    props.setLData({logs:logs});
  }

  const handleMouseEnter = (e) => {
    props.setNds({top: e.clientY+10, left: e.clientX+10, display: 'inline'});
  }

  const handleMouseLeave = (e) => {
    props.setNds({top: e.clientY+10, left: e.clientX+10, display: 'none'});
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
      <circle r="16" fill={nodeDatum.color} 
          strokeWidth="0"
          onClick={(e) => handleClick(e,nodeDatum.logs)}/>
      <image x="-16" y="-16" width="32" height="32" 
        href={getIcon(nodeDatum.icon)} onClick={(e) => handleClick(e,nodeDatum.logs)}
          onMouseEnter={(e) => handleMouseEnter(e)}
          onMouseLeave={(e) => handleMouseLeave(e)}
          />
      <text stroke="#dddddd" strokeWidth="1" x="-50" y="40" fontSize="x-small">
      {nodeDatum.name}
      </text>
  </g>
  );

  const initialTranslate = {x:400, y:200};
  const textLayout = {textAnchor: "start", x: 10, y: 50, transform: undefined }
  const nodeSize = {x:160, y:80};

  return (
    // `<Tree />` will fill width/height of its container; in this case `#treeWrapper`.
    <div id="treeWrapper" style={{ width: '50em', height: '50em' }}>
      <Tree data={props.nData}
              orientation={"vertical"}
              pathClassFunc={getDynamicPathClass}
              onClick={() => console.log('yoooo')}  //not working
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