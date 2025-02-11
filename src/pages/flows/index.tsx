import { useCallback, useState } from 'react';
import { Background, Controls, ReactFlow, applyEdgeChanges, applyNodeChanges, addEdge } from '@xyflow/react';
import { Main } from './style';

import '@xyflow/react/dist/style.css';
import { Button } from '@mui/joy';
import Add from '@mui/icons-material/Add';
import { CustomNode } from '../../components/flow/node';


const initialNodes = [
    {
        id: '1',
        position: { x: 0, y: 0 },
        data: { label: 'Hello', jobTitle: 'Software Engineer', },
        type: 'custom',
    },
    {
        id: '2',
        position: { x: 0, y: 0 },
        data: { label: 'Hello', jobTitle: 'Software Engineer', },
    },
];

const initialEdges = [];

export function Flow() {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);
    const [showMenu, setShowMenu] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
    const [selectedNodeId, setSelectedNodeId] = useState(null);

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
        setShowMenu(false);  // Fechar o menu após a remoção
    }, []);

    // Exibir o menu de contexto
    const onNodeClick = useCallback((event, node) => {
        // Evitar propagação do evento para que o menu não apareça ao clicar fora
        event.stopPropagation();

        // Setar a posição do menu e o node selecionado
        setMenuPosition({
            x: event.clientX, // Posição X do clique
            y: event.clientY, // Posição Y do clique
        });
        setSelectedNodeId(node.id);
        setShowMenu(true); // Mostrar o menu
    }, []);

    // Função para fechar o menu
    const closeMenu = () => {
        setShowMenu(false);
    };

    // Função para lidar com a ação de clicar em uma opção do menu
    const handleMenuAction = (action) => {
        if (action === 'remove') {
            removeNode(selectedNodeId);
        }
        setShowMenu(false);  // Fechar o menu após a ação
    };

    const addNode = useCallback(() => {
        const newNode = {
            id: `${nodes.length + 1}`,
            position: { x: 100, y: 100 }, 
            data: { label: 'New Node' },
            type: 'custom'
        };
        
        setNodes((nds) => [...nds, newNode]); 
    }, [nodes]);

    return (
        <Main onClick={closeMenu} className='flex'>
            <aside className='flex'>
                <Button startDecorator={<Add />} onClick={addNode}>Add node</Button>
            </aside>
            <div>
                <ReactFlow 
                    nodes={nodes} 
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onNodeClick={onNodeClick} // Detectar clique no node
                    nodeTypes={{ custom: CustomNode }}
                >
                    <Background color='#000'/>
                    <Controls />
                </ReactFlow>
            </div>
        </Main>
    );
}
