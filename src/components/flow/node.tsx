import { ReactFlow, Handle } from '@xyflow/react';
import { CardFlow } from './style';

export function CardEmployees(props: any){

	const handleClick = () => {
		//console.log(props)
	}

    return (
		<CardFlow onClick={handleClick}>
			<div className='flex'>
				<div className='img'></div>
			</div>
			<div className="job-title-container">
				<p>{props.data.label}</p>
			</div>
			<Handle type="target" position="top" />
			<Handle type="source" position="bottom" />
		</CardFlow>
    );
};