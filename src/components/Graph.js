"use client";
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { defaultForceProperties } from "@/utils/forceProperties";

const ForceDirectedGraph = ({
  data,
  centrality,
  forceProperties = defaultForceProperties,
}) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const width = () => window.innerWidth;
    const height = () => window.innerHeight;
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const links = data.links.map((d) => ({ ...d }));
    const nodes = data.nodes.map((d) => ({ ...d }));

    const scaleSize = d3
      .scaleLinear()
      .domain([
        d3.min(nodes, (d) => d[centrality]),
        d3.max(nodes, (d) => d[centrality]),
      ])
      .range([5, 25]);

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance(forceProperties.link.distance)
          .iterations(forceProperties.link.iterations)
      )
      .force(
        "charge",
        d3
          .forceManyBody()
          .strength(
            forceProperties.charge.enabled ? forceProperties.charge.strength : 0
          )
          .distanceMin(forceProperties.charge.distanceMin)
          .distanceMax(forceProperties.charge.distanceMax)
      )
      .force(
        "collide",
        d3
          .forceCollide()
          .radius(forceProperties.collide.radius)
          .strength(
            forceProperties.collide.enabled
              ? forceProperties.collide.strength
              : 0
          )
          .iterations(forceProperties.collide.iterations)
      )
      .force(
        "center",
        d3.forceCenter(
          width() * forceProperties.center.x,
          height() * forceProperties.center.y
        )
      )
      .force(
        "forceX",
        d3
          .forceX()
          .x(width() * forceProperties.forceX.x)
          .strength(
            forceProperties.forceX.enabled ? forceProperties.forceX.strength : 0
          )
      )
      .force(
        "forceY",
        d3
          .forceY()
          .y(height() * forceProperties.forceY.y)
          .strength(
            forceProperties.forceY.enabled ? forceProperties.forceY.strength : 0
          )
      )
      .on("tick", ticked);

    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", [0, 0, width(), height()])
      .attr("style", "max-width: 100%; height: auto;")
      .call(d3.zoom().on("zoom", zoomed));

    const container = svg.append("g");

    const link = container
      .append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .selectAll()
      .data(links)
      .join("line")
      .attr("stroke-width", (d) => d.weight);

    const node = container
      .append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .selectAll()
      .data(nodes)
      .join("circle")
      .attr("r", (d) => scaleSize(d[centrality]) || 5)
      .attr("fill", (d) => {
        if (centrality) {
          return color(d[`${centrality}_category`]);
        }
        return color(0);
      })
      .on("click", function (event, d) {
        let { target } = event;
        console.log(target);
      });

    // tooltip
    node.append("title")
      .text((d) => d.username)
    
    // node
    // .append("g")
    // .append("text")
    // .attr("x", (d) => scaleSize(d[centrality]) + 5)
    // .attr("y", 3)
    // .text(function (d) {
    //   return d.username;
    // });


    node.call(
      d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
    );

    function ticked() {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
    }

    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    function zoomed(event) {
      container.attr("transform", event.transform);
    }

    const handleResize = () => {
      svg.attr("viewBox", [0, 0, width(), height()]);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      simulation.stop();
      window.removeEventListener("resize", handleResize);
    };
  }, [data, forceProperties, centrality]);

  return <svg ref={svgRef}></svg>;
};

export default ForceDirectedGraph;
