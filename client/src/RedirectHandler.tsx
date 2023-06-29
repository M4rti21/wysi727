import React, {useEffect} from "react";
import {CompactUser, userSettings, UserSettingsType} from "./store/store";
import {useNavigate} from "react-router-dom";

const RedirectHandler = () => {
        const navigate = useNavigate();
        const setNewUser = userSettings((state: UserSettingsType) => state.setUser);

        const handleRedirect = async () => {
            const authorizationCode = new URLSearchParams(window.location.search).get('code');
            const response = await fetch(`http://localhost:5000/oauth-redirect/${authorizationCode}`);
            const newUser: CompactUser = await response.json();
            if (newUser.id) {
                setNewUser(newUser);
            }
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