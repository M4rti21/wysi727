import React, {useEffect, useRef, useState} from 'react';
import {SketchPicker} from "react-color";
import {ColorSettingsType, colorsSettings} from "../../store/store";
import ColorLensIcon from '@mui/icons-material/ColorLens';
import {IconButton, Tab, Tabs, ToggleButton} from "@mui/material";
import TextFieldsIcon from '@mui/icons-material/TextFields';
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import FormatPaintIcon from '@mui/icons-material/FormatPaint';

const ColorPicker = () => {
    const colors = colorsSettings((state: ColorSettingsType) => state.colors);
    const setMain = colorsSettings((state: ColorSettingsType) => state.setMain);
    const setFont = colorsSettings((state: ColorSettingsType) => state.setFont);
    const setBg = colorsSettings((state: ColorSettingsType) => state.setBg);
    const [value, setValue] = React.useState(0);

    const [selected, setSelected] = useState<boolean>(false);
    const handleChange = (event: any, newValue: number) => {
        setValue(newValue);
    };
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
                <ColorLensIcon/>
            </IconButton>
            <div className="hover-container"
                 hidden={!selected}
                 ref={dropdownRef}
                 style={{width: 280}}>
                <Tabs value={value}
                      centered
                      onChange={handleChange}
                      indicatorColor="primary"
                      textColor="primary">
                    <Tab label={<WallpaperIcon/>}/>
                    <Tab label={<TextFieldsIcon/>}/>
                    <Tab label={<FormatPaintIcon/>}/>
                </Tabs>
                {value === 0 && (
                    <SketchPicker
                        color={colors.ui.bg}
                        width={'100%'}
                        onChange={
                            (col) => {
                                setBg(col.hex)
                            }} className={"colorPicker"}/>
                )}
                {value === 1 && (
                    <SketchPicker
                        color={colors.ui.font}
                        width={'100%'}
                        onChange={
                            (col) => {
                                setFont(col.hex);
                            }}
                        className={"colorPicker"}/>
                )}
                {value === 2 && (
                    <SketchPicker
                        color={colors.ui.main}
                        width={'100%'}
                        onChange={
                            (col) => {
                                setMain(col.hex)
                            }}
                        className={"colorPicker"}/>
                )}
            </div>
        </div>
    )
};

export default ColorPicker;
