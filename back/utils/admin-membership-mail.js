function adminMembershipMail({ user, membership, donation }) {
  const label = membership.type === "RENEWAL" ? "Renouvellement" : "Nouvelle adhésion"
  const paypalEmail = donation?.payer_email || "N/A"

  return {
    text: `${label}

    Information sur l'adhérent
    ----------------------------------
    Nom: ${user.name}
    Prénom: ${user.lastname}
    Email (formulaire): ${user.email}
    Email (PayPal): ${paypalEmail}
    Pseudo Discord: ${user.discord_pseudo || "non renseigné"}
    Adresse: ${user.address || "N/A"}
    Code Postal: ${user.postal_code || "N/A"}
    Ville: ${user.city || "N/A"}

    Détails de l'adhésion
    ----------------------------------
    Id adhésion: ${membership.id}
    Type: ${label}
    Montant: ${donation.amount} ${donation.currency_code}
    Date: ${new Date(donation.transaction_date).toLocaleDateString()}
    Transaction ID: ${donation.transaction_id}
    `,

    html: `<body style="background-color: #F2F2F2; color: #000; font-family: Arial, sans-serif; margin: 0; padding: 0;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #F2F2F2;">
        <tr>
            <td align="center">
                <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #FFF; margin: auto; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                    <tr>
                        <td style="background-color: #4088cf; color: #FFF; padding: 20px; text-align: center;">
                            <h1>MO5 | ${label.toUpperCase()}</h1>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 20px;">
                            <h2 style="color: #d433a9;">Information sur l'adhérent</h2>
                            <p><strong>Nom:</strong> ${user.name}</p>
                            <p><strong>Prénom:</strong> ${user.lastname}</p>
                            <p><strong>Email (formulaire):</strong> ${user.email}</p>
                            <p><strong>Email (PayPal):</strong> ${paypalEmail}</p>
                            <p><strong>Pseudo Discord:</strong> ${user.discord_pseudo || "non renseigné"}</p>
                            <p><strong>Adresse:</strong> ${user.address || "N/A"}</p>
                            <p><strong>Code Postal:</strong> ${user.postal_code || "N/A"}</p>
                            <p><strong>Ville:</strong> ${user.city || "N/A"}</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 20px;">
                            <h2 style="color: #d433a9;">Détails de l'adhésion</h2>
                            <p><strong>Id adhésion:</strong> ${membership.id}</p>
                            <p><strong>Type:</strong> ${label}</p>
                            <p><strong>Montant:</strong> ${donation.amount} ${donation.currency_code}</p>
                            <p><strong>Date:</strong> ${new Date(donation.transaction_date).toLocaleDateString()}</p>
                            <p><strong>Transaction ID:</strong> ${donation.transaction_id}</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="background-color: #5bc0de; color: #FFF; padding: 20px; text-align: center;">
                            Reçu fiscal en pièce jointe
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
  adminMembershipMail,
}
