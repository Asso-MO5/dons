function donationFinancialMail({ user, donation }) {
  return {
    text: `Confirmation de votre Don

    Cher(e) ${user.name} ${user.lastname},

    Nous vous remercions chaleureusement pour votre don généreux.
    
    Détails de votre Don
    ----------------------------------
    Montant du Don: ${donation.amount} ${donation.currency_code}
    Date du Don: ${new Date(donation.create_time).toLocaleDateString()}
    Référence du Don: ${donation.id}
    
    Vous pouvez télécharger votre reçu en cliquant sur le lien suivant: ${donation.link}
    
    Merci encore pour votre soutien à notre cause.
    `,

    html: `<body style="background-color: #F2F2F2; color: #000; font-family: Arial, sans-serif; margin: 0; padding: 0;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #F2F2F2;">
        <tr>
            <td align="center">
                <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #FFF; margin: auto; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="background-color: #4088cf; color: #FFF; padding: 20px; text-align: center;">
                            <h1>MO5 | Détails de votre Don</h1>
                        </td>
                    </tr>
                    <!-- Donation Information Section -->
                    <tr>
                        <td style="padding: 20px;">
                            <h2 style="color: #d433a9;">Détails du Don</h2>
                            <p><strong>Id du don:</strong> ${donation.id}</p>
                            <p><strong>Montant:</strong> ${donation.amount} ${donation.currency_code}</p>
                            <p><strong>Votre reçu fiscal se trouve en pièce jointe</strong></p>
                            <!-- Add more donation fields as needed -->
                        </td>
                    </tr>
  
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #5bc0de; color: #FFF; padding: 20px; text-align: center;">
                            Merci pour votre générosité!
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
  </body>`,
  }
}

module.exports = {
  donationFinancialMail,
}
