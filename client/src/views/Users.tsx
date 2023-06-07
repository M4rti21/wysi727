import React, {useEffect, useState} from "react";
import '../interfaces/UserCardInterface'
import UserCard from "../components/UserCard";
import {User} from "../interfaces/UserCardInterface";
import {useParams} from "react-router-dom";
import {UserMedalsInterface} from "../interfaces/MedalsInterface";
import {scoresTypes} from "../interfaces/ScoresInterface";

interface PropsInterface {
    volume: number,
    medals: UserMedalsInterface,
    propsMode: string,
    sendUsername: (currUser: string) => void;
}

const Users: React.FC<PropsInterface> = ({volume, medals, propsMode, sendUsername}) => {
    const emptyUser: User = {
        account_history: undefined,
        active_tournament_banner: undefined,
        avatar_url: undefined,
        badges: undefined,
        country: undefined,
        country_code: undefined,
        cover: undefined,
        cover_url: undefined,
        default_group: undefined,
        discord: undefined,
        favourite_beatmapset_count: undefined,
        follower_count: undefined,
        graveyard_beatmapset_count: undefined,
        groups: undefined,
        has_supported: undefined,
        id: undefined,
        interests: undefined,
        is_active: undefined,
        is_bot: undefined,
        is_deleted: undefined,
        is_online: undefined,
        is_restricted: undefined,
        is_supporter: undefined,
        join_date: undefined,
        kudosu: undefined,
        last_visit: undefined,
        location: undefined,
        loved_beatmapset_count: undefined,
        max_blocks: undefined,
        max_friends: undefined,
        monthly_playcounts: undefined,
        occupation: undefined,
        page: undefined,
        pending_beatmapset_count: undefined,
        playmode: undefined,
        playstyle: undefined,
        pm_friends_only: false,
        post_count: 0,
        previous_usernames: undefined,
        profile_colour: "",
        profile_order: undefined,
        rank_history: undefined,
        ranked_beatmapset_count: undefined,
        replays_watched_counts: undefined,
        scores_first_count: undefined,
        statistics: undefined,
        support_level: undefined,
        title: undefined,
        twitter: undefined,
        user_achievements: undefined,
        username: undefined,
        website: undefined
    }
    const [userData, setUserData] = useState<User>(emptyUser);
    let searching = false;
    const {username} = useParams();
    let {mode} = useParams();
    const [userScores, setUserScores] = useState<scoresTypes>({
        best: {
            items: [],
            pagination: {
                hasMore: false
            },
            count: 0
        },
        firsts: {
            items: [],
            pagination: {
                hasMore: false
            },
            count: 0
        },
        pinned: {
            items: [],
            pagination: {
                hasMore: false
            },
            count: 0
        },
        recent: {
            items: [],
            pagination: {
                hasMore: false
            },
            count: 0
        }
    });
    const getData = async () => {
        setUserData(emptyUser);
        searching = true;
        const response = await fetch(`http://localhost:5000/usrInfo/${username}/${mode ? mode : propsMode}`);
        const newData = await response.json();
        setUserData(newData);
        getNewScores(newData.id).then(() => searching = false);
        console.log(newData)
    };

    async function getScores(thing: string, userId: number) {
        const response = await fetch(`http://localhost:5000/usrScores/${userId}/${thing}/${mode ? mode : propsMode}`);
        return await response.json();
    }
    const getNewScores = async (userId: number) => {
        const newScores: scoresTypes = {
            best: {
                items: [],
                pagination: {
                    hasMore: false
                },
                count: 0,
            },
            firsts: {
                items: [],
                pagination: {
                    hasMore: false
                },
                count: 0,
            },
            pinned: {
                items: [],
                pagination: {
                    hasMore: false
                },
                count: 0,
            },
            recent: {
                items: [],
                pagination: {
                    hasMore: false
                },
                count: 0,
            }
        };
        setUserScores(newScores);
        newScores.pinned.items = await getScores('pinned', userId);
        //newScores.firsts.items = await getScores('firsts', userId);
        newScores.firsts.items = [];
        newScores.best.items = await getScores('best', userId);
        newScores.recent.items = await getScores('recent', userId);
        setUserScores(newScores);
    }
    useEffect(() => {
        sendUsername(username ? username : '');
        if (mode === propsMode) {
            getData().then();
        }
    }, [username, propsMode, mode]);
    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <div className="shadow">
                {searching ?
                    (
                        <div className="spinner-border" role="status">
                        </div>
                    ) : (userData.id !== undefined ?
                        (
                            <UserCard data={userData} volume={volume} mode={mode ? mode : propsMode}
                                      medals={medals} scores={userScores}
                                      username={userData.username ? userData.username : ''}/>
                        ) : '')}
            </div>
        </div>
    );
}
export default Users;