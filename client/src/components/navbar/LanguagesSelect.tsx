import React from 'react';
import {Button, IconButton} from "@mui/material";
import FlagEmoji from "../user/FlagEmoji";
import {ActiveLanguageType, languagesStore, languageStore} from "../../store/languages";

const LanguagesSelect = () => {
    const code = languageStore((state: ActiveLanguageType) => state.code);
    const languages = languagesStore((state) => state);
    const setLang = languageStore((state: ActiveLanguageType) => state.setLang)
    return (
        <div className="d-flex flex-column align-items-center gap-2 hover-button">
            <IconButton>
                <FlagEmoji size={24} code={code}/>
            </IconButton>
            <div className="hover-container p-2" style={{backgroundColor: '#121212'}}>
                <div className="d-flex flex-row">
                    <div className="d-flex flex-column justify-content-start align-items-start">
                        <Button variant="outlined" startIcon={<FlagEmoji size={24} code={'gb'}/>}
                                onClick={() => {
                                    setLang(languages.english, 'gb')
                                }}>
                            English
                        </Button>
                        <Button variant="outlined" startIcon={<FlagEmoji size={24} code={'de'}/>}
                                onClick={() => {
                                    setLang(languages.german, 'de')
                                }}>
                            Deutsch
                        </Button>
                        <Button variant="outlined" startIcon={<FlagEmoji size={24} code={'es'}/>}
                                onClick={() => {
                                    setLang(languages.spanish, 'es')
                                }}>
                            Español
                        </Button>
                    </div>
                    <div className="d-flex flex-column justify-content-start align-items-start">
                        <Button variant="outlined" startIcon={<FlagEmoji size={24} code={'ru'}/>}
                                onClick={() => {
                                    setLang(languages.russian, 'ru')
                                }}>
                            Русский
                        </Button>
                        <Button variant="outlined" startIcon={<FlagEmoji size={24} code={'tr'}/>}
                                onClick={() => {
                                    setLang(languages.turkish, 'tr')
                                }}>
                            Türkçe
                        </Button>
                        <Button variant="outlined" startIcon={<FlagEmoji size={24} code={'rs'}/>}
                                onClick={() => {
                                    setLang(languages.serbian, 'rs')
                                }}>
                            Српски
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LanguagesSelect;