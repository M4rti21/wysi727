import React from 'react';

interface ChildSliderProps {
    volume: number;
    onVolumeChange: (newVolume: number) => void;
}

const VolumeSlider: React.FC<ChildSliderProps> = ({volume, onVolumeChange}) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseInt(event.target.value, 10);
        onVolumeChange(newVolume);
    };
    const muteChange = () => {
        onVolumeChange(0);
    }
    return (
        <div className="d-flex flex-row align-items-center gap-2 volume-button">
            <button className="btn btn-dark" onClick={muteChange}>
                {volume === 0 ? <i className="bi bi-volume-mute"></i> :
                    volume <= 50 ? <i className="bi bi-volume-down"></i> :
                        <i className="bi bi-volume-up"></i>
                }
            </button>
            <div className="volume-slider-container">
                <div className="d-flex flex-row gap-2 align-items-center">
                    <input
                        className="volume-slider"
                        type="range"
                        min="0"
                        max="100"
                        value={volume}
                        onChange={handleChange}
                    />
                    <div>{volume}</div>
                </div>
            </div>
        </div>
    );
};

export default VolumeSlider;
