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
Step 1.) Ensure .env and .env.production (for /client)
         are in remote repo.
          .env: (ACTUALLY, only needed if build error about eslint or jest)
            SKIP_PREFLIGHT_CHECK=true
          .env.production:
            NEXT_PUBLIC_BACKEND_URL=/api

  /       > git add .
  /       > git commit -m "deploy"
  /       > git push heroku main

=================================================

Point Domain to Server:
      ----Heroku -> App: "portfolio----2" -> Settings -> Domains -> "Add domain":
        1on1programming.com
          ancient-meadowlark-h844s0g2vjcf2hw5vct7ip2h.herokudns.com
        www.1on1programming.com
          larval-hare-mwjr0yhil3s9amfulh53u5yw.herokudns.com
    ---Copy the DNS targets for each custom domain from previous step.
      ----Paste into: NameCheap -> Domain List -> 1on1programming.com -> Manage -> 
                      -> Advanced DNS -> Host Records:
          -----ALIAS Record:
            ------Host: @
            ------value: <DNS target for 1on1programming.com>
          -----CNAME Record:
            ------Host: www
            ------Value: <DNS target for www.1on1programming.com>

=================================================

API-Keys:
  -We need the API-key for Stripe.
  -Manually place .env file on GitHub.