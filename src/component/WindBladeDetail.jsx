import * as React from "react";
const SVGComponent = (props) => {
  const handleBladeClick = (e, blade) => {
    console.log(e);
    props.setblade(blade);
    document.querySelectorAll(".wing").forEach((v) => {
      v.style.fill = "white";
    });
    e.target.style.fill = "#d5e3f0";
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={300}
      height={300}
      viewBox="0 0 320 320"
      xmlSpace="preserve"
      // {...props}
    >
      <desc>{"Created with Fabric.js 4.6.0"}</desc>
      <defs />
      <g transform="matrix(0.56 0 0 1.33 162.54 245.54)">
        <path
          style={{
            stroke: "rgb(0,0,0)",
            strokeWidth: 5,
            strokeDasharray: "none",
            strokeLinecap: "butt",
            strokeDashoffset: 0,
            strokeLinejoin: "miter",
            strokeMiterlimit: 4,
            fill: "rgb(255,255,255)",
            fillRule: "nonzero",
            opacity: 1,
          }}
          vectorEffect="non-scaling-stroke"
          transform=" translate(0, 0)"
          d="M -28.14939 -28.14939 L 28.14939 -28.14939 L 28.14939 28.14939 L -28.14939 28.14939 z"
          strokeLinecap="round"
        />
      </g>
      <g transform="matrix(0 0.33 -1.33 0 162.54 290.81)">
        <path
          style={{
            stroke: "rgb(0,0,0)",
            strokeWidth: 5,
            strokeDasharray: "none",
            strokeLinecap: "butt",
            strokeDashoffset: 0,
            strokeLinejoin: "miter",
            strokeMiterlimit: 4,
            fill: "rgb(255,255,255)",
            fillRule: "nonzero",
            opacity: 1,
          }}
          vectorEffect="non-scaling-stroke"
          transform=" translate(0, 0)"
          d="M -28.14939 -28.14939 L 28.14939 -28.14939 L 28.14939 28.14939 L -28.14939 28.14939 z"
          strokeLinecap="round"
        />
      </g>
      <g transform="matrix(0.45 -0.59 -1.61 -1.21 218.62 213.26)" id="detailWingC1">
        <path
          className="wing"
          onClick={(e) => handleBladeClick(e, "C")}
          style={{
            stroke: "rgb(0,0,0)",
            strokeWidth: 5,
            strokeDasharray: "none",
            strokeLinecap: "butt",
            strokeDashoffset: 0,
            strokeLinejoin: "miter",
            strokeMiterlimit: 4,
            fill: "rgb(255,255,255)",
            fillRule: "nonzero",
            opacity: 1,
            cursor: "pointer",
          }}
          vectorEffect="non-scaling-stroke"
          transform=" translate(0, 0)"
          d="M 0 -42.36343 C 23.38461 -42.36343 42.36343 -23.384610000000002 42.36343 0 C 42.36343 23.38461 23.384610000000002 42.36343 0 42.36343 C -23.38461 42.36343 -42.36343 23.384610000000002 -42.36343 0 C -42.36343 -23.38461 -23.384610000000002 -42.36343 0 -42.36343 z"
          strokeLinecap="round"
        />
      </g>
      <g transform="matrix(0.45 -0.6 -0.69 -0.52 215.3 230.78)" id="detailWingC2">
        <path
          style={{
            stroke: "rgb(0,0,0)",
            strokeWidth: 5,
            strokeDasharray: "none",
            strokeLinecap: "butt",
            strokeDashoffset: 0,
            strokeLinejoin: "miter",
            strokeMiterlimit: 4,
            fill: "rgb(255,255,255)",
            fillOpacity: 0,
            fillRule: "nonzero",
            opacity: 1,
            cursor: "pointer",
          }}
          vectorEffect="non-scaling-stroke"
          transform=" translate(0, 0)"
          d="M -11.33929 -51.89742 L 11.33929 -24.660069999999997 L 11.33929 51.89741"
          strokeLinecap="round"
        />
      </g>
      <g transform="matrix(-0.46 0.61 -0.69 -0.52 233.91 206.09)" id="detailWingC3">
        <path
          style={{
            stroke: "rgb(0,0,0)",
            strokeWidth: 5,
            strokeDasharray: "none",
            strokeLinecap: "butt",
            strokeDashoffset: 0,
            strokeLinejoin: "miter",
            strokeMiterlimit: 4,
            fill: "rgb(255,255,255)",
            fillOpacity: 0,
            fillRule: "nonzero",
            opacity: 1,
            cursor: "pointer",
          }}
          vectorEffect="non-scaling-stroke"
          transform=" translate(0, 0)"
          d="M -11.33929 -51.89742 L 11.33929 -24.660069999999997 L 11.33929 51.89741"
          strokeLinecap="round"
        />
      </g>
      <g transform="matrix(-0.45 -0.59 1.61 -1.21 104.72 213.26)" id="detailWingB1">
        <path
          className="wing"
          onClick={(e) => handleBladeClick(e, "B")}
          style={{
            stroke: "rgb(0,0,0)",
            strokeWidth: 5,
            strokeDasharray: "none",
            strokeLinecap: "butt",
            strokeDashoffset: 0,
            strokeLinejoin: "miter",
            strokeMiterlimit: 4,
            fill: "rgb(255,255,255)",
            fillRule: "nonzero",
            opacity: 1,
            cursor: "pointer",
          }}
          vectorEffect="non-scaling-stroke"
          transform=" translate(0, 0)"
          d="M 0 -42.36343 C 23.38461 -42.36343 42.36343 -23.384610000000002 42.36343 0 C 42.36343 23.38461 23.384610000000002 42.36343 0 42.36343 C -23.38461 42.36343 -42.36343 23.384610000000002 -42.36343 0 C -42.36343 -23.38461 -23.384610000000002 -42.36343 0 -42.36343 z"
          strokeLinecap="round"
        />
      </g>
      <g transform="matrix(-0.45 -0.6 0.69 -0.52 108.04 230.78)" id="detailWingB2">
        <path
          style={{
            stroke: "rgb(0,0,0)",
            strokeWidth: 5,
            strokeDasharray: "none",
            strokeLinecap: "butt",
            strokeDashoffset: 0,
            strokeLinejoin: "miter",
            strokeMiterlimit: 4,
            fill: "rgb(255,255,255)",
            fillOpacity: 0,
            fillRule: "nonzero",
            opacity: 1,
            cursor: "pointer",
          }}
          vectorEffect="non-scaling-stroke"
          transform=" translate(0, 0)"
          d="M -11.33929 -51.89742 L 11.33929 -24.660069999999997 L 11.33929 51.89741"
          strokeLinecap="round"
        />
      </g>
      <g transform="matrix(0.46 0.61 0.69 -0.52 89.43 206.09)" id="detailWingB3">
        <path
          style={{
            stroke: "rgb(0,0,0)",
            strokeWidth: 5,
            strokeDasharray: "none",
            strokeLinecap: "butt",
            strokeDashoffset: 0,
            strokeLinejoin: "miter",
            strokeMiterlimit: 4,
            fill: "rgb(255,255,255)",
            fillOpacity: 0,
            fillRule: "nonzero",
            opacity: 1,
            cursor: "pointer",
          }}
          vectorEffect="non-scaling-stroke"
          transform=" translate(0, 0)"
          d="M -11.33929 -51.89742 L 11.33929 -24.660069999999997 L 11.33929 51.89741"
          strokeLinecap="round"
        />
      </g>
      <g transform="matrix(0.74 0 0 2.01 162.54 113.38)" id="detailWingA1">
        <path
          className="wing"
          onClick={(e) => handleBladeClick(e, "A")}
          style={{
            stroke: "rgb(0,0,0)",
            strokeWidth: 5,
            strokeDasharray: "none",
            strokeLinecap: "butt",
            strokeDashoffset: 0,
            strokeLinejoin: "miter",
            strokeMiterlimit: 4,
            fill: "#d5e3f0",
            fillRule: "nonzero",
            opacity: 1,
            cursor: "pointer",
          }}
          vectorEffect="non-scaling-stroke"
          transform=" translate(0, 0)"
          d="M 0 -42.36343 C 23.38461 -42.36343 42.36343 -23.384610000000002 42.36343 0 C 42.36343 23.38461 23.384610000000002 42.36343 0 42.36343 C -23.38461 42.36343 -42.36343 23.384610000000002 -42.36343 0 C -42.36343 -23.38461 -23.384610000000002 -42.36343 0 -42.36343 z"
          strokeLinecap="round"
        />
      </g>
      <g transform="matrix(0.75 0 0 0.86 146.55 105.48)" id="detailWingA2">
        <path
          style={{
            stroke: "rgb(0,0,0)",
            strokeWidth: 5,
            strokeDasharray: "none",
            strokeLinecap: "butt",
            strokeDashoffset: 0,
            strokeLinejoin: "miter",
            strokeMiterlimit: 4,
            fill: "rgb(255,255,255)",
            fillOpacity: 0,
            fillRule: "nonzero",
            opacity: 1,
            cursor: "pointer",
          }}
          vectorEffect="non-scaling-stroke"
          transform=" translate(0, 0)"
          d="M -11.33929 -51.89742 L 11.33929 -24.660069999999997 L 11.33929 51.89741"
          strokeLinecap="round"
        />
      </g>
      <g transform="matrix(-0.77 0 0 0.86 177.46 105.48)" id="detailWingA3">
        <path
          style={{
            stroke: "rgb(0,0,0)",
            strokeWidth: 5,
            strokeDasharray: "none",
            strokeLinecap: "butt",
            strokeDashoffset: 0,
            strokeLinejoin: "miter",
            strokeMiterlimit: 4,
            fill: "rgb(255,255,255)",
            fillOpacity: 0,
            fillRule: "nonzero",
            opacity: 1,
            cursor: "pointer",
          }}
          vectorEffect="non-scaling-stroke"
          transform=" translate(0, 0)"
          d="M -11.33929 -51.89742 L 11.33929 -24.660069999999997 L 11.33929 51.89741"
          strokeLinecap="round"
        />
      </g>
      <g transform="matrix(1 0 0 1 162.54 174.37)">
        <g style={{}} vectorEffect="non-scaling-stroke">
          <g transform="matrix(1.25 0 0 1.25 0 0)" id="rbo6OwJ7FSgC5Hyd9I5kf">
            <path
              style={{
                stroke: "rgb(0,0,0)",
                strokeWidth: 5,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                fill: "rgb(255,255,255)",
                fillRule: "nonzero",
                opacity: 1,
              }}
              vectorEffect="non-scaling-stroke"
              transform=" translate(0, 0)"
              d="M 0 -27.87068 C 15.38462 -27.87068 27.87068 -15.38462 27.87068 0 C 27.87068 15.38462 15.38462 27.87068 0 27.87068 C -15.38462 27.87068 -27.87068 15.38462 -27.87068 0 C -27.87068 -15.38462 -15.38462 -27.87068 0 -27.87068 z"
              strokeLinecap="round"
            />
          </g>
          <g transform="matrix(0.76 0 0 0.76 0 0)" id="jWRM1bDNHF0-LPOxJM4MC">
            <path
              style={{
                stroke: "rgb(0,0,0)",
                strokeWidth: 5,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                fill: "rgb(255,255,255)",
                fillRule: "nonzero",
                opacity: 1,
              }}
              vectorEffect="non-scaling-stroke"
              transform=" translate(0, 0)"
              d="M 0 -27.87068 C 15.38462 -27.87068 27.87068 -15.38462 27.87068 0 C 27.87068 15.38462 15.38462 27.87068 0 27.87068 C -15.38462 27.87068 -27.87068 15.38462 -27.87068 0 C -27.87068 -15.38462 -15.38462 -27.87068 0 -27.87068 z"
              strokeLinecap="round"
            />
          </g>
        </g>
      </g>
      <g transform="matrix(1 0 0 1 35.4 283.04)">
        <text
          xmlSpace="preserve"
          fontFamily="Open Sans"
          fontSize={21}
          fontStyle="normal"
          fontWeight={700}
          letterSpacing={0.042}
          line-height={1}
          style={{
            stroke: "none",
            strokeWidth: 1,
            strokeDasharray: "none",
            strokeLinecap: "butt",
            strokeDashoffset: 0,
            strokeLinejoin: "miter",
            strokeMiterlimit: 4,
            fill: "rgb(0,0,0)",
            fillRule: "nonzero",
            opacity: 1,
            whiteSpace: "pre",
          }}
        >
          <tspan x={-9.13} y={8.96}>
            {"B"}
          </tspan>
        </text>
      </g>
      <g transform="matrix(1 0 0 1 165.54 12.89)">
        <text
          xmlSpace="preserve"
          fontFamily="Open Sans"
          fontSize={21}
          fontStyle="normal"
          fontWeight={700}
          letterSpacing={0.042}
          line-height={1}
          style={{
            stroke: "none",
            strokeWidth: 1,
            strokeDasharray: "none",
            strokeLinecap: "butt",
            strokeDashoffset: 0,
            strokeLinejoin: "miter",
            strokeMiterlimit: 4,
            fill: "rgb(0,0,0)",
            fillRule: "nonzero",
            opacity: 1,
            whiteSpace: "pre",
          }}
        >
          <tspan x={-9.13} y={8.96}>
            {"A"}
          </tspan>
        </text>
      </g>
      <g transform="matrix(1 0 0 1 299.36 280.81)">
        <text
          xmlSpace="preserve"
          fontFamily="Open Sans"
          fontSize={21}
          fontStyle="normal"
          fontWeight={700}
          letterSpacing={0.042}
          line-height={1}
          style={{
            stroke: "none",
            strokeWidth: 1,
            strokeDasharray: "none",
            strokeLinecap: "butt",
            strokeDashoffset: 0,
            strokeLinejoin: "miter",
            strokeMiterlimit: 4,
            fill: "rgb(0,0,0)",
            fillRule: "nonzero",
            opacity: 1,
            whiteSpace: "pre",
          }}
        >
          <tspan x={-9.13} y={8.96}>
            {"C"}
          </tspan>
        </text>
      </g>
    </svg>
  );
};

export default SVGComponent;
