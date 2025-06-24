"use client";

import { useRef, useMemo, memo } from "react";
import { motion } from "motion/react";
import DottedMap from "dotted-map";

interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number; label?: string };
    end: { lat: number; lng: number; label?: string };
  }>;
  lineColor?: string;
  backgroundColor?: string;
  dotColor?: string;
  darkMode?: boolean;
}

const WorldMap = memo(function WorldMap({
  dots = [],
  lineColor = "#D4AF37", // Gold color
  backgroundColor = "transparent",
  dotColor = "#D4AF37", // Gold color
  darkMode = false,
}: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  
  // Memoize the map generation to avoid recreating it on every render
  const svgMap = useMemo(() => {
    const map = new DottedMap({ height: 60, grid: "diagonal" });
    return map.getSVG({
      radius: 0.18,
      color: darkMode ? "#FFFFFF40" : "#00000030", // Visible colors for both themes
      shape: "circle",
      backgroundColor: backgroundColor || "transparent",
    });
  }, [backgroundColor, darkMode]);

  const projectPoint = (lat: number, lng: number) => {
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
  };

  const createCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number }
  ) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 40;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  return (
    <div className="w-full h-full min-h-[200px] sm:min-h-[300px] md:min-h-[400px] lg:aspect-[2/1] bg-transparent rounded-lg relative font-sans overflow-hidden">
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="h-full w-full pointer-events-none select-none opacity-70 object-cover sm:object-contain"
        alt="world map"
        height="495"
        width="1056"
        draggable={false}
      />
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="w-full h-full absolute inset-0 pointer-events-none select-none"
      >
        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);
          return (
            <g key={`path-group-${i}`}>
              <motion.path
                d={createCurvedPath(startPoint, endPoint)}
                fill="none"
                stroke="url(#path-gradient)"
                strokeWidth="2.5"
                initial={{
                  pathLength: 0,
                  opacity: 0,
                }}
                animate={{
                  pathLength: [0, 1, 1, 0],
                  opacity: [0, 0.8, 0.8, 0],
                }}
                transition={{
                  duration: 6,
                  delay: i * 0.5,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 3,
                  times: [0, 0.3, 0.7, 1],
                }}
                key={`animated-path-${i}`}
              />
            </g>
          );
        })}

        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={lineColor} stopOpacity="0" />
            <stop offset="20%" stopColor={lineColor} stopOpacity="0.6" />
            <stop offset="80%" stopColor={lineColor} stopOpacity="0.6" />
            <stop offset="100%" stopColor={lineColor} stopOpacity="0" />
          </linearGradient>
        </defs>

        {dots.map((dot, i) => (
          <g key={`points-group-${i}`}>
            {/* Start point (other countries) - larger for mobile */}
            <circle
              cx={projectPoint(dot.start.lat, dot.start.lng).x}
              cy={projectPoint(dot.start.lat, dot.start.lng).y}
              r="3.5"
              fill={dotColor}
              opacity="0.8"
              className="animate-pulse"
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: "2s",
              }}
            />
            
            {/* End point (Morocco) - even larger and more prominent */}
            <circle
              cx={projectPoint(dot.end.lat, dot.end.lng).x}
              cy={projectPoint(dot.end.lat, dot.end.lng).y}
              r="6"
              fill={dotColor}
              opacity="1"
              className="animate-pulse"
              style={{
                animationDuration: "1.5s",
              }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
});

export default WorldMap;
