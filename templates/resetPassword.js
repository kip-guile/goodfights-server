const MailGen = require('mailgen')

module.exports = (userFullName, token) => {
  const mailGenerator = new MailGen({
    theme: 'salted',
    product: {
      name: 'Goodfights',
      link: `${process.env.CLIENT_URL}`,
      // logo: ToDo(Add logo URL)
    },
  })

  const email = {
    body: {
      name: userFullName,
      intro: 'Are you ready to start picking fights?',
      action: {
        instructions: 'Please click the button below to reset your password',
        button: {
          color: '#D21F3C',
          text: 'Reset Password',
          link: `${process.env.CLIENT_URL}/changepassword/${token}`,
        },
      },
    },
  }

  return mailGenerator.generate(email)
}
