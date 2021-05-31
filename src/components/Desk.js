import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { PopupsProvider } from '../contexts/PopupsContext'
import DesksGraph from './DesksGraph'
import SideBar from './SideBar'
import {v4 as uuid} from "uuid"


export default function Desk({ match }) {
    const [key, setKey] = useState(uuid)
    const [graph, setGraph] = useState({})
    const [loading, setLoading] = useState(true)
    const [authenticated, setAuthenticated] = useState(false)
    const { currentUser, isEmpty } = useAuth()

    const fetchUrl = async (url) => {
        const response = await fetch(url)
        const data = await response.json()
        return data
    }

    useEffect(() => {
        const getGraph = async () => {
            const fetchedNodes = await fetchUrl(`http://localhost:5000/api/nodes?desk=${match.params.id}`)
            const newNodes = fetchedNodes.map(node => {
                return {
                    id: node.properties.id,
                    label: node.properties.title,
                    group: node.properties.community,
                    type: node.label
                }
            })
            const fetchedEdges = await fetchUrl(`http://localhost:5000/api/edges?desk=${match.params.id}`)
            const newEdges = fetchedEdges.map(edge => {
                return {
                    from: edge.start,
                    to: edge.end,
                    label: edge.properties.type
                }
            })
            const fetchedTypology = await fetchUrl(`http://localhost:5000/api/desks/${match.params.id}/properties/typology`)
            setGraph({
                nodes: newNodes,
                edges: newEdges,
                typology: fetchedTypology
            })
            setLoading(false)
        }
        getGraph()
    }, [match.params.id])

    const checkUserRights = () => {
        try {
            const fetchRights = async () => {
                const response = await fetch(`http://localhost:5000/api/users/${currentUser.user.uuid}/rights`)
                const data = await response.json()

                if (!response.ok) {
                    return console.log(data.error);
                }

                if (data.roles.find(role => role === 'Super')) return setAuthenticated(true)
                if (data.desks && data.desks.find(desk =>  desk.deskID === parseInt(match.params.id))) return setAuthenticated(true)
            }
            if (!isEmpty(currentUser)) fetchRights()
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        setAuthenticated(false)
    }, [currentUser])

    useEffect(() => {
        console.log('changed in desk.js');
    }, [graph])

    checkUserRights()

    const changeGraph = (newGraph) => {
        setKey(uuid)
        setGraph(newGraph)
    }

    const graphData = {
        type: 'Доска',
        deskID: match.params.id,
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
