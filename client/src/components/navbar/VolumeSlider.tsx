import React from 'react';
import {volumeSettings, VolumeSettingsType} from "../../store/store";
import {IconButton, Slider} from "@mui/material";
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

const VolumeSlider = () => {
    const volume = volumeSettings((state: VolumeSettingsType) => state.volume);
    const setVolume = volumeSettings((state: VolumeSettingsType) => state.setVolume);
    const mute = volumeSettings((state: VolumeSettingsType) => state.mute);
    const toggleMute = volumeSettings((state: VolumeSettingsType) => state.toggleMute);
    return (
        <div className="d-flex flex-column align-items-center gap-2 hover-button">
            <IconButton aria-label="delete" onClick={() => {
                toggleMute()
            }}>
                {mute ? <VolumeOffIcon/> :
                    volume === 0 ? <VolumeMuteIcon/> :
                        volume <= 50 ? <VolumeDownIcon/> :
                            <VolumeUpIcon/>
                }
            </IconButton>
            <div className="hover-container p-2 pt-3 rounded-bottom"
                 style={{
                     backgroundColor: '#121212',
                     width: 42
            }}>
                <div className="d-flex flex-column gap-2 align-items-center">
                    <Slider
                        min={0}
                        max={100}
                        orientation="vertical"
                        color="primary"
                        style={{
                            WebkitAppearance: "slider-vertical",
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
                <div className="text-center mt-2">{volume}</div>
            </div>
        </div>
    );
};

export default VolumeSlider;
