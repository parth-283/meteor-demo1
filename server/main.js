import { Meteor } from 'meteor/meteor';
import "../imports/api/TasksPublications";
import "../imports/api/tasksMethods";
import "../imports/api/emailMethods";
import { Accounts } from 'meteor/accounts-base';

Meteor.startup(async () => {

  Accounts.config({
    sendVerificationEmail: true,
  });

  if (Meteor.settings.private && Meteor.settings.private.MAIL_USERNAME && Meteor.settings.private.MAIL_PASSWORD && Meteor.settings.private.MAIL_SERVER && Meteor.settings.private.MAIL_PORT) {
    process.env.MAIL_URL = `smtps://${encodeURIComponent(Meteor.settings.private.MAIL_USERNAME)}:${encodeURIComponent(Meteor.settings.private.MAIL_PASSWORD)}@${Meteor.settings.private.MAIL_SERVER}:${Meteor.settings.private.MAIL_PORT}`;
  } else {
    console.error("Mail configuration is missing or incomplete in Meteor.settings.private!");
  }

  Accounts.emailTemplates.from = `${Meteor.settings.public.APP_NAME || "Your App"} <${Meteor.settings.private.MAIL_USERNAME}>`;

  Accounts.emailTemplates.verifyEmail = {
    subject(user) {
      return `Verify your email for ${Meteor.settings.public.APP_NAME || "Our App"}!`;
    },
    html(user, url) {
      let verificationUrl = `${Meteor.absoluteUrl()}verify-email/${user.services.email.verificationTokens[0].token}`
      return `
      <html><body>
        <p>Hello ${user.profile?.name || 'there'},</p>
        <p>Thank you for registering. Please verify your email by clicking the link below:</p>
        <p><a href="${verificationUrl}">Verify Email</a></p>
        <p>This link will expire.</p>
      </body></html>
    `;
    }
  };
  Accounts.emailTemplates.resetPassword = {
    subject(user) {
      return `Reset your Password email for ${Meteor.settings.public.APP_NAME || "Our App"}!`;
    },
    html(user, url) {
      let ResetUrl = `${Meteor.absoluteUrl()}reset-password/${user.services.password.reset.token}`

      return `
      <html><body>
        <p>Hello ${user.profile?.name || 'there'},</p>
        <p>To reset your password, simply click the link below.</p>
        <p><a href="${ResetUrl}">Reset Password</a></p>
        <p>Thank you.</p>
      </body></html>`;
    }
  };
});

// Accounts.onCreateUser((options, user) => {
//   user.profile = options.profile || {};
//   Accounts.sendVerificationEmail(user._id);
//   return user;
// });

// Accounts.sendResetPasswordEmail((options, user) => {
//   user.profile = options.profile || {};
//   Accounts.sendVerificationEmail(user._id);
//   return user;
// });
