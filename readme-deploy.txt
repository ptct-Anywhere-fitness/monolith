=================================================

Test Front-End production build locally before deploy:
  /client   > npm run build
  /client   > npm run export
  /         > npm run server
    --Navigate to localhost:9000
    --Do NOT do 'npm start' in /client
    --The built app is run on the server serving the backend.
    --This completely simulates the way it is deployed (monolith style).

=================================================

Migrate Remote DB:
  /       > npm run rollbackh
  /       > npm run migrateh
  /       > npm run seedh
  /       > npm run databaseh
            >> select * from products;

=================================================

To deploy:

Connect the codebase's GitHub repo
  to a Heroku app.
  --Follow step 2 in the readme-setup.txt file.

**NOTE: Need to manually place the .env.production file on the repo in /client!!!

If issue with react build) Ensure .env and .env.production (for /client)
         are in remote repo.
          .env: (ACTUALLY, only needed if build error about eslint or jest)
            SKIP_PREFLIGHT_CHECK=true
          .env.production:
            NEXT_PUBLIC_BACKEND_URL=/api
NOTE: Slightly modified due to NEXT

API-Keys:
  -We need the API-key for Stripe.
  -Manually place .env file on GitHub.

  /       > git add .
  /       > git commit -m "deploy"
  /       > git push heroku main

=================================================

Point Domain to Server:
      ----Heroku -> App: "portfolio----2" -> Settings -> Domains -> "Add domain":
        x.com
        x.com
    ---Copy the DNS targets for each custom domain from previous step.
      ----Paste into: NameCheap -> Domain List -> 1on1programming.com -> Manage -> 
                      -> Advanced DNS -> Host Records:
          -----ALIAS Record:
            ------Host: @
            ------value: <Heroku DNS target for x.com>
          -----CNAME Record:
            ------Host: www
            ------Value: <Heroku DNS target for www.x.com>

=================================================
