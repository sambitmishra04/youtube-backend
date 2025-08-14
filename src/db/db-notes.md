- db connection always causes problems
- wrap in try catch always (or promises)
- db always in another continent: use async await

- write db connection function in separate folde and import to main index file: best approach

## Errors

- MONGODB connection error:-  MongoServerError: bad auth : authentication failed 
- above happened when we changed mongo password in uri
- **proper error messages necesaary to backtrack and resolve errors**
- trial error for debugging


## async

- whenever an async method completes it also retutrns a promise => **use then and catch**