import axios from '../../../axios'
import React, { useCallback, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import jwt_decode from "jwt-decode"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



function MovieList() {
    const [cookies] = useCookies([])
    const [movieList, setMovieList] = React.useState([]);


    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
      }
      
      const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
      ];

    React.useEffect(() => {
        axios.get("/api/user/getMovies").then((response) => {
            setMovieList(response.data)
            console.log(movieList,'oioioioi')
        })
    }, [setMovieList])


   

    // var getscreen = useCallback(async () => {
    //     const token = cookies.theatreToken
    //     const theatreId = await jwt_decode(token)
    //     axios.get(`/api/theatre/getscreens/${theatreId.id}`).then((response) => {
    //         setScreen(response.data.screen)
    //     })
    // })
    
    return (
        <>
             <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><strong>Movie Name</strong></TableCell>
            <TableCell align=""><strong>Genre</strong></TableCell>
            <TableCell align=""><strong>Duration</strong></TableCell>
            <TableCell align=""><strong>ReleaseDate</strong></TableCell>
            <TableCell align=""><strong>Poster</strong></TableCell>
            <TableCell align=""><strong>Edit</strong></TableCell>
            <TableCell align=""><strong>Delete</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {movieList.map((row) => (
            <TableRow
              key={row.title}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="">{row.genre}</TableCell>
              <TableCell align="">{row.duration}</TableCell>
              <TableCell align="">{row.releasedate}</TableCell>
              <TableCell align=""><img
                                className=""
                                style={{'height':'50px',width:"50px"}}
                                src={`https://res.cloudinary.com/dp2p38wb5/image/upload/v1678028171/${row.imageUrl}.jpg`}
                                alt=""
                            /></TableCell>
                            <TableCell align="" ><button style={{borderRadius:'10px' ,backgroundColor:'blue',color:'white','height':'50px',width:"50px"}}>Edit</button></TableCell>
                            <TableCell align=""><button  style={{borderRadius:'10px' ,backgroundColor:'red',color:'white','height':'50px',width:"50px"}}>Delete</button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </>
    )
}

export default MovieList