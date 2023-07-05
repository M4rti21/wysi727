import React from 'react';
import {Button} from "@mui/material";
import FlagEmoji from "../user/FlagEmoji";
import {ActiveLanguageType, languagesStore, languageStore, LanguagesType} from "../../store/store";
import axios from 'axios';
import {userSettings, UserSettingsType} from "../../store/store";

interface propsInterface {
    code: string,
    name: string,
    nativeName: string,
}

const LanguageButton = (props: propsInterface) => {
    axios.defaults.withCredentials = true;
    const sessionUser = userSettings((state: UserSettingsType) => state.sessionUser);

    const english = languageStore((state: ActiveLanguageType) => state.english);
    const languages = languagesStore((state: LanguagesType) => state);
    const setLang = languageStore((state: ActiveLanguageType) => state.setLang);

    function getColor(number: number) {
        let color = '';
        if (number < 50) {
            color = '#f8745455'; // Pastel Red
        } else if (number < 75) {
            color = '#faf56a55'; // Pastel Orange
        } else {
            color = '#b3ff6655'; // Pastel Green
        }
        return color;
    }

    function getObjectCompletionPercentage(obj1: any) {
        const keys1 = getAllKeys(obj1);
        const keys2 = getAllKeys(english);
        return (keys1.length / keys2.length) * 100;
    }

    function getAllKeys(obj: any): any {
        let keys: any = [];

        for (const key in obj) {
            keys.push(key);
            if (typeof obj[key] === "object") {
                const nestedKeys = getAllKeys(obj[key]);
                keys = keys.concat(nestedKeys.map((nestedKey: any) => `${key}.${nestedKey}`));
            }
        }

        return keys;
    }

    const percentage = getObjectCompletionPercentage((languages as any)[props.name]);
    const lineHeight = 3;

    function handleClick() {
        setLang(props.name, props.code);
        axios.post("http://localhost:5000/setLang", {
            userId: sessionUser?.id,
            name: props.name,
            code: props.code,
        })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.error(err);
            })
    }

    return (
        <div className="mb-2 w-100 rounded overflow-hidden" style={{
            outline: '1px solid #ffffff22'
        }}>
            <Button variant="outlined"
                    startIcon={<FlagEmoji size={24} code={props.code}/>}
                    onClick={handleClick}
                    className="w-100 justify-content-start">
                {props.nativeName}
            </Button>
            <div className="d-flex flex-row gap-1">
                <div className="flex-grow-1">
                    <div style={{
                        height: lineHeight,
                        backgroundColor: getColor(percentage),
                        width: `${percentage}%`
                    }}></div>
                </div>
            </div>
        </div>
    )
}
export default LanguageButton;