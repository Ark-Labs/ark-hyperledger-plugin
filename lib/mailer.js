var nodemailer = require('nodemailer');

module.exports = {
    transporter: nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'your-email@gmail.com',
          pass: ''
        }
    }),
    
    sendEmail: function(from, to, subject, text) {
        var mailOptions = {
            from: from,
            to: to,
            subject: subject,
            html: text
        };
        
        this.transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });      
    }
};