import Template from "./template.js";

export default class WebbieProgress extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    this.render();
  }

  static get observedAttributes() {
    return [
      "percent",
      "vertices",
      "rotate",
      "size",
      "text",
      "text-style",
      "image",
      "radius",
      "stroke-width",
      "frame-width",
      "stroke-color",
      "frame-color",
      "fill-color",
      "stroke-shadow",
      "stroke-anim-speed",
      "frame-anim-speed",
      "stroke-anim-reverse",
      "frame-anim-reverse",
      "stroke-style",
      "frame-style",
    ];
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    if (name === "percent") {
      let strokePath = this.shadowRoot.getElementById("strokepath");
      strokePath.style.strokeDasharray = `${newValue} ${100 - newValue}`;
    } else {
      this.render();
    }
  }

  render() {
    const vertices = Number(this.getAttribute("vertices"));
    const rotate = Number(this.getAttribute("rotate"));
    const percent = Number(this.getAttribute("percent"));
    const size = this.getAttribute("size");
    const text = this.getAttribute("text");
    const textStyle = this.getAttribute("text-style");
    const imgUrl = this.getAttribute("image");
    const radius = Number(this.getAttribute("radius"));
    const strokeWidth = Number(this.getAttribute("stroke-width"));
    const frameWidth = Number(this.getAttribute("frame-width"));
    const strokeColor = this.getAttribute("stroke-color");
    const frameColor = this.getAttribute("frame-color");
    const fillColor = this.getAttribute("fill-color");
    const strokeShadow = this.getAttribute("stroke-shadow");
    const strokeSpeed = this.getAttribute("stroke-anim-speed");
    const frameSpeed = this.getAttribute("frame-anim-speed");
    const strokeReverse = this.getAttribute("stroke-anim-reverse") !== null;
    const frameReverse = this.getAttribute("frame-anim-reverse") !== null;
    const strokeStyle = this.getAttribute("stroke-style");
    const frameStyle = this.getAttribute("frame-style");

    this.shadowRoot.innerHTML = Template.render({
      html: {
        size: size ?? "100px",
        strokeWidth: strokeWidth ? this.numerify(strokeWidth, 50) : 4,
        frameWidth: frameWidth ? this.numerify(frameWidth, 50) : null,
        vertices: vertices ? this.numerify(vertices.toFixed(0), 20) : 0,
        text,
        imgUrl,
        radius: radius ? this.numerify(radius, 50) : 47,
      },
      css: {
        rotate: rotate ? this.numerify(rotate, 360) : 0,
        percent: percent ? this.numerify(percent, 100) : 100,
        textStyle,
        strokeColor,
        frameColor,
        fillColor,
        strokeShadow,
        imgUrl,
        strokeSpeed,
        frameSpeed,
        strokeReverse,
        frameReverse,
        strokeStyle,
        frameStyle,
      },
    });
  }

  numerify(value, max) {
    return Math.max(Math.min(value, max), 0);
  }
}

if (!customElements.get("webbie-progress")) {
  customElements.define("webbie-progress", WebbieProgress);
}
