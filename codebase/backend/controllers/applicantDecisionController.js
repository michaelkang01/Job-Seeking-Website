const nodemailer = require("nodemailer");
const ical = require('ical-generator');
const Application = require("../models/Application");
import { useAuth } from '../context/AuthContext';

var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "ezapplyrecruiter@gmail.com",
        pass: "Mockpasswrd123"
    }
});

function getIcalObjectInstance(starttime, endtime, summary, description, location, url, name, email) {
    const cal = ical({ domain: "localhost", name: 'Interview invite' });
    cal.domain("localhost");
    cal.createEvent({
        start: starttime,         // eg : moment([2021,10,28]).add(10, 'hours');
        end: endtime,             // eg : moment([2021,10,28]).add(11, 'hours');
        summary: summary,         // 'Interview for X position'
        description: description, // 'Interview will be at most 1 hour'
        location: location,       // 'Toronto'
        url: url,                 // 'event url'
        organizer: {              // 'organizer details'
            name: name,
            email: email
        },
    });
    return cal;
}

async function sendemail(sendto, subject, htmlbody, calendarObj = null) {
    mailOptions = {
        to: sendto,
        subject: subject,
        html: htmlbody
    }
    if (calendarObj) {
        let alternatives = {
            "Content-Type": "text/calendar",
            "method": "REQUEST",
            "content": Buffer.from(calendarObj.toString()),
            "component": "VEVENT",
            "Content-Class": "urn:content-classes:calendarmessage"
        }
        mailOptions['alternatives'] = alternatives;
        mailOptions['alternatives']['contentType'] = 'text/calendar'
        mailOptions['alternatives']['content'] = new Buffer.from(calendarObj.toString())
    }
    smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
        } else {
            console.log("Message sent: ", response);
        }
    })
}

const rejectApplicantRoute = (router, Application) => {
    router.post("/recruiter/reject", [verifyUser], function (req, res) {
        const { applicantEmail } = req.body;
        var authData = res.locals.authData;
        
            htmlBody = `<h1>Application Decision</h1> <body>We regret to inform you that you have not been selected for an interview. 
                           You are encouraged to apply again in the future.</body>`;
        subject = `An update regarding your application`;
        try {
            sendemail(applicantEmail, subject, htmlBody);
            Application.deleteOne({ email: applicantEmail });
            res.status(201);
        } catch (error) {
            res.status(409);
        }
        console.log(req);

    });
};

const acceptApplicantRoute = (router, Application) => {
    router.post("/recruiter/accept", [verifyUser], function (req, res) {
        const { applicantEmail, companyName, start } = req.body;
        subject = `Congratulations, you have been invited to an interview at ${companyName}`;
        const htmlBody = `<h1>Interview Invite</h1> <body>We are pleased to inform you that you have been selected for an interview at ${companyName}. 
                           Please find all relevant details regarding the interview in the ics file attached.</body>`;

        // initialize params for ics file generation
        starttime = start;
        endtime = moment([2021, 10, 28]).add(11, 'hours'); // to be changed
        summary = `This is a calendar invite for an online interview at ${companyName}`; // use authdata/ form data in es6 expression
        description = "Please arrive at the time specified in the invite";
        location = "Zoom";
        email = "ezapplyrecruiter@gmail.com";
        icsObj = getIcalObjectInstance(starttime, endtime, summary, description, location, url, email);

        try {
            sendemail(applicantEmail, subject, htmlBody, icsObj);
            Application.deleteOne({ email: applicantEmail }); // should applicant record be kept until after the interview so unsuccessful interviewees can be rejected?
            res.status(201);
        } catch (error) {
            res.status(409);
        }
        console.log(req);

    });
};

module.exports = { rejectApplicantRoute, acceptApplicantRoute };