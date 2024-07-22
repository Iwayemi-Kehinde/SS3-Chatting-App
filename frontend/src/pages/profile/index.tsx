import { useAppStore } from "../../store"
const Profile = () => {
  const {userInfo} = useAppStore()
  return (
    <div>{ userInfo?.id }</div>
  )
} 

export default Profile