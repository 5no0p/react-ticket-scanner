import React,{useState, useEffect} from 'react'//react
import { useHistory } from "react-router-dom";//import useHistory
import {useMutation} from 'react-query'  //import useMutation
import qrIcon from '../../assets/icons/qr-code-svgrepo-com.svg'
import {queryClient} from '../../index'
import {LogoutRequest} from '../../features/user/user.api'


// TODO: make function to display navbar
const Nav = () => {
  const [auth, setauth] = useState(false)
  let history = useHistory();
  const mutation = useMutation(LogoutRequest,{
      onSuccess: () => {
        queryClient.removeQueries(['user'])
        setauth(false)
        history.push('/')
        
      }
    })
    useEffect(async () => {
      const data = await queryClient.getQueryData(['user'])
      setauth(data?true:false)
    }, [auth])
  console.log('auth-nav: ',auth)
  return(
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
          <img src={qrIcon} alt="" width="30" height="24"/>
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              

              {
                auth
                ?
                  <>
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/scan">Scan</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/tickets">Tickets</a>
                  </li>
                  <li className="nav-item">
                    <p className="nav-link active" aria-current="page" onClick={()=>mutation.mutate()}>Logout</p>
                  </li>
                  </>
                :<li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/login" >Login</a>
                </li>
              }
              
              {/* <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Dropdown
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><a className="dropdown-item" href="#">Action</a></li>
                  <li><a className="dropdown-item" href="#">Another action</a></li>
                  <li><hr className="dropdown-divider"/></li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Disabled</a>
              </li> */}
            </ul>
            {/* <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form> */}
          </div>
        </div>
      </nav>
    </>
  )
}

export default Nav