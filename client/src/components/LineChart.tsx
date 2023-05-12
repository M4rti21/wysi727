import React from "react";

interface propsInterface {
    width: number,
    height: number,
    wValues: number[],
    hValues: number[],
    color: string
}

const LineChart = (props: propsInterface) => {
    const points = props.wValues.map((x, i) => ({x, y: props.hValues[i]}));
    const pointString = points.map(point => `${point.x},${point.y}`).join(' ');
    return (
        <svg width={props.width} height={props.height} style={{transform: 'scale(0.9) scaleY(-1)'}}>
            <polyline points={pointString} style={{fill: 'none', stroke: props.color, strokeWidth: 3}} className="border"/>
        </svg>
    );
}
export default LineChart;