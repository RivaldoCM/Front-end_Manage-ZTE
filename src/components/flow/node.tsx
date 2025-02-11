import { ReactFlow, Handle } from '@xyflow/react';

import './style.css'

export const CustomNode = ({ id, data }) => {
  return (
    <div className="react-flow__node custom-node">
      <div className="image-container">
        <img
          src={data.imageUrl}
          alt="Foto da pessoa"
        />
      </div>
      <div className="job-title-container">
        <p>{data.jobTitle}</p>
      </div>
      <Handle type="target" position="top" />
      <Handle type="source" position="bottom" />
    </div>
  );
};