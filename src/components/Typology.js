import React, { useEffect, useState, useRef } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { PopupsProvider } from '../contexts/PopupsContext'
import DesksGraph from './DesksGraph'
import SideBar from './SideBar'
import {v4 as uuid} from "uuid"


export default function Typology({ match }) {
    const [key, setKey] = useState(uuid)
    const [graph, setGraph] = useState({})
    const [newGraph, setNewGraph] = useState({})
    const [loading, setLoading] = useState(true)
    const [authenticated, setAuthenticated] = useState(false)
    const { currentUser, isEmpty } = useAuth()
    const ws = useRef(null);
    

    const updateGraph = (data) => {
        console.log('update graph')
        console.log(graph)
        let updatedGraph = graphData.graph
        if (data.NewNodes != null) {
            updatedGraph.nodes = [...updatedGraph.nodes, ...data.NewNodes]
        }
        if (data.NewEdges != null) {
            updatedGraph.edges = [...updatedGraph.edges, ...data.NewEdges]
        }
        if (data.DeletedNodes != null) {
            updatedGraph.nodes = updatedGraph.nodes.filter((node) => !data.DeletedNodes.includes(node.uuid))
        }
        if (data.DeletedEdges != null) {
            updatedGraph.edges = updatedGraph.edges.filter((edge) => !data.DeletedEdges.includes(edge.uuid))
        }
        changeGraph(updatedGraph)
    }

    useEffect(() => {
        updateGraph(newGraph)
    }, [newGraph])

    useEffect(() => {
        ws.current = new WebSocket(`ws://localhost:8000/ws/${match.params.uuid}?user=1`);
        ws.current.onmessage = function(event) {
            let data = JSON.parse(event.data)
            console.log(data)

            if ('NewNodes' in data) {
                setNewGraph(data)
                // TODO deleted nodes
            }
            else {
                let graphForVis = {
                    desk: data.Desk,
                    typology: data.Typology,
                    nodes: data.Nodes,
                    edges: data.Edges,
                    types: data.Types,
                    typeEdges : data.TypeEdges
                }
                setGraph(graphForVis)
            }
            setLoading(false)
        };
    }, [match.params.uuid])

    const checkUserRights = () => {
        if (!isEmpty(currentUser)) {
            setAuthenticated(true)
        }
        else {
            setAuthenticated(false)
        }
    }

    useEffect(() => {
        checkUserRights()
    }, [currentUser])

    useEffect(() => {
        console.log('changed in desk.js');
    }, [graph])

    const changeGraph = (newGraph) => {
        setKey(uuid)
        setGraph(newGraph)
    }

    const graphData = {
        graph,
        changeGraph
    }

    const loadingCheck = loading ? <h3>Загрузка...</h3> : 
        <PopupsProvider key={key} graphData={graphData}>
            {authenticated ? <SideBar desk={match.params.id}/> : <div></div>}
            <DesksGraph nodes={graph.nodes} edges={graph.edges} />
        </PopupsProvider>
    
    return (
        <div className="desk-page-class">
            {loadingCheck}
        </div>
    )
}
