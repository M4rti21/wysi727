import React from "react";
import {ColorSettingsType, colorsSettings} from "../../../../store/store";

interface propsInterface {
    text: string;
    width: number;
    color: string;
}

const Keycap = (props: propsInterface) => {
    const colors = colorsSettings((state: ColorSettingsType) => state.colors);
    const size = 18;
    return (
        <div className={"d-flex justify-content-center align-items-center p-0"}
             style={{
                 border: `solid 1px ${props.color !== '' ? props.color : colors.ui.font}`,
                 backgroundColor: props.color + '99',
                 borderRadius: 3,
                 height: size,
                 width: props.width * size,
                 minHeight: size,
                 minWidth: props.width * size,
                 maxHeight: size,
                 maxWidth: props.width * size,
                 fontSize: size * 0.4
             }}>
            <div>{props.text.toUpperCase()}</div>
        </div>
    );
}
export default Keycap;