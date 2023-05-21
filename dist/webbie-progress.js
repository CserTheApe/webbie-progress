(()=>{"use strict";const t={render(t){return`\n        ${this.css(t.css)}\n        ${this.html(t.html)}\n    `},html(t){return`\n        <svg id="container" width="${t.size}" height="${t.size}" viewBox="0 0 100 100">\n        <defs>\n        <clipPath id="clipper">\n        <path\n        d="${this.generatePolygon(t.vertices,t.radius,t.frameWidth??t.strokeWidth)}" />\n        </clipPath>\n        </defs>\n        \n        ${t.imgUrl?`<image id="fillimg" href="${t.imgUrl}" x="0" y="0" width="100%" height="100%"\n        preserveAspectRatio="xMinYMin slice"\n        clip-path="url(#clipper)" />`:""}\n\n        <path id="framepath"\n        stroke-width="${t.frameWidth??t.strokeWidth}"\n        stroke-linejoin="round"\n        fill="transparent"\n        d="${this.generatePolygon(t.vertices,t.radius)}" />\n\n        <path id="strokepath"\n        stroke-width="${t.strokeWidth}"\n        stroke-linecap="round"\n        stroke-linejoin="round"\n        fill="transparent"\n        d="${this.generatePolygon(t.vertices,t.radius)}"\n        pathLength="100"\n        >\n        </path>\n        \n        <text\n        x="50" y="50"\n        text-anchor="middle"\n        alignment-baseline="middle"\n        dominant-baseline="middle">${t.text??""}</text>\n        \n        </svg>\n    `},css:t=>`\n    <style>\n        #container {\n        }\n        #strokepath {\n            transform: rotate(${t.rotate}deg);\n            transform-origin: 50% 50%;\n            stroke-dashoffset: ${10*t.rotate/36};\n            stroke-dasharray: ${t.percent} ${100-t.percent};\n            filter: drop-shadow(0 0 1px ${t.strokeShadow??"transparent"});\n            stroke: ${t.strokeColor??"#3969ef"};\n            transition: stroke-dasharray 1s;\n            animation: snake ${t.strokeSpeed??"0s"} linear ${t.strokeReverse?"reverse":""} infinite, rotate ${!t.imgUrl&&t.frameSpeed?t.frameSpeed:"0s"} linear ${t.frameReverse?"reverse":""} infinite;\n            ${t.strokeStyle??""}\n        }\n        #framepath {\n            transform: rotate(${t.rotate}deg);\n            transform-origin: 50% 50%;\n            stroke: ${t.frameColor??"#aaaaaa"};\n            fill: ${!t.imgUrl&&t.fillColor?t.fillColor:"transparent"};\n            animation: rotate ${!t.imgUrl&&t.frameSpeed?t.frameSpeed:"0s"} linear ${t.frameReverse?"reverse":""} infinite;\n            ${t.frameStyle??""}\n        }\n        #clipper {\n          transform: rotate(${t.rotate}deg);\n          transform-origin: 50% 50%;\n        }\n        text {${t.textStyle}}\n          \n        @keyframes snake {\n            0% {\n                stroke-dashoffset: ${10*t.rotate/36};\n            }\n            100% {\n                stroke-dashoffset: ${10*t.rotate/36-100};\n            }\n        }\n\n        @keyframes rotate {\n            0% {\n                transform: rotate(0deg);\n            }\n            100% {\n                transform: rotate(360deg);\n            }\n        }\n    </style>\n    `,generatePolygon(t,e,r){let n=50-e;r&&(n+=1*r/2);const i=50-n;let s=`M 50 ${n} `;if(t<3)return s+=`A ${i} ${i} 0 0 1 50 ${50+i}`,s+=`A ${i} ${i} 0 0 1 50 ${n}`,s;let a=360/t;for(let e=1;e<t;e++){const t=a*e*Math.PI/180;s+=`L ${50+i*Math.sin(t)} ${50-i*Math.cos(t)} `}return s+="Z",s}};class e extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.render()}static get observedAttributes(){return["percent"]}attributeChangedCallback(t,e,r){this.shadowRoot.getElementById("strokepath").style.strokeDasharray=`${r} ${100-r}`}render(){const e=Number(this.getAttribute("vertices")),r=Number(this.getAttribute("rotate")),n=Number(this.getAttribute("percent")),i=this.getAttribute("size"),s=this.getAttribute("text"),a=this.getAttribute("text-style"),o=this.getAttribute("image"),h=Number(this.getAttribute("radius")),l=Number(this.getAttribute("stroke-width")),m=Number(this.getAttribute("frame-width")),d=this.getAttribute("stroke-color"),f=this.getAttribute("frame-color"),g=this.getAttribute("fill-color"),u=this.getAttribute("stroke-shadow"),p=this.getAttribute("stroke-anim-speed"),$=this.getAttribute("frame-anim-speed"),c=null!==this.getAttribute("stroke-anim-reverse"),k=null!==this.getAttribute("frame-anim-reverse"),b=this.getAttribute("stroke-style"),y=this.getAttribute("frame-style");this.shadowRoot.innerHTML=t.render({html:{size:i??"100px",strokeWidth:l?this.numerify(l,50):4,frameWidth:m?this.numerify(m,50):null,vertices:e?this.numerify(e.toFixed(0),20):0,text:s,imgUrl:o,radius:h?this.numerify(h,50):47},css:{rotate:r?this.numerify(r,360):0,percent:n?this.numerify(n,100):100,textStyle:a,strokeColor:d,frameColor:f,fillColor:g,strokeShadow:u,imgUrl:o,strokeSpeed:p,frameSpeed:$,strokeReverse:c,frameReverse:k,strokeStyle:b,frameStyle:y}})}numerify(t,e){return Math.max(Math.min(t,e),0)}}customElements.get("webbie-progress")||customElements.define("webbie-progress",e)})();