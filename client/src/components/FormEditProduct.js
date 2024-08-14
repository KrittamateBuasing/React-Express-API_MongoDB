import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';

import { Button, Box, TextField, Typography, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Card, CardContent, CardActions } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

const FormEditProduct = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [oldfile, setOldFile] = useState()
    const [data, setData] = useState({
        name: "",
        detail: "",
        price: ""
    })


    useEffect(() => {
        loadData(params.id)

    }, [])

    const loadData = async (id) => {
        try {
            const res = await axios.get(process.env.REACT_APP_API + '/product/' + id);
            setData(res.data)
            setOldFile(res.data.file)
        } catch (err) {
            console.log(err);
        }
    };
    console.log(data)


    const handleChange = (e) => {
        const { name, value } = e.target;
        // console.log(e.target.files);
        if (e.target.name === 'file') {
            setData({ ...data, [e.target.name]: e.target.files[0] });
        } else {
            setData({ ...data, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(data);
        console.log(oldfile);
        const formWithImgData = new FormData()
        for (const key in data) {
            formWithImgData.append(key, data[key])
            console.log(formWithImgData)
        }
        formWithImgData.append('oldfile', oldfile)
        await axios.put(process.env.REACT_APP_API + '/product/' + params.id, formWithImgData)
            .then(res => { console.log(res); navigate('/admin/viewtable') })
            .catch((err) => console.log(err))
    }





    return (
        <div>
            <Card>
                <CardContent>

                    <form onSubmit={handleSubmit} enctype="multipart/form-data">

                        <div className="marginBottom">
                            <TextField label="name" type='text' name='name' onChange={handleChange} placeholder='name' value={data.name} />
                        </div>
                        <div className="marginBottom">
                            <TextField label="detail" type='text' name='detail' onChange={handleChange} placeholder='detail' value={data.detail} />
                        </div>
                        <div className="marginBottom">
                            <TextField label="price" type='text' name='price' onChange={handleChange} placeholder='price' value={data.price} />
                        </div>
                        <div className="marginBottom">
                            <TextField label="File" type='file' name='file' onChange={handleChange} focused />
                        </div>

                        <div>
                            <Button type='submit' variant="contained" color="success">
                                Submit
                            </Button>
                        </div>


                    </form>
                </CardContent>
            </Card>
        </div>

    )
}

export default FormEditProduct