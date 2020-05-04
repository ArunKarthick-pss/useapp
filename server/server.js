const axios = require('axios');
exports = {

    events: [
        { event: 'onTicketCreate', callback: 'onTicketCreateHandler' }
    ],

    onTicketCreateHandler: async function (args) {
        console.log("args", args);
        let data = args.data, iparams = args.iparams, ticket = data.ticket, requester = data.requester;
        console.log({ data });
        console.log({ iparams })
        console.log({ requester });
        let desc = ticket.description_text;
        console.log(desc);
    

            headers = {
                "Content-Type": "application/json; charset=utf-8"
            },
            apiKey = iparams.apiKey,
            domain = iparams.domain,
            options = { headers, auth: { username: `${apiKey}`, password: 'x' } };
        // if(requester.email == 'no-reply@surveypal.com'){
        // }
        let id = getTicketId({ 'value': 'ticket', 'desc': desc }), csat = getTicketId({ 'value': 'csat', 'desc': desc });
        console.log({ id });
        console.log({ csat })
        if (id && csat) {
            let csatValue = {
                '1': -103,
                '2': -102,
                '3':  100,
                '4':  102,
                '5':  103
            }, updateData = {
                "ratings": { "default_question": csatValue[csat] }
            }, url = `https://${domain}/api/v2/tickets/${id}/satisfaction_ratings`;
            console.log(csatValue[csat]);
            console.log({ updateData })
            try {
                let updateCsat = await axios.post(url, updateData, options);
                console.log({ updateCsat });
            } catch (e) {
                console.log("Error", e);
            }
        }
    }

};
getTicketId = (value) => {
    //let matches = subject.match(/\sINC\d+$/);
    let regex = value.value == 'ticket' ? /Ticket ID: ([0-9]+)/g : /Tyytyväisyys: ([0-9]+)/g;
    let key = regex.exec(value.desc);
    console.log({ key })
    return key[1]
}
