# osp7project


DEV INSTALLATION INSTRUCTIONS:
1) Git clone
2) npm install in /
3) npm install in /client/
4) In .env, set up the following:
    AWS_ACCESS_KEY_ID
    AWS_SECRET_ACCESS_KEY
    USER_ROLE_ARN
    JWT_KEY

    -also a separate .env in client folder, setup VITE_CAPTCHA_KEY = "google captchav2 key"
5) install redis-server via apt/brew/etc
6) npm run fulldev


    