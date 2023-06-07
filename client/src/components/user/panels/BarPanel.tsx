import React from "react";
import {ColorsType} from "../../../interfaces/ColorsInterface";
import FlagEmoji from "../FlagEmoji";

interface propsInterface {
    data: any;
    colors: ColorsType,
}

const BarPanel = (props: propsInterface) => {
    return (
        <>
            <div className="d-flex flex-row flex-wrap gap-3 align-items-center p-3" style={{
                marginBottom: -68,
                zIndex: 5,
                backgroundColor: props.colors.ui.background,
            }}>
                <div>
                    <i className="bi bi-people-fill me-2"></i> Followers: {props.data.follower_count}
                </div>
                <div>
                    <i className="bi bi-discord me-2"></i>{props.data.discord}
                </div>
                <div>
                    <i className="bi bi-twitter me-2"></i>{props.data.twitter}
                </div>
                <div>
                    <i className="bi bi-globe2 me-2"></i>{props.data.website}
                </div>
                <div>
                    <i className="bi bi-geo-alt-fill me-2"></i>{props.data.location}
                </div>
                <div>
                    <i className="bi bi-suit-heart-fill me-2"></i>{props.data.interests}
                </div>
                <div>
                    <i className="bi bi-buildings-fill me-2"></i>{props.data.occupation}
                </div>
            </div>
            <div className="m-0 p-0 col-12 shadow p-3 d-flex flex-row flex-wrap gap-3 align-items-center"
                 style={{
                     position: "sticky",
                     top: -1,
                     backgroundColor: props.colors.ui.background,
                     zIndex: 4
                 }}>
                <div className="d-flex flex-row flex-wrap gap-3 align-items-center">
                    <div className="ratio ratio-1x1 rounded-3"
                         style={{
                             backgroundImage: `url(${props.data.avatar_url})`,
                             backgroundPosition: "center",
                             backgroundSize: "cover",
                             height: 36,
                             width: 36
                         }}>
                    </div>
                    <div className={"fs-5"}>{props.data.username}</div>
                    <div>{props.data.statistics.global_rank ?
                        <>
                            <div className="d-flex flex-row align-items-center">
                                <i className="bi bi-globe2 me-2"></i>#{props.data.statistics.global_rank?.toLocaleString()}
                            </div>
                        </>
                        : ''}</div>
                    <div>{props.data.statistics.country_rank ?
                        <>
                            <div className="d-flex flex-row align-items-center">
                                <div className="d-flex flex-row align-items-center">
                                    #{props.data.statistics.rank.country?.toLocaleString()}
                                </div>
                                <div className="ms-2 h-100 d-flex align-items-center"
                                     data-tooltip-id="reactTooltip"
                                     data-tooltip-content={props.data.country.name}>
                                    <FlagEmoji size={20} code={props.data.country.code}/>
                                </div>
                            </div>
                        </>
                        : ''}
                    </div>
                    <div>
                        {Math.round(props.data.statistics.pp)?.toLocaleString()}pp
                    </div>
                    <div>
                        {props.data.statistics.hit_accuracy.toFixed(2)}%
                    </div>
                    <div>
                        {Math.round(props.data.statistics.play_time / 60 / 60)}h
                    </div>
                    <div>
                        <i className="bi bi-discord me-2"></i>{props.data.discord}
                    </div>
                    <div>
                        <i className="bi bi-twitter me-2"></i>{props.data.twitter}
                    </div>
                </div>
            </div>
        </>
    );
}
export default BarPanel;