import React from "react";
import {ItemsEntity} from "../../interfaces/ScoresInterface";
import {ColorSettingsType, colorsSettings} from "../../store/store";
import {ParallaxBanner} from "react-scroll-parallax";

interface propsInterface {
    data: ItemsEntity;
    num: number,
}

const ScoreModal = (props: propsInterface) => {
    const colors = colorsSettings((state: ColorSettingsType) => state.colors);
    return (
        <div className="modal fade" id={`modal-${props.num}`}
             aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="overflow-hidden rounded-4"
                     style={{
                         color: '#ffffff',
                         backgroundColor: '#00000000',
                         backgroundPosition: "center",
                         backgroundSize: "cover"
                     }}>
                    <ParallaxBanner
                        layers={[
                            {
                                image: props.data.beatmapset.covers["cover@2x"],
                                speed: 0,
                            }]}>
                        <div style={{backdropFilter: "brightness(40%) blur(4px)"}} className="p-3">
                            <div className="d-flex flex-row">
                                <div className="d d-flex flex-row flex-wrap gap-2 align-items-center">
                                    <div className="fs-4">{props.data.beatmapset.title}</div>
                                    <div className="fs-6">by {props.data.beatmapset.artist}</div>
                                    <div className="fs-6">[{props.data.beatmap.version}]
                                        - {props.data.beatmapset.creator}</div>
                                </div>
                                <button type="button" className="btn btn-outline-light"
                                        data-bs-dismiss="modal">
                                    <i className="bi bi-x-lg"></i>
                                </button>
                            </div>
                            <div className="modal-body">
                                ...
                            </div>
                        </div>
                    </ParallaxBanner>
                </div>
            </div>
        </div>
    );
}
export default ScoreModal;