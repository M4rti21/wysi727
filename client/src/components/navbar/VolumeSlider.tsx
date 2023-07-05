import React, {useEffect, useRef, useState} from 'react';
import {volumeSettings, VolumeSettingsType} from "../../store/store";
import {IconButton, Slider} from "@mui/material";
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

const VolumeSlider = () => {
    const volume = volumeSettings((state: VolumeSettingsType) => state.volume);
    const setVolume = volumeSettings((state: VolumeSettingsType) => state.setVolume);
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
                {volume === 0 ? <VolumeOffIcon/> :
                    volume <= 50 ? <VolumeDownIcon/> :
                        <VolumeUpIcon/>
                }
            </IconButton>
            <div className="hover-container p-2 pt-3 rounded-bottom"
                 style={{
                     backgroundColor: '#121212',
                     width: 42
                 }}
                 hidden={!selected}
                 ref={dropdownRef}>
                <div className="d-flex flex-column gap-2 align-items-center">
                    <Slider
                        min={0}
                        max={100}
                        orientation="vertical"
                        color="primary"
                        style={{
                            height: 100
                        }}
                        value={volume}
                        onChange={(event: Event, newValue: number | number[]) => {
                            if (typeof newValue === "number") {
                                setVolume(newValue);
                            }
                        }}
                    />
                </div>
                <div className="text-center mt-2 p-0">
                    {volume}
                </div>
            </div>
        </div>
    )
        ;
};

export default VolumeSlider;
