import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box, Button, TextField } from '@mui/material';
import { Card } from 'antd';
const { Meta } = Card;
const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const [data, setData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    file: '', // or any default value you want
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to send updated data to the server
    console.log('Updated data:', data);
  };

  useEffect(() => {
    console.log('data =', data);
    console.log('user =', user);
    // You can fetch additional data here if needed
    // e.g., setData with server response
  }, []);

  return (
    <div className='container ' style={{ maxHeight: '100vh', overflowY: 'auto' }}>
      
      <Card
                title={<span className='thai-front' style={{ fontSize: '26px', fontWeight: 'bold' }}>PROFILE</span>}
                style={{ width: 1200, margin: 'auto', marginBottom: 30 , marginTop:'30px'}}
                cover={
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img
                            alt="example"
                            src={`http://localhost:5000/uploads/${user.userfile}`}
                            style={{ maxWidth: '100%', maxHeight: 600, objectFit: 'contain' }}
                        />
                    </div>
                }
               
            >
                <Meta
                    description ={<p className='thai-front' style={{ fontSize: '18px' }}> <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    autoFocus
                    value={data.name}
                    onChange={handleChange}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="phone"
                    label="Phone"
                    name="phone"
                  value={data.phone}
                    onChange={handleChange}
                  /></p> }
                /> <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                  <div className="marginBottom">
                            <TextField label="File" type='file' name='file' onChange={handleChange} focused />
                        </div>
       

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Edit Profile
                </Button>
              </Box>
               
                
            </Card>
      
      
     
    </div>
  );
};

export default Profile;
