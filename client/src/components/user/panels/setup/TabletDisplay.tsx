import React from "react";
import {ColorsType} from "../../../../interfaces/ColorsInterface";
import {Tablet} from "../../../../interfaces/UserCardInterface";

interface propsInterface {
    colors: ColorsType,
    tablet: Tablet
}

const TabletDisplay = (props: propsInterface) => {
    const bigAspectRatio = props.tablet.maxArea.x / props.tablet.maxArea.y;
    const adjustedBigHeight = 200 / bigAspectRatio;
    const smallAspectRatio = props.tablet.area.x / props.tablet.area.y;
    const adjustedSmallHeight = adjustedBigHeight * (props.tablet.area.y / props.tablet.maxArea.y);
    const adjustedSmallWidth = adjustedSmallHeight * smallAspectRatio;
    const adjustedSmallHeightOffset = adjustedBigHeight * (props.tablet.area.offsetY / props.tablet.maxArea.y);
    const adjustedSmallWidthOffset = 200 * (props.tablet.area.offsetX / props.tablet.maxArea.x);
    const calculateAspectRatio = () => {
        const gcd = (a: any, b: any): any => {
            if (b === 0) {
                return a;
            }

            // Additional check to handle edge case when a or b is negative
            if (a < 0 || b < 0) {
                return gcd(Math.abs(a), Math.abs(b));
            }

            // Additional check to handle edge case when a and b are equal
            if (a === b) {
                return a;
            }

            // Recursive call with updated values
            return gcd(b, a % b);
        };

        const divisor = gcd(props.tablet.area.x, props.tablet.area.y);
        return `${(props.tablet.area.x / divisor).toFixed(2).replace(/\.?0+$/, '')}:${(props.tablet.area.y / divisor).toFixed(2).replace(/\.?0+$/, '')}`;
    }
    return (
        <div className={"position-relative d-flex justify-content-center align-items-center mx-auto"}
             style={{width: 200, height: adjustedBigHeight, outline: `solid 1px ${props.colors.ui.font}`,}}>
            <div style={{
                position: "absolute",
                top: -20,
                fontSize: 12,
                left: 100,
                transform: "translateX(-50%)",
            }}>{props.tablet.maxArea.x}mm
            </div>
            <div style={{
                position: "absolute",
                left: -28,
                fontSize: 12,
                top: (200 / (props.tablet.maxArea.x / props.tablet.maxArea.y)) / 2,
                transform: "translateY(-50%) rotate(-90deg)"
            }}>{props.tablet.maxArea.y}mm
            </div>
            <div style={{
                top: adjustedSmallHeightOffset,
                left: adjustedSmallWidthOffset,
                position: "absolute",
                border: `solid 2px ${props.colors.ui.main}`,
                backgroundColor: props.colors.ui.main + '55',
                width: adjustedSmallWidth,
                height: adjustedSmallHeight,
                transform: "translate(-50%, -50%)",
                zIndex: 1
            }}></div>
            <div style={{opacity: "70%", color: props.colors.ui.font}}>
                <div className={"text-center"} style={{fontSize: 12}}>{props.tablet.area.x}mm
                    x {props.tablet.area.y}mm
                </div>
                <div className={"text-center"} style={{fontSize: 14}}>
                    {props.tablet?.area && calculateAspectRatio()}
                </div>
            </div>
        </div>
    );
}
export default TabletDisplay;