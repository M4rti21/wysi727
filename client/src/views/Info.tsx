import React, {useState} from "react";
import Input from "../components/Input";
import '../interfaces/UserCardInterface'
import UserCard from "../components/UserCard";
import {User} from "../interfaces/UserCardInterface";
import VolumeSlider from "../components/VolumeSlider";

const Info = () => {
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
    const [userScores, setUserScores] = useState<any[]>([]);
    let searching = false;
    const getData = async (username: string) => {
        setUserData(emptyUser);
        setUserScores([]);
        searching = true;
        const response = await fetch(`http://localhost:5000/usrInfo/${username}/`);
        const newData = await response.json();
        setUserData(newData);
        setUserScores(await getScores(newData.id));
        searching = false;
    };
    const getScores = async (username: User) => {
        const response = await fetch(`http://localhost:5000/usrScores/${username}/`);
        return await response.json();
    };
    return (
        <main>
            <Input onSubmit={getData}/>
            {/*<VolumeSlider/>*/}
            {searching ?
                (
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                ) : (userData.id !== undefined ?
                    (
                        <UserCard data={userData} scores={userScores}/>
                    ) : '')}
        </main>
    );
}
export default Info;