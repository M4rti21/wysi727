import React from "react";
import {ColorsType} from "../../../../interfaces/ColorsInterface";
import Keycap from "./Keycap";

interface propsInterface {
    colors: ColorsType,
    inputs: string[]
}

const Keyboard60 = (props: propsInterface) => {
    return (
        <div className="rounded-3 p-2" style={{outline: `solid 1px ${props.colors.ui.font}`}}>
            <div className={"d-flex flex-row"}>
                <Keycap color={props.inputs.includes('esc') ? props.colors.ui.main : ''}
                        text={'esc'}
                        width={1}/>
                <Keycap color={props.inputs.includes('1') ? props.colors.ui.main : ''}
                        text={'1'}
                        width={1}/>
                <Keycap color={props.inputs.includes('3') ? props.colors.ui.main : ''}
                        text={'2'}
                        width={1}/>
                <Keycap color={props.inputs.includes('4') ? props.colors.ui.main : ''}
                        text={'3'}
                        width={1}/>
                <Keycap color={props.inputs.includes('4') ? props.colors.ui.main : ''}
                        text={'4'}
                        width={1}/>
                <Keycap color={props.inputs.includes('5') ? props.colors.ui.main : ''}
                        text={'5'}
                        width={1}/>
                <Keycap color={props.inputs.includes('6') ? props.colors.ui.main : ''}
                        text={'6'}
                        width={1}/>
                <Keycap color={props.inputs.includes('7') ? props.colors.ui.main : ''}
                        text={'7'}
                        width={1}/>
                <Keycap color={props.inputs.includes('8') ? props.colors.ui.main : ''}
                        text={'8'}
                        width={1}/>
                <Keycap color={props.inputs.includes('9') ? props.colors.ui.main : ''}
                        text={'9'}
                        width={1}/>
                <Keycap color={props.inputs.includes('0') ? props.colors.ui.main : ''}
                        text={'0'}
                        width={1}/>
                <Keycap color={props.inputs.includes('-') ? props.colors.ui.main : ''}
                        text={'-'}
                        width={1}/>
                <Keycap color={props.inputs.includes('=') ? props.colors.ui.main : ''}
                        text={'='}
                        width={1}/>
                <Keycap color={props.inputs.includes('back') ? props.colors.ui.main : ''}
                        text={'back'}
                        width={2}/>
            </div>
            <div className={"d-flex flex-row"}>
                <Keycap color={props.inputs.includes('tab') ? props.colors.ui.main : ''}
                        text={'tab'}
                        width={1.5}/>
                <Keycap color={props.inputs.includes('q') ? props.colors.ui.main : ''}
                        text={'q'}
                        width={1}/>
                <Keycap color={props.inputs.includes('w') ? props.colors.ui.main : ''}
                        text={'w'}
                        width={1}/>
                <Keycap color={props.inputs.includes('e') ? props.colors.ui.main : ''}
                        text={'e'}
                        width={1}/>
                <Keycap color={props.inputs.includes('r') ? props.colors.ui.main : ''}
                        text={'r'}
                        width={1}/>
                <Keycap color={props.inputs.includes('t') ? props.colors.ui.main : ''}
                        text={'t'}
                        width={1}/>
                <Keycap color={props.inputs.includes('y') ? props.colors.ui.main : ''}
                        text={'y'}
                        width={1}/>
                <Keycap color={props.inputs.includes('u') ? props.colors.ui.main : ''}
                        text={'u'}
                        width={1}/>
                <Keycap color={props.inputs.includes('i') ? props.colors.ui.main : ''}
                        text={'i'}
                        width={1}/>
                <Keycap color={props.inputs.includes('o') ? props.colors.ui.main : ''}
                        text={'o'}
                        width={1}/>
                <Keycap color={props.inputs.includes('p') ? props.colors.ui.main : ''}
                        text={'p'}
                        width={1}/>
                <Keycap color={props.inputs.includes('[') ? props.colors.ui.main : ''}
                        text={'['}
                        width={1}/>
                <Keycap color={props.inputs.includes(']') ? props.colors.ui.main : ''}
                        text={']'}
                        width={1}/>
                <Keycap color={props.inputs.includes("\\") ? props.colors.ui.main : ''}
                        text={"\\"}
                        width={1.5}/>
            </div>
            <div className={"d-flex flex-row"}>
                <Keycap color={props.inputs.includes('caps') ? props.colors.ui.main : ''}
                        text={'caps'}
                        width={1.75}/>
                <Keycap color={props.inputs.includes('a') ? props.colors.ui.main : ''}
                        text={'a'}
                        width={1}/>
                <Keycap color={props.inputs.includes('s') ? props.colors.ui.main : ''}
                        text={'s'}
                        width={1}/>
                <Keycap color={props.inputs.includes('d') ? props.colors.ui.main : ''}
                        text={'d'}
                        width={1}/>
                <Keycap color={props.inputs.includes('f') ? props.colors.ui.main : ''}
                        text={'f'}
                        width={1}/>
                <Keycap color={props.inputs.includes('g') ? props.colors.ui.main : ''}
                        text={'g'}
                        width={1}/>
                <Keycap color={props.inputs.includes('h') ? props.colors.ui.main : ''}
                        text={'h'}
                        width={1}/>
                <Keycap color={props.inputs.includes('j') ? props.colors.ui.main : ''}
                        text={'j'}
                        width={1}/>
                <Keycap color={props.inputs.includes('k') ? props.colors.ui.main : ''}
                        text={'k'}
                        width={1}/>
                <Keycap color={props.inputs.includes('l') ? props.colors.ui.main : ''}
                        text={'l'}
                        width={1}/>
                <Keycap color={props.inputs.includes(';') ? props.colors.ui.main : ''}
                        text={';'}
                        width={1}/>
                <Keycap color={props.inputs.includes('\'') ? props.colors.ui.main : ''}
                        text={'\''}
                        width={1}/>
                <Keycap color={props.inputs.includes('enter') ? props.colors.ui.main : ''}
                        text={'enter'}
                        width={2.25}/>
            </div>
            <div className={"d-flex flex-row"}>
                <Keycap color={props.inputs.includes('lshift') ? props.colors.ui.main : ''}
                        text={'shift'}
                        width={2.25}/>
                <Keycap color={props.inputs.includes('z') ? props.colors.ui.main : ''}
                        text={'z'}
                        width={1}/>
                <Keycap color={props.inputs.includes('x') ? props.colors.ui.main : ''}
                        text={'x'}
                        width={1}/>
                <Keycap color={props.inputs.includes('c') ? props.colors.ui.main : ''}
                        text={'c'}
                        width={1}/>
                <Keycap color={props.inputs.includes('v') ? props.colors.ui.main : ''}
                        text={'v'}
                        width={1}/>
                <Keycap color={props.inputs.includes('b') ? props.colors.ui.main : ''}
                        text={'b'}
                        width={1}/>
                <Keycap color={props.inputs.includes('n') ? props.colors.ui.main : ''}
                        text={'n'}
                        width={1}/>
                <Keycap color={props.inputs.includes('m') ? props.colors.ui.main : ''}
                        text={'m'}
                        width={1}/>
                <Keycap color={props.inputs.includes(',') ? props.colors.ui.main : ''}
                        text={','}
                        width={1}/>
                <Keycap color={props.inputs.includes('.') ? props.colors.ui.main : ''}
                        text={'.'}
                        width={1}/>
                <Keycap color={props.inputs.includes('/') ? props.colors.ui.main : ''}
                        text={'/'}
                        width={1}/>
                <Keycap color={props.inputs.includes('rshift') ? props.colors.ui.main : ''}
                        text={'shift'}
                        width={2.75}/>
            </div>
            <div className={"d-flex flex-row"}>
                <Keycap color={props.inputs.includes('lctrl') ? props.colors.ui.main : ''}
                        text={'ctrl'}
                        width={1.25}/>
                <Keycap color={props.inputs.includes('lwin') ? props.colors.ui.main : ''}
                        text={'win'}
                        width={1.25}/>
                <Keycap color={props.inputs.includes('lalt') ? props.colors.ui.main : ''}
                        text={'alt'}
                        width={1.25}/>
                <Keycap color={props.inputs.includes(' ') ? props.colors.ui.main : ''}
                        text={' '}
                        width={6.25}/>
                <Keycap color={props.inputs.includes('ralt') ? props.colors.ui.main : ''}
                        text={'alt'}
                        width={1.25}/>
                <Keycap color={props.inputs.includes('rwin') ? props.colors.ui.main : ''}
                        text={'win'}
                        width={1.25}/>
                <Keycap color={props.inputs.includes('fn') ? props.colors.ui.main : ''}
                        text={'fn'}
                        width={1.25}/>
                <Keycap color={props.inputs.includes('rctrl') ? props.colors.ui.main : ''}
                        text={'ctrl'}
                        width={1.25}/>
            </div>
        </div>
    );
}
export default Keyboard60;