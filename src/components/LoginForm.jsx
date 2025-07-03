import { useState } from "react"

const LoginForm = ({
    userCreds,
}) =>
{
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleUsernameChange = e => setUsername(e.target.value)
    const handlePasswordChange = e => setPassword(e.target.value)

    const login = e =>
    {
        e.preventDefault()
        userCreds({
            username,
            password
        })
        setUsername('')
        setPassword('')
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={login}>
                <div>
                    username
                    <input
                        type='text'
                        value={username}
                        name='Username'
                        onChange={handleUsernameChange}
                    />
                </div>
                <div>
                    password
                    <input
                        type='password'
                        value={password}
                        name='Password'
                        onChange={handlePasswordChange}
                    />
                </div>
                <button type='submit'>login</button>
            </form>
        </div>
    )
}

export default LoginForm;