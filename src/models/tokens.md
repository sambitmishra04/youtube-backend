# Refresh token vs Access tokem

- only difference is token expiry. access(short) refresh(long)
- access token for authorisation/validation
- refresh token if matched with db and user. auto give access to user for endpoints
- **note**: these tokens will be made a lot of times. make it a separeate method


## access token
- we give it to the user

## refresh token 
- we save it in DB
- so we dont have to ask password from the user repeatedly

# User vs user
- User is mongoose object, has mongoose methods
- user : our user : has out custom made methods


## note
- only use is user dont have to login again and again
- access token only with user(not saved in db) short lived
- refresh token with both user and saved in db. long lived


- now assume, access token expired, backend serves  a 401 access denied
- now either frontend will say user to login again or
- frontend will listen if 401 request comes -> hit an endpoint -> send the refresh token -> backend will match it -> and renew or make new access token(session start again) -> just like a new login