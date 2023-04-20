import axios from 'axios';

export const getUserProps = (url) =>{
    axios.get(url)
    .then(res=>{
        const userProps = res.data;
        console.log(`GET userProps`,userProps);
    })
    .catch(err => console.error(err));
};

