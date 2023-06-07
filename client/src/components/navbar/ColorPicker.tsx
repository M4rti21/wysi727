import React, {useState} from 'react';
import {BlockPicker, ChromePicker, ColorResult, SketchPicker, TwitterPicker} from 'react-color';

interface ColorPickerProps {
    onChange: (colorBg: string, colorFont: string, colorSkills: string, colorLine: string, colorPP: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({onChange}) => {
    const [colorBg, setColorBg] = useState('#ffffff');
    const [colorFont, setColorFont] = useState('#ffffff');
    const [colorSkills, setColorSkills] = useState('#ffffff');
    const [colorLine, setColorLine] = useState('#ffffff');
    const [colorPP, setColorPP] = useState('#ffffff');

    const handleColorBg = (color: ColorResult) => {
        setColorBg(color.hex);
        onChange(colorBg, colorFont, colorSkills, colorLine, colorPP);
    };
    const handleColorFont = (color: ColorResult) => {
        setColorFont(color.hex);
        onChange(colorBg, colorFont, colorSkills, colorLine, colorPP);
    };
    const handleColorSkills = (color: ColorResult) => {
        setColorSkills(color.hex);
        onChange(colorBg, colorFont, colorSkills, colorLine, colorPP);
    };
    const handleColorLine = (color: ColorResult) => {
        setColorLine(color.hex);
        onChange(colorBg, colorFont, colorSkills, colorLine, colorPP);
    };
    const handleColorPP = (color: ColorResult) => {
        setColorPP(color.hex);
        onChange(colorBg, colorFont, colorSkills, colorLine, colorPP);
    };
    const [showPicker, setShowPicker] = useState<boolean>(false);

    return (
        <div
            className="d-flex justify-content-center flex-column align-items-center colorPickerContainerFull position-relative shadow">
            <button className="btn btn-dark mb-2" onClick={() => {
                setShowPicker(!showPicker);
            }} data-bs-toggle="button"><i className="bi bi-paint-bucket"></i></button>
            {showPicker ?
                <div className="colorPickerContainer position-absolute bg-dark rounded" style={{top: 48, zIndex: 20}}>
                    <ul className="nav nav-tabs bg-black d-flex flex-row" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link text-light active"
                                    id="bg-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#bg-tab-pane"
                                    type="button" role="tab"
                                    aria-controls="bg-tab-pane"
                                    aria-selected="true">
                                <i className="bi bi-back"></i>
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link text-light"
                                    id="font-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#font-tab-pane"
                                    type="button" role="tab"
                                    aria-controls="font-tab-pane"
                                    aria-selected="true">
                                <i className="bi bi-fonts"></i>
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link text-light"
                                    id="skills-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#skills-tab-pane"
                                    type="button" role="tab"
                                    aria-controls="skills-tab-pane"
                                    aria-selected="true">
                                <i className="bi bi-pentagon"></i>
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link text-light"
                                    id="line-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#line-tab-pane"
                                    type="button" role="tab"
                                    aria-controls="line-tab-pane"
                                    aria-selected="true">
                                <i className="bi bi-graph-up"></i>
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link text-light"
                                    id="pp-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#pp-tab-pane"
                                    type="button" role="tab"
                                    aria-controls="pp-tab-pane"
                                    aria-selected="true">
                                <i className="bi bi-bar-chart-line"></i>
                            </button>
                        </li>
                    </ul>
                    <div className="tab-content mt-2">
                        <div className="tab-pane fade show active"
                             id="bg-tab-pane"
                             role="tabpanel"
                             aria-labelledby="bg-tab">
                            <div className={"d-flex justify-content-center"}>
                                <SketchPicker color={colorBg} onChange={handleColorBg} className={"colorPicker"}
                                              triangle={'hide'}/>
                            </div>
                        </div>
                        <div className="tab-pane fade"
                             id="font-tab-pane"
                             role="tabpanel"
                             aria-labelledby="font-tab">
                            <div className={"d-flex justify-content-center"}>
                                <SketchPicker color={colorFont} onChange={handleColorFont} className={"colorPicker"}
                                              triangle={'hide'}/>
                            </div>
                        </div>
                        <div className="tab-pane fade"
                             id="skills-tab-pane"
                             role="tabpanel"
                             aria-labelledby="skills-tab">
                            <div className={"d-flex justify-content-center"}>
                                <SketchPicker color={colorSkills} onChange={handleColorSkills} className={"colorPicker"}
                                              triangle={'hide'}/>
                            </div>
                        </div>
                        <div className="tab-pane fade"
                             id="line-tab-pane"
                             role="tabpanel"
                             aria-labelledby="line-tab">
                            <div className={"d-flex justify-content-center"}>
                                <SketchPicker color={colorLine} onChange={handleColorLine} className={"colorPicker"}
                                              triangle={'hide'}/>
                            </div>
                        </div>
                        <div className="tab-pane fade"
                             id="pp-tab-pane"
                             role="tabpanel"
                             aria-labelledby="pp-tab">
                            <div className={"d-flex justify-content-center"}>
                                <SketchPicker color={colorPP} onChange={handleColorPP} className={"colorPicker"}
                                              triangle={'hide'}/>
                            </div>
                        </div>
                    </div>
                </div> : ''}
        </div>
    );
};

export default ColorPicker;
