import {Link} from "react-router-dom";
import VolumeSlider from "../VolumeSlider";
import React, {useState} from "react";
import SearchInput from "./SearchInput";
import ModeButton from "./ModeButton";

interface NavBarProps {
    onVolumeChange: (newVolume: number) => void;
    onModeChange: (newVolume: string) => void;
    mode: string,
    username: string,
}

const Navbar: React.FC<NavBarProps> = ({onVolumeChange, onModeChange, mode, username}) => {
    const [volume, setVolume] = useState<number>(10);
    const handleVolumeChange = (newVolume: number) => {
        setVolume(newVolume);
        onVolumeChange(volume);
    };
    const handleModeChange = (modeName: string) => {
        onModeChange(modeName);
    };

    return (
        <div className="navBar bg-black shadow row m-0 p-2 align-items-center">
            <div className="col-5 d-flex m-0 p-0 flex-row justify-content-start align-items-center gap-3">
                <Link className="text-light text-decoration-none" to="/">
                    <div className="d-flex justify-content-center align-items-center me-2 gap-2">
                        <img height={32} src={require('../../assets/osuextra-logo.png')} alt="logo"/>
                        <div className={"fs-5"}>wysi727</div>
                    </div>
                </Link>
                <Link className="nav-link" to="/">Home</Link>
                <Link className="nav-link" to="/users">Users</Link>
                <Link className="nav-link" to="/skins">Skins</Link>
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
                    <Link className="nav-link" to="/help"
                          data-tooltip-id="reactTooltip"
                          data-tooltip-content={`Need Help?`}>
                        <button className="btn btn-dark">
                            <i className="bi bi-question-circle"></i>
                        </button>
                    </Link>
                    <a href={"https://discord.com/users/468516101639241731"} target={"_blank"}
                       data-tooltip-id="reactTooltip"
                       data-tooltip-content={`DM me on discord!`}>
                        <button className="btn btn-dark">
                            <i className="bi bi-discord"></i>
                        </button>
                    </a>
                    <a href={"https://github.com/M4rti21/osu-extra-react"} target={"_blank"}
                       data-tooltip-id="reactTooltip"
                       data-tooltip-content={`Contribute to the project`}>
                        <button className="btn btn-dark">
                            <i className="bi bi-github"></i>
                        </button>
                    </a>
                    <a>
                        <button className="btn btn-dark">
                            Login with osu!
                        </button>
                    </a>
                </div>
            </div>
        </div>
    );
}
export default Navbar;