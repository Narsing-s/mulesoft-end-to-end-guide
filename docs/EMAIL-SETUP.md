# MuleJourney — First-Login Greeting Email Setup ✉️

## What this does

After a learner successfully signs in or creates a local account, the portal attempts to send a welcome/greeting email to the email address entered on the login screen.

The learning portal is hosted as a static GitHub Pages site and intentionally does **not** use a custom login backend. Email delivery therefore uses the browser-based EmailJS SDK.

EmailJS documents that its browser SDK can send email without a server by connecting an email service, creating a template, and calling `emailjs.send()`. See the official documentation:

- https://www.emailjs.com/docs/
- https://www.emailjs.com/docs/sdk/installation/
- https://www.emailjs.com/docs/sdk/send/
- https://www.emailjs.com/docs/introduction/how-does-emailjs-work/

## Why the email was not arriving

The repository currently keeps the EmailJS configuration as placeholders so that private account identifiers are **not committed into the public repository**:

```js
window.MULEJOURNEY_EMAIL = {
  publicKey: 'YOUR_EMAILJS_PUBLIC_KEY',
  serviceId: 'YOUR_EMAILJS_SERVICE_ID',
  templateId: 'YOUR_EMAILJS_TEMPLATE_ID'
};
```

Until these three values are configured, login still works, but the greeting email is recorded as `not-configured` and the portal displays a clear status message.

## Configure it

### 1. Create an EmailJS account

Open the official EmailJS dashboard and create/configure an account:

https://dashboard.emailjs.com/

### 2. Add an email service

Connect the mailbox/provider that should send the greeting message.

Record the generated **Service ID**.

### 3. Create the greeting template

Create a template such as `MuleJourney Welcome`.

Use these dynamic variables because the application sends them:

```text
{{name}}
{{email}}
{{user_email}}
{{login_time}}
{{subject}}
```

Example subject:

```text
Welcome to MuleJourney, {{name}}!
```

Example message:

```text
Hi {{name}},

Welcome to MuleJourney!

Your learning session was successfully created.

You can now explore:
- Mule Runtime fundamentals
- DataWeave
- API development
- Connectors
- Error handling
- MUnit
- Deployment and CI/CD
- Production troubleshooting
- Architecture
- Interview preparation

Login time: {{login_time}}

Happy learning!

— MuleJourney
```

Set the template's recipient/to-email value so that the dynamic email address supplied by the application is used. Verify the template's variable names exactly match the variables above.

### 4. Get the EmailJS public key

EmailJS documents that the browser SDK requires the public key to identify the account.

Find it in the EmailJS account/dashboard and copy it.

### 5. Configure this repository

Edit:

`docs/email-config.js`

Replace only the three placeholders:

```js
window.MULEJOURNEY_EMAIL = {
  publicKey: 'YOUR_REAL_PUBLIC_KEY',
  serviceId: 'YOUR_REAL_SERVICE_ID',
  templateId: 'YOUR_REAL_TEMPLATE_ID'
};
```

**Do not put an EmailJS private key, SMTP password, Gmail password or other secret into this public repository.** The browser integration is designed around the public key; private credentials must remain inside the email provider/dashboard configuration.

## How the flow works

```text
User opens portal
       |
       v
   Login page
       |
       v
Successful credential check
       |
       v
Create local session
       |
       v
Load EmailJS browser SDK
       |
       v
Is EmailJS configured?
     /       \
   No         Yes
   |           |
   v           v
Record       emailjs.send()
not-configured  |
   |           v
   |       EmailJS service
   |           |
   |           v
   |       User mailbox
   |           |
   +-----+-----+
         |
         v
     Open portal
         |
         v
Show greeting-email status
```

## What the application now reports

### Sent

The login flow stores:

```json
{
  "status": "sent",
  "email": "learner@example.com"
}
```

The portal displays a welcome message confirming that the greeting email was sent.

### Not configured

If the three EmailJS values are still placeholders, the login succeeds but the portal clearly says that greeting email configuration is missing.

### Failed

If EmailJS is configured but the provider rejects the request, the login still succeeds. The portal records a `failed` status and tells the learner to check the EmailJS configuration and browser console.

This prevents an email-provider outage from locking the learner out of the educational portal.

## Testing checklist

1. Open the deployed portal.
2. Use **Create account** with an email address you can access.
3. Confirm the portal opens.
4. Check the greeting status notification.
5. Check the mailbox inbox.
6. Check Spam/Junk if it is not in Inbox.
7. Confirm the EmailJS template recipient and variables.
8. Sign out.
9. Sign in again.
10. Confirm the greeting request is attempted again and the latest status is shown.
11. Inspect the browser console if EmailJS reports an error.

EmailJS documents `emailjs.send(serviceID, templateID, templateParams, options)` for this browser flow and documents a request rate limit, so the application also uses a client-side throttle for the greeting request.

## Important architecture limitation

The repository's login remains a **local browser session**, not a real server-authenticated account system. GitHub Pages serves static files and cannot safely provide trusted server-side password authentication.

Therefore:

- do not use a real work password;
- do not store sensitive credentials;
- do not treat the local login as enterprise authentication;
- use a real identity provider/backend if production authentication is ever required.

## Official references

- EmailJS documentation: https://www.emailjs.com/docs/
- EmailJS browser installation: https://www.emailjs.com/docs/sdk/installation/
- EmailJS `send`: https://www.emailjs.com/docs/sdk/send/
- EmailJS architecture: https://www.emailjs.com/docs/introduction/how-does-emailjs-work/
- EmailJS browser SDK repository: https://github.com/emailjs-com/emailjs-sdk
