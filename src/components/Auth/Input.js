import { Grid, IconButton, InputAdornment, TextField } from '@material-ui/core';
import React from 'react';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';
const Input = ({half , name , label , autoFocus , type , handleChange , handleShowPassword}) => {
    return (
        <Grid item xs={12} sm={half ? 6 : 12}>
            <TextField 
                name={name}
                variant="outlined"
                required
                fullWidth
                label={label}
                autoFocus={autoFocus}
                type={type}
                onChange={handleChange}
                InputProps = {
                    name === 'password' ? {
                        endAdornment: (
                            <InputAdornment position="end">
                               <IconButton onClick={handleShowPassword}>
                                    {type === 'password' ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </IconButton> 
                            </InputAdornment>
                        )
                    } : null
                }
            />
        </Grid>
    );
};

export default Input;