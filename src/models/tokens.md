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