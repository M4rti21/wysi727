import React, {useEffect, useRef, useState} from "react";
import {ActiveLanguageType, languageStore, userSettings, UserSettingsType} from "../../store/store";
import {Link} from "react-router-dom";
import {Avatar, Button, ToggleButton} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import Divider from "@mui/material/Divider";
import LogoutIcon from '@mui/icons-material/Logout';
import axios from "axios";

const UserLogged = () => {
    const language = languageStore((state: ActiveLanguageType) => state.text);
    const english = languageStore((state: ActiveLanguageType) => state.english);

    const removeSessionUser = userSettings((state: UserSettingsType) => state.removeSessionUser);
    const sessionUser = userSettings((state: UserSettingsType) => state.sessionUser);

    function logout() {
        axios.get(`http://localhost:5000/logout`)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.error(err);
            });
        removeSessionUser();
    }

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
        <div className="hover-button">
            <ToggleButton
                value="check"
                selected={selected}
                onChange={() => {
                    setSelected(!selected);
                }}
                className="p-0">
                <Avatar variant="rounded">
                    <img style={{height: "100%"}} alt={"pfp"} src={sessionUser?.avatar_url}/>
                </Avatar>
            </ToggleButton>
            <div className="hover-container rounded-bottom"
                 style={{
                     backgroundColor: '#121212',
                     right: 0
                 }}
                 ref={dropdownRef}
                 hidden={!selected}>
                <Link className="dropdown-item text-decoration-none" to={`/users/${sessionUser?.id}/osu`}>
                    <Button className="w-100 d-flex justify-content-start pe-5 ps-3"
                            startIcon={<PersonIcon/>}>
                        {language?.navbar?.wysiProfile ? language.navbar.wysiProfile : english.navbar.wysiProfile}
                    </Button>
                </Link>
                <a className="dropdown-item text-decoration-none" href={`https://osu.ppy.sh/users/${sessionUser?.id}`}
                   target={"_blank"}>
                    <Button className="w-100 d-flex justify-content-start pe-5 ps-3"
                            startIcon={
                                <img height={20} width={20} alt={"osu!log"}
                                     src={require('../../assets/osulogo.svg').default}/>}>
                        {language?.navbar?.osuProfile ? language.navbar.osuProfile : english.navbar.osuProfile}
                    </Button>

                </a>
                <Divider/>
                <Button className="w-100 d-flex justify-content-start pe-5 ps-3"
                        onClick={logout} startIcon={<LogoutIcon/>}>
                    {language?.navbar?.logout ? language.navbar.logout : english.navbar.logout}
                </Button>
            </div>
        </div>
    );
}

export default UserLogged;