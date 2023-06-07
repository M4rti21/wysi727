import React from "react";
import {ColorsType} from "../../../interfaces/ColorsInterface";
import {ParallaxBanner} from "react-scroll-parallax";
import FlagEmoji from "../FlagEmoji";
import {Radar} from "react-chartjs-2";

interface propsInterface {
    data: any;
    colors: ColorsType,
    skillsData: any,
    skillsOptions: any,
    firstCountryLog: string,
    playtime: string
}

const TopPanel = (props: propsInterface) => {
    return (
        <div className="topPanel m-0 p-0 col-12" style={{overflow: "hidden", position: "relative"}}>
            <ParallaxBanner layers={
                [{
                    image: props.data.cover_url,
                    speed: -18
                }]} style={{width: "100%", height: "100%"}}>
                <div className="h-100 w-100"
                     style={{backdropFilter: "brightness(40%) blur(4px)", color: '#f5f5f5'}}>
                    <div className="d-flex flex-row justify-content-start">
                        <div className="p-3">
                            <div className="ratio ratio-1x1 rounded-5"
                                 style={{
                                     backgroundImage: `url(${props.data.avatar_url})`,
                                     backgroundPosition: "center",
                                     backgroundSize: "cover",
                                     height: 200,
                                     width: 200
                                 }}>
                            </div>
                            <div className="mt-2">
                                <a data-tooltip-id={props.data.previous_usernames.length > 0 ? "reactTooltip" : ""}
                                   data-tooltip-content={`A.K.A: ${JSON.stringify(props.data.previous_usernames).substring(1, JSON.stringify(props.data.previous_usernames).length - 1).replace(/"/g, '')}`}
                                   className="d-block text-center fs-3 mb-2 text-align-center text-decoration-none text-light"
                                   href={`https://osu.ppy.sh/users/${props.data.id}`} target="_blank"
                                   rel="noreferrer">
                                    {props.data.username}
                                </a>
                            </div>
                            <div className="level d-flex flex-row align-items-center gap-3">
                                <h6 className="p-0 m-0">lvl {props.data.statistics.level.current}</h6>
                                <div className="flex-grow-1 overflow-hidden rounded-pill p-0 m-0"
                                     style={{height: 5, backgroundColor: props.colors.charts.skills + '66'}}>
                                    <div style={{
                                        width: `${props.data.statistics.level.progress}%`,
                                        height: 5,
                                        backgroundColor: props.colors.charts.skills
                                    }}>
                                    </div>
                                </div>
                                <h6 className="p-0 m-0">{props.data.statistics.level.progress}%</h6>
                            </div>
                        </div>
                        <div className="p-3">
                            <div className="fs-1 d-flex flex-row align-items-center"
                                 data-tooltip-id="reactTooltip"
                                 data-tooltip-content={`Peak Rank:#${props.data.rank_highest.rank?.toLocaleString()}`}>
                                <i className="bi bi-globe2 me-2 fs-2"></i>#{props.data.statistics.global_rank?.toLocaleString()}
                            </div>
                            <div>
                                <div className="fs-2 d-flex flex-row align-items-center">
                                    <div className="d-flex flex-row align-items-center"
                                         data-tooltip-id="reactTooltip"
                                         data-tooltip-content={`Peak Country Rank: #${props.data.db_rank_history.country_rank.length ?
                                             props.data.db_rank_history.country_rank.reduce((prev: any, current: any) => {
                                                 return (prev.rank > current.rank) ? prev : current;
                                             }).rank : ''} (started logging in ${props.firstCountryLog})`}>
                                        <img width="32" className="countryIco me-2" alt="ico"
                                             src={require(`../../../assets/countries/${props.data.country.code.toLowerCase()}/vector.svg`)}/>
                                        #{props.data.statistics.rank.country?.toLocaleString()}
                                    </div>
                                    <div className="ms-2 h-100 d-flex align-items-center"
                                         data-tooltip-id="reactTooltip"
                                         data-tooltip-content={props.data.country.name}>
                                        <FlagEmoji size={32} code={props.data.country.code}/>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div>Performance:</div>
                                <div
                                    className="fs-4">{Math.round(props.data.statistics.pp)?.toLocaleString()}pp
                                </div>
                            </div>
                            <div>
                                <div>Accuracy:</div>
                                <div className="fs-4">
                                    {props.data.statistics.hit_accuracy.toFixed(2)}%
                                </div>
                            </div>
                            <div>
                                <div>Medals:</div>
                                <div className="fs-5">
                                    {props.data.user_achievements.length}<i
                                    className="bi bi-award-fill ms-2"></i>
                                </div>
                            </div>
                        </div>
                        <div style={{marginTop: -100, marginBottom: -100, zIndex: 4}}
                             className="position-relative mx-auto d-flex align-items-center">
                            <i className="bi bi-info-circle position-absolute"
                               style={{top: 120, right: 30}}
                               data-tooltip-id="reactTooltip"
                               data-tooltip-content={`This chart uses a subjective formula which should not be taken as an actual metric`}></i>
                            <Radar data={props.skillsData} options={props.skillsOptions} height={400} width={400}/>
                        </div>
                        <div className="p-3 d-flex flex-column gap-3">
                            <div>
                                <div>
                                    <i className="bi bi-chevron-double-up me-2"></i>Ranked Score:
                                </div>
                                <div className="fs-5 ms-4"
                                     data-tooltip-id="reactTooltip"
                                     data-tooltip-content={`Total Score: ${props.data.statistics.total_score.toLocaleString()}`}>
                                    {props.data.statistics.ranked_score.toLocaleString()}
                                </div>
                            </div>
                            <div>
                                <div>
                                    <i className="bi bi-1-circle me-2"></i>Max Combo:
                                </div>
                                <div className="fs-5 ms-4">{props.data.statistics.maximum_combo}x</div>
                            </div>
                            <div>
                                <div>
                                    <i className="bi bi-clock me-2"></i>Play Time:
                                </div>
                                <div className="fs-5 ms-4"
                                     style={{width: "min-content"}}
                                     data-tooltip-id="reactTooltip"
                                     data-tooltip-content={props.playtime}>
                                    {Math.round(props.data.statistics.play_time / 60 / 60)}h
                                </div>
                            </div>
                            <div>
                                <div>
                                    <i className="bi bi-arrow-counterclockwise me-2"></i>Play Count:
                                </div>
                                <div className="fs-5 ms-4">
                                    {props.data.statistics.play_count?.toLocaleString()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ParallaxBanner>
        </div>
    );
}
export default TopPanel;