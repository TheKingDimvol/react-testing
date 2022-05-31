import React, { useEffect, useState } from 'react'
import Graph from "react-graph-vis";
import { usePopup } from '../contexts/PopupsContext'

export default function DesksGraph() {
    const options = {
        autoResize: true,
        height: '100%',
        width: '100%',
        layout: {
            hierarchical: false,
            improvedLayout: true,
            randomSeed: 1234
        },
        nodes: {
            shape: 'dot',
            font: {
                size: 18
            }
        },
        edges: {
            color: "#000000",
            font: {
                size: 12,
                mono: {
                    vadjust: 0
                }
            }
        },
        groups:{
            useDefaultGroups: true
        },
        interaction: {
            dragView: true,
            zoomView: true
        },
        physics: {
            enabled: false
        }
    }
    const events = {
        select: function(event) {
            const { nodes, edges } = event
            console.log("Selected nodes:")
            console.log(nodes)
            console.log("Selected edges:")
            console.log(edges)
        }
    }

    const [loading, setLoading] = useState(true)
    const { graphData } = usePopup()

    useEffect(() => {
        setLoading(true)

        console.log('changed in graph');

        console.log(graphData.graph)

        setLoading(false)
    }, [graphData.graph])

    const graphLoading = loading ? <h3>Загрузка...</h3> : <Graph graph={graphData.graph} options={options} events={events} />

    const graphStyle = {
        width: '100%',
        position: 'relative',
        //left: '8vw',
        height: 'calc(100vh - 60px)'
    }

    return (
        <div style={graphStyle}>
            {graphLoading}
        </div>
    )
}
