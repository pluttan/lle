"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const react_konva_1 = require("react-konva");
const katex_1 = __importDefault(require("katex"));
require("katex/dist/katex.min.css");
const DraggableRectangle = () => {
    const rectRef = react_1.default.useRef(null);
    const formulaRef = react_1.default.useRef(null);
    react_1.default.useEffect(() => {
        if (formulaRef.current) {
            katex_1.default.render('c = \\pm\\sqrt{a^2 + b^2}', formulaRef.current);
        }
    }, []);
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(react_konva_1.Stage, { width: window.innerWidth, height: window.innerHeight, children: (0, jsx_runtime_1.jsx)(react_konva_1.Layer, { children: (0, jsx_runtime_1.jsx)(react_konva_1.Rect, { ref: rectRef, x: 100, y: 100, width: 150, height: 100, fill: "lightblue", draggable: true, onDragMove: () => {
                            if (rectRef.current) {
                                const position = rectRef.current.position();
                                console.log(`Прямоугольник перемещен в x: ${position.x}, y: ${position.y}`);
                            }
                        } }) }) }), (0, jsx_runtime_1.jsx)("div", { ref: formulaRef, style: { marginTop: '20px' } })] }));
};
exports.default = DraggableRectangle;
//# sourceMappingURL=cgd.js.map