import react from "react";
import { Link } from "react-router-dom";
 export const Footer = () => {
     return(
         <footer>
             <p>Copyright &copy;2022s</p>
             <Link to= '/about'>About</Link>
         </footer>
     )
 }