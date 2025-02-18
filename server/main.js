import { Meteor } from 'meteor/meteor';
import "../imports/api/TasksPublications";
import "../imports/api/tasksMethods";
import "../imports/api/emailMethods";
import { Accounts } from 'meteor/accounts-base';

Meteor.startup(async () => {
  process.env.MAIL_URL = "smtp://parth@sourcenettechnology.in:Parth@123@smtp.hostinger.com:587"

  Accounts.emailTemplates.verifyEmail = {
    subject() {
      return 'Verify Your Email Address';
    },
    text(user, url) {
      return `Hello ${user.profile.firstName},\n\n` +
        `Please verify your email by clicking this link:\n\n${url}`;
    }
  };

});

Accounts.onCreateUser((options, user) => {
  user.profile = options.profile || {};

  console.log(user, "USERS@@@@@@@@@@@@@@@@@@@@");

  // Send verification email
  Meteor.setTimeout(() => {
    Accounts.sendVerificationEmail(user._id);
  }, 2000); // Optional delay for demonstration purposes

  return user;
});
