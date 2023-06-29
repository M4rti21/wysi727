import React, {useEffect} from "react";
import {ParallaxBanner} from "react-scroll-parallax";
import FlagEmoji from "../FlagEmoji";
import {Radar} from "react-chartjs-2";
import {ColorSettingsType, colorsSettings} from "../../../store/store";
import {useColor} from 'color-thief-react';


interface propsInterface {
    data: any;
    skillsData: any,
    skillsOptions: any,
    firstCountryLog: string,
    playtime: string
}

const TopPanel = (props: propsInterface) => {
    const colors = colorsSettings((state: ColorSettingsType) => state.colors);
    const setMain = colorsSettings((state: ColorSettingsType) => state.setMain);
    const avatarUrl = `http://localhost:5000/image/${props.data.id}/${props.data.avatar_url?.split('?')[1]?.split('.')[0]}`;
    const {data, loading, error} = useColor(avatarUrl, "hex", {crossOrigin: "use-credentials", quality: 10})
    useEffect(() => {
        if (data) {
            setMain(data);
        }
    }, [data]);
    return (
        <div className="topPanel m-0 p-0 col-12" style={{position: "relative"}}>
            <ParallaxBanner layers={
                [{
                    image: props.data.cover_url,
                    speed: -18,
                }]} style={{width: "100%", height: "100%", overflow: "hidden"}}>
                <div className="h-100 w-100"
                     style={{backdropFilter: "brightness(40%) blur(4px)", color: '#f5f5f5'}}>
                    <div className="row pt-3" style={{overflow: "hidden"}}>
                        <div className="col-12 col-lg-3 p-3">
                            <img className="ratio ratio-1x1 rounded-5 mx-auto d-block"
                                 src={props.data.avatar_url}
                                 alt={'pfp'}
                                 style={{
                                     height: 200,
                                     width: 200
                                 }}>
                            </img>
                            <div className="mt-2">
                                <a data-tooltip-id={props.data.previous_usernames?.length > 0 ? "reactTooltip" : ""}
                                   data-tooltip-content={`A.K.A: ${props.data.previous_usernames?.join(', ')}`}
                                   className="d-block text-center fs-3 mb-2 text-align-center text-decoration-none text-light"
                                   href={`https://osu.ppy.sh/users/${props.data.id}`} target="_blank"
                                   rel="noreferrer">
                                    {props.data.username}
                                </a>
                            </div>
                            <div className="level d-flex flex-row align-items-center gap-3 px-4">
                                <h6 className="p-0 m-0">lvl {props.data.statistics?.level.current}</h6>
                                <div className="flex-grow-1 overflow-hidden rounded-pill p-0 mt-1"
                                     style={{
                                         height: 5,
                                         backgroundColor: colors.ui.main + '66',
                                         outline: '1px solid #ffffff22'
                                     }}>
                                    <div style={{
                                        width: `${props.data.statistics?.level.progress}%`,
                                        height: 5,
                                        backgroundColor: colors.ui.main
                                    }}>
                                    </div>
                                </div>
                                <h6 className="p-0 m-0">{props.data.statistics?.level.progress}%</h6>
                            </div>
                        </div>
                        <div className="col-12 col-lg-2 p-3">
                            <div className="fs-1 d-flex flex-row align-items-center"
                                 data-tooltip-id="reactTooltip"
                                 data-tooltip-content={`Peak Rank:#${props.data?.rank_highest?.rank?.toLocaleString()}`}>
                                <i className="bi bi-globe2 me-2 fs-2"></i>#{props.data.statistics?.global_rank?.toLocaleString()}
                            </div>
                            <div>
                                <div className="fs-2 d-flex flex-row align-items-center">
                                    <div className="d-flex flex-row align-items-center"
                                         data-tooltip-id="reactTooltip"
                                         data-tooltip-content={`Peak Country Rank: #${props.data.db_info?.country_rank?.length ?
                                             props.data.db_info?.country_rank.reduce((prev: any, current: any) => {
                                                 return (prev?.rank > current?.rank) ? prev : current;
                                             })?.rank : ''} (started logging in ${props.firstCountryLog})`}>
                                        {props.data.country?.code &&
                                            <img width="32" className="countryIco me-2" alt="ico"
                                                 src={require(`../../../assets/countries/${props.data.country?.code.toLowerCase()}/vector.svg`)}/>}
                                        #{props.data.statistics?.rank.country?.toLocaleString()}
                                    </div>
                                    <div className="ms-2 h-100 d-flex align-items-center"
                                         data-tooltip-id="reactTooltip"
                                         data-tooltip-content={props.data.country?.name && props.data.country.name}>
                                        {props.data.country?.code &&
                                            <FlagEmoji size={32} code={props.data.country.code}/>}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div>Performance:</div>
                                <div
                                    className="fs-4">{Math.round(props.data.statistics?.pp)?.toLocaleString()}pp
                                </div>
                            </div>
                            <div>
                                <div>Accuracy:</div>
                                <div className="fs-4">
                                    {props.data.statistics?.hit_accuracy.toFixed(2)}%
                                </div>
                            </div>
                            <div>
                                <div>Medals:</div>
                                <div className="fs-5">
                                    {props.data.user_achievements?.length}<i
                                    className="bi bi-award-fill ms-2"></i>
                                </div>
                            </div>
                        </div>
                        <div style={{zIndex: 8, margin: "-40px 0 -50px", height: 400, width: 400}}
                             className="col-12 col-lg-auto position-relative mx-auto d-flex align-items-center">
                            <i className="bi bi-info-circle position-absolute"
                               style={{top: 120, right: 30}}
                               data-tooltip-id="reactTooltip"
                               data-tooltip-content={`This chart uses a subjective formula which should not be taken as an actual metric`}></i>
                            <Radar data={props.skillsData} options={props.skillsOptions} height={400} width={400}/>
                        </div>
                        <div className="col-12 col-lg-2 p-3 d-flex flex-column gap-3">
                            <div>
                                <div>
                                    <i className="bi bi-chevron-double-up me-2"></i>Ranked Score:
                                </div>
                                <div className="fs-5 ms-4"
                                     data-tooltip-id="reactTooltip"
                                     data-tooltip-content={`Total Score: ${props.data.statistics?.total_score.toLocaleString()}`}>
                                    {props.data.statistics?.ranked_score.toLocaleString()}
                                </div>
                            </div>
                            <div>
                                <div>
                                    <i className="bi bi-1-circle me-2"></i>Max Combo:
                                </div>
                                <div className="fs-5 ms-4">{props.data.statistics?.maximum_combo}x</div>
                            </div>
                            <div>
                                <div>
                                    <i className="bi bi-clock me-2"></i>Play Time:
                                </div>
                                <div className="fs-5 ms-4"
                                     style={{width: "min-content"}}
                                     data-tooltip-id="reactTooltip"
                                     data-tooltip-content={props.playtime}>
                                    {Math.round(props.data?.statistics?.play_time / 60 / 60)}h
                                </div>
                            </div>
                            <div>
                                <div>
                                    <i className="bi bi-arrow-counterclockwise me-2"></i>Play Count:
                                </div>
                                <div className="fs-5 ms-4">
                                    {props.data.statistics?.play_count?.toLocaleString()}
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