# Retours client — informations en attente

Ce fichier liste les points des retours client (notes + commentaire PowerPoint sur la bannière
d'accueil) qui ne peuvent pas être codés tant que l'information n'a pas été communiquée par la
cliente. Rien n'a été inventé dans le code à leur sujet : chaque emplacement concerné porte un
commentaire `TODO [À CONFIRMER]` qui pointe vers cette entrée.

## 1. Numéro d'agrément de l'État

**Demandé par :** notes clientes (page Formations / bannière) + commentaire PowerPoint de
Tantely Rajobson sur la diapositive de la bannière d'accueil (« Agree par l'Etat sous le
numero.. »).

**Statut :** en attente. La bannière d'accueil ([Home.tsx](src/pages/Home.tsx)) affiche déjà
« Depuis 2016, ASFIFO est agréé par l'État... » sans numéro, avec un commentaire `TODO
[À CONFIRMER]` juste au-dessus indiquant où l'insérer dès réception.

**À noter pour la cliente :** la page À propos ([About.tsx](src/pages/About.tsx), section
« Qui sommes-nous ») mentionne déjà deux arrêtés : n°4157/2017/MEETFP (création) et
n°4156/2017/MEETFP (agrément), ouverture en mars 2017. Ce n'est pas forcément le même numéro
que celui visé par la bannière (qui parle de « Depuis 2016 », date d'intégration d'ASFIFO au
groupe CAMOI, alors que les arrêtés datent de 2017) — à confirmer avec la cliente s'il s'agit du
même agrément ou d'un autre, avant de le reporter sur la bannière.

## 2. Sources des chiffres de la page À propos (bloc « Contexte économique »)

**Demandé par :** note cliente — « Source ? » en face du bloc.

**Statut :** en attente. Les quatre chiffres sont toujours affichés dans
[About.tsx](src/pages/About.tsx) (`contextStats`) :
- 200 000+ sociétés recensées à Madagascar
- 75 % des TPE/PME dans le secteur agricole
- 93 % de l'économie dans l'informel
- 40 % des TPE/PME disparaissent en 3 à 4 ans

Une mention « Source : à confirmer » est affichée sous le bloc, avec un commentaire `TODO
[À CONFIRMER]` dans le code. **Chacun des quatre chiffres a besoin d'une source citable** (étude
Doing Business, INSTAT, autre ?) ; à défaut de source pour un chiffre donné, il faudra le retirer
plutôt que de le laisser sans référence.

## 3. Logo (public/Logo.png)

**Statut :** toujours inutilisable. Le fichier a été enregistré avec le damier gris de
transparence de l'éditeur incrusté directement dans les pixels de l'image (le PNG est
entièrement opaque, il n'y a pas de canal alpha réel) — impossible à utiliser tel quel sur le
site.

**Besoin :** un fichier propre, soit PNG avec transparence réelle, soit SVG.

**À noter :** le site utilise actuellement `src/assets/LOGO_ASFIFO_DEF.png` (logo qui s'affiche
correctement dans la Navbar/Footer) ; `public/Logo.png` n'est référencé qu'indirectement (favicon
/ métadonnées `index.html`) et reste à remplacer dès réception du fichier propre.
