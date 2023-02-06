import { Navigate } from 'react-router-dom'

const PrivateRoutes = ({ children }) => {
  const currentTime = Math.floor(Date.now() / 1000);
  let expTime = localStorage.getItem('expires_at')
  let isVaild = true
  if(expTime < currentTime){
   isVaild = false
  }
return (
    isVaild ? children : <Navigate to='/login'/>
  )
}
export default PrivateRoutes;
