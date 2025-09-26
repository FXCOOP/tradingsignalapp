// @ts-ignore
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST!,
  port: Number(process.env.SMTP_PORT || 587),
  auth: { user: process.env.SMTP_USER!, pass: process.env.SMTP_PASS! }
});

export async function sendMagicLink(email: string, token: string){
  const url = `${process.env.APP_BASE_URL}/api/magic?token=${encodeURIComponent(token)}`;
  await transporter.sendMail({
    from: process.env.SMTP_FROM!,
    to: email,
    subject: 'Your PK Signal Pulse login link',
    html: `<p>Click to sign in: <a href="${url}">${url}</a> (valid 7 days)</p>`
  });
}

export async function sendDailyDigest(to: string, items: {title:string,url:string}[]){
  const html = `<h3>Today\'s Signals</h3><ul>${items.map(i=>`<li><a href="${i.url}">${i.title}</a></li>`).join('')}</ul>`;
  await transporter.sendMail({ from: process.env.SMTP_FROM!, to, subject: 'Today\'s Signals', html });
}