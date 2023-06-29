import React from "react";
import {ColorsType} from "../../../../interfaces/ColorsInterface";
import Keycap from "./Keycap";

interface propsInterface {
    colors: ColorsType,
    inputs: string[]
}

const Keypad2 = (props: propsInterface) => {
    return (
        <div className="rounded-3 p-2" style={{outline: `solid 1px ${props.colors.ui.font}`}}>
            <div className="d-flex flex-row justify-content-between gap-1 mb-3">
                <Keycap color={props.inputs.includes('z') ? props.colors.ui.main : ''}
                        text={'z'}
                        width={1}/>
                <Keycap color={props.inputs.includes('x') ? props.colors.ui.main : ''}
                        text={'x'}
                        width={1}/>
            </div>
        </div>
    );
}
export default Keypad2;