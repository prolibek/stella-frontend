import React, { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    MiniMap,
    Controls,
    Background,
    applyNodeChanges,
    MarkerType,
    Node
} from 'react-flow-renderer';
import { StructureLayout } from "@/pages/layouts/work-layout";
import 'react-flow-renderer/dist/style.css';
import { useTenantName } from '@/shared/hooks/useTenantName';
import $api from '@/shared/api/axios';
import HeadPart from '@/shared/ui/head-part';
import BlueButton from '@/shared/ui/blue-button';
import Modal from '@/shared/ui/modal';
import { CustomNode } from '@/features/hierarchy/node';

import s from './styles.module.css';

const initialElements = [
    {
        id: '1',
        type: 'input', // input node
        data: { label: 'CEO' },
        position: { x: 200, y: 150 },
        draggable: true, // make the node draggable
    }
];

const nodeTypes = { custom: CustomNode };

export const HierarchyPage = () => {
    const tenant = useTenantName();
    
    const [orgInfo, setOrgInfo] = useState({ ceo: '', name: '', avatar: null });
    const [isOpen, setIsOpen] = useState(false);
    const [members, setMembers] = useState([]);
    const [elements, setElements] = useState(initialElements);
    const [edges, setEdges] = useState([]);
    const [newNodeLabel, setNewNodeLabel] = useState('');
    const [selectedNode, setSelectedNode] = useState(null);

    useEffect(() => {
        const fetchOrgInfo = async () => {
            const response = await $api.get(`organisations/${tenant}/information/`);
            const { ceo, name, avatar } = response.data;
            setOrgInfo({ ...orgInfo, ceo: ceo.id || '', name: name || '', avatar: null, avatarURL: avatar });
        };

        fetchOrgInfo();
    }, []);

    useEffect(() => {
        const fetchMembers = async () => {
            const response = await $api.get(`/organisations/${tenant}/members/`);
            console.log(response.data)
            setMembers(response.data.filter((el) => el.user.role === 2));
        };

        fetchMembers();
    }, [tenant]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Delete' && selectedNode) {
                deleteNode(selectedNode);
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedNode]);

    const onNodesChange = useCallback((changes) => {
        setElements((els) => applyNodeChanges(changes, els));
    }, []);
    
    const onNodeDragStop = useCallback((event, node) => {
        setElements((els) =>
            els.map((el) =>
                el.id === node.id ? { ...el, position: node.position } : el
            )
        );
        setSelectedNode(node);
    }, []);
    
    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

    const addNode = () => {
        if (newNodeLabel === 'CEO') {
            return;
        }
        const newNode = {
            id: (Date.now()).toString(),
            type: 'custom',
            data: { label: newNodeLabel || `Node ${elements.length + 1}`, image: '/images/userIcon.png', member: null },
            position: { x: Math.random() * 400, y: Math.random() * 400 },
            draggable: true,
        };
        setElements((els) => [...els, newNode]);
        setNewNodeLabel('');
    };

    const deleteNode = (node: Node) => {
        if (node.data.label === 'CEO') {    
            return;
        }
        setEdges((eds) => eds.filter((edge) => edge.source !== node.id && edge.target !== node.id));
        setElements((els) => els.filter((el) => el.id !== node.id));
        setSelectedNode(null);
    };

    useEffect(() => {
        console.log(edges)
        console.log(elements)
    }, [elements])

    const handleMemberDoubleClick = (member) => {
        if (!selectedNode) return;
    
        // Find the previously assigned node and remove the member
        const updatedElements = elements.map((item) => {
            if (item.id === selectedNode.id) {
                return { ...item, data: { ...item.data, member } };
            } else if(item.data.member && (member.user.id === item.data.member.user.id)) {
                return { ...item, data: {...item.data, member: null}}
            }

            return item;
        });
    
        setElements(updatedElements);
    };    

    const handleSaveClick = async () => {
        const filteredElements = elements.filter(el => el.data.label !== 'CEO');
        const filteredEdges = edges.filter(edge => 
            filteredElements.some(el => el.id === edge.source || el.id === edge.target)
        );
    
        const updatedManagers = filteredElements.map(el => ({
            id: el.id,
            position: el.data.label,
            member: el.data.member ? el.data.member.user.id : null,
            parent_manager: filteredEdges.find(edge => edge.target === el.id)?.source || null
        }));
    
        const response = await $api.post(`/organisations/${tenant}/managers/save_hierarchy/`, { managers: updatedManagers });
        console.log(response)
        alert('Hierarchy saved successfully!');
    };    

    return (
        <>
            <StructureLayout>
                <ReactFlowProvider>
                    <HeadPart style={{ marginBottom: 20 }}>
                        <h1>Hierarchy</h1>
                        <BlueButton 
                            style={{width: 100}}
                            onClick={() => handleSaveClick()}
                        >Save</BlueButton>
                    </HeadPart>
                    <form onSubmit={(e) => { e.preventDefault(); addNode(); } } style={{ marginBottom: 20, display: "flex", alignItems: "center", gap: 20 }}>
                        <input
                            type="text"
                            style={{
                                height: 40,
                                width: 300,
                                padding: 5
                            }}
                            value={newNodeLabel}
                            onChange={(e) => setNewNodeLabel(e.target.value)}
                            placeholder="Enter position name"
                        />
                        <BlueButton
                            type="submit"
                            style={{ width: 80 }}
                        >Add</BlueButton>
                    </form>
                    <div className={s.container}>
                        <div className={s.membersList}>
                            <h3>Members</h3>
                            <ul className={s.list}>
                                {members.map(member => (
                                    <li 
                                        className={s.member}
                                        onDoubleClick={() => handleMemberDoubleClick(member)}
                                        key={member.id} 
                                    >
                                        <img 
                                            src={member.user.avatar || '/images/userIcon.png'} 
                                            alt={member.user.first_name} 
                                        />
                                        <span>{member.user.first_name} {member.user.last_name}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={s.flowContainer}>
                            <ReactFlow
                                nodes={elements.map(el => ({
                                    ...el,
                                    style: {
                                        ...el.style,
                                        border: el.id === selectedNode?.id ? '1px solid #007bff' : '1px solid lightgray',
                                        borderRadius: '5px'
                                    }
                                }))}
                                edges={edges.map(edge => ({
                                    ...edge,
                                    MarkerEnd: {
                                        type: MarkerType.ArrowClosed
                                    }
                                }))}
                                onNodesChange={onNodesChange}
                                onNodeDragStop={onNodeDragStop}
                                onNodeClick={(event, node) => { setSelectedNode(node) }}
                                onConnect={onConnect}
                                nodeTypes={nodeTypes}
                            >
                                <MiniMap />
                                <Controls />
                                <Background />
                            </ReactFlow>
                        </div>
                    </div>
                </ReactFlowProvider>
            </StructureLayout>
        </>
    );
};
