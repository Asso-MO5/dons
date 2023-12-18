function gearSubmitMail({ user, donation }) {
  return {
    text: `DON MATERIEL

    Information de l'utilisateur
    ----------------------------------
    Nom: ${user.name}
    Prénom: ${user.lastname}
    Email: ${user.email}
    ${user.phone ? `Téléphone: ${user.phone}` : ""}
    Adresse: ${user.address ? user.address : "N/A"}
    Code Postal: ${user.postal_code ? user.postal_code : "N/A"}
    Ville: ${user.city ? user.city : "N/A"}
    
    Détails du Don
    ----------------------------------
    Id du don: ${donation.id}
    Message: ${donation.message}
    
    Merci pour votre générosité!
    `,
    html: `<body style="background-color: #F2F2F2; color: #000; font-family: Arial, sans-serif; margin: 0; padding: 0;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #F2F2F2;">
        <tr>
            <td align="center">
                <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #FFF; margin: auto; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="background-color: #4088cf; color: #FFF; padding: 20px; text-align: center;">
                            <h1>MO5 | DON MATERIEL</h1>
                        </td>
                    </tr>
  
                    <!-- User Information Section -->
                    <tr>
                        <td style="padding: 20px;">
                            <h2 style="color: #d433a9;">Information de l'utilisateur</h2>
                            <p><strong>Nom:</strong> ${user.name}</p>
                            <p><strong>Prénom:</strong> ${user.lastname}</p>
                            <p><strong>Email:</strong> ${user.email}</p>
                            ${user.phone ? `<p><strong>Téléphone:</strong> ${user.phone}</p>` : ""}
                            <p><strong>Adresse:</strong> ${user.address}</p>
                            <p><strong>Code Postal:</strong> ${user.postal_code}</p>
                            <p><strong>Ville:</strong> ${user.city}</p>
                        </td>
                    </tr>
  
                    <!-- Donation Information Section -->
                    <tr>
                        <td style="padding: 20px;">
                            <h2 style="color: #d433a9;">Détails du Don</h2>
                            <p><strong>Id du don:</strong> ${donation.id}</p>
                            <p><strong>Message:</strong> ${donation.message}</p>
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
  gearSubmitMail,
}
