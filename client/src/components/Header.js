import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Header extends React.Component {
    renderContent() {
        switch (this.props.auth) {
            case null:
                return <li>Loading...</li>
            case false:
                return <li><a href="/api/v1/auth/google">Login with Google</a></li>
            default:
                return (
                    <li><a href="/api/v1/logout">Logout</a></li>
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
                    <ul className="right">
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