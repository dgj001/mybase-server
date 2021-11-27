const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

// Example usage:
// new Email(user, url).sendWelcome();

module.exports = class Email {
    constructor(user, url) {
        this.to = user.email;
        this.firstName = user.name ? user.name.split(' ')[0] : 'Anon';
        this.url = url;
        this.from = `Dustin Johnson <${process.env.EMAIL_FROM}>`;
    }

    newTransport() {
        // if (process.env.NODE_ENV === 'production') {
            // Sendgrid
            return nodemailer.createTransport({
                service: 'SendGrid',
                auth: {
                    user: process.env.SENDGRID_USERNAME,
                    pass: process.env.SENDGRID_PASSWORD
                }
            });
        // } else {
        //     return nodemailer.createTransport({
        //         host: process.env.EMAIL_HOST,
        //         port: process.env.EMAIL_PORT,
        //         auth: {
        //             user: process.env.EMAIL_USERNAME,
        //             pass: process.env.EMAIL_PASSWORD
        //         }
        //     });

        // }
    }

    // Send the actual email
    async send(template, subject) {
        // Render HTML based on a pug template
        const tempFile = `${__dirname}/../views/email/${template}.pug`;
        const html = pug.renderFile(tempFile, {
            firstName: this.firstName,
            url: this.url,
            subject
        });

        // Define email options
        const mailOptions = {
            from: this.from,
            to: this.to,
            subject,
            html,
            text: htmlToText.fromString(html)
        }

        // Create a transport and send email
        await this.newTransport().sendMail(mailOptions);
    }

    async sendWelcome() {
        await this.send('welcome', 'Welcome to VRpatients!');
    }

    async sendPasswordReset() {
        await this.send('passwordReset', 'Your password reset token (valid for only 10 minutes)');
    }
}
