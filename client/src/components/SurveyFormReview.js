import React from 'react'
import { connect } from 'react-redux'
import fields from './formFields'
import _ from 'lodash'
import * as actions from '../actions'
import { withRouter } from 'react-router-dom'

const SurveyReview = (props) => {
    const reviewFields = _.map(fields, field => {
        return (
            <div>
                <label key={field.label}>{field.label}</label>
                <div key={props.formValues[field.name]}>{props.formValues[field.name]}</div>
            </div>
        )
    })

    return (
        <div>
            <h1>Review component</h1>
            {reviewFields}
            <button 
            className="yellow white-text darken-3 btn-flat"
            onClick={props.onCancel}
            >
                Cancel
            </button>
            <button 
            className="green right btn-flat white-text"
            onClick={() => props.submitSurvey(props.formValues, props.history)}
            >
            Send Survey
            <i className="material-icons right">email</i>
            </button>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        formValues: state.form.surveyForm.values
    }
}

export default connect(mapStateToProps, actions)(withRouter(SurveyReview))