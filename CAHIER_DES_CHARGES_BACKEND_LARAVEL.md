# Cahier des charges backend Laravel - ASFIFO Front

## 1. Contexte

Le site ASFIFO est une application React/Vite avec :

- une partie publique : accueil, formations, actualites/blog, a propos, contact ;
- une partie backoffice : tableau de bord, gestion des articles, gestion des messages de contact, apercu public, import/export JSON ;
- une page de connexion prevue mais pas encore reliee a une API.

Actuellement, le backoffice utilise des donnees locales en `localStorage`. Le backend Laravel devra remplacer cette persistance locale par une vraie base de donnees, des API REST securisees et une authentification admin.

## 2. Objectifs du backend

- Authentifier les administrateurs.
- Gerer les articles/actualites depuis le backoffice.
- Afficher les articles publies sur le site public.
- Recevoir les messages du formulaire de contact public.
- Permettre aux administrateurs de lire, archiver, supprimer et noter les reponses aux messages.
- Fournir les statistiques du tableau de bord.
- Gerer les uploads d'images pour les articles.
- Prevoir l'import/export JSON des donnees si cette fonction reste demandee.

## 3. Modules a developper

### Authentification administrateur

Champs de connexion :

- email
- password
- remember_me, optionnel

Fonctionnalites attendues :

- connexion admin ;
- deconnexion ;
- recuperation de l'utilisateur connecte ;
- protection des routes `/admin/*` ;
- gestion future du mot de passe oublie, facultative en V1.

Solution Laravel recommandee : Sanctum avec API token/cookie SPA.

### Articles / Actualites

Champs identifies dans le backoffice :

- id
- title, obligatoire
- excerpt
- content, obligatoire, contenu Markdown
- image_url ou image upload
- tags, tableau de mots-cles
- featured, booleen
- is_published, booleen
- author
- views
- created_at
- updated_at

Actions backoffice :

- lister les articles ;
- rechercher par titre, resume ou tags ;
- filtrer par statut : tous, publies, brouillons, mis en avant ;
- creer un article ;
- modifier un article ;
- supprimer un article ;
- publier/depublier rapidement ;
- mettre/retirer en avant ;
- afficher un apercu/detail ;
- uploader ou associer une image.

Regles metier :

- un article brouillon ne doit pas etre visible sur le site public ;
- seuls les articles publies doivent etre exposes aux visiteurs ;
- les articles `featured` doivent pouvoir etre affiches en priorite sur la page blog/accueil ;
- `views` doit etre initialise a 0 et incrementable lors de la consultation publique ;
- prevoir une valeur par defaut pour l'image si aucune image n'est fournie, ou rendre l'image obligatoire selon choix final.

### Messages de contact

Champs identifies dans le site public et le backoffice :

- id
- name, obligatoire
- email, obligatoire
- subject, optionnel dans le backoffice demo, mais present dans le formulaire public
- organization, optionnel, present dans le vrai formulaire public
- message, obligatoire
- status : `new`, `read`, `replied`, `archived`
- reply_notes, optionnel
- replied_at, optionnel
- created_at
- updated_at

Actions backoffice :

- lister les messages ;
- rechercher par nom, email, sujet ou contenu ;
- filtrer par statut : tous, nouveaux, lus, repondus, archives ;
- ouvrir un message ;
- marquer automatiquement comme lu a l'ouverture ;
- marquer comme lu manuellement ;
- enregistrer une reponse/note de reponse ;
- marquer comme repondu ;
- archiver ;
- supprimer definitivement.

Regles metier :

- un nouveau message public doit arriver avec le statut `new` ;
- a l'ouverture dans l'admin, le statut peut passer de `new` a `read` ;
- une reponse enregistree passe le message en `replied` et renseigne `replied_at` ;
- l'archivage ne supprime pas le message ;
- la suppression est definitive.

### Formulaire de contact public

Champs du formulaire actuel :

- name
- email
- subject, valeurs possibles :
  - audit-interne
  - audit-comptable
  - comptabilite
  - entrepreneuriat
  - parcours-dirigeants
  - other
- organization
- message

Attendus :

- validation serveur ;
- protection anti-spam simple : rate limit, honeypot ou captcha selon besoin ;
- enregistrement en base ;
- notification email optionnelle vers l'administrateur ;
- reponse JSON de succes/erreur pour le frontend.

### Newsletter

Le footer contient un champ email newsletter non branche.

Champs a prevoir si la newsletter est activee :

- id
- email
- status : subscribed, unsubscribed
- subscribed_at
- unsubscribed_at

Fonctionnalites :

- inscription par email ;
- validation email unique ;
- export CSV ou integration outil emailing, optionnel.

### Contenus statiques potentiellement administrables

Les formations, realisations, partenaires, FAQ et textes "A propos" sont aujourd'hui codes en dur dans React.

En V1, ils peuvent rester statiques. En V2, prevoir des modules :

- formations ;
- realisations/actualites ;
- partenaires ;
- FAQ ;
- pages de contenu.

## 4. API REST proposee

### Auth

- `POST /api/login`
- `POST /api/logout`
- `GET /api/me`

### Articles admin

- `GET /api/admin/articles`
- `POST /api/admin/articles`
- `GET /api/admin/articles/{id}`
- `PUT/PATCH /api/admin/articles/{id}`
- `DELETE /api/admin/articles/{id}`
- `PATCH /api/admin/articles/{id}/publish`
- `PATCH /api/admin/articles/{id}/featured`
- `POST /api/admin/articles/{id}/image`

Parametres utiles pour la liste :

- `search`
- `status=published|draft|featured`
- `page`
- `per_page`

### Articles publics

- `GET /api/articles`
- `GET /api/articles/featured`
- `GET /api/articles/{id-or-slug}`
- `POST /api/articles/{id}/view`, optionnel pour incrementer les vues

### Contacts admin

- `GET /api/admin/contact-messages`
- `GET /api/admin/contact-messages/{id}`
- `PATCH /api/admin/contact-messages/{id}/status`
- `POST /api/admin/contact-messages/{id}/reply`
- `PATCH /api/admin/contact-messages/{id}/archive`
- `DELETE /api/admin/contact-messages/{id}`

Parametres utiles pour la liste :

- `search`
- `status=new|read|replied|archived`
- `page`
- `per_page`

### Contacts publics

- `POST /api/contact-messages`

### Dashboard

- `GET /api/admin/dashboard/stats`

Reponse attendue :

- totalArticles
- publishedArticles
- draftArticles
- featuredArticles
- totalMessages
- unreadMessages
- repliedMessages
- archivedMessages
- recentArticles
- recentMessages

### Import/export JSON, optionnel

- `GET /api/admin/export`
- `POST /api/admin/import`
- `POST /api/admin/reset-demo-data`, uniquement en environnement de demo

## 5. Base de donnees proposee

### Table `users`

Table Laravel standard, avec au minimum :

- id
- name
- email
- password
- role, par exemple `admin`
- timestamps

### Table `articles`

- id
- title
- slug, recommande pour les URLs publiques
- excerpt
- content
- image_url
- featured, boolean default false
- is_published, boolean default true ou false selon workflow choisi
- views, unsigned integer default 0
- author_id, nullable si on relie aux users
- author_name, nullable si on garde un champ libre
- published_at, nullable
- timestamps
- soft_deletes, recommande

### Table `tags`

- id
- name
- slug
- timestamps

### Table `article_tag`

- article_id
- tag_id

Alternative simple V1 : stocker `tags` en JSON dans `articles`. Solution acceptable pour un petit backoffice, moins puissante pour recherche/SEO.

### Table `contact_messages`

- id
- name
- email
- subject
- organization, nullable
- message
- status
- reply_notes, nullable
- replied_at, nullable
- read_at, nullable
- archived_at, nullable
- timestamps
- soft_deletes, optionnel

### Table `newsletter_subscribers`, optionnel

- id
- email
- status
- subscribed_at
- unsubscribed_at
- timestamps

## 6. Validations principales

Article :

- `title` requis, string, max 255 ;
- `content` requis ;
- `excerpt` nullable, max 500 ;
- `image` image valide si upload ;
- `image_url` URL valide si saisie manuelle ;
- `tags` tableau de strings ;
- `featured` boolean ;
- `is_published` boolean ;
- `author` string nullable.

Contact :

- `name` requis, max 150 ;
- `email` requis, email valide, max 255 ;
- `subject` nullable, max 255 ;
- `organization` nullable, max 255 ;
- `message` requis, max a definir, par exemple 5000 ;
- `status` limite aux valeurs autorisees cote admin.

Newsletter :

- `email` requis, email valide, unique.

## 7. Securite et qualite

- Toutes les routes admin doivent etre protegees par authentification.
- Les routes publiques doivent etre rate-limitees, surtout contact/newsletter.
- Nettoyer/sanitizer le contenu Markdown rendu cote public.
- Verifier les fichiers uploades : type MIME, taille max, nommage, stockage.
- Journaliser les actions sensibles : suppression article, suppression message, import JSON.
- Ajouter CORS configure pour le domaine frontend.
- Retourner des erreurs JSON homogenes.

## 8. Priorites de livraison

### V1 indispensable

- Auth admin.
- CRUD articles.
- Upload image article.
- Liste publique des articles publies.
- Reception formulaire contact public avec champ `organization`.
- Gestion admin des messages.
- Statistiques dashboard.

### V1.5 utile

- Recherche, filtres et pagination cote API.
- Increment des vues article.
- Export JSON.
- Email de notification lors d'un contact.

### V2 optionnelle

- Gestion newsletter.
- Gestion formations.
- Gestion partenaires.
- Gestion FAQ.
- Gestion pages statiques.
- Roles/permissions multi-admin.

## 9. Points a clarifier

- Le blog public actuel affiche des realisations codees en dur, tandis que le backoffice gere des articles generiques. Il faut decider si le module `articles` remplace totalement les actualites publiques.
- Le champ `organization` existe dans le formulaire public mais pas encore dans le modele admin : il faut l'ajouter.
- Le nom "Zenith Admin" dans le backoffice semble generique : a renommer en "ASFIFO Admin" si souhaite.
- Choisir entre tags stockes en JSON ou vraie table `tags`.
- Decider si l'import/reset demo doit exister en production.
