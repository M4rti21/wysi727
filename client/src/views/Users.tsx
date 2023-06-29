import React, {useEffect, useReducer} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {MedalInterface} from "../interfaces/MedalsInterface";
import {modeSettings, ModeSettingsType} from "../store/store";
import {ACTION_TYPES, SCORES_INITIAL_STATE, scoresReducer, USER_INITIAL_STATE, userReducer} from "../store/userReducer";
import '../interfaces/UserCardInterface'
import UserCard from "../components/user/UserCard";

interface PropsInterface {
    medals: { [key: string]: MedalInterface[] },
}

const Users = (props: PropsInterface) => {
    const navigate = useNavigate();

    const {urlUsername} = useParams();
    const {urlMode} = useParams();

    const [user, userDispatch] = useReducer(userReducer, USER_INITIAL_STATE);
    const [scores, scoresDispatch] = useReducer(scoresReducer, SCORES_INITIAL_STATE);

    const mode = modeSettings((state: ModeSettingsType) => state.mode);
    const setMode = modeSettings((state: ModeSettingsType) => state.setMode);
    const getData = async (userId: number) => {
        userDispatch({type: ACTION_TYPES.FETCH_START});
        fetch(`http://localhost:5000/usrInfo/${userId}/${mode}`)
            .then(async (data) => {
                const res = await data.json();
                console.log(res);
                userDispatch({type: ACTION_TYPES.FETCH_SUCCESS, payload: res})
            })
            .catch((err) => {
                userDispatch({type: ACTION_TYPES.FETCH_ERROR})
                console.error(err);
            })
        const pinnedScores = await getScores(userId, 'pinned');
        const firstsScores: any[] = [];
        const bestScores = await getScores(userId, 'best');
        const recentScores = await getScores(userId, 'recent')
        if (!scores.error) {
            scoresDispatch({
                type: ACTION_TYPES.FETCH_SUCCESS,
                payload: [pinnedScores, firstsScores, bestScores, recentScores]
            })
        }
    };

    const getScores = async (userId: number, thing: string) => {
        return await fetch(`http://localhost:5000/usrScores/${userId}/${thing}/${mode}`)
            .then(async (data) => {
                return await data.json();
            })
            .catch((err) => {
                console.error(err)
                scoresDispatch({type: ACTION_TYPES.FETCH_ERROR});
                return [];
            });
    }
    const getUserId = (username: string) => {
        fetch(`http://localhost:5000/getUserId/${username}`)
            .then(async (data) => {
                const userId = await data.json();
                navigate(`/users/${userId.id}/${mode}`);
            })
            .catch((err) => {
                console.error(err);
            })
    }

    useEffect(() => {
        if (urlUsername) {
            if (parseInt(urlUsername)) {
                const modes = ['osu', 'taiko', 'fruits', 'mania'];
                if (urlMode) {
                    setMode(modes.includes(urlMode) ? urlMode : mode);
                } else {
                    setMode(mode);
                }
                getData(parseInt(urlUsername));
            } else {
                getUserId(urlUsername);
            }
        }
    }, [urlUsername, urlMode]);
    return (
        <div className="row justify-content-center">
            {user.loading || scores.loading ?
                <div className="spinner-border text-light" role="status"></div>
                : user.error || scores.error ?
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        Error while trying to fetch data!
                        <button type="button" className="btn-close" data-bs-dismiss="alert"
                                aria-label="Close"></button>
                    </div>
                    : user.data && scores.data ?
                        <UserCard data={user.data}
                                  scores={scores.data}
                                  medals={props.medals} />
                        : ''}
        </div>
    );
}
export default Users;