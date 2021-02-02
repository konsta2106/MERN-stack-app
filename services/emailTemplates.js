module.exports = (survey) => {
    return `
    <html>
        <body>
            <div style="text-align: center;">
                <h3>I would like your input!</h3>
                <p>PLease answer the following question:</p>
                <p>${survey.body}</p>
                <div>
                    <a href="${process.env.REDIRECT_DOMAIN}/api/v1/surveys/feedback">Yes</a>
                </div>
                <div>
                    <a href="${process.env.REDIRECT_DOMAIN}/api/v1/surveys/feedback">No</a>
                </div>
            </div>
        </body>
    </html>
    `
}