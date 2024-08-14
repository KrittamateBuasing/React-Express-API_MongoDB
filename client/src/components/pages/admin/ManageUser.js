import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { list, changRole } from '../../../Functions/user'

import { Button, Box, TextField, Select, MenuItem } from '@mui/material'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


const ManageUser = () => {
    const [data, setData] = useState([]);
    const { user } = useSelector((state) => ({ ...state }));

    const token_id = user.user.token;
    const role = ['admin', 'user'];
    const handleChangeRole = async (id, e) => {
        console.log(id, e.target.value);
        const dataChange = {
            id: id,
            role: e.target.value
        }
        await changRole(token_id, dataChange)
            .then((res) => {
                loadData(token_id);

            })
            .catch((err) => { console.log(err) })

    };

    useEffect(() => {
        loadData(token_id);

        console.log('data =', data);


    }, []);
    const loadData = async (authtoken) => {
        await list(authtoken)
            .then((res) => {
                setData(res.data)

            })
            .catch((err) => { console.log(err) })
    }
    return (
        <TableContainer component={Paper}>
            <Table >
                <caption>A basic table example with a caption</caption>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>number</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }} >id</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }} >Username</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }} >role</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }} >updateAt</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((item, index) => (
                        <TableRow key={index} >
                            <TableCell component="th" scope="row">
                                {index + 1}
                            </TableCell>
                            <TableCell>{item._id}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>
                                <Select
                                    onChange={(e) => handleChangeRole(item._id, e)}
                                    defaultValue={item.role}
                                    style={{ width: '100px' }}>
                                    {role.map((item) =>
                                        <MenuItem value={item}>
                                            {item}
                                        </MenuItem>)}

                                </Select></TableCell>
                            <TableCell>{item.updatedAt}</TableCell>



                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default ManageUser