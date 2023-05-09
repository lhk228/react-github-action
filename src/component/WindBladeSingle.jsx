import * as React from "react";
const SVGComponent = (props) => {
  const getBladeSide = (value) => {
    if (value === props.bladeSide) return "#d5e3f0";
    else return "rgb(239,239,239)";
  };

  const handleBladeSideClick = (e, blade) => {
    props.setbladeside(blade);
    document.querySelectorAll(".side").forEach((v) => {
      v.style.fill = "rgb(239,239,239)";
    });
    e.target.style.fill = "#d3e2ef";
  };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={400}
      height={300}
      viewBox="0 0 330 300"
      xmlSpace="preserve"
      // {...props}
    >
      <desc>{"Created with Fabric.js 4.6.0"}</desc>
      <defs />
      <g transform="matrix(1 0 0 1 36.26 145.89)" id="SingleLW">
        <g style={{}} vectorEffect="non-scaling-stroke">
          <g transform="matrix(1.06 0 0 1.07 0 8.96)" id="gcy1HKF3zvgMpUNlsLKS8">
            <path
              className="side"
              onClick={(e) => handleBladeSideClick(e, "Leading_Edge")}
              style={{
                stroke: "rgb(0,0,0)",
                strokeWidth: 4,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                backgroundColor: "red",
                fill: getBladeSide("Leading_Edge"),
                fillRule: "nonzero",
                opacity: 1,
                cursor: "pointer",
              }}
              vectorEffect="non-scaling-stroke"
              transform=" translate(0, 0)"
              d="M 2.70462 -111.81854 L -1.9621800000000005 -114.64067 L -10.70039 -116.05685 L -10.70039 116.05685 L -3.6965000000000003 116.05685 L -3.6965000000000003 102.82728 L 10.70039 84.15024 L 10.70039 -95.6163 L 6.258710000000001 -109.86115 z"
              strokeLinecap="round"
            />
          </g>
          <g transform="matrix(1 0 0 1 -2.07 -123.67)" style={{}} id="RWfIS3HfNPy5bADaZTtsG">
            <text
              xmlSpace="preserve"
              fontFamily="Open Sans"
              fontSize={14}
              fontStyle="normal"
              fontWeight={700}
              letterSpacing={0.028}
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
              <tspan x={-10.74} y={1.31}>
                {"L"}
              </tspan>
              <tspan x={-2.8} y={1.31}>
                {"E"}
              </tspan>
            </text>
          </g>
        </g>
      </g>
      <g transform="matrix(1 0 0 1 128.91 146.34)" id="SingleLE">
        <g style={{}} vectorEffect="non-scaling-stroke">
          <g transform="matrix(1.09 0 0 1.09 0 8.96)" id="2ne3_3KYFFNSyd3B4-AGm">
            <path
              className="side"
              onClick={(e) => handleBladeSideClick(e, "Pressure_Side")}
              style={{
                stroke: "rgb(0,0,0)",
                strokeWidth: 4,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                // fill: "rgb(239,239,239)",
                fill: getBladeSide("Pressure_Side"),

                fillRule: "nonzero",
                opacity: 1,
                cursor: "pointer",
              }}
              vectorEffect="non-scaling-stroke"
              transform=" translate(0, 0)"
              d="M 2.95139 -114.23611 L -2.95139 -114.23611 L -5.38195 -112.15277999999999 L -10.24306 83.68055 L -2.95139 102.08332999999999 L -2.95139 114.23611 L 2.95139 114.23611 L 2.95139 102.08332999999999 L 10.24306 83.68054999999998 L 5.72917 -110.41667000000001 z"
              strokeLinecap="round"
            />
          </g>
          <g transform="matrix(1 0 0 1 0 -123.67)" style={{}} id="NnHNdDzHqwEvO7a1lrxT-">
            <text
              xmlSpace="preserve"
              fontFamily="Open Sans"
              fontSize={14}
              fontStyle="normal"
              fontWeight={700}
              letterSpacing={0.028}
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
              <tspan x={-7.89} y={1.31}>
                {"P"}
              </tspan>
              <tspan x={0.05} y={1.31}>
                {"S"}
              </tspan>
            </text>
          </g>
        </g>
      </g>
      <g transform="matrix(1 0 0 1 221.27 146.12)" id="SingleWW">
        <g style={{}} vectorEffect="non-scaling-stroke">
          <g transform="matrix(-1.05 0 0 1.07 -1.41 8.96)" id="QZsj88_zXTM5QnDFbAuBA">
            <path
              className="side"
              onClick={(e) => handleBladeSideClick(e, "Suction_Side")}
              style={{
                stroke: "rgb(0,0,0)",
                strokeWidth: 4,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                // fill: "rgb(239,239,239)",
                fill: getBladeSide("Suction_Side"),

                fillRule: "nonzero",
                opacity: 1,
                cursor: "pointer",
              }}
              vectorEffect="non-scaling-stroke"
              transform=" translate(0, 0)"
              d="M 2.70462 -111.81854 L -1.9621800000000005 -114.64067 L -10.70039 -116.05685 L -10.70039 116.05685 L -3.6965000000000003 116.05685 L -3.6965000000000003 102.82728 L 10.70039 84.15024 L 10.70039 -95.6163 L 6.258710000000001 -109.86115 z"
              strokeLinecap="round"
            />
          </g>
          <g transform="matrix(1 0 0 1 0.64 -123.44)" style={{}} id="csOYzVQzhcaQE_vDADshH">
            <text
              xmlSpace="preserve"
              fontFamily="Open Sans"
              fontSize={14}
              fontStyle="normal"
              fontWeight={700}
              letterSpacing={0.028}
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
              <tspan x={-13.55} y={1.31}>
                {"S"}
              </tspan>
              <tspan x={0.01} y={1.31}>
                {"S"}
              </tspan>
            </text>
          </g>
        </g>
      </g>
      <g transform="matrix(1 0 0 1 299.46 146.12)" id="SingleTE">
        <g style={{}} vectorEffect="non-scaling-stroke">
          <g transform="matrix(1.09 0 0 1.08 0 8.96)" id="hURzcfeOzKEFFrp84OTTf">
            <path
              className="side"
              onClick={(e) => handleBladeSideClick(e, "Trailing_Edge")}
              style={{
                stroke: "rgb(0,0,0)",
                strokeWidth: 4,
                strokeDasharray: "none",
                strokeLinecap: "butt",
                strokeDashoffset: 0,
                strokeLinejoin: "miter",
                strokeMiterlimit: 4,
                // fill: "rgb(239,239,239)",
                fill: getBladeSide("Trailing_Edge"),
                fillRule: "nonzero",
                opacity: 1,
                cursor: "pointer",
              }}
              vectorEffect="non-scaling-stroke"
              transform=" translate(0, 0)"
              d="M 3.44667 -115.23611 L -2.45611 -115.23611 L -4.88667 -109.41667 L -4.88667 84.68055 L -2.45611 103.08332999999999 L -2.45611 115.23611 L 3.44667 115.23611 L 3.44667 103.08332999999999 L 4.88666 84.68054999999998 L 4.88666 -109.41667000000001 z"
              strokeLinecap="round"
            />
          </g>
          <g transform="matrix(1 0 0 1 0 -123.44)" style={{}} id="jtd_hZdTysC0MV2E70Zjs">
            <text
              xmlSpace="preserve"
              fontFamily="Open Sans"
              fontSize={14}
              fontStyle="normal"
              fontWeight={700}
              letterSpacing={0.028}
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
              <tspan x={-7.99} y={1.31}>
                {"T"}
              </tspan>
              <tspan x={0.15} y={1.31}>
                {"E"}
              </tspan>
            </text>
          </g>
        </g>
      </g>
    </svg>
  );
};
export default SVGComponent;
