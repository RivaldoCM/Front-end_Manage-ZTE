import { useCallback, useState } from 'react';
import { Background, Controls, ReactFlow, applyEdgeChanges, applyNodeChanges, addEdge } from '@xyflow/react';
import { Main } from './style';

import '@xyflow/react/dist/style.css';
import { Button, Input } from '@mui/joy';
import Add from '@mui/icons-material/Add';
import { CardEmployees } from '../../components/flow/node';

const initialNodes = [
    {
        id: '1',
        position: { x: 0, y: 0 },
        data: { label: 'Hello', jobTitle: 'Software Engineer', },
        type: 'custom',
    },
    {
        id: '2',
        position: { x: 500, y: 60 },
        data: { label: 'Hello', jobTitle: 'Software Engineer', },
    },
];

const initialEdges = [];

export function Flow() {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);
    const [selectedNode, setSelectedNode] = useState(null);

    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        []
    );

    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [],
    );

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [],
    );

    // Função para remover um node
    const removeNode = useCallback((nodeId) => {
        setNodes((nds) => applyNodeChanges([{ id: nodeId, type: 'remove' }], nds));
        setEdges((eds) => applyEdgeChanges([{ id: nodeId, type: 'remove' }], eds));
    }, []);

    // Exibir o menu de contexto
    const onNodeClick = useCallback((event, node) => {
        event.stopPropagation();
        setSelectedNode(node);
    }, []);

    const addNode = useCallback(() => {
        const newNode = {
            id: `${nodes.length + 1}`,
            position: { x: 100, y: 100 }, 
            data: { label: 'New Node' },
            type: 'custom'
        }
        setNodes((nds) => [...nds, newNode]); 
    }, [nodes]);



    return (
        <Main className='flex'>
            <aside className='flex'>
                <Button startDecorator={<Add />} onClick={addNode} sx={{ m: 1 }}>Add node</Button>

                {
                    selectedNode && (
                        <div>
                           Nome: <Input variant="solid" size="sm" value={selectedNode.data.label} />

                        </div>
                    )
                }
            </aside>
            <main>
                <ReactFlow 
                    fitView
                    nodes={nodes} 
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onNodeClick={onNodeClick} // Detectar clique no node
                    nodeTypes={{ custom: CardEmployees }}
                >
                    <Background />
                    <Controls />
                </ReactFlow>
            </main>
        </Main>
    );
}
