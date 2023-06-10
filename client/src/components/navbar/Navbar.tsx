import {Link} from "react-router-dom";
import VolumeSlider from "./VolumeSlider";
import React, {useState} from "react";
import SearchInput from "./SearchInput";
import ModeButton from "./ModeButton";
import ColorPicker from "./ColorPicker";

interface NavBarProps {
    onVolumeChange: (newVolume: number) => void;
    onModeChange: (newVolume: string) => void;
    onColorChange: (colorBg: string, colorFont: string, colorSkills: string, colorLine: string, colorPP: string) => void;
    mode: string,
    username: string,
}

const Navbar: React.FC<NavBarProps> = ({onVolumeChange, onColorChange, onModeChange, mode, username}) => {
    const [volume, setVolume] = useState<number>(10);
    const handleVolumeChange = (newVolume: number) => {
        setVolume(newVolume);
        onVolumeChange(volume);
    };
    const handleModeChange = (modeName: string) => {
        onModeChange(modeName);
    };
    const handleFontColorChange = (colorBg: string, colorFont: string, colorSkills: string, colorLine: string, colorPP: string) => {
        onColorChange(colorBg, colorFont, colorSkills, colorLine, colorPP);
    };
    return (
        <>
            <div className="navBar bg-black shadow row m-0 p-2 align-items-center">
                <div className="col-5 d-flex m-0 p-0 flex-row justify-content-start align-items-center gap-3">
                    <Link className="text-light text-decoration-none" to="/">
                        <div className="d-flex justify-content-center align-items-center me-2 gap-2">
                            <img height={32} src={require('../../assets/osuextra-logo.png')} alt="logo"/>
                            <div className={"fs-5"}>wysi727</div>
                        </div>
                    </Link>
                    <Link className="nav-link" to="/">Home</Link>
                    <div className={"nav-link btn disabled border-0"}>Users</div>
                    <div className={"nav-link btn disabled border-0"}>Skins</div>
                    {/*<Link className="nav-link" to="/users">Users</Link>*/}
                    {/*<Link className="nav-link" to="/skins">Skins</Link>*/}
                </div>
                <div className="col-2 d-flex m-0 p-0 flex-row justify-content-center align-items-center gap-2">
                    <SearchInput mode={mode}/>
                </div>
                <div className="col-5 d-flex m-0 p-0 flex-row justify-content-between align-items-center ps-2">
                    <div className="d-flex flex-row gap-2">
                        <ModeButton mode={mode} onModeChange={handleModeChange} username={username}/>
                        <VolumeSlider volume={volume} onVolumeChange={handleVolumeChange}/>
                    </div>
                    <div className="d-flex flex-row justify-content-end gap-2">
                        <ColorPicker onChange={handleFontColorChange}/>
                        {/*<Link className="nav-link" to="/help"*/}
                        {/*      data-tooltip-id="reactTooltip"*/}
                        {/*      data-tooltip-content={`Need Help?`}>*/}
                        <div className={"nav-link"}>
                            <button className="btn btn-dark" disabled={true}>
                                <i className="bi bi-question-circle"></i>
                            </button>
                        </div>
                        {/*</Link>*/}
                        <a href={"https://discord.com/users/468516101639241731"} target={"_blank"}
                           data-tooltip-id="reactTooltip"
                           data-tooltip-content={`DM me on discord!`}>
                            <button className="btn btn-dark">
                                <i className="bi bi-discord"></i>
                            </button>
                        </a>
                        <a href={"https://github.com/M4rti21/osu-extra-react"} target={"_blank"}
                           data-tooltip-id="reactTooltip"
                           data-tooltip-content={`Contribute to the project!`}>
                            <button className="btn btn-dark">
                                <i className="bi bi-github"></i>
                            </button>
                        </a>
                        <a>
                            <button className="btn btn-dark" disabled={true}>
                                Login with osu!
                            </button>
                        </a>
                    </div>
                </div>
            </div>
            <div className="alert alert-warning alert-dismissible fade show rounded-0 m-0" role="alert">
                <i className="bi bi-exclamation-triangle me-2"></i>This website is <strong>still under
                development!</strong> Your experience may not be optimal yet. Please if you encounter any problems feel
                free to DM me on <a href={"https://discord.com/users/468516101639241731"} target={"_blank"}>discord</a>!
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        </>
    );
}
export default Navbar;