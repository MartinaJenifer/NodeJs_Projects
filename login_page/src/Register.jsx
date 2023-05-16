import React,{useState} from "react";
import'./Register.css';

const Register=()=>{
    const [StudentID, setStudentID]=useState();
    const [Studentname, setStudentname]=useState("");
    const [Percentage, setPercentage]=useState();
    const [Department, setDepartment]=useState("");
    const [password, setpassword]=useState("");
    const studentIDchange=(e)=>{
        setStudentID(e.target.value)
    }
    const studentnamechange=(e)=>{
        setStudentname(e.target.value)
    }
    const percentagechange=(e)=>{
        setPercentage(e.target.value)
    }
    const departmentchange=(e)=>{
        setDepartment(e.target.value)
    }
    const passwordchange=(e)=>{
        setpassword(e.target.value)
    }

    const buttonclick = async(e)=>{
        e.preventDefault()
        console.log(StudentID)
        console.log(Studentname);
        console.log(Percentage);
        console.log(Department);
        console.log(password);
     

     const a =await fetch("/addstud",{
        method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
        "StudentID":StudentID,
        "Studentname":Studentname,
        "Percentage":Percentage,
        "Department":Department,
        "password":password
    })

    })

    console.log("Success")
        const data = await a.json()
        console.log(data)
if(data.messege){
    alert(data.messege)

}else{
    alert(data.err)
}
}
return(
    <>
     <form>
     <h1>UNIVERSITY DATABASE</h1>
     Student ID<input type="text" placeholder="Enter the id" name="StudentID" onChange={studentIDchange}/>
     Student Name<input type="text" placeholder="Enter the Name" name="Studentname" onChange={studentnamechange}/>
     Percentage<input type="text" placeholder="Enter the percentage" name="Percentage" onChange={percentagechange}/>
     Department<input type="text" placeholder="Enter the department" name="department" onChange={departmentchange}/>
     Password<input type="password" placeholder="Enter the password" name="password" onChange={passwordchange}/>
     <button onClick={buttonclick}>SUBMIT</button>
     
     </form>
    </>
 )
 }
 export default Register;