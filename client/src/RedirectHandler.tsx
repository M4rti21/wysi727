import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {userSettings, UserSettingsType} from "./store/store";
import axios from "axios";

const RedirectHandler = () => {
        axios.defaults.withCredentials = true;

        const navigate = useNavigate();
        const setSessionUser = userSettings((state: UserSettingsType) => state.setSessionUser);

        function handleRedirect() {
            const authorizationCode = new URLSearchParams(window.location.search).get('code');
            axios.get(`http://localhost:5000/oauth-redirect/${authorizationCode}`)
                .then((res) => {
                    if (res.data.error) {
                        console.error(res.data.msg);
                    } else if (res.data.user) {
                        console.log(res.data.user);
                        setSessionUser(res.data.user)
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
            navigate('/');
        }

        useEffect(() => {
            handleRedirect();
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