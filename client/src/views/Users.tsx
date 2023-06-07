import React, {useEffect, useState} from "react";
import '../interfaces/UserCardInterface'
import UserCard from "../components/user/UserCard";
import {User} from "../interfaces/UserCardInterface";
import {useParams} from "react-router-dom";
import {UserMedalsInterface} from "../interfaces/MedalsInterface";
import {scoresTypes} from "../interfaces/ScoresInterface";
import ColorPicker from "../components/navbar/ColorPicker";
import {ColorResult} from "react-color";
import {ColorsType} from "../interfaces/ColorsInterface";

interface PropsInterface {
    volume: number,
    medals: UserMedalsInterface,
    propsMode: string,
    colors: ColorsType;
    sendUsername: (currUser: string) => void;
}

const Users: React.FC<PropsInterface> = ({volume, medals, propsMode, sendUsername, colors}) => {
    const [userData, setUserData] = useState<User[]>([]);
    let searching = false;
    let {username} = useParams();
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
        setUserData([]);
        searching = true;
        const response = await fetch(`http://localhost:5000/usrInfo/${username}/${mode ? mode : propsMode}`);
        const newData = await response.json();
        setUserData([newData]);
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
        if (mode === propsMode) {
            getData().then();
        }
        sendUsername(userData[0]?.id ? userData[0].id.toString() : '');
        username = userData[0]?.id ? userData[0].id.toString() : '';
    }, [username, propsMode, mode]);
    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <div className="shadow">
                {searching ?
                    (
                        <div className="spinner-border" role="status">
                        </div>
                    ) : (userData.length > 0 ?
                        (
                            <UserCard data={userData[0]} volume={volume} mode={mode ? mode : propsMode}
                                      medals={medals} scores={userScores}
                                      username={userData[0].username ? userData[0].username : ''}
                                      colors={colors}/>
                        ) : '')}
            </div>
        </div>
    );
}
export default Users;