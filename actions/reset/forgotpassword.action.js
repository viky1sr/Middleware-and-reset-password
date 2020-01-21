const ResetPassword = require('../../models/reset.model');
const User = require('../../models/user.model');
const { randomKey } = require('../../lib/generatorkey');
// const nodemailer = require('nodemailer');
const token = randomKey(54, 'aA#');

const sgMail = require('@sendgrid/mail');

class ForgotPassword {
    constructor(req) {
        this.sendGridMail = sgMail,

        this.email = req.body.email,
        this.username = req.body.username
    }

    async exec() {
        try {
            let user = await User.findOne({
                $or: [{email: this.email}, {username: this.username}]
            }).exec()

            if(user === null) {
                throw new Error('User not found')
            }

            let password = new ResetPassword({
                $or: [{email: this.email}, {username: this.username}], token })
            await password.save()

            let get_email = await User.find()

            // const options = {
            //     host: process.env.EMAIL_HOST,
            //     port: process.env.EMAIL_PORT,
            //     secure: false,
            //     auth: {
            //         user: process.env.EMAIL_USERNAME,
            //         pass: process.env.EMAIL_PASSWORD
            //     }
            // }
            //
            // const transporter = await nodemailer.createTransport(options)
            // let request_data = {
            //     to: this.email,
            //     subject: 'Forgot Password',
            //     text: `Your token for reset password is: ${token}`,
            //     html: ''
            // }

            const sgm = this.sendGridMail;
            sgm.setApiKey(process.env.EMAIL_PASSWORD);

            const request_data = {
                to: this.email ,
                from: "vikymuhama@gmail.com",
                subject: 'Sending with Twilio SendGrid is Fun',
                text: `Token forget password : ${token} `,
                html: `Token forget password : ${token} `,
            };
            // SendGrid wajib di isi text dan html

            // const data = sgm.send(request_data);
            // console.log(data);
            // return{token, expires_in: '24 hours'}

            setTimeout(async() => {
                return await sgm.send(request_data, (error, res) => {
                    if (error) {
                        console.log(error)
                    }
                })
            }, 600)

            return {password, expires_in: '24 hours'}
        } catch (err) {
            throw err
        }

    }
}
module.exports = ForgotPassword