import React, {useState} from "react";

const Input = (props: any) => {
    const [data, setData] = useState('');
    const handleChange = (e: any) => {
        e.preventDefault();
        setData(e.target.value);
    }
    const handleSubmit = (e: any) => {
        e.preventDefault();
        props.onSubmit(data);
    }
    return (
        <>
            <form className="input-group p-3 justify-content-center" onSubmit={handleSubmit}>
                <span className="input-group-text">Username</span>
                <input type="text" className="form-control" placeholder="Username" value={data}
                       onChange={handleChange}/>
                <button className="btn btn-primary"><i className="bi bi-search"></i></button>
            </form>

        </>
    );
}
export default Input;