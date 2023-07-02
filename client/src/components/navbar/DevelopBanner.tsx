import React, {useState} from "react";
import {Alert} from "@mui/material";
import {ActiveLanguageType, languageStore} from "../../store/languages";

interface PropsInterface {
    develop: boolean
}

const DevelopBanner = (props : PropsInterface) => {
    const language = languageStore((state: ActiveLanguageType) => state.text);

    const [develop, setDevelop] = useState<boolean>(props.develop)
    return (
        <Alert variant="filled" severity="warning" hidden={!develop} onClose={() => {setDevelop(false)}}>
            {language.navbar.development1} <a
            href={"https://discord.com/users/468516101639241731"} target={"_blank"}>discord</a>
            {` ${language.navbar.development2}`}
        </Alert>
    );
}

export default DevelopBanner;