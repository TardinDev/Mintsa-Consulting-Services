# Configuration EmailJS pour l'envoi d'emails

## Étapes de configuration

### 1. Créer un compte EmailJS

1. Allez sur [https://www.emailjs.com/](https://www.emailjs.com/)
2. Créez un compte gratuit
3. Vérifiez votre adresse email

### 2. Configurer un service email

1. Dans le tableau de bord EmailJS, allez dans **Email Services**
2. Cliquez sur **Add New Service**
3. Choisissez votre fournisseur d'email (Gmail, Outlook, etc.)
4. Suivez les instructions pour connecter votre compte email
5. **Notez le Service ID** qui apparaît

### 3. Créer un template d'email

1. Allez dans **Email Templates**
2. Cliquez sur **Create New Template**
3. Utilisez ce template pour le formulaire de devis :

```
Objet: Nouvelle demande de devis - {{from_name}}

Corps du message:
------------------
Vous avez reçu une nouvelle demande de devis via le site web.

INFORMATIONS DU CLIENT
----------------------
Nom: {{from_name}}
Email: {{from_email}}
Téléphone: {{phone}}
Entreprise: {{company}}

SERVICE DEMANDÉ
--------------
{{service}}

MESSAGE
-------
{{message}}

------------------
Répondre à: {{reply_to}}
```

4. **Notez le Template ID** qui apparaît
5. Cliquez sur **Save**

### 4. Obtenir votre Public Key

1. Allez dans **Account** > **General**
2. Trouvez votre **Public Key** (anciennement User ID)
3. **Notez ce Public Key**

### 5. Configurer le code

Ouvrez le fichier :
`src/components/QuoteRequest/QuoteRequestPage.tsx`

Remplacez les lignes 47-49 par vos propres identifiants :

```typescript
const SERVICE_ID = 'votre_service_id_ici';
const TEMPLATE_ID = 'votre_template_id_ici';
const PUBLIC_KEY = 'votre_public_key_ici';
```

### 6. Tester l'envoi

1. Lancez l'application avec `npm run dev`
2. Allez sur `/demande-devis`
3. Remplissez et envoyez le formulaire
4. Vérifiez votre boîte email (mintsaservicesc@gmail.com)

## Notes importantes

- **Plan gratuit EmailJS** : 200 emails/mois
- Les emails arrivent directement dans la boîte `mintsaservicesc@gmail.com`
- Le système utilise un **fallback vers mailto** si EmailJS n'est pas configuré
- Les identifiants EmailJS doivent rester dans le code (pas de problème de sécurité car ils sont publics par nature)

## Alternative : Fallback mailto

Si vous ne configurez pas EmailJS, le système utilisera automatiquement la méthode `mailto:` qui ouvrira le client email par défaut de l'utilisateur avec le formulaire pré-rempli.

## Support

- Documentation EmailJS : [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- Dashboard EmailJS : [https://dashboard.emailjs.com/](https://dashboard.emailjs.com/)
