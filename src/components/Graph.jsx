"use client";
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { defaultForceProperties } from "@/utils/forceProperties";
import { useRouter } from "next/navigation";

const ForceDirectedGraph = ({
  data,
  centrality,
  forceProperties = defaultForceProperties,
}) => {
  const svgRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const width = () => window.innerWidth;
    const height = () => window.innerHeight;
    const color = d3.scaleOrdinal(d3.schemeCategory10);
    const edgeColor = d3.scaleOrdinal(d3.schemeAccent);

    const links = data.links.map((d) => ({ ...d }));
    const nodes = data.nodes.map((d) => ({ ...d }));

    const scaleSize = d3
      .scaleLinear()
      .domain([
        d3.min(nodes, (d) => d[centrality]),
        d3.max(nodes, (d) => d[centrality]),
      ])
      .range([5, centrality === "closeness_c" ? 20 : 50]);

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
      .attr("stroke", "#000")
      .attr("stroke-opacity", 0.6)
      .selectAll()
      .data(links)
      .join("line")
      .attr("stroke", (d) => edgeColor(d.weight))
      .attr("stroke-width", (d) => d.weight);

    const node = container.append("g").selectAll().data(nodes).join("g");

    const circles = node
      .append("circle")
      .style("cursor", "pointer")
      .attr("r", (d) => scaleSize(d[centrality]) || 5)
      .attr("fill", (d) => {
        if (centrality) {
          return color(d[`${centrality}_category`]);
        }
        return color(0);
      })
      .on("click", function (event, d) {
        handleClickNode(d);
      })
      .call(
        d3
          .drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
      );

    // tooltip
    node.append("title").text((d) => d.username);

    // title
    node.filter((d) => centrality !== 'default' ? scaleSize(d[centrality]) >= (centrality === 'closeness_c' ? 20 : 10) : false)
      .append("text")
      .attr("font-size", "4.2rem")
      .style("text-anchor", "middle")
      .style("alignment-baseline", "middle")
      .style("pointer-events", "none")
      .style("user-select", "none")
      .style("outline", "1px solid black")
      .attr("x", 0)
      .attr("y", 0)
      .text(function (d) {
        return d.username;
      });

    function ticked() {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      // node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
      node.attr("transform", function (d) {
        return `translate(${d.x},${d.y})`;
      });
    }

    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.1).restart();
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

    function handleClickNode(d) {
      const data = {
        username: d.username,
        degree: d.degree_c,
        betweenness: d.betweenness_c,
        closeness: d.closeness_c,
        eigenvector: d.eigenvector_c,
      };
      const params = new URLSearchParams(data);
      const query = params ? `?${params.toString()}` : "";
      router.push(`/data${query}`, { scroll: false, shallow: true });
    }

    function handleResize() {
      svg.attr("viewBox", [0, 0, width(), height()]);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      svg.selectChild().remove();
      simulation.stop();
      window.removeEventListener("resize", handleResize);
    };
  }, [data, forceProperties, centrality, router]);

  return <svg ref={svgRef}></svg>;
};

export default ForceDirectedGraph;
