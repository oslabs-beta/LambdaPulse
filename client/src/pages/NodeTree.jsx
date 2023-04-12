import React from 'react';
import Tree from 'react-d3-tree';
import './custom-tree.css';

const orgChart = {
    name: 'GetSharedUnicorn',
    color: "orange",
    icon: 'lambdaFunc',
    children: [
        {
        name: 'sharedUnicorns',
        color: "blue",
        icon: 'dynamoDB',
        attributes: {
            department: 'Fabrication',
        },
        children: [],
        },
        {
        name: 'wildrydes-prod-unicornDispatched',
        color: 'pink',
        icon: 'simpleNotification',
        attributes: {
            department: 'Assembly',
        },
        children: [
            {
            name: 'wildrydes-prod-uploadReceipt',
            color: "orange",
            icon: 'lambdaFunc',
            children: []
            },
            {
            name: 'wildrydes-prod-recordRide',
            color: "orange",
            icon: 'lambdaFunc',
            children: []
            },
        ],
        },
    ],
  };
  
  const OrgChartTree = (props) => {
    const getDynamicPathClass = ({ source, target }, orientation) => {
        if (!target.children) {
          // Target node has no children -> this link leads to a leaf node.
          return 'link__to-leaf';
        }
    
        // Style it as a link connecting two branch nodes by default.
        return 'link__to-branch';
      };
    
    const getIcon = (nType) => {
      if (nType == 'lambdaFunc') return {h: 48, w: 48, d: "M24 44C12.972 44 4 35.028 4 24S12.972 4 24 4s20 8.972 20 20-8.972 20-20 20zm0-42C11.869 2 2 11.869 2 24s9.869 22 22 22 22-9.869 22-22S36.131 2 24 2zm-6.769 33.25h-5.355l6.345-13.291 2.681 5.533-3.671 7.758zm1.883-16.035a1.001 1.001 0 00-.9-.564h-.003a.998.998 0 00-.899.57L9.389 35.819a.998.998 0 00.902 1.431h7.573c.387 0 .739-.223.905-.572l4.146-8.763a1.002 1.002 0 00-.004-.864l-3.797-7.836zM36.125 35.25h-5.452l-9.912-21.297a1.001 1.001 0 00-.907-.578h-3.603l.004-4.125h7.22l9.864 21.295a1 1 0 00.907.58h1.879v4.125zm1-6.125h-2.24L25.021 7.83a1.003 1.003 0 00-.908-.58h-8.857a1 1 0 00-1 .999l-.006 6.125a1 1 0 001 1.001h3.967l9.912 21.297a1 1 0 00.906.578h7.09a1 1 0 001-1v-6.125a1 1 0 00-1-1z"};
      else if (nType == 'dynamoDB') return {h: 48, w: 48, d: "M6 35h24v-2H6v2zm-4-7.073h15v-2H2v2zM22 31v-3.073h-2.916v-2H22V23h2v2.927h3v2h-3V31h-2zm12.4 8.656l2.559-9.675a1.003 1.003 0 00-.967-1.256h-4.384L35.641 20h6.37l-4.007 6.474a1.003 1.003 0 00-.024 1.013c.177.317.512.513.874.513h3.988L34.4 39.656zm11.291-13.111a.999.999 0 00-.89-.545h-4.152l4.007-6.473a1 1 0 00-.85-1.527h-8.805c-.39 0-.744.227-.908.58l-4.956 10.725c-.143.31-.118.671.065.959.185.287.502.461.843.461h4.648l-3.598 13.61a1 1 0 001.776.843L45.61 27.587a1 1 0 00.081-1.042zM28.448 40.084l.301 1.977c-1.511.23-3.088.347-4.686.347-7.21 0-14.51-2.038-14.51-5.933h2c0 1.642 4.76 3.933 12.51 3.933a29.23 29.23 0 004.385-.324zM11.033 9.754C11.033 7.84 16.464 5 23.966 5 31.763 5 37 7.572 37 9.976c0 1.662-5.064 4.077-13 4.077-7.841 0-12.879-2.358-12.998-4.018l.031-.281zM11 13.123c2.768 1.919 7.991 2.93 13 2.93s10.232-1.011 13-2.93V16h2v-6h-.003c0-.008.003-.015.003-.024C39 5.934 32.677 3 23.966 3 15.933 3 9.136 6.047 9.034 9.672L9 9.976c0 .009.003.016.003.024H9v14h2V13.123z"};
      else if (nType == 'simpleNotification') return {h: 40, w: 40, d:"M7.01 20.078a1.1 1.1 0 011.105-1.093 1.1 1.1 0 011.104 1.093 1.1 1.1 0 01-1.104 1.093 1.1 1.1 0 01-1.105-1.093zM20.776 33C14.813 33 9.645 28.375 8.47 22.136a2.1 2.1 0 001.69-1.558h2.949v-1h-2.95a2.104 2.104 0 00-1.653-1.554C9.72 12.252 14.838 8 20.776 8c2.933 0 5.354.643 7.194 1.911l.575-.821C26.534 7.703 23.92 7 20.776 7c-6.51 0-12.104 4.726-13.308 11.096C6.62 18.368 6 19.149 6 20.078c0 .916.602 1.688 1.431 1.971C8.591 28.894 14.24 34 20.776 34c3.285 0 6.788-1.667 8.786-3.094l-.59-.811C26.947 31.541 23.627 33 20.777 33zM14.79 18.242c1.111.274 2.523.321 3.343.321.833 0 2.271-.047 3.402-.32l-2.401 5.014a.507.507 0 00-.048.215v2.324l-1.957.915v-3.239a.514.514 0 00-.044-.206l-2.295-5.024zm3.343-1.757c2.314 0 3.554.311 3.951.52-.417.234-1.745.558-3.95.558-2.184 0-3.483-.327-3.873-.558.37-.206 1.582-.52 3.872-.52zm-1.78 11.438a.511.511 0 00.486.03l2.968-1.388a.5.5 0 00.288-.452v-2.529l2.909-6.074a.806.806 0 00.189-.51c0-1.252-2.751-1.515-5.06-1.515-2.266 0-4.969.263-4.969 1.515 0 .19.067.355.18.502l2.775 6.077V27.5c0 .172.088.331.235.423zM30.877 27a1.1 1.1 0 011.104 1.093 1.1 1.1 0 01-1.104 1.093 1.1 1.1 0 01-1.104-1.093A1.1 1.1 0 0130.876 27zm0-16.03a1.1 1.1 0 011.104 1.093 1.1 1.1 0 01-1.104 1.093 1.1 1.1 0 01-1.104-1.093 1.1 1.1 0 011.104-1.093zm1.01 8.015a1.1 1.1 0 011.104 1.093 1.1 1.1 0 01-1.104 1.093 1.1 1.1 0 01-1.104-1.093 1.1 1.1 0 011.104-1.093zm-4.607 1.593h2.561a2.108 2.108 0 002.046 1.593A2.106 2.106 0 0034 20.078a2.106 2.106 0 00-2.114-2.093c-.992 0-1.818.681-2.046 1.593H27.28v-7.015h1.551a2.108 2.108 0 002.046 1.593 2.106 2.106 0 002.114-2.093 2.106 2.106 0 00-2.114-2.093c-.991 0-1.818.681-2.046 1.593h-2.056a.502.502 0 00-.505.5v7.515h-3.061v1h3.061v7.515c0 .277.226.5.505.5h2.056a2.108 2.108 0 002.046 1.593 2.106 2.106 0 002.114-2.093A2.106 2.106 0 0030.876 26c-.991 0-1.818.681-2.046 1.593H27.28v-7.015z"}
      else return {h:40, w:40, d:"M47.5 48.44h-45a1 1 0 01-1-1v-3a22.73 22.73 0 0117.36-22.1 1.06 1.06 0 01.72.09 11.29 11.29 0 0010.82 0 1 1 0 01.71-.09A22.73 22.73 0 0148.5 44.45v3a1 1 0 01-1 .99zm-44-2h43v-2A20.71 20.71 0 0031 24.39a13.51 13.51 0 01-6 1.43 13.21 13.21 0 01-6-1.43A20.72 20.72 0 003.5 44.45z"}
    }

    const handleClick = (e) => {
      props.setNds({top: e.clientY+10, left: e.clientX+10, display: 'inline'});
    }

    

    const renderRectSvgNode = ({ nodeDatum, toggleNode }) => (
    <g>
        <circle r="20" fill='gray' 
            strokeWidth="0"
            onClick={(e) => handleClick(e)}
            />
        <circle r="19" fill='white' 
            strokeWidth="0"
            onClick={(e) => handleClick(e)}
            />
        <circle r="16" fill={nodeDatum.color} 
            strokeWidth="0"
            onClick={(e) => handleClick(e)}/>
        <svg x="-16" y="-16" width="32" height="32" viewBox={"0 0 " + getIcon(nodeDatum.icon).w + ' ' + getIcon(nodeDatum.icon).h} 
            className="w-6 h-6"  xmlns="http://www.w3.org/2000/svg"
            strokeWidth="0"
            onClick={(e) => handleClick(e)}>
            <path d={getIcon(nodeDatum.icon).d} fill="#ffffff" fillRule="evenodd">
            </path>
        </svg>
        <text stroke="gray" strokeWidth="1" x="-50" y="40" fontSize="x-small">
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
        <Tree data={orgChart}
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
                
        />
        
      </div>
    );
  }

  export default OrgChartTree;