# bcrypt vs bcryptjs

- bcyrpt is core nodejs(used here)
- bcryptjs is optimised in plain js with 0 dependencies. (most used)
- almost same working
- bcryptjs is based on bcrypt
- **it helps in hashing password** : encrypt, decrypt, compare (WE DONT SAVE CLEAR TEXT PASSWORD)

# jwt(json web token)

- both bcrypt and jwt make tokens(based on cryptography)
- jwt.io website to read tokens
- tokens are not human readable , made from cryptographic agorithms
- has headers, payload, verify signature
- **cryptographic algorithm** is available publicly : anyone can decode bbut **secret** makes each toen unique and protects everything