# File Handling 
- it is 90% backend work
- express also doesnt have file handling directly
- most file handling is not done on own server :: use third party services or aws
- make a separate utility function(or middleware)for reusability
- not used on all end-points :: where needed add it as middleware

## cloudinary
- service or util folder
- npm i cloudinary
- it is sdk
- function call to upload

## packages
- express-fileupload or multer(most used)
- read multer github readme
- read fs from node docs

## multer
- we use it as middleware :: can be done directly
- upload files through multer: not directly cloudinary
- multer takes file uploaded by user => store temporarily in local server => upload to cloudinary
- can do without this temp local step but it is suggested practice in production
- temp step for re-uploading purposes
- write it as middleware and inject where necessary : file uplaod capabilities

## fs
- filesystem directly in ode
- file system handling
- **unlink(path)** : files are not deleted from disk/filesystem they are unlinked(OS Concept)
- unlink and unlinkSync
- Sync means dont proceed until this is completed

## async try-catch
- file handling is like db 
- errors and time-taking => try-catch-async
- ctrl + space for auto suggestions