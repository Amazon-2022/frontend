import React from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Alert from "@mui/material/Alert";

export default function Toast(props) {
    const {alertType, message, open, setOpen} = props;

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    const action = () => {
        return (
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small"/>
            </IconButton>);
    };

    return (
        <div>

            <Snackbar
                open={open}
                anchorOrigin={{vertical: "top", horizontal: "right"}}
                autoHideDuration={3000}
                TransitionComponent={Slide}
                transitionDuration={{enter: 1000, exit: 2000}}
                TransitionProps={{enter: true, exit: false}}
                onClose={handleClose}
                action={action}
                sx={{

                    color: "secondary",

                    "& .MuiSnackbarContent-root": {backgroundColor: "green"}
                }}
            >
                <Alert severity={alertType} sx={{width: "100%"}}>
                    {message}
                </Alert>
            </Snackbar>
            <div style={{marginTop: "40px", textAlign: "left"}}>
            </div>
        </div>
    );

}