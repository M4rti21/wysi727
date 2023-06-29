import React from "react";

interface PropsInterface {
    develop: boolean
}

const DevelopBanner = (props : PropsInterface) => {
    return (
        <div className="alert alert-warning alert-dismissible fade show rounded-0 m-0"
             role="alert"
             hidden={!props.develop}>
            <i className="bi bi-exclamation-triangle me-2"></i>This website is <strong>still under
            development!</strong> Performance may not be optimal yet. Please feel free to DM me on <a
            href={"https://discord.com/users/468516101639241731"} target={"_blank"}>discord</a> if you encounter any
            problems!
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    );
}

export default DevelopBanner;