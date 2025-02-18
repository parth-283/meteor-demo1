import { Meteor } from 'meteor/meteor';
import "../imports/api/TasksPublications";
import "../imports/api/tasksMethods";
import "../imports/api/emailMethods";
import { Accounts } from 'meteor/accounts-base';

Meteor.startup(async () => {
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
      return `
      <html><body>
        <p>Hello ${user.profile?.name || 'there'},</p>
        <p>Thank you for registering. Please verify your email by clicking the link below:</p>
        <p><a href="${url}">Verify Email</a></p>
        <p>This link will expire.</p>
      </body></html>
    `;
    },
    text(user, url) {
      return `Hello ${user.profile?.name || 'there'},

      Thank you for registering. Please verify your email by clicking the link below:

      ${url}

      This link will expire.`;
    }
  };

});

Accounts.onCreateUser((options, user) => {
  user.profile = options.profile || {};

  Meteor.setTimeout(() => {
    Accounts.sendVerificationEmail(user._id);
  }, 1000);

  return user;
});
