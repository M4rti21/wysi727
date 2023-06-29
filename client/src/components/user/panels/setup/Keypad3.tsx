import React from "react";
import {ColorsType} from "../../../../interfaces/ColorsInterface";
import Keycap from "./Keycap";

interface propsInterface {
    colors: ColorsType,
    inputs: string[]
}

const Keypad3 = (props: propsInterface) => {
    return (
        <div className="rounded-3 p-2" style={{outline: `solid 1px ${props.colors.ui.font}`}}>
            <div className="d-flex flex-row justify-content-between gap-1 mb-3">
                <Keycap color={props.inputs.includes('z') ? props.colors.ui.main : ''}
                        text={'z'}
                        width={1}/>
                <Keycap color={props.inputs.includes('x') ? props.colors.ui.main : ''}
                        text={'x'}
                        width={1}/>
                <Keycap color={props.inputs.includes('c') ? props.colors.ui.main : ''}
                        text={'c'}
                        width={1}/>
            </div>
        </div>
    );
}
export default Keypad3;