import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Register.css";
import { useHistory, Link } from "react-router-dom";

const Register = () => {
    const history = useHistory()
    const { enqueueSnackbar } = useSnackbar();
    const [inputFields, setInputFields] = useState({
        username: "",
        password: "",
    })
    const [password, setPassword] = useState({
        confirmPassword: ""
    })
    const [validated, setValidated] = useState(false)
    const [loading, setLoading] = useState()

    // TODO: CRIO_TASK_MODULE_REGISTER - Implement the register function
    /**
     * Definition for register handler
     * - Function to be called when the user clicks on the register button or submits the register form
     *
     * @param {{ username: string, password: string, confirmPassword: string }} formData
     *  Object with values of username, password and confirm password user entered to register
     *
     * API endpoint - "POST /auth/register"
     *
     * Example for successful response from backend for the API call:
     * HTTP 201
     * {
     *      "success": true,
     * }
     *
     * Example for failed response from backend for the API call:
     * HTTP 400
     * {
     *      "success": false,
     *      "message": "Username is already taken"
     * }
     */

    const register = async () => {
        if (!validateInput({ ...inputFields, ...password })) return;
        setLoading(true)
        await axios.post(`${config.endpoint}/auth/register`,
            inputFields)
            .then(function (response) {
                if (response.status === 201) {
                    enqueueSnackbar("Registered Successfully", {
                        variant: "success",
                        autoHideDuration: 5000
                    })
                }
                history.push('/login')
            })
            .catch(function (error) {
                if (error.response) {
                    enqueueSnackbar("Username is already taken", {
                        variant: "error",
                        autoHideDuration: 5000
                    })
                } else if (error.request) {
                    enqueueSnackbar("Backend server is down", {
                        variant: "warning",
                        autoHideDuration: 5000
                    })
                } else {
                    enqueueSnackbar(error.message, {
                        variant: "error",
                        autoHideDuration: 5000
                    })
                }
            })

        setLoading(false)

    };

    const change = (e) => {
        setInputFields({
            ...inputFields,
            [e.target.name]: e.target.value
        })
    }


    // TODO: CRIO_TASK_MODULE_REGISTER - Implement user input validation logic
    /**
     * Validate the input values so that any bad or illegal values are not passed to the backend.
     *
     * @param {{ username: string, password: string, confirmPassword: string }} data
     *  Object with values of username, password and confirm password user entered to register
     *
     * @returns {boolean}
     *    Whether validation has passed or not
     *
     * Return false if any validation condition fails, otherwise return true.
     * (NOTE: The error messages to be shown for each of these cases, are given with them)
     * -    Check that username field is not an empty value - "Username is a required field"
     * -    Check that username field is not less than 6 characters in length - "Username must be at least 6 characters"
     * -    Check that password field is not an empty value - "Password is a required field"
     * -    Check that password field is not less than 6 characters in length - "Password must be at least 6 characters"
     * -    Check that confirmPassword field has the same value as password field - Passwords do not match
     */
    const validateInput = (data) => {
        let error = 0
        if (data.username === "") {
            error = error + 1
            enqueueSnackbar('Username is a required field', {
                variant: 'warning',
                autoHideDuration: 3000
            })
        } else if (data.username.split('').length < 6) {
            error = error + 1
            enqueueSnackbar('Username must be at least 6 characters', {
                variant: 'warning',
                autoHideDuration: 3000
            })
        } else if (data.password === '') {
            error = error + 1
            enqueueSnackbar('Password is a required field', {
                variant: 'warning',
                autoHideDuration: 3000
            })
        } else if (data.password.split('').length < 6) {
            error = error + 1
            enqueueSnackbar('Password must be at least 6 characters', {
                variant: 'warning',
                autoHideDuration: 3000
            })
        } else if (data.password !== data.confirmPassword) {
            error = error + 1
            enqueueSnackbar('Passwords do not match', {
                variant: 'warning',
                autoHideDuration: 3000
            })
        }
        if (error > 0) {
            return false
        } else {
            setValidated(true)
            return true
        }
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            minHeight="100vh"
        >
            <Header hasHiddenAuthButtons />
            <Box className="content">

                <Stack spacing={2} className="form">
                    <h2 className="title">Register</h2>
                    <TextField
                        id="username"
                        label="Username"
                        variant="outlined"
                        title="Username"
                        name="username"
                        placeholder="Enter Username"
                        fullWidth
                        onChange={change}
                    />
                    <TextField
                        id="password"
                        variant="outlined"
                        label="Password"
                        name="password"
                        type="password"
                        helperText="Password must be atleast 6 characters length"
                        fullWidth
                        placeholder="Enter a password with minimum 6 characters"
                        onChange={change}
                    />
                    <TextField
                        id="confirmPassword"
                        variant="outlined"
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        fullWidth
                        onChange={(e) => setPassword({ [e.target.name]: e.target.value })}
                    />
                    {loading
                        ? <Box display="flex" flexDirection="row" justifyContent="center">
                            <CircularProgress />
                        </Box>
                        : <Button className="button" variant="contained" onClick={register}>
                            Register Now
                        </Button>
                    }


                    <p className="secondary-action">
                        Already have an account?{" "}
                        <Link className="link" to="/login">
                            Login here
                        </Link>
                    </p>
                </Stack>
            </Box>
            <Footer />
        </Box>
    );
};

export default Register;
