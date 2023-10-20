// ----- MAKE YOUR CHANGES BETWEEN THESE LINES FOR #9 ----- 

let network = async function(){

    const netData = await d3.json('class_network.json');

    // console.log("HELLO")
    // console.log(netData)

    const nodes = netData.nodes
    const edges = netData.links

    d3.forceSimulation()
            .nodes(nodes)
            .force("links", d3.forceLink()
                                .links(edges)
                                .id(d => d.course))
            .force("repulse", d3.forceManyBody().strength(-120) ) 
            .force("collide", d3.forceCollide().radius(6))
            .force("r", d3.forceRadial()
                            .radius(d => 60 * d.level)
                            .x(300)
                            .y(300)
                            .strength(1))
            .on("tick", tick);
    
        const svg = d3.select('svg#network')
        const colorScale = d3.scaleOrdinal(d3.schemeCategory10)
        
        function tick(){
            //Draw Lines
            let lines = svg.selectAll("line.edge")
                                .data(edges)
                                .join( 
                                    enter => enter.append("line")
                                                    .attr('class', 'edge')
                                                    .attr('stroke', '#262626')
                                    )
                                                    .attr("x1", d => d.source.x)
                                                    .attr("x2", d => d.target.x )
                                                    .attr("y1", d => d.source.y)
                                                    .attr("y2", d => d.target.y)
                                        
                                        

            //Draw Circles
            let circles = svg.selectAll("circle.node")
                                .data(nodes)
                                .join(
                                     enter => enter.append("circle")
                                                    .attr("class","node")
                                                    .attr("r", '6px')
                                    )
                                                    .attr("cx", d => d.x)
                                                    .attr("cy", d => d.y)
                                                    .attr("fill", d => colorScale(d.prefix))
                                    
        }

}


network()




// ----- MAKE YOUR CHANGES BETWEEN THESE LINES FOR #9 -----
