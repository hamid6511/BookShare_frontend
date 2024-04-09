import React from "react";

function Search() {
    return (
        <>
            <form className="form-inline my-2 my-lg-0">
                <input className="form-control -sm mr-sm-2" type="search" placeholder="Cerca un libro" aria-label="Search" style={{ width: "25%", marginTop: "10px", marginBottom: "10px" }} />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Cerca</button>
            </form>
        </>
    );
}

export default Search;
