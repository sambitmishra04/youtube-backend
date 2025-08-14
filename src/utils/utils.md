# utils

```js
const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    
    } catch (error) {
        console.log("MONGODB connection error:- ", error)
        process.exit(1)
    }
}
```

- the above code is to be used a lot everywhere.
- this is very common wrapper
- make a util file for it(make in utils folder or service folder)
