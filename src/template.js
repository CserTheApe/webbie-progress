export default {
  render(props) {
    return `
        ${this.css(props.css)}
        ${this.html(props.html)}
    `;
  },

  html(prop) {
    return `
        <svg id="container" width="${prop.size}" height="${
      prop.size
    }" viewBox="0 0 100 100">
        <defs>
        <clipPath id="clipper">
        <path
        d="${this.generatePolygon(
          prop.vertices,
          prop.radius,
          prop.frameWidth ?? prop.strokeWidth
        )}" />
        </clipPath>
        </defs>
        
        ${
          prop.imgUrl
            ? `<image id="fillimg" href="${prop.imgUrl}" x="0" y="0" width="100%" height="100%"
        preserveAspectRatio="xMinYMin slice"
        clip-path="url(#clipper)" />`
            : ""
        }

        <path id="framepath"
        stroke-width="${prop.frameWidth ?? prop.strokeWidth}"
        stroke-linejoin="round"
        fill="transparent"
        d="${this.generatePolygon(prop.vertices, prop.radius)}" />

        <path id="strokepath"
        stroke-width="${prop.strokeWidth}"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill="transparent"
        d="${this.generatePolygon(prop.vertices, prop.radius)}"
        pathLength="100"
        >
        </path>
        
        <text
        x="50" y="50"
        text-anchor="middle"
        alignment-baseline="middle"
        dominant-baseline="middle">${prop.text ?? ""}</text>
        
        </svg>
    `;
  },

  css(prop) {
    return `
    <style>
        #container {
        }
        #strokepath {
            transform: rotate(${prop.rotate}deg);
            transform-origin: 50% 50%;
            stroke-dashoffset: ${(prop.rotate * 10) / 36};
            stroke-dasharray: ${prop.percent} ${100 - prop.percent};
            filter: drop-shadow(0 0 1px ${prop.strokeShadow ?? "transparent"});
            stroke: ${prop.strokeColor ?? "#3969ef"};
            transition: stroke-dasharray 1s;
            animation: snake ${prop.strokeSpeed ?? "0s"} linear ${
      prop.strokeReverse ? "reverse" : ""
    } infinite, rotate ${
      !prop.imgUrl && prop.frameSpeed ? prop.frameSpeed : "0s"
    } linear ${prop.frameReverse ? "reverse" : ""} infinite;
            ${prop.strokeStyle ?? ""}
        }
        #framepath {
            transform: rotate(${prop.rotate}deg);
            transform-origin: 50% 50%;
            stroke: ${prop.frameColor ?? "#aaaaaa"};
            fill: ${
              !prop.imgUrl && prop.fillColor ? prop.fillColor : "transparent"
            };
            animation: rotate ${
              !prop.imgUrl && prop.frameSpeed ? prop.frameSpeed : "0s"
            } linear ${prop.frameReverse ? "reverse" : ""} infinite;
            ${prop.frameStyle ?? ""}
        }
        #clipper {
          transform: rotate(${prop.rotate}deg);
          transform-origin: 50% 50%;
        }
        text {${prop.textStyle}}
          
        @keyframes snake {
            0% {
                stroke-dashoffset: ${(prop.rotate * 10) / 36};
            }
            100% {
                stroke-dashoffset: ${(prop.rotate * 10) / 36 - 100};
            }
        }

        @keyframes rotate {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
    </style>
    `;
  },

  generatePolygon(vertices, rad, frame) {
    const center = 50;
    let pad = center - rad;
    if (frame) pad += (frame * 1) / 2;
    const radius = center - pad;

    let path = `M ${center} ${pad} `;

    if (vertices < 3) {
      path += `A ${radius} ${radius} 0 0 1 ${center} ${center + radius}`;
      path += `A ${radius} ${radius} 0 0 1 ${center} ${pad}`;
      return path;
    }

    let angle = 360 / vertices;
    for (let i = 1; i < vertices; i++) {
      const radian = (angle * i * Math.PI) / 180;
      const dx = radius * Math.sin(radian),
        dy = radius * Math.cos(radian);
      path += `L ${center + dx} ${center - dy} `;
    }
    path += "Z";

    return path;
  },
};
