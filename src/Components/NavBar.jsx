import axios from 'axios'
import React, { useEffect } from 'react'
import { MdSearch, MdAccountCircle } from "react-icons/md"
import { useStateProvider } from '../utils/StateProvider'
import reducerCases from '../utils/Constants';

function NavBar() {
  const [{ token, userInfo }, dispatch] = useStateProvider();
  useEffect(() => {
    async function getUserInfo() {
      await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
        .then((res) => {
          const userInfo = {
            userName: res.data.display_name,
            id: res.data.id
          }
          if (userInfo) {
            dispatch({ type: reducerCases.SET_USERINFO, userInfo })
            console.log(userInfo)
          }

        })
        .catch((err) => {
          console.log(err)
        })
    }
    getUserInfo()
  }, [dispatch, token])
  return (
    <div id='navBar'>
      <div id="inputBar">
        <MdSearch size={20} />
        <input type="text" placeholder='Artists, songs or podcasts' />
      </div>
      <div id="user">
        <MdAccountCircle size={20} />
        <div id="userName">{userInfo?.userName || "Guest"}</div>
      </div>
    </div>
  )
}

export default NavBar
