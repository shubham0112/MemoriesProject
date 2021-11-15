import React,{useState} from 'react';
import {Avatar,Button,Paper,Grid,Typography,Container} from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import Icon from './Icon';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import Input from './Input';

const Auth = () => {
    const classes = useStyles();
    const [showPassword,setShowPassword] = useState(false);
    const [isSignUp,setIsSignup] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleShowPassword = () => {
        setShowPassword((prevShowPassword)=>!prevShowPassword)
    }

    const handleSubmit = () => {

    };

    const handleChange = () => {

    };

    const switchMode = () => {
        setIsSignup((prevIsSignup)=>!prevIsSignup);
        setShowPassword(false);
    };

    const googleSuccess = async (res) => {
        const result = res?.profileObj; //optional chaining operator
        const token = res?.tokenId;

        try {
            dispatch({type:'AUTH', data: {result,token} }); // it will set the user in the local storage

            // re directing to home page after signing in
            history.push('/');
        } catch (error) {
            console.log(error);
        }
    };

    const googleFailure = (error) => {
        console.log(error);
        console.log("Google sign in was unsuccessful. Try again later");
    };

    return (
        <Container component="main" maxWidth="xs" >
            <Paper className={classes.paper} elevation={3} >

                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>

                <Typography variant="h5">
                    {isSignUp?'Sign Up':'Sign In'}
                </Typography>

                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignUp && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half/>
                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword?"text":"password"} handleShowPassword={handleShowPassword} />
                        { isSignUp && <Input name="confirmPassword" label="RepeatPassword" handleChange={handleChange} type="password" /> }
                    </Grid>

                    <Button 
                        type="submit" 
                        fullWidth 
                        variant="contained" 
                        color="primary" 
                        className={classes.submit}
                    >
                            {isSignUp ?'Sign Up' : 'Sign In'}
                    </Button>

                    <GoogleLogin
                        clientId="1021582809741-15a1acsrnbvmkr1ma24856mifi9sv239.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button 
                                className={classes.googleButton} 
                                color="primary" 
                                fullWidth 
                                onClick={renderProps.onClick} 
                                // disabled={renderProps.disabled} 
                                startIcon={<Icon/>} 
                                variant="contained"
                            >
                                Google Sign In        
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />

                    <Grid container justifyContent="flex-end" >
                        <Grid item>
                            <Button onClick={switchMode} >
                                { isSignUp ? "Already have an account?Sign In" : "Don't have an account?Sign Up" }
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth
