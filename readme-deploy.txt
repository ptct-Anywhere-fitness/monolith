=================================================

Test deploy:
  /client > npm start
  /       > npm run server
          --Navigate to localhost:9000

=================================================

Migrate Remote DB:
  /       > npm run rollbackh
  /       > npm run migrateh
  /       > npm run seedh
  /       > npm run databaseh
            >> select * from products;


=================================================

To deploy:

Step 0.) Connect the codebase's GitHub repo
         to a Heroku app.
          --Follow step 2 in the readme-setup.txt file.




Step 0.) Ensure .env and .env.production (for /client)
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
