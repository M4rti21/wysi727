import React, { useState, ChangeEvent } from "react";

const VolumeSlider: React.FC = () => {
    const [volume, setVolume] = useState<number>(50);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newVolume: number = parseInt(e.target.value, 10);
        setVolume(newVolume);
        // Perform any other volume-related actions here
    };

    return (
        <div className="volume-slider">
            <input
                type="range"
                min={0}
                max={100}
                value={volume}
                className="slider"
                onChange={handleChange}
            />
        </div>
    );
};

export default VolumeSlider;
