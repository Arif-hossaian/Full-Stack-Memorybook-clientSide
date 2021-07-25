import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Icon from "./icon";
import { useDispatch } from "react-redux";
import { GoogleLogin } from "react-google-login";
import { useHistory } from "react-router-dom";
import useStyles from "./styles.js";
import CustomeInput from "./custom/CustomeInput";

const Auth = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);
  const handleSubmit = () => {};
  const handleChange = () => {};
  const switchMode = () => {
    setIsSignUp(!isSignUp);
  };
  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      dispatch({ type: "AUTH", data: { result, token } });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = () => {
    console.log("Google sign in is failed.Try again later");
  };
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignUp ? "Sign Up" : "Sign in"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <CustomeInput
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <CustomeInput
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <CustomeInput
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <CustomeInput
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignUp && (
              <CustomeInput
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin
            clientId="677036717080-gn4r2cn4cqcb4epvsdnnjc02684vpvqi.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="outlined"
              >
                Google Sign in
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button variant="outlined" color="secondary" onClick={switchMode}>
                {isSignUp
                  ? "Already have an account? Sign in"
                  : "Dont have an account? Sign up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
