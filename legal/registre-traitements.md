# Registre des traitements — Mot'eau (RGPD art. 30)
Document interne, à tenir à jour. Dernière mise à jour : 18 octobre 2026.
Responsable : voir `legal/info.json` (à compléter).

| # | Traitement | Personnes | Données | Base légale | Destinataires / sous-traitants | Durée | Mesures de sécurité |
|---|---|---|---|---|---|---|---|
| 1 | Comptes utilisateurs | Visiteurs inscrits | e-mail, mot de passe (Firebase), nom, téléphone (facultatif) | Contrat | Google Firebase (UE) | Suppression du compte ou 3 ans d'inactivité | HTTPS, accès admin seul, règles de base |
| 2 | Inscriptions compétitions/séances | Participants | nom, e-mail, tél. (fac.), choix, autorisation d'image | Contrat ; consentement (image) | Firebase, Stripe (paiement) | Activité + 3 ans ; comptable 10 ans | idem |
| 3 | Adhésions | Adhérents | nom, e-mail, tél. (fac.), parrain (fac.) | Contrat | Firebase, Stripe | Adhésion + 3 ans ; comptable 10 ans | idem |
| 4 | Commandes, cartes cadeaux, dons | Clients, donateurs | nom, e-mail, articles, montants | Contrat ; obligation légale | Firebase, Stripe | 10 ans | idem |
| 5 | Prêts d'équipement | Emprunteurs | nom, e-mail, matériel, date | Contrat | Firebase | Prêt + 3 ans | idem |
| 6 | Attestations de responsabilité | Signataires, mineurs | nom, e-mail, nom du mineur | Intérêt légitime | Firebase | 10 ans | idem |
| 7 | Fidélité | Membres | points, demandes | Contrat | Firebase | Compte + 3 ans | idem |
| 8 | Avis / FAQ / messages / votes | Utilisateurs | nom affiché, texte, identifiant | Contrat ; intérêt légitime | Firebase | Compte ; suppression sur demande | idem |
| 9 | Notifications | Abonnés | appareil (push), e-mail, tél., prénom (fac.) | Consentement | Vercel (envoi), Firebase | Jusqu'au désabonnement | idem |
| 10 | Statistiques anonymes | Visiteurs | compteurs agrégés | Intérêt légitime | Firebase | Agrégé, sans donnée perso | aucun identifiant |

## À faire régulièrement
- 1 fois par an : supprimer les comptes inactifs depuis 3 ans et les inscriptions/prêts au-delà de leur durée.
- Répondre aux demandes de droits sous 1 mois (e-mail de contact).
- En cas de fuite de données : prévenir la CNIL sous 72 h (cnil.fr) et les personnes concernées si risque élevé ; noter l'incident ici.
- Vérifier chaque année les contrats/DPA Vercel, Google, Stripe (acceptés dans leurs conditions en ligne).
