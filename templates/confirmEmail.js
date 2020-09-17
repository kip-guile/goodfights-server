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
        instructions: 'Please click the button below to verify your account',
        button: {
          color: '#D21F3C',
          text: 'Verify account',
          link: `${process.env.BACKEND_URL}/auth/resetpassword/${token}`,
        },
      },
    },
  }

  return mailGenerator.generate(email)
}
