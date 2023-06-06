import React, {useEffect, useState} from "react";
import '../interfaces/UserCardInterface'
import UserCard from "../components/UserCard";
import {User} from "../interfaces/UserCardInterface";
import {useParams} from "react-router-dom";

interface PropsInterface {
    volume: number,
    username: string,
    mode: string,
}

const Info = (props: PropsInterface) => {
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
    const getData = async () => {
        setUserData(emptyUser);
        searching = true;
        const response = await fetch(`http://localhost:5000/usrInfo/${username}/${props.mode}`);
        const newData = await response.json();
        setUserData(newData);
        searching = false;
    };
    useEffect(() => {
        getData().then();
    }, [username, props.mode]);
    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <div className="shadow">
                {searching ?
                    (
                        <div className="spinner-border" role="status">
                        </div>
                    ) : (userData.id !== undefined ?
                        (
                            <UserCard data={userData} volume={props.volume} mode={props.mode}/>
                        ) : '')}
            </div>
        </div>
    );
}
export default Info;