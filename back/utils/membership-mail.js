function membershipMail({ user, membership, discordLink }) {
  const label = membership.type === "RENEWAL" ? "renouvellement" : "adhésion"

  return {
    text: `Bienvenue chez MO5 !

    Cher(e) ${user.name} ${user.lastname},

    Nous vous remercions pour votre ${label} à l'association MO5.

    Email: ${user.email}
    Pseudo Discord: ${user.discord_pseudo || "non renseigné"}
    Référence: ${membership.id}

    Rejoignez notre serveur Discord pour échanger avec la communauté :
    ${discordLink}

    À très vite !
    L'équipe MO5
    `,
    html: `<body style="background-color: #F2F2F2; color: #000; font-family: Arial, sans-serif; margin: 0; padding: 0;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #F2F2F2;">
        <tr>
            <td align="center">
                <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #FFF; margin: auto; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                    <tr>
                        <td style="background-color: #4088cf; color: #FFF; padding: 20px; text-align: center;">
                            <h1>MO5 | Bienvenue !</h1>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 20px;">
                            <h2 style="color: #d433a9;">Votre ${label} est confirmée</h2>
                            <p>Bonjour <strong>${user.name} ${user.lastname}</strong>,</p>
                            <p>Merci pour votre ${label} à l'association MO5. Votre reçu fiscal est en pièce jointe.</p>
                            <p><strong>Email :</strong> ${user.email}</p>
                            <p><strong>Pseudo Discord :</strong> ${user.discord_pseudo || "non renseigné"}</p>
                            <p><strong>Référence :</strong> ${membership.id}</p>
                            <p style="margin-top: 24px;">
                                <a href="${discordLink}" style="background-color: #5865F2; color: #FFF; padding: 12px 20px; border-radius: 4px; text-decoration: none; display: inline-block;">
                                    Rejoindre le Discord MO5
                                </a>
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td style="background-color: #5bc0de; color: #FFF; padding: 20px; text-align: center;">
                            À très vite !
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
  membershipMail,
}
