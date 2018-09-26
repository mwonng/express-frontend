# Project Summary
This project is designed for login with React frontend. Now it works with another project which provide login/token API

## Tech Stacks

- React.js
- Next.js
- MongoDB
- Express.js

## Routes:

### Signup:
- Method: `post`
- Endpoint: `ENDPOINT/auth/signup`
- Body: `{email, password}`

### Signin:
- Method: `post`
- Endpoint: `ENDPOINT/auth/siginin`
- Body: `{email, password}`

### Verify token:
- Method: `post`
- Endpoint: `ENDPOINT/auth/verifyResetToken`
- Body: `{token}`

### Forget Password:
- Method: `post`
- Endpoint: `ENDPOINT/auth/forget`
- Body: `{email}`

### Reset Password:
- Method: `post`
- Endpoint: `ENDPOINT/auth/resetPassword`
- Body: `{token, password}`

### Archive User:
- Method: `post`
- Endpoint: `ENDPOINT/auth/archiveUser`
- Body: `{token}`
