import axios from 'axios';

export const handleRemove = async (id) =>
    await axios.delete(process.env.REACT_APP_API + '/product/'+id)
    
export const listby = async (limit,sort,order) =>
    await axios.post(process.env.REACT_APP_API + '/productby',{limit,sort,order})
    