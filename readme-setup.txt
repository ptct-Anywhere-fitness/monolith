To deploy this scaffolding to Heroko, do the following:
(https://youtu.be/kTO_tf4L23I)

***************************************
Repo:         https://github.com/ptct-Anywhere-fitness/monolith
Heroku App:   anywhere-fitness--app
DB:           anywhere-fitness--DB / anywhere-fitness--DB_testing
***************************************

Step 1.) Clone this repo and hook up to a new github repo.
  --Delete the .git folder.
  --Create a new GitHub remote repository.
    ---This example uses:   portfolio-3
    ---Leave the "Initialize this repository with" checkmarks (all three) unchecked (no README, no .gitignore, no liscense).
  --git init
  --paste the line from the github instructions into the command propmpt
     git remote add origin https://github.com/JoshuaHolloway/portfolio-3.git
  --git checkout -b main (to allow easy deployment with heroku git command)
    ---I think if you do this before you ever push to remote repo it sets main as default (and actually removed master - I think - if you already push to master then you can change to main as default in the github repo settings)
  --Push scaffolding to remote repo
      git add .
      git commit -m "base project"
      git push --set-upstream origin main


Step 2.) Create heroku app
  --Give it unique name
  --In heroku deploy settings:
    --Deployment method: github
    --App connected to Github: Seach for the github repo and connect
  --in terminal of project:
    heroku login
    heroku git:remote -a anywhere-fitness--app
                         <heroku-app-name>

  --to deploy:
    git add .
    git commit -m "deploy"
    git push heroku main 
    --NOTE: This DOES push all commits from deploys on next push to github.

Step 2.) Set up local DB
  --NOTE: Instructions to setup DB here:
      /knexfile.js
  --Open pyAdmin 4
  --Servers -> Postgres SQL -> Datbases
    ---Right click -> Create -> Database
      ----Database:  <database_name>
            portfolio-3-DB
    ---Repeat for testing_database_name
            portfolio-3-DB_testing
  --Set env-vars for Production and Development DB names:
    ---.env -> 
          DEV_DATABASE_URL=postgresql://postgres:password@localhost:5432/database_name
          TESTING_DATABASE_URL=postgresql://postgres:password@localhost:5432/testing_database_name
  --Migrate DB
    npm run migrate
  --Seed DB
    npm run seed
      --(!!!) NOTE: seed data is UN-HASHED password!!!
      --(!!!) For auth, don't seed, and register a user, then login will work! :)
  --Test it out:
    / >       npm run server
    /client > npm start 
  


Step 3.) Set up Postgres DB on heroku
  --Heroku Dashboard -> Resources -> Ad-ons -> Heroku Postgres
  --To see DB:
    ---Resources -> Heroke Postgress (click a-tag)
  --Set scripts for production deployment DB:
    --Change the 4 heroku (h) scripts in package.json to have the App (!!!NOT DB!!!) name:
        "migrateh": "heroku run knex migrate:latest -a anywhere-fitness--app",
        "rollbackh": "heroku run knex migrate:rollback -a anywhere-fitness--app",
        "seedh": "heroku run knex seed:run -a anywhere-fitness--app",
        "databaseh": "heroku pg:psql -a anywhere-fitness--app",

Step 4.) Test deploy


Step 4.) If problem with postbuild related to jest:

  Jest Issue with React (client) folder inside the Node main app folder:
  •	C:\dev\portfolio-1> npm ls babel-jest
      `-- jest@27.3.1
        `-- @jest/core@27.3.1
          `-- jest-config@27.3.1
            `-- babel-jest@27.3.1
  •	C:\dev\portfolio-1\client> npm ls babel-jest
      `-- react-scripts@4.0.3
        +-- babel-jest@26.6.3
        `-- jest@26.6.0
          `-- @jest/core@26.6.3
            `-- jest-config@26.6.3
              `-- babel-jest@26.6.3  deduped
  •	We want the upper level node_modles to have the same major version of jest for the inner react node_modules.
  •	C:\dev\portfolio-1\package.js >

      "devDependencies": {
        "@types/jest": "^27.0.2",    
        "jest": "^27.3.1", 
        ...
        }

  •	C:\dev\portfolio-1>  npm uninstall jest
  •	C:\dev\portfolio-1>  npm uninstall @types/jest
      o	This removes these dependencies from package.json (and deletes the files from node_modules)
  •	Delete the node_modules folder and package-lock.json in both directories
  •	C:\dev\portfolio-1>  npm install
  •	C:\dev\portfolio-1>  npm i -D jest@^26.0.0
      o	^ will install the latest minor (26.x) version
      o	~ will install the latest patch (26.0.x) version
  •	C:\dev\portfolio-1>  npm i -D @types/jest@^26.0.0
  •	Create a .env file in /client and add the following:
      o	SKIP_PREFLIGHT_CHECK=true
  •	Since the file is gitignored (due to the .env gitignore listed in the root node project -> still applies to the child react /client folder)
    simply create the .env file on github
      -Make a push to remote
      -Don't change anything on local until finished
      -Create .env file and add the skip preflight check env var (listed in prev step)
      -In heroku, deploy branch to ensure worked
      -In local directory:
        git pull
      -Ensure nothing broke but pushing back up to remote and deploying:
        git add .
        git commit -m "test deploy"
        git push heroku main

