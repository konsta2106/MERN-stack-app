import React from 'react'
import { reduxForm, Field } from 'redux-form'
import SurveyField from './SurveyField'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import validateEmails from '../utils/validateEmails'
import fields from './formFields'

class SurveyForm extends React.Component {
    renderFields() {
        return _.map(fields, field => {
            return <Field key={field.name} component={SurveyField} type="text" label={field.label} name={field.name} />
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                    {this.renderFields()}
                    <Link to="/surveys" className="red btn-flat white-text">
                        Cancel
                    </Link>
                    <button className="teal btn-flat right white-text" type="submit">Next<i className="material-icons right">done</i></button>
                </form>

            </div>
        )
    }
}

function validate(values) {
    const errors = {}

    errors.recipients = validateEmails(values.recipients || '')

    _.each(fields, ({ name }) => {
        if (!values[name]) {
            errors[name] = 'Missing data for required field'
        }
    })

    return errors
}

export default reduxForm({
    validate: validate,
    form: 'surveyForm',
    destroyOnUnmount: false
})(SurveyForm)