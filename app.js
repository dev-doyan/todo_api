import express from 'express';
const app =express();

// storing the data as array of objects 

let todo=[];
let nextid=1;


//middlewears
app.use(express.json());








app.get("/",(req,res)=>{
    res.json({message:"success"})
})

app.post("/todos",(req,res)=>{
const btitle=req.body.title;

const newtodo={

    id:nextid++,
    title:btitle,
    status:false
}

todo.push(newtodo);
console.log(btitle)
res.json({message:"success"})


})


app.get("/todos",(req,res)=>{
    res.json(todo)
})

app.get("/todos/:id",(req,res)=>{
    let id=req.params.id;
    let matchingtodo=todos.find((todo)=>(todo.id==id));        //find returns the object itself
    if(matchingtodo){
res.json(matchingtodo)
    }else{
        res.status(404).json({error :"findinng todo"})
    }
})

app.patch("/todos/update/:id",(req,res)=>{
    let id=req.params.id;
    let index=todo.findIndex((t)=>(t.id==id));
    if(index==-1){
       return  res.json({message:"error finding todo"})
    }

    if(index !== -1){
        if(req.body.title!=undefined){
            todo[index].title=req.body.title;

        }
        if(req.body.status!=undefined){
            todo[index].status=req.body.status;

        }

        res.json(todo)
    }

})

app.delete("/todos/delete/:id",(req,res)=>{
    let id=req.params.id;
    let index=todo.findIndex(t=>t.id==id);
    if(index==-1){
        return res.json({message:"error finding todo"})
    }
    if(index!=-1){
        todo.splice(index,1);
        res.json(todo)
    }
})



app.listen(7000,()=>{
    console.log("server running at port 7000")
})
