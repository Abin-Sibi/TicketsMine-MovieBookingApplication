import axios from '../../../../axios'
import React, { useCallback, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import jwt_decode from "jwt-decode"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import DialogTitle from '@mui/material/DialogTitle';
import { toast } from 'react-toastify';
import { FaEdit } from 'react-icons/fa';
import { TiDelete } from 'react-icons/ti';
import { DialogContent, DialogContentText } from '@mui/material';


function TheatreScreens({ refresh }) {
    const [screen, setScreen] = useState([]);
    const [cookies] = useCookies([])
    const [movieList, setMovieList] = React.useState([]);
    const [screenName, setScreenName] = React.useState()
    const [edit, editDetails] = React.useState({ screenname: "", moviename: "", ticketprice: "", showtime: '' })
    const [values, setValues] = useState({});
    const [editValues, setEditValues] = useState({});
    const [open, setOpen] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [ope, setOpe] = React.useState(false);
    const [delDetails, setDelDetails] = React.useState({});


    React.useEffect(() => {
        axios.get("/api/user/getMovies").then((response) => {
            setMovieList(response.data)
        })
    }, [setMovieList])


    const handleClickOpen = (screen) => {
        setOpen(true);
        setScreenName(screen)
    };

    const showData = (screenname, moviename, ticketprice, showtime) => {
        setOpe(true);
        editDetails((prevData) => ({ ...prevData, screenname: screenname, moviename: moviename, ticketprice: ticketprice, showtime: showtime }));
        console.log('sssssssss', screenname)
        setEditValues((prevData) => ({ ...prevData, screenname: screenname, moviename: moviename, ticketprice: ticketprice, showtime: showtime }))
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleCloseEdit = () => {
        setOpe(false)
    };

    const handleDeleteOpen = (screenName,showTime) =>{
            setOpenDelete(true)
            console.log(screenName,showTime,'11111111111111111111111')
            setDelDetails((prevData) => ({ ...prevData, screenname: screenName, showtime: showTime }))
    }

    const handleDeleteClose = () =>{
        setOpenDelete(false)
    }
    useEffect(() => {
        getscreen();
    }, [refresh])

    const handleChange = (e) => {

        console.log('editValueskkkkk', edit)
        editDetails({ ...edit, [e.target.name]: e.target.value })
        console.log('editValues', edit)
    }

    var getscreen = useCallback(async () => {
        const token = cookies.theatreToken
        const theatreId = await jwt_decode(token)
        axios.get(`/api/theatre/getscreens/${theatreId.id}`).then((response) => {
            setScreen(response.data.screen)
        })
    })
    const addmovie = async () => {
        if (Object.values(values).some((value) => !value || value.length < 2 || /^\s*$/.test(value))) {
            toast.error(`Fill each field`, { theme: "light" }, {
                position: "top-right",
            })
        } else {
            setOpen(false)
            const token = cookies.theatreToken
            const theatreId = await jwt_decode(token)
            axios.post('/api/theatre/addmovie', { values, theatreId, screenName }).then((response) => {
                if (response.status) {
                    getscreen()
                    toast.success(`Show added Succsessfully`, { theme: "light" }, {
                        position: "top-right",
                    })
                }
            })
        }
    }

    const editmovie = async (screenName, showTime) => {
        setOpe(false)
        console.log(edit, 'fsdkljs   dksjl')
        const token = cookies.theatreToken
        const theatreId = await jwt_decode(token)
        console.log(screenName, showTime, 'wwwwwwwwwwwwwww')
        axios.patch('/api/theatre/editmovie', { edit, editValues, theatreId, screenName, showTime }).then((response) => {
            if (response.status) {
                getscreen()
                toast.success(`Show edited Succsessfully`, { theme: "light" }, {
                    position: "top-right",
                })
            }
        })
    }

    const removemovie = async () => {

        console.log('jaaaaaajjaaaaaaaaaaaaaa',delDetails)
        const token = cookies.theatreToken
        const theatreId = await jwt_decode(token)
        setOpenDelete(false)
        // console.log(screenName, showTime, 'wwwwwwwwwwwwwww')
        axios.patch('/api/theatre/removemovie', { theatreId, delDetails }).then((response) => {
            if (response.status) {
                getscreen()
                toast.success(`Show removed Succsessfully`, { theme: "light" }, {
                    position: "top-right",
                })
            }
        })
    }
    return (
        <>
            {screen?.map((screen, i) => {
                return (
                    <div style={{ marginTop: "50px", background: "linear-gradient(50deg, rgb(50, 100, 80), rgb(10,10,10))", borderRadius: "10px", padding: "50px", width: "auto", height: "auto", textAlign: "center" }}>
                        <h1>Screen {i + 1} - {screen.screenname}</h1>
                        <span>{screen.rows},{screen.column}</span><br></br>
                        <div>
                            <button style={{ borderRadius: "10px", color: "black", margin: "5px", width: "120px" }} onClick={() => handleClickOpen(screen.screenname)}>Add Movie</button>
                            <div>
                                <Dialog open={open} onClose={handleClose}>
                                    <DialogTitle key={i}>Screen: {screenName}</DialogTitle>
                                    <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, }} noValidate autoComplete="off" >
                                        <div>
                                            <TextField id="outlined-select-currency" select label="Movie" defaultValue="Movie" helperText="Please select movie from the list" name='moviename' onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })} >
                                                {movieList.map((option) => (
                                                    <MenuItem key={option.title} value={option.title} >
                                                        {option.title}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                            <TextField id="outlined-basic" label="Time" name='showtime' type='time' variant="outlined" onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })} required />
                                            <TextField id="outlined-basic" label="TicketPrice" name='ticketprice' variant="outlined" onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })} required />
                                        </div>
                                    </Box>
                                    <DialogActions>
                                        <Button onClick={handleClose}>Cancel</Button>
                                        <Button onClick={addmovie}>Add</Button>
                                    </DialogActions>
                                </Dialog>
                            </div>
                            <div className="grid-container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridGap: "20px" }}>
                                {screen.showInfo?.map((show, index) => {
                                    return (
                                        <div class="grid-child" style={{ background: "linear-gradient(50deg, rgb(27, 39, 80), rgb(30, 139, 131))", borderRadius: "10px", display: "flex", height: "40px", fonSize: "20px", justifyContent: " space-between" }}>
                                            <div style={{ margin: "auto" }}>{show.moviename} - {show.showtime}</div>
                                            <div style={{ display: "flex" }}>
                                                <button style={{ backgroundColor: "rgb(27, 39, 80)", borderRadius: "10px", marginLeft: "10px", margin: "5px" }} onClick={() => { showData(screen.screenname, show.moviename, show.ticketprice, show.showtime) }}><FaEdit size={25} /></button>
                                                <div>
                                                    <Dialog open={ope} onClose={handleCloseEdit}>
                                                        <DialogTitle key={index}>Screen: {edit.screenname}</DialogTitle>
                                                        <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, }} noValidate autoComplete="off">
                                                            <div>
                                                                <TextField id="outlined-select-currency" select key={index} defaultValue="Movie" helperText="Please select movie from the list" name='moviename' value={edit.moviename} onChange={handleChange}>
                                                                    {movieList.map((option) => (
                                                                        <MenuItem key={option.title} value={option.title} >
                                                                            {option.title}
                                                                        </MenuItem>
                                                                    ))}
                                                                </TextField>
                                                                <TextField id="outlined-basic" label="Time" name='showtime' type='time' value={edit.showtime} variant="outlined" onChange={handleChange} required />
                                                                <TextField id="outlined-basic" label="TicketPrice" name='ticketprice' value={edit.ticketprice} variant="outlined" onChange={handleChange} required />
                                                            </div>
                                                        </Box>
                                                        <DialogActions>
                                                            <Button onClick={handleCloseEdit}>Cancel</Button>
                                                            <Button onClick={() => { editmovie(edit.screenname, edit.showtime) }}>Edit</Button>
                                                        </DialogActions>
                                                    </Dialog>
                                                </div>
                                                <button style={{ backgroundColor: "red", borderRadius: "10px", marginLeft: "10px", marginRight: "10px", margin: "5px" }} onClick={()=>{handleDeleteOpen(screen.screenname, show.showtime)}}><TiDelete size={25} /></button>
                                                <Dialog open={openDelete} onClose={handleDeleteClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                                                    <DialogTitle id="alert-dialog-title">
                                                        {"Use Google's location service?"}
                                                    </DialogTitle>
                                                    <DialogContent>
                                                        <DialogContentText id="alert-dialog-description">
                                                            Let Google help apps determine location. This means sending anonymous
                                                            location data to Google, even when no apps are running.
                                                        </DialogContentText>
                                                    </DialogContent>
                                                    <DialogActions>
                                                        <Button onClick={handleDeleteClose}>Disagree</Button>
                                                        <Button onClick={removemovie} autoFocus>
                                                        Agree
                                                        </Button>
                                                    </DialogActions>
                                                </Dialog>
                                            </div>
                                        </div>)
                                })}
                            </div>
                        </div>
                    </div>
                )
            })
            }
        </>
    )
}

export default TheatreScreens