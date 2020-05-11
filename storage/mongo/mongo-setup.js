db.createUser(
  {
    user: "external",
    pwd: "readOnly",
    roles: ["read"]
  })

db.createCollection("data")
db.data.insertOne({
  cv: "#I am the title\n**I am some markdown content**"
})