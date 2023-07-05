import React, {useEffect, useReducer} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {MedalInterface} from "../interfaces/MedalsInterface";
import {modeSettings, ModeSettingsType} from "../store/store";
import {ACTION_TYPES, SCORES_INITIAL_STATE, scoresReducer, USER_INITIAL_STATE, userReducer} from "../store/userReducer";
import '../interfaces/UserCardInterface'
import UserCard from "../components/user/UserCard";
import axios from "axios";

interface PropsInterface {
    medals: any;
    medalsSorted: { [key: string]: MedalInterface[] },
}

const Users = (props: PropsInterface) => {
    //axios.defaults.withCredentials = true;

    const navigate = useNavigate();

    const {urlUsername} = useParams();
    const {urlMode} = useParams();

    const [searchUser, searchUserDispatch] = useReducer(userReducer, USER_INITIAL_STATE);
    const [scores, scoresDispatch] = useReducer(scoresReducer, SCORES_INITIAL_STATE);

    const mode = modeSettings((state: ModeSettingsType) => state.mode);
    const setMode = modeSettings((state: ModeSettingsType) => state.setMode);
    const getData = async (userId: number, mode: string) => {
        searchUserDispatch({type: ACTION_TYPES.FETCH_START});
        axios.get(`http://localhost:5000/usrInfo/${userId}/${mode}`)
            .then((res) => {
                searchUserDispatch({type: ACTION_TYPES.FETCH_SUCCESS, payload: res.data})
            })
            .catch((err) => {
                searchUserDispatch({type: ACTION_TYPES.FETCH_ERROR})
                console.error(err);
            })
        const pinnedScores = await getScores(userId, 'pinned', mode);
        const firstsScores: any[] = [];
        const bestScores = await getScores(userId, 'best', mode);
        const recentScores = await getScores(userId, 'recent', mode)
        if (!scores.error) {
            scoresDispatch({
                type: ACTION_TYPES.FETCH_SUCCESS,
                payload: [pinnedScores, firstsScores, bestScores, recentScores]
            })
        }
    };

    function getScores(userId: number, thing: string, mode: string) {
        return axios.get(`http://localhost:5000/usrScores/${userId}/${thing}/${mode}`)
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                console.error(err)
                scoresDispatch({type: ACTION_TYPES.FETCH_ERROR});
                return [];
            });
    }

    const getUserId = (username: string) => {
        axios.get(`http://localhost:5000/getUserId/${username}`)
            .then((res) => {
                const userId = res.data;
                navigate(`/users/${userId.id}/${mode}`);
            })
            .catch((err) => {
                console.error(err);
            })
    }

    useEffect(() => {
        if (urlUsername) {
            if (parseInt(urlUsername)) {
                const modes: string[] = ['osu', 'taiko', 'fruits', 'mania'];
                let newMode: string;
                if (urlMode && modes.includes(urlMode)) {
                    newMode = urlMode;
                } else {
                    newMode = mode;
                }
                setMode(newMode);
                getData(parseInt(urlUsername), newMode).then();
            } else {
                getUserId(urlUsername);
            }
        }
    }, [urlUsername, urlMode]);
    return (
        <div className="row justify-content-center">
            {searchUser.loading || scores.loading ?
                <div className="spinner-border text-light" role="status"></div>
                : searchUser.error || scores.error ?
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        Error while trying to fetch data!
                        <button type="button" className="btn-close" data-bs-dismiss="alert"
                                aria-label="Close"></button>
                    </div>
                    : searchUser.data !== undefined && scores.data ?
                        <UserCard data={searchUser.data}
                                  scores={scores.data}
                                  medals={props.medals}
                                  medalsSorted={props.medalsSorted}/>
                        : ''}
        </div>
    );
}
export default Users;