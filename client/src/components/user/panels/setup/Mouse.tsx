import React from "react";
import {ColorsType} from "../../../../interfaces/ColorsInterface";

interface propsInterface {
    colors: ColorsType,
    dpi: number;
    mousepad: string;
}

const Mouse = (props: propsInterface) => {
    return (
        <div style={{outline: `solid 1px ${props.colors.ui.font}`, width: 240, height: 140}}
             className={"rounded position-relative"}>
            <div className="rounded-pill d-flex flex-column overflow-hidden position-absolute"
                 style={{
                     outline: `solid 1px ${props.colors.ui.font}`,
                     height: 80,
                     width: 50,
                     top: 70,
                     left: 120,
                     transform: "translate(-50%, -50%)"
                 }}>
                <div className="d-flex flex-row flex-grow-1">
                    <div className="flex-grow-1" style={{outline: `solid 1px ${props.colors.ui.font}`}}></div>
                    <div className="flex-grow-1" style={{outline: `solid 1px ${props.colors.ui.font}`}}></div>
                </div>
                <div style={{height: 50}}></div>
            </div>
            {props.mousepad &&
                <div style={{
                    position: "absolute",
                    top: 0,
                    right: 5,
                }}><i className="bi bi-info-circle"
                      data-tooltip-id="reactTooltip"
                      data-tooltip-content={`Mousepad: ${props.mousepad}`}></i>
                </div>}
            <div style={{
                position: "absolute",
                bottom: 0,
                left: 120,
                transform: "translateX(-50%)",
                opacity: '70%'
            }}>{props.dpi} dpi
            </div>
        </div>
    );
}
export default Mouse;