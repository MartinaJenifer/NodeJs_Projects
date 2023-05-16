let express = require('express');
let app = express();
let crypt = require('bcrypt');
let mongoose = require('mongoose');
let userSchema = require('./schema')
let studentdetails=require('./schema1');
let Staffdetails=require('./schema2');
let bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://martinajenifer13:Martina%401399@martinajenifer.qfoms9g.mongodb.net/University")
.then(()=>{ 
    console.log("Connected to MongoDB");
})
.catch((error)=>{
     console.log(error);
})


 app.get('/student',async(request,response)=>{
    try{
    let hi =await studentdetails.find({});
    response.json(hi); 
    }
    catch(error){
        response.sendStatus(400).send(error);
    }

 })

 app.post('/adduser', async(req, res)=>{
    try{
        let key = await crypt.genSalt(); //generating the salt
        let changedPassword= await crypt.hash(req.body.password, key); //encrypting the password
        let newuser = await userSchema({userid: req.body.userid, password:changedPassword});
        newuser.save();
        res.json(newuser);
    }
    catch(error){
        {error}
    } })

    app.post('/signinstud', async (req, res) => {
      console.log("Studentlogin");
      try {
        const { StudentID, password } = req.body;
    
        const user = await studentdetails.findOne({ StudentID });
        if (user) {
          const isPasswordMatch = await crypt.compare(password, user.password);
          if (isPasswordMatch) {
            res.json({
              message: "Log in success",
              
            });
            console.log("Success");
          } else {
            res.json("Invalid password");
            console.log("Invalid password");
          }
        } else {
          res.json("User not found");
          console.log("User not found");
        }
      } catch (error) {
        res.status(500).json(error);
        console.log("Error:", error);
      }
    });
    
    
   app.post('/addstud', async (req, response) => {
      try {
        const { StudentID, password, Studentname, Department, Percentage } = req.body;
    
        const existingStudent = await studentdetails.findOne({ StudentID });
        if (existingStudent) {
          response.json({ err: "User already registered" });
        } else {
          const salt = await crypt.genSalt(); // generating the salt
          const hashedPassword = await crypt.hash(password, salt); // encrypting the password
    
          const newStudent = new studentdetails({
            StudentID,
            password: hashedPassword,
            Studentname,
            Department,
            Percentage,
          });
    
          await newStudent.save();
          response.json({ message: "Registration Success" });
        }
      } catch (error) {
        response.json({ err: "Registration failed" });
      }
    });

    app.patch('/updatestud/:id', async (req, res) => {
      try {
        const { id } = req.params;
        const update = req.body;
    
        const updatedStudent = await studentdetails.findByIdAndUpdate(id, update, { new: true });
        if (updatedStudent) {
          res.json(updatedStudent);
        } else {
          res.send("Student not found");
        }
      } catch (error) {
        res.status(500).send("Error updating student");
      }
    });

    app.delete("/deletestud/:id", async (req, res) => {
      try {
        const deletedStudent = await studentdetails.findByIdAndDelete(req.params.id);
        if (deletedStudent) {
          res.json(deletedStudent);
        } else {
          res.send("Student not found and deleted");
        }
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });
    


    app.get('/staff',async(request,response)=>{
      try{
      let hi =await Staffdetails.find({});
      response.json(hi); 
      }
      catch(error){
          response.sendStatus(400).send(error);
      }
  
   })
    

    app.post('/addstaff',async(req,response)=>{
        try{
        let key = await crypt.genSalt(); //generating the salt
        let changedPassword= await crypt.hash(req.body.Password, key); //encrypting the password
        let new_staff=new Staffdetails({StaffID:req.body.StaffID,Password:changedPassword,Staffname:req.body.Staffname,Department:req.body.Department});
        new_staff.save();
        response.json(new_staff);
        }
        catch(error){
            response.status(400).send(error);
        }
    })

    app.post('/signinstaff', async (req, res) => {
      console.log("Stafflogin");
      try {
        const { StaffID, Password } = req.body;
    
        const user = await Staffdetails.findOne({ StaffID });
        if (user) {
          const isPasswordMatch = await crypt.compare(Password, user.Password);
          if (isPasswordMatch) {
            res.json({
              message: "Log in success",
              
            });
            console.log("Success");
          } else {
            res.json("Invalid password");
            console.log("Invalid password");
          }
        } else {
          res.json("User not found");
          console.log("User not found");
        }
      } catch (error) {
        res.status(500).json(error);
        console.log("Error:", error);
      }
    });
    
    
    app.patch('/updatestaff/:id', async(req,res)=>{
        try{
            let upd = await Staffdetails.findByIdAndUpdate(req.params.id,req.body);
            if(upd){
               res.json(upd);
            }
            else{
               res.send("notvfound");
            }
         }
            catch(error){
               res.send("error")
      
            }
    })

    
    
    app.delete("/deletestaff/:id", async (req, res) => {
      try {
        const deletedStaff = await Staffdetails.findByIdAndDelete(req.params.id);
        if (deletedStaff) {
          res.json(deletedStaff);
        } else {
          res.send("Staff member not found and deleted");
        }
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });
    
      app.listen(3000,()=>{ console.log("Server running!")});        
      