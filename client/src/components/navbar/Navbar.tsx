import React from "react";
import {Link} from "react-router-dom";
import VolumeSlider from "./VolumeSlider";
import SearchInput from "./SearchInput";
import ColorPicker from "./ColorPicker";
import OsuLogin from "./OsuLogin";
import UserLogged from "./UserLogged";
import {userSettings, UserSettingsType} from "../../store/store";
import {IconButton, Paper, ToggleButtonGroup} from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
import ModeButton from "./ModeButton";

const Navbar = () => {
    const logged = userSettings((state: UserSettingsType) => state.logged);
    return (
        <nav className="shadow row m-0 p-2 align-items-center"
             style={{
                 position: 'fixed',
                 top: 0,
                 left: 0,
                 width: '100%',
                 zIndex: 9999
             }}>
            <div className="col-5 d-flex m-0 p-0 flex-row justify-content-start align-items-center gap-3">
                <Link className="text-light text-decoration-none" to="/">
                    <div className="d-flex justify-content-center align-items-center me-2 gap-2">
                        <img height={32} src={require('../../assets/wysi727logo.svg').default} alt="logo"/>
                        <div className={"fs-5"}>wysi727</div>
                    </div>
                </Link>
                <Link className="nav-link" to="/">Home</Link>
            </div>
            <Paper
                component="div"
                className={"d-flex flex-row col-7"}>
                <ModeButton/>
                <SearchInput/>
                <VolumeSlider/>
                <ColorPicker/>
                <div className={"me-auto"}/>
                <ToggleButtonGroup>
                    <IconButton
                        data-tooltip-id="reactTooltip"
                        data-tooltip-content={`DM me on discord!`}
                        onClick={() => {
                            window.location.href = "https://discord.com/users/468516101639241731"
                        }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                             className="bi bi-discord" viewBox="0 0 16 16">
                            <path
                                d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z"/>
                        </svg>
                    </IconButton>
                    <IconButton
                        data-tooltip-id="reactTooltip"
                        data-tooltip-content={`Contribute to the project!`}
                        onClick={() => {
                            window.location.href = "https://github.com/M4rti21/osu-extra-react"
                        }}>
                        <GitHubIcon/>
                    </IconButton>
                </ToggleButtonGroup>
                <div>
                    {logged ? <UserLogged/> : <OsuLogin/>}
                </div>
            </Paper>
        </nav>
    );
}
export default Navbar;