/*
 * First-login greeting email configuration.
 *
 * This uses EmailJS so GitHub Pages does not need a backend. EmailJS keeps the
 * connected SMTP/email-service credentials on its side; only the public key,
 * service ID and template ID are used by this browser page.
 *
 * Replace the three values below with your EmailJS project values.
 */
window.MULEJOURNEY_EMAIL = {
  publicKey: 'YOUR_EMAILJS_PUBLIC_KEY',
  serviceId: 'YOUR_EMAILJS_SERVICE_ID',
  templateId: 'YOUR_EMAILJS_TEMPLATE_ID'
};
