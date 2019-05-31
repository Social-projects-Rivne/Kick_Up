const sgMail = require('@sendgrid/mail');
const { User } = require('../models');

const { REDIRECT_DOMAIN } = process.env;
sgMail.setApiKey('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');

module.exports = {
  
  async sendForgotPassword(user_id) {
    const user = await User.where({ id: user_id }).fetch();
    const email = user.get('email');
    const reset_token = user.get('reset_token');
    const template = `
    <p>Hello friend</p>
    <p>For password recovery go to the link</p>
    <p><a href="${REDIRECT_DOMAIN}/sign-in?reset_token=${reset_token}">Reset Password</a></p>
    `;
    const message = {
      to: { email },
      from: process.env.SENDGRID_FROM,
      subject: 'Reset your password',
      text: 'Kick_up',
      html: `${template}`
    };
    return sgMail.send(message);
  }
};