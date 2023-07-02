import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {userSettings, UserSettingsType} from "./store/store";

const RedirectHandler = () => {
        const navigate = useNavigate();
        const setToLog = userSettings((state: UserSettingsType) => state.setToLog);
        const handleRedirect = async () => {
            const authorizationCode = new URLSearchParams(window.location.search).get('code');
            await fetch(`http://localhost:5000/oauth-redirect/${authorizationCode}`);
            setToLog();
            navigate('/');
        };
        useEffect(() => {
            handleRedirect().then();
        }, []);

        return (
            <div className={"mx-auto mt-3 d-flex flex-row gap-2"}>
                <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <div className={"fs-4 text-light"}>Authenticating...</div>
            </div>
        );
    }
;

export default RedirectHandler;