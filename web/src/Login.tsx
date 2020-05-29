import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import { gql, useMutation } from '@apollo/client'

import { TokenAuth } from './globalTypes'

const TOKEN_AUTH = gql`
  mutation TokenAuth($username: String!, $password: String!){
    tokenAuth(username: $username, password: $password){
      payload
      refreshExpiresIn
      token
    }
  }
`

interface Props {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<Props> = ({setIsLoggedIn}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [tokenAuth, { data, loading, error }] = useMutation<TokenAuth>(TOKEN_AUTH)

  const handleSubmit = async (): Promise<void> => {
    try{
      await tokenAuth({ variables: { username: username, password: password } })
    }
    catch(e){
      console.log(e)
    }
  }

  if(data){
    if(data.tokenAuth?.token){
      localStorage.setItem('username', username)
      localStorage.setItem('token', data.tokenAuth.token)
    }
    setIsLoggedIn(true)
  }

  if(loading){
    return <CircularProgress />
  }

  return (
    <form noValidate autoComplete="off">
      <TextField 
        error={!!error}
        required 
        label="username" 
        variant="outlined" 
        value={username} 
        onChange={(e): void => setUsername(e.target.value)} 
      />
      <TextField 
        error={!!error}
        required 
        label="password" 
        type="password" 
        autoComplete="current-password"
        variant="outlined"
        value={password} 
        onChange={(e): void => setPassword(e.target.value)} 
      />
      <Button onClick={(): Promise<void> => handleSubmit()}>Submit</Button>
    </form>
  )
}

export default Login
