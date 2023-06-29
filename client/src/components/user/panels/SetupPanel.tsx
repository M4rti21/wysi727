import React from "react";
import Tablet from "./setup/TabletDisplay";
import Keyboard60 from "./setup/Keyboard60";
import Keyboard75 from "./setup/Keyboard75";
import KeyboardFull from "./setup/KeyboardFull";
import {ColorSettingsType, colorsSettings} from "../../../store/store";
import Keypad2 from "./setup/Keypad2";
import Keypad3 from "./setup/Keypad3";
import Keypad4 from "./setup/Keypad4";
import {User} from "../../../interfaces/UserCardInterface";
import Mouse from "./setup/Mouse";
import KeyboardTkl from "./setup/KeyboardTkl";

interface propsInterface {
    user: User;
}

const SetupPanel = (props: propsInterface) => {
    const colors = colorsSettings((state: ColorSettingsType) => state.colors);
    let keyboard = '0';
    const upperCaseFirst = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }
    const keyboardRender = () => {
        if (props.user.db_info.setup?.keyboard?.format) {
            switch (props.user.db_info.setup.keyboard.format) {
                case '2':
                    keyboard = props.user.db_info.setup.peripherals?.keypad ? props.user.db_info.setup.peripherals.keypad : '';
                    return <Keypad2 colors={colors} inputs={props.user.db_info.setup.keyboard.inputs}/>;
                case '3':
                    keyboard = props.user.db_info.setup.peripherals?.keypad ? props.user.db_info.setup.peripherals.keypad : '';
                    return <Keypad3 colors={colors} inputs={props.user.db_info.setup.keyboard.inputs}/>;
                case '4':
                    keyboard = props.user.db_info.setup.peripherals?.keypad ? props.user.db_info.setup.peripherals.keypad : '';
                    return <Keypad4 colors={colors} inputs={props.user.db_info.setup.keyboard.inputs}/>;
                case '60':
                    keyboard = props.user.db_info.setup?.peripherals?.keyboard ? props.user.db_info.setup.peripherals.keyboard : '';
                    return <Keyboard60 colors={colors} inputs={props.user.db_info.setup.keyboard.inputs}/>;
                case '75':
                    keyboard = props.user.db_info.setup?.peripherals?.keyboard ? props.user.db_info.setup.peripherals.keyboard : '';
                    return <Keyboard75 colors={colors} inputs={props.user.db_info.setup.keyboard.inputs}/>;
                case 'tkl':
                    keyboard = props.user.db_info.setup?.peripherals?.keyboard ? props.user.db_info.setup.peripherals.keyboard : '';
                    return <KeyboardTkl colors={colors} inputs={props.user.db_info.setup.keyboard.inputs}/>;
                case 'full':
                    keyboard = props.user.db_info.setup?.peripherals?.keyboard ? props.user.db_info.setup.peripherals.keyboard : '';
                    return <KeyboardFull colors={colors} inputs={props.user.db_info.setup.keyboard.inputs}/>;
                default:
                    return '';
            }
        }
    }
    return (
        <>
            <ul className="nav nav-pills d-flex flex-row" id="SetupTabs" role="tablist">
                <li className="nav-item flex-grow-1 d-flex justify-content-center" role="presentation">
                    <button className="nav-link"
                            id="keyboard-tablet-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#keyboard-tablet-pane"
                            type="button" role="tab"
                            aria-controls="keyboard-tablet-pane"
                            aria-selected="true">
                        <i className="bi bi-keyboard me-2"></i>
                        {props.user.playstyle?.map((thing) => upperCaseFirst(thing)).join(' & ')}
                    </button>
                </li>
                <li className="nav-item flex-grow-1 d-flex justify-content-center" role="presentation">
                    <button className="nav-link"
                            id="peripherals-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#peripherals-pane"
                            type="button" role="tab"
                            aria-controls="peripherals-pane"
                            aria-selected="true">
                        <i className="bi bi-pc-display me-2"></i>
                        Peripherals
                    </button>
                </li>
            </ul>
            <div className="tab-content mt-2">
                <div className="tab-pane fade show"
                     id="keyboard-tablet-pane"
                     role="tabpanel"
                     aria-labelledby="keyboard-tablet-tab">
                    <div className={"row"}>
                        {props.user.playstyle?.includes('keyboard') ?
                            <div className="col-12 col-lg-6 p-3 d-flex flex-column">
                                <div className={"m-auto"}>{keyboardRender()}</div>
                                <div className={"mx-auto mt-2"}>{keyboard}</div>
                            </div> : ''}
                        {(props.user.playstyle?.includes('tablet') && props.user.db_info.setup?.tablet) &&
                            <div className={"col-12 col-lg-6 p-3 d-flex flex-column"}>
                                <div className={"m-auto"}>
                                    <Tablet colors={colors} tablet={props.user.db_info.setup.tablet}/>
                                </div>
                                <div className={"mx-auto mt-2"}>{props.user.db_info.setup.peripherals?.tablet}</div>
                            </div>}
                        {(props.user.playstyle?.includes('mouse') && props.user.db_info.setup?.peripherals?.mouse) &&
                            <div className={"col-12 col-lg-6 p-3 d-flex flex-column"}>
                                <div className={"m-auto"}>
                                    <Mouse colors={colors}
                                           dpi={props.user.db_info.setup?.mouse?.dpi ? props.user.db_info.setup.mouse.dpi : 0}
                                           mousepad={props.user.db_info.setup.peripherals.mousepad ? props.user.db_info.setup.peripherals.mousepad : ''}/>
                                </div>
                                <div className={"mx-auto mt-2"}>{props.user.db_info.setup.peripherals?.mouse}</div>
                            </div>}
                    </div>
                </div>
                <div className="tab-pane fade"
                     id="peripherals-pane"
                     role="tabpanel"
                     aria-labelledby="peripherals-tab">
                    <div className={"d-flex justify-content-center"}>
                        <table className="table" style={{color: colors.ui.font}}>
                            <tbody>
                            {Object.keys(props.user.db_info.setup?.peripherals ? props.user.db_info.setup?.peripherals : {}).map((key: string, index: number) => (
                                <tr key={index}>
                                    <td>{upperCaseFirst(key)}</td>
                                    <td>{(props.user.db_info.setup?.peripherals as any)[key]}</td>
                                </tr>
                            ))}</tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
        ;
}
export default SetupPanel;