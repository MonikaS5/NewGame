# SpaceTraders: New Game Registration App

This is a Vite-React-TS application that allows users to register for a new game in Space Traders by submitting a symbol and selecting a faction. 
The app interacts directly with the Space Traders API to handle user registration and token management.

## Key Features

- User registration with a symbol and faction selection.
- Error Handling: Displays success or error message/alert based on registration status.
- Loading: Manages loading states while submitting.
- Validation: Validates symbol length min 3 and max 14
- Token Management: Stores API token in local storage for future requests using useEffect hook.
- Resets also removes token from local storage
- Form Handling: Handles form changes and submissions using the useCallback hook
- Responsive design with Bootstrap for a user-friendly experience.
- Maintains flow of project using version control system Git-Github

  **App link** (https://monikas5.github.io/NewGame/)
  
## Technologies Used

- React
- TypeScript
- Bootstrap - for styling the app
- Git - for tracking changes in source code 
- GitHub - for hosting Git repositories
- Fetch API - for making HTTP requests



## Commands used

```
npm create vite@latest
npm install
npm ci
npm install --save-dev @vitejs/plugin-react-swc
npm install bootstrap
npm install react-router-dom
npm install @types/react-dom --save-dev

```
>In main.tsx (for Bootstrap)
`import 'bootstrap/dist/css/bootstrap.min.css'`

**to run the app**
`npm run dev`

## Deployment
Steps:

1. In `vit.config.ts` :
        add ` base: '/NewGame/',` 

2. `npm install gh-pages --save-dev`

3. In `package.json`
        in scripts
           ` "predeploy": "npm run build",`
            `"deploy": "gh-pages -d dist"`

3. `npm run deploy`

