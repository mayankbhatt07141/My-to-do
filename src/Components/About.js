import { Outlet } from "react-router-dom";
const About = ()=>{
    return(
        <>
         <h1>this is about page. contains developer and to-do app tech stack details</h1>
         <Outlet/>
        </>
    )
};

export default About;