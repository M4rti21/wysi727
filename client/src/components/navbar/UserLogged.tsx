import React from "react";
import {userSettings, UserSettingsType} from "../../store/store";
import {Link} from "react-router-dom";

const UserLogged = () => {
    const removeUser = userSettings((state: UserSettingsType) => state.removeUser);
    const user = userSettings((state: UserSettingsType) => state.user);
    const logout = async () => {
        removeUser();
        const response = await fetch(`http://localhost:5000/logout`);
        const data = await response.json();
        console.log(data);
    }

    return (
        <div className="dropdown-left">
            <button
                className="btn btn-dark dropdown-toggle p-0 ps-2 overflow-hidden d-flex flex-row gap-2 align-items-center"
                type="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                <div>{user?.username}</div>
                <img height={36} width={36} alt={"pfp"} src={user?.img}/>
            </button>
            <ul className="dropdown-menu dropdown-menu-dark">
                <li>
                    <Link className="dropdown-item text-decoration-none" to={`/users/${user?.id}/osu`}>
                        <i className="bi bi-person me-2"></i>727 profile
                    </Link>
                </li>
                <li>
                    <a className="dropdown-item text-decoration-none" href={`https://osu.ppy.sh/users/${user?.id}`}
                       target={"_blank"}>
                        <img height={16} width={16} alt={"osu!log"}
                             src={require('../../assets/osulogo.svg').default}
                             className={"me-2"}/>osu!profile
                    </a>
                </li>
                <li>
                    <hr className="dropdown-divider"/>
                </li>
                <li>
                    <button className="dropdown-item btn rounded-0" onClick={logout}>
                        <i className="bi bi-box-arrow-right me-2"></i>Logout
                    </button>
                </li>
            </ul>
        </div>
    );
}

export default UserLogged;