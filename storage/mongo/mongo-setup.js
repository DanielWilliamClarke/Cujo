db.createUser(
  {
    user: "test_user",
    pwd: "123456",
    roles: [
      {
        role: "read",
        db: "moderncvapp"
      }
    ]
  })

db.createCollection("data")
db.data.insertOne({
  cv: "#I am the title\n**I am some markdown content**"
})