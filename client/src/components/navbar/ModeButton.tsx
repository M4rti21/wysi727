import React, {useEffect, useRef, useState} from 'react';
import {modeSettings, ModeSettingsType} from "../../store/store";
import {useParams, useNavigate} from 'react-router-dom';
import {IconButton, ToggleButton} from '@mui/material';

const VolumeSlider = () => {
    const navigate = useNavigate();
    const {urlUsername} = useParams();

    const mode = modeSettings((state: ModeSettingsType) => state.mode);
    const setMode = modeSettings((state: ModeSettingsType) => state.setMode);
    const handleChange = (modeName: string) => {
        setMode(modeName);
        setSelected(!selected);
        console.log(urlUsername)
        if (urlUsername) {
            const newPath = `/users/${urlUsername}/${mode}`;
            navigate(newPath);
        }
    };
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
                <img className="mode-icon" src={require(`../../assets/mode-icons/${mode}.svg`)} alt="ico"
                     style={{width: 24}}/>
            </IconButton>
            <div className="hover-container p-1" hidden={!selected}
                 ref={dropdownRef}
                 style={{backgroundColor: '#121212'}}>
                <div className="d-flex flex-column align-items-center">
                    <IconButton
                        color="primary"
                        disabled={mode === 'osu'}
                        onClick={() => handleChange('osu')}>
                        <img className="mode-icon" src={require(`../../assets/mode-icons/osu.svg`).default}
                             alt="ico" style={{width: 24}}/>
                    </IconButton>
                    <IconButton
                        disabled={mode === 'taiko'}
                        onClick={() => handleChange('taiko')}>
                        <img className="mode-icon" src={require(`../../assets/mode-icons/taiko.svg`).default}
                             alt="ico" style={{width: 24}}/>
                    </IconButton>
                    <IconButton
                        disabled={mode === 'fruits'}
                        onClick={() => handleChange('fruits')}>
                        <img className="mode-icon" src={require(`../../assets/mode-icons/fruits.svg`).default}
                             alt="ico" style={{width: 24}}/>
                    </IconButton>
                    <IconButton
                        disabled={mode === 'mania'}
                        onClick={() => handleChange('mania')}>
                        <img className="mode-icon" src={require(`../../assets/mode-icons/mania.svg`).default}
                             alt="ico" style={{width: 24}}/>
                    </IconButton>
                </div>
            </div>
        </div>
    );
};

export default VolumeSlider;
