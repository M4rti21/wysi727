import React, {useEffect, useRef, useState} from 'react';
import {Button, IconButton} from "@mui/material";
import FlagEmoji from "../user/FlagEmoji";
import {ActiveLanguageType, languageStore} from "../../store/store";
import LaunchIcon from '@mui/icons-material/Launch';
import LanguageButton from "./LanguageButton";

const LanguagesSelect = () => {
    const language = languageStore((state: ActiveLanguageType) => state.text);
    const english = languageStore((state: ActiveLanguageType) => state.english);
    const code = languageStore((state: ActiveLanguageType) => state.code);
    const [selected, setSelected] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setSelected(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    return (
        <div className="d-flex flex-column align-items-center hover-button">
            <IconButton
                onClick={() => {
                    setSelected(!selected);
                }}>
                <FlagEmoji size={24} code={code}/>
            </IconButton>
            <div className="hover-container" hidden={!selected} ref={dropdownRef} style={{backgroundColor: '#121212'}}>
                <div className="row m-2">
                    <div className="col d-flex flex-column justify-content-start align-items-start m-0 p-0 pe-1">
                        <LanguageButton code={'za'} name={'afrikaans'} nativeName={'Afrikaans'}/>
                        <LanguageButton code={'cat'} name={'catalan'} nativeName={'Català'}/>
                        <LanguageButton code={'de'} name={'german'} nativeName={'Deutsch'}/>
                        <LanguageButton code={'gb'} name={'english'} nativeName={'English'}/>
                        <LanguageButton code={'es'} name={'spanish'} nativeName={'Español'}/>
                        <LanguageButton code={'ee'} name={'estonian'} nativeName={'Eesti keel'}/>
                        <LanguageButton code={'gal'} name={'galician'} nativeName={'Galego'}/>
                        <LanguageButton code={'it'} name={'italian'} nativeName={'Italiano'}/>
                        <LanguageButton code={'lv'} name={'latvian'} nativeName={'Latviešu'}/>
                        <LanguageButton code={'hu'} name={'hungarian'} nativeName={'Magyar'}/>
                        <LanguageButton code={'nl'} name={'dutch'} nativeName={'Nederlands'}/>
                        <LanguageButton code={'no'} name={'norwegian'} nativeName={'Norsk'}/>
                    </div>
                    <div className="col d-flex flex-column justify-content-start align-items-start m-0 p-0 ps-1">
                        <LanguageButton code={'pl'} name={'polish'} nativeName={'Polski'}/>
                        <LanguageButton code={'pt'} name={'portuguese'} nativeName={'Português'}/>
                        <LanguageButton code={'br'} name={'portugueseBr'} nativeName={'Português'}/>
                        <LanguageButton code={'ru'} name={'russian'} nativeName={'Русский'}/>
                        <LanguageButton code={'fi'} name={'finnish'} nativeName={'Suomi'}/>
                        <LanguageButton code={'rs'} name={'serbian'} nativeName={'Српски'}/>
                        <LanguageButton code={'tr'} name={'turkish'} nativeName={'Türkçe'}/>
                        <LanguageButton code={'jp'} name={'japanese'} nativeName={'日本語'}/>
                        <LanguageButton code={'cn'} name={'chineseS'} nativeName={'简体中文'}/>
                        <LanguageButton code={'tw'} name={'chineseT'} nativeName={'繁體中文'}/>
                        <LanguageButton code={'eo'} name={'esperanto'} nativeName={'Esperanto'}/>
                    </div>
                </div>
                <a href="https://crowdin.com/project/wysi727" target="_blank" className="mb-3">
                    <Button variant="contained" startIcon={<LaunchIcon/>} color="warning">
                        {language?.navbar?.helpTranslating ? language.navbar.helpTranslating : english.navbar.helpTranslating}
                    </Button>
                </a>
            </div>
        </div>
    );
}

export default LanguagesSelect;