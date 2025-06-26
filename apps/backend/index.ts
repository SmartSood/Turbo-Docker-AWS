import express from "express";
import prisma  from "db/client";





const app = express();
app.use(express.json());

app.get("/todo", async(req, res) => {

const id = req.body.id;
   const user = await prisma.user.findUnique({
    where:{
        id:id
    }
   })
   res.json(user)
});


app.get("/users", async(req, res) => {
    try{
    const users = await prisma.user.findMany();
    res.json(users);
}catch(error){
    res.status(500).json({error:"Internal server error"});
}
});

app.post("/user", async(req, res) => {
    try{
    const {username, password} = req.body;
    if(!username || !password){
      res.status(400).json({error:"Username and password are required"});
      return
    }
    const user = await prisma.user.create({
        data:{
            username,
            password
        }
    })
    res.json(user);
}catch(error){
    res.status(500).json({error:"Internal server error"});
}
})

app.post("/todo", async(req, res) => {
    try{
    const {title, userId} = req.body;
    if(!title || !userId){
        res.status(400).json({error:"Title and userId are required"});
        return
    }
    const user = await prisma.user.findUnique({
        where:{
            id:userId
        }
    })
    if(!user){
         res.status(400).json({error:"User not found"});
         return
    }
    const todo = await prisma.todo.create({
        data:{
            title,
            userId
        }
    })
    res.json(todo); 
}catch(error){
    res.status(500).json({error:"Internal server error"});
}
})

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});