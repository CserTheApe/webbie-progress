# webbie-progress [![NPM version](https://img.shields.io/npm/v/webbie-progress.svg?style=flat)](https://www.npmjs.com/package/webbie-progress) [![NPM monthly downloads](https://img.shields.io/npm/dm/webbie-progress.svg?style=flat)](https://npmjs.org/package/webbie-progress) [![NPM total downloads](https://img.shields.io/npm/dt/webbie-progress.svg?style=flat)](https://npmjs.org/package/webbie-progress)

A web component to create simple progress and loading indicators. It can also be used to create simple avatar frames.

---

## Install

Install with npm: `npm install webbie-progress`

---

## Usage

Add script to page with `<script type="module" src="node_modules/webbie-progress/dist/webbie-progress.js"></script>`

```html
<webbie-progress></webbie-progress>
```

---

## Props

All props are optional, but you'd definitely need to use some to get anything more than a circle. The SVG viewbox is 100x100 and some props like `radius` and `stroke-width` are set relative to that.

| Name | Description |
| ---- | ----------- |
| vertices | decides the shape (frame) of the svg element (value: 3-20, circle for all other values) |
| size | set the size of the square element |
| rotate | rotate the svg frame clockwise in degrees (value: 0-360) |
| percent | portion of the stroke path to be colored (value: 0-100) |
| text | content for a centered `<text>` element |
| text-style | custom css for the `<text>` element |
| image | src for an image that is clipped by the svg frame |
| radius | set the circumradius for the frame |
| stroke-width | set width for stroke |
| frame-width | set width for frame |
| stroke-color | set color for stroke |
| frame-color | set color for frame |
| fill-color | set background color within frame (won't work if `image` prop is used) |
| stroke-shadow | set drop shadow color for stroke |
| stroke-anim-speed | set animation speed for stroke movement along the frame (default: 0s) |
| frame-anim-speed | set animation speed for frame rotation (default: 0s) |
| stroke-anim-reverse | reverse animation direction |
| frame-anim-reverse | reverse animation direction |
| stroke-style | set additional css style for stroke path|
| frame-style | set css for frame path |

---

Further examples in `demo.html`