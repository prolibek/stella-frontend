import React from 'react';
import { Handle, Position } from 'react-flow-renderer';

interface Data {
    image?: string,
    label: string,
    member?: any
}

interface NodeProps {
    data: Data
}

export const CustomNode:React.FC<NodeProps> = ({ data }) => {
    return (
        <div style={{ border: '1px solid lightgray', padding: '10px', borderRadius: '5px', background: 'white', display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Handle
                type="target"
                position={Position.Top}
                style={{ top: -3, background: '#555' }}
            />
            <Handle
                type="source"
                position={Position.Bottom}
                style={{ bottom: -3, background: '#555' }}
            />
            <img src={data.image} alt="Node" style={{ width: '50px', height: '50px', marginBottom: 5 }} />
            <p style={{maxWidth: '75px', textAlign: 'center'}}>{data.label}</p>
            <span style={{fontSize: '14px'}}>
                {data.member ? `${data.member.user.first_name} ${data.member.user.last_name}` : "None" }
            </span>
        </div>
    );
};
