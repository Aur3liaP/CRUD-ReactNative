# Pokédex Team Rocket App

Bienvenue dans l'application Pokédex Team Rocket, une application mobile développée avec **React Native** et **Expo**. Cette application permet aux utilisateurs de capturer des Pokémon, de gérer leur équipe et d'interagir avec des informations détaillées sur chaque Pokémon.


Ce 1er projet en **React Native** et **TypeScript** a été inspiré d'une vidéo <a href="https://grafikart.fr/tutoriels/react-native-pokedex-2245">tutoriel</a> de Grafikart et de ce <a href="https://www.figma.com/community/file/979132880663340794/pokedex">Figma</a>.

<br>

## <img src="https://github.com/user-attachments/assets/53570f48-0f36-4a6b-9d7b-7d32204a8a60" alt="pokeball" width="25"/> Fonctionnalités

- Capture de Pokémon avec animation de Pokéball.
- Gestion d'une équipe de Pokémon.
- Affichage des détails des Pokémons, y compris leurs statistiques et types.
- Mise à jour en temps réel des informations de l'équipe après les captures et les changements de niveaux.
- Stockage des données en temps réel sur une API.
<br>

## <img src="https://github.com/user-attachments/assets/1ea0c046-3e42-4ccd-8a43-b1d9561f5b56" alt="pokeball" width="35"/> Démonstration

Montez le son pour une dose de nostalgie !

https://github.com/user-attachments/assets/ccf50992-b475-42b7-99e9-99754c140f5e

<br>

## 💻 Technologies utilisées

- **React Native** - Framework pour le développement d'applications mobiles.
- **Expo** - Outil pour simplifier le développement et le déploiement d'applications React Native.
- **Express** - Pour la creation du back-end et des routes
- **SQLite** - Pour la gestion des données
- **Axios** - Librairie pour faire des requêtes HTTP.
- **React Query** - Gestion de l'état pour les données asynchrones.
- **React Navigation** - Navigation entre les différentes vues de l'application.
- **dotenv** : Bibliothèque pour charger des variables d'environnement à partir d'un fichier `.env`.
- **expo-av** : Bibliothèque pour la gestion de l'audio et de la vidéo dans les applications Expo.
<br>  

## 🚀 Installation

Pour exécuter ce projet localement, suivez les étapes ci-dessous :

1. Clonez le dépôt :

   ```bash
   git clone <url-du-dépôt>
   ```

2. Installez les dépendances :

   ```bash
   npm install
   ```
3. Lancez l'application :

      ```bash
   cd serveur
   npm run start
   ```
      
   ```bash
   cd clients
   npm run start
   ```
   
   Vous pouvez utiliser l'aplication mobile Expo Go pour scanner le QR code généré ou un emulateur.
<br>   

## 📱 Utilisation

- Ouvrez l'application sur votre appareil ou émulateur.
- Appuyez sur le bouton "Capturer le Pokémon !" pour capturer un Pokémon.
- Gérer votre équipe à partir de l'écran d'équipe.
- Naviguez entre les Pokémon à l'aide des flèches de navigation.
<br>

## 🍞 Backend
L'application utilise Express pour gérer les routes et SQLite comme base de données.

**Routes**<br>
GET /api/pokemons - Récupère la liste des Pokémon.<br>
POST /api/team - Ajoute un Pokémon à l'équipe.<br>
GET /api/team - Récupère la liste des Pokémon de l'équipe.<br>
PUT /api/team/:id - Modification du niveaux des pokemons.<br>
DELETE /api/team/:id - Supprime un Pokémon de l'équipe.

<br>
  
## 🤝 Contribuer

Les contributions sont les bienvenues ! Si vous souhaitez contribuer à ce projet :

- Forkez le projet.
- Créez une nouvelle branche (git checkout -b feature/nouvelle-fonctionnalité).
- Faites vos modifications et ajoutez des tests si nécessaire.
- Committez vos modifications (git commit -m 'Ajout d'une nouvelle fonctionnalité').
- Poussez la branche (git push origin feature/nouvelle-fonctionnalité).
- Ouvrez une Pull Request.
<br>  

## ✏️ Auteurs

Aurélia PIC - Développeur principal

<br>

## 📝 License

Ce projet est sous licence MIT. 
