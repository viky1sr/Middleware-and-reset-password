const User = require('../../models/user.model')
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')
const { randomKey } = require ('../../lib/generatorkey')
const token = randomKey(54, 'aA#')

const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(process.env.EMAIL_PASSWORD);
// const msg = {
//     to: "vikymuhamad@gmail.com",
//     from: "badakjawa0707@gmail.com",
//     subject: 'Sending with Twilio SendGrid is Fun',
//     text: 'and easy to do anywhere, even with Node.js',
//     html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// };
//
// const data = sgMail.send(msg);
// console.log(data);

class Register {
    constructor(req){
        this.sendGridMail = sgMail,

        (this.name = req.body.name),
        (this.email = req.body.email),
        (this.username = req.body.username),
        (this.phone = req.body.phone),
        (this.password = req.body.password),
        (this.password_confirmation = req.body.password_confirmation),
        (this.gender = req.body.gender),
        (this.activation_token = token)
    }

    async exec() {
        try {
            const options = {
                host: process.env.EMAIL_HOST,
                port: process.env.EMAIL_PORT,
                secure: false,
                auth: {
                    user: process.env.EMAIL_USERNAME,
                    pass: process.env.EMAIL_PASSWORD
                }
            }


            let password = bcrypt.hashSync(this.password, 6)
            console.log(`Hashing password ${password}`)

            let insert_data = {
                name: this.name,
                email: this.email,
                username: this.username,
                phone: this.phone,
                gender: this.gender,
                activation_token: this.activation_token,
                password,
            }
            //
            let query = new User(insert_data)
            await query.save()

            const sgm = this.sendGridMail;
            sgm.setApiKey(process.env.EMAIL_PASSWORD);

            const msg = {
                to: this.email,
                from: "badakjawa0707@gmail.com",
                subject: 'Activation token',
                text: "Your token activation is : " + this.activation_token,
                html: "Your token activation is : " + this.activation_token,
            };
            //SendGrid wajib di isi text dan html

            // const data= sgm.send(msg);
            // console.log(data)

            setTimeout(async () => {
                return await sgm.send(msg, (error, res) => {
                    if (error) {
                        console.log(error)
                    }
                })
            }, 600)

            return {token, expires_in: '24 hours'}
        } catch (err) {
            throw err
        }
    }
}

module.exports = Register