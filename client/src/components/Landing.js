import React from 'react'
import { Link } from 'react-router-dom'

class Landing extends React.Component {
    render() {
        return (
            <div style={{ textAlign: "center"}}>
                <Link to={"/surveys"}><h1>Surveys</h1></Link>
            </div>
        )
    }
}

export default Landing