import React from "react";
import queryString from 'query-string';
import {Button} from "@mui/material";
const OsuLogin = () => {
    const login = async () => {
        const params = {
            client_id: 22795,
            redirect_uri: 'http://localhost:3000/oauth-redirect',
            response_type: 'code',
            scope: 'public', // Adjust the scope according to your requirements
        };
        const queryStringParams = queryString.stringify(params);
        window.location.href = `https://osu.ppy.sh/oauth/authorize?${queryStringParams}`;
    }
    return (
        <Button onClick={login} color="primary">
            Login with osu!
        </Button>
    );
}

export default OsuLogin;