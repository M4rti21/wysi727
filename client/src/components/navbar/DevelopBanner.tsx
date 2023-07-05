import React, {useState} from "react";
import {Alert} from "@mui/material";
import {ActiveLanguageType, languageStore} from "../../store/store";

interface PropsInterface {
    develop: boolean
}

const DevelopBanner = (props : PropsInterface) => {
    const language = languageStore((state: ActiveLanguageType) => state.text);
    const english = languageStore((state: ActiveLanguageType) => state.english);

    const [develop, setDevelop] = useState<boolean>(props.develop)
    return (
        <Alert variant="filled" severity="warning" hidden={!develop} onClose={() => {setDevelop(false)}}>
            {language?.navbar?.development1 ? language.navbar.development1 : english.navbar.development1} <a
            href={"https://discord.com/users/468516101639241731"} target={"_blank"}>discord</a>
            {` ${language?.navbar?.development2 ? language.navbar.development2 : english.navbar.development2}`}
        </Alert>
    );
}

export default DevelopBanner;