import React from "react";
import Tablet from "./setup/TabletDisplay";
import Keyboard60 from "./setup/Keyboard60";
import Keyboard75 from "./setup/Keyboard75";
import KeyboardFull from "./setup/KeyboardFull";
import Keypad2 from "./setup/Keypad2";
import Keypad3 from "./setup/Keypad3";
import Keypad4 from "./setup/Keypad4";
import Mouse from "./setup/Mouse";
import KeyboardTkl from "./setup/KeyboardTkl";
import {Tab, Tabs} from "@mui/material";
import {User} from "../../../interfaces/UserCardInterface";
import {ColorSettingsType, colorsSettings} from "../../../store/store";
import {ActiveLanguageType, languageStore} from "../../../store/store";

interface propsInterface {
    user: User;
}

const SetupPanel = (props: propsInterface) => {
    const language = languageStore((state: ActiveLanguageType) => state.text);
    const english = languageStore((state: ActiveLanguageType) => state.english);
    const colors = colorsSettings((state: ColorSettingsType) => state.colors);
    let keyboard = '0';
    const upperCaseFirst = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }
    const keyboardRender = () => {
        if (props.user?.db_info.setup?.keyboard?.format) {
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
    const [setupTabValue, setSetupTabValue] = React.useState(0);
    const handleSetupChange = (event: any, newValue: number) => {
        setSetupTabValue(newValue);
    };
    return (
        <>
            <Tabs
                value={setupTabValue}
                variant="fullWidth"
                onChange={handleSetupChange}
                indicatorColor="primary" textColor="primary">
                <Tab label={
                    props?.user?.playstyle?.map((key) => {
                        let transformedValue = '';
                        if (key === 'keyboard') {
                            transformedValue = language?.user?.middle?.setup?.keyboard || english?.user?.middle?.setup?.keyboard || '';
                        } else if (key === 'mouse') {
                            transformedValue = language?.user?.middle?.setup?.mouse || english?.user?.middle?.setup?.mouse || '';
                        } else if (key === 'tablet') {
                            transformedValue = language?.user?.middle?.setup?.tablet || english?.user?.middle?.setup?.tablet || '';
                        } else if (key === 'touch') {
                            transformedValue = language?.user?.middle?.setup?.touch || english?.user?.middle?.setup?.touch || '';
                        }
                        return upperCaseFirst(transformedValue);
                    }).join(' & ')}/>
                <Tab
                    label={language?.user?.middle?.setup?.peripherals ? language.user.middle.setup.peripherals : english.user.middle.setup.peripherals}/>
            </Tabs>
            <div className="tab-content mt-2">
                {setupTabValue === 0 && (
                    <div className={"row"}>
                        {props?.user?.playstyle?.includes('keyboard') ?
                            <div className="col-12 col-lg-6 p-3 d-flex flex-column">
                                <div className={"m-auto"}>{keyboardRender()}</div>
                                <div className={"mx-auto mt-2"}>{keyboard}</div>
                            </div> : ''}
                        {(props?.user?.playstyle?.includes('tablet') && props.user.db_info.setup?.tablet) &&
                            <div className={"col-12 col-lg-6 p-3 d-flex flex-column"}>
                                <div className={"m-auto"}>
                                    <Tablet colors={colors} tablet={props.user.db_info.setup.tablet}/>
                                </div>
                                <div className={"mx-auto mt-2"}>{props.user.db_info.setup.peripherals?.tablet}</div>
                            </div>}
                        {(props?.user?.playstyle?.includes('mouse') && props.user.db_info.setup?.peripherals?.mouse) &&
                            <div className={"col-12 col-lg-6 p-3 d-flex flex-column"}>
                                <div className={"m-auto"}>
                                    <Mouse colors={colors}
                                           dpi={props?.user?.db_info.setup?.mouse?.dpi ? props.user.db_info.setup.mouse.dpi : 0}
                                           mousepad={props?.user?.db_info.setup.peripherals.mousepad ? props.user.db_info.setup.peripherals.mousepad : ''}/>
                                </div>
                                <div className={"mx-auto mt-2"}>{props?.user?.db_info.setup.peripherals?.mouse}</div>
                            </div>}
                    </div>
                )}
                {setupTabValue === 1 && (
                    <div className={"d-flex justify-content-center"}>
                        <table className="table" style={{color: colors.ui.font}}>
                            <tbody>
                            {Object.keys(props?.user?.db_info.setup?.peripherals || {}).map((key, index) => (
                                <tr key={index}>
                                    <td>{(() => {
                                        let transformedValue = '';

                                        if (key === 'keyboard') {
                                            transformedValue = language?.user?.middle?.setup?.keyboard || english?.user?.middle?.setup?.keyboard || '';
                                        } else if (key === 'mouse') {
                                            transformedValue = language?.user?.middle?.setup?.mouse || english?.user?.middle?.setup?.mouse || '';
                                        } else if (key === 'monitor') {
                                            transformedValue = language?.user?.middle?.setup?.monitor || english?.user?.middle?.setup?.monitor || '';
                                        } else if (key === 'chair') {
                                            transformedValue = language?.user?.middle?.setup?.chair || english?.user?.middle?.setup?.chair || '';
                                        } else if (key === 'mousepad') {
                                            transformedValue = language?.user?.middle?.setup?.mousepad || english?.user?.middle?.setup?.mousepad || '';
                                        } else if (key === 'keypad') {
                                            transformedValue = language?.user?.middle?.setup?.keypad || english?.user?.middle?.setup?.keypad || '';
                                        } else if (key === 'tablet') {
                                            transformedValue = language?.user?.middle?.setup?.tablet || english?.user?.middle?.setup?.tablet || '';
                                        } else if (key === 'headphones') {
                                            transformedValue = language?.user?.middle?.setup?.headphones || english?.user?.middle?.setup?.headphones || '';
                                        } else if (key === 'microphone') {
                                            transformedValue = language?.user?.middle?.setup?.microphone || english?.user?.middle?.setup?.microphone || '';
                                        }
                                        return upperCaseFirst(transformedValue);
                                    })()}</td>
                                    <td>{(props?.user?.db_info.setup?.peripherals as any)?.[key]}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>)}
            </div>
        </>
    )
}
export default SetupPanel;