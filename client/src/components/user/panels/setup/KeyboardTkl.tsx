import React from "react";
import {ColorsType} from "../../../../interfaces/ColorsInterface";
import Keycap from "./Keycap";

interface propsInterface {
    colors: ColorsType,
    inputs: string[]
}

const KeyboardTkl = (props: propsInterface) => {
    return (
        <div className="rounded-3 p-2 d-flex flex-row gap-2" style={{outline: `solid 1px ${props.colors.ui.font}`}}>
            <div className="d-flex flex-column">
                <div className={"d-flex flex-row"}>
                    <div className={"me-auto"}><Keycap
                        color={props.inputs.includes('esc') ? props.colors.ui.main : ''}
                        text={'esc'}
                        width={1}/></div>
                    <Keycap color={props.inputs.includes('f1') ? props.colors.ui.main : ''}
                            text={'f1'}
                            width={1}/>
                    <Keycap color={props.inputs.includes('f2') ? props.colors.ui.main : ''}
                            text={'f2'}
                            width={1}/>
                    <Keycap color={props.inputs.includes('f3') ? props.colors.ui.main : ''}
                            text={'f3'}
                            width={1}/>
                    <div className={"me-auto"}><Keycap
                        color={props.inputs.includes('f4') ? props.colors.ui.main : ''}
                        text={'f4'}
                        width={1}/></div>
                    <Keycap color={props.inputs.includes('f5') ? props.colors.ui.main : ''}
                            text={'f5'}
                            width={1}/>
                    <Keycap color={props.inputs.includes('f6') ? props.colors.ui.main : ''}
                            text={'f6'}
                            width={1}/>
                    <Keycap color={props.inputs.includes('f7') ? props.colors.ui.main : ''}
                            text={'f7'}
                            width={1}/>
                    <div className={"me-auto"}><Keycap
                        color={props.inputs.includes('f8') ? props.colors.ui.main : ''}
                        text={'f8'}
                        width={1}/></div>
                    <Keycap color={props.inputs.includes('f9') ? props.colors.ui.main : ''}
                            text={'f9'}
                            width={1}/>
                    <Keycap color={props.inputs.includes('f10') ? props.colors.ui.main : ''}
                            text={'f10'}
                            width={1}/>
                    <Keycap color={props.inputs.includes('f11') ? props.colors.ui.main : ''}
                            text={'f11'}
                            width={1}/>
                    <Keycap color={props.inputs.includes('f12') ? props.colors.ui.main : ''}
                            text={'f12'}
                            width={1}/>
                </div>
                <div className={"d-flex flex-row mt-2"}>
                    <Keycap color={props.inputs.includes('~') ? props.colors.ui.main : ''}
                            text={'~'}
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
            <div className="d-flex flex-column">
                <div className={"d-flex flex-row"}>
                    <Keycap color={props.inputs.includes('prt') ? props.colors.ui.main : ''}
                            text={'prt'}
                            width={1}/>
                    <Keycap color={props.inputs.includes('scr') ? props.colors.ui.main : ''}
                            text={'scr'}
                            width={1}/>
                    <Keycap color={props.inputs.includes('pau') ? props.colors.ui.main : ''}
                            text={'pau'}
                            width={1}/>
                </div>
                <div className={"d-flex flex-row mt-2"}>
                    <Keycap color={props.inputs.includes('ins') ? props.colors.ui.main : ''}
                            text={'ins'}
                            width={1}/>
                    <Keycap color={props.inputs.includes('hom') ? props.colors.ui.main : ''}
                            text={'hom'}
                            width={1}/>
                    <Keycap color={props.inputs.includes('pgu') ? props.colors.ui.main : ''}
                            text={'pgu'}
                            width={1}/>
                </div>
                <div className={"d-flex flex-row"}>
                    <Keycap color={props.inputs.includes('del') ? props.colors.ui.main : ''}
                            text={'del'}
                            width={1}/>
                    <Keycap color={props.inputs.includes('end') ? props.colors.ui.main : ''}
                            text={'end'}
                            width={1}/>
                    <Keycap color={props.inputs.includes('pgd') ? props.colors.ui.main : ''}
                            text={'pgd'}
                            width={1}/>
                </div>
                <div className={"d-flex flex-row"}>
                    <div style={{width: 18, height: 18}}></div>
                    <div style={{width: 18, height: 18}}></div>
                    <div style={{width: 18, height: 18}}></div>
                </div>
                <div className={"d-flex flex-row"}>
                    <div style={{width: 18, height: 18}}></div>
                    <Keycap color={props.inputs.includes('ua') ? props.colors.ui.main : ''}
                            text={'🡑'}
                            width={1}/>
                    <div style={{width: 18, height: 18}}></div>
                </div>
                <div className={"d-flex flex-row"}>
                    <Keycap color={props.inputs.includes('la') ? props.colors.ui.main : ''}
                            text={'🡐'}
                            width={1}/>
                    <Keycap color={props.inputs.includes('da') ? props.colors.ui.main : ''}
                            text={'🡓'}
                            width={1}/>
                    <Keycap color={props.inputs.includes('ra') ? props.colors.ui.main : ''}
                            text={'🡒'}
                            width={1}/>
                </div>
            </div>
        </div>
    );
}
export default KeyboardTkl;