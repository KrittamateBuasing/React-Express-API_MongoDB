import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { handleRemove } from '../Functions/product';
import { Link } from 'react-router-dom';
import { Button, Box, TextField } from '@mui/material'
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

const FormProduct = () => {
    const [data, setData] = useState([]);
    const [form, setForm] = useState({
        name: '',
        detail: '',
        price: ''
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const res = await axios.get(process.env.REACT_APP_API + '/product');
            setData(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        // console.log(e.target.files);
        if (e.target.name === 'file') {
            setForm({ ...form, [e.target.name]: e.target.files[0] });
        } else {
            setForm({ ...form, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formWithImgData = new FormData()
        for (const key in form) {
            formWithImgData.append(key, form[key])
            console.log(formWithImgData)
        }

        try {
            await axios.post(process.env.REACT_APP_API + '/product', formWithImgData);
            loadData();
            handleClose(); // ปิด Modal หลังจากส่งฟอร์มสำเร็จ
            setForm({ name: '', detail: '', price: '' }); // ล้างฟอร์มหลังจากส่งฟอร์มสำเร็จ
        } catch (err) {
            console.log(err);
        }

    }
    const handleRemove = async (id) => {

        console.log(id);

        await axios.delete(process.env.REACT_APP_API + '/product/' + id)
            .then(res => { console.log(res.data); loadData(); })
            .catch((err) => console.log(err))

    }
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <h1>Prodduct Table</h1>
            <div>
                <div className='marginBottom'>

                    <Button onClick={handleOpen} variant="contained" color="success" >ADD Product</Button>
                </div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={{ p: 4, bgcolor: 'background.paper', boxShadow: 24, borderRadius: 1 }}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            ADD PRODUCT DETAIL
                        </Typography>
                        <form onSubmit={handleSubmit} enctype="multipart/form-data">
                            <div className="marginBottom">
                                <TextField label="name" type='text' name='name' onChange={handleChange} placeholder='name' value={form.name} />
                            </div>
                            <div className="marginBottom">
                                <TextField label="detail" type='text' name='detail' onChange={handleChange} placeholder='detail' value={form.detail} />
                            </div>
                            <div className="marginBottom">
                                <TextField label="price" type='text' name='price' onChange={handleChange} placeholder='price' value={form.price} />
                            </div>
                            <div className="marginBottom">
                                <TextField label="File" type='file' name='file' onChange={handleChange} focused />
                            </div>

                            <div>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="success"
                                    fullWidth
                                >
                                    Submit
                                </Button>
                            </div>
                        </form>
                    </Box>
                </Modal>
            </div>


            <TableContainer component={Paper}>
                <Table >
                    <caption>A basic table example with a caption</caption>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>number</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }} >picture</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }} >name</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }} >detail</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }} >price</TableCell>
                            
                            <TableCell sx={{ fontWeight: 'bold' }} align="left">delete</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }} align="left">edit</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item, index) => (
                            <TableRow key={index} >
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell><img
                                    alt="example"
                                    src={'http://localhost:5000/uploads/' + item.file}
                                    style={{ width: 50, height: 50 }}
                                /></TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.detail}</TableCell>
                                <TableCell>{item.price}</TableCell>
                                
                                <TableCell onClick={() => handleRemove(item._id)}>
                                    <Button variant="contained" color='error'> <DeleteForeverIcon></DeleteForeverIcon>delete</Button>
                                </TableCell>
                                <TableCell>
                                    <Link to={'/edit/' + item._id}>
                                        <Button variant="contained" color="primary"><EditIcon></EditIcon>edit</Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    );
};

export default FormProduct;
