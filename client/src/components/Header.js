import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Payments from './Payments'

class Header extends React.Component {
    renderContent() {
        switch (this.props.auth) {
            case null:
                return <li>Loading...</li>
            case false:
                return <li><a href="/api/v1/auth/google">Login with Google</a></li>
            default:
                return (
                    [
                        <li key={1}>Hello, {this.props.auth.name}</li>,
                        <li key={4} style={{ margin: "0 10px"}}>Credits: {this.props.auth.credits}</li>,
                        <li key={3}><Payments /></li>,
                        <li key={2}><a href="/api/v1/logout">Logout</a></li>,
                    ]
                )
        }
    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link to={this.props.auth ? "/surveys" : "/"} className="left brand-logo">
                        Emaily
                    </Link>
                    <ul className="right" style={{ padding: "20"}}>
                        {this.renderContent()}
                    </ul>

                </div>
            </nav>
        )
    }
}

function mapStateToProps(state) {
    return { auth: state.auth }
}

export default connect(mapStateToProps)(Header)