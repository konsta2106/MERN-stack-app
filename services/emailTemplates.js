module.exports = (survey) => {
    return `
    <html>
        <body>
            <div style="text-align: center;">
                <h3>I would like your input!</h3>
                <p>PLease answer the following question:</p>
                <p>${survey.body}</p>
                <div>
                    <a href="${process.env.REDIRECT_DOMAIN}api/v1/surveys/${survey.id}/yes">Yes</a>
                </div>
                <div>
                    <a href="${process.env.REDIRECT_DOMAIN}api/v1/surveys/${survey.id}/no">No</a>
                </div>
            </div>
        </body>
    </html>
    `
}