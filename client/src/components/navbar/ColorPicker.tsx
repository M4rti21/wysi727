import React from 'react';
import {SketchPicker} from "react-color";
import {ColorSettingsType, colorsSettings} from "../../store/store";
import ColorLensIcon from '@mui/icons-material/ColorLens';
import {IconButton, Tab, Tabs} from "@mui/material";
import TextFieldsIcon from '@mui/icons-material/TextFields';
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import FormatPaintIcon from '@mui/icons-material/FormatPaint';

const ColorPicker = () => {
    const colors = colorsSettings((state: ColorSettingsType) => state.colors);
    const setMain = colorsSettings((state: ColorSettingsType) => state.setMain);
    const setFont = colorsSettings((state: ColorSettingsType) => state.setFont);
    const setBg = colorsSettings((state: ColorSettingsType) => state.setBg);
    const [value, setValue] = React.useState(0);

    const handleChange = (event: any, newValue: number) => {
        setValue(newValue);
    };
    return (
        <>
            <div className="p-0 m-0 shadow hover-button">
                <IconButton>
                    <ColorLensIcon/>
                </IconButton>
                <div className="bg-dark rounded hover-container">
                    <Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary">
                        <Tab label={<WallpaperIcon/>}/>
                        <Tab label={<TextFieldsIcon/>}/>
                        <Tab label={<FormatPaintIcon/>}/>
                    </Tabs>
                    {value === 0 && (
                        <SketchPicker
                            color={colors.ui.bg}
                            onChange={
                                (col) => {
                                    setBg(col.hex)
                                }} className={"colorPicker"}/>
                    )}
                    {value === 1 && (
                        <SketchPicker
                            color={colors.ui.font}
                            onChange={
                                (col) => {
                                    setFont(col.hex);
                                }}
                            className={"colorPicker"}/>
                    )}
                    {value === 2 && (
                        <SketchPicker
                            color={colors.ui.main}
                            onChange={
                                (col) => {
                                    setMain(col.hex)
                                }}
                            className={"colorPicker"}/>
                    )}
                </div>
            </div>
        </>
    )
};

export default ColorPicker;
