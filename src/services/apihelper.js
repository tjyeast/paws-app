import axios from 'axios';

const api = axios.create({ baseURL: "http://localhost:3001" })

//user paths

export const registerUser = async (registerData) => {
    const userData = await api.post('/auth/signup', registerData);
    localStorage.setItem('authToken', userData.data.token);
    api.defaults.headers.common.authorization = `Bearer ${userData.data.token}`;
    console.log(userData);
    return userData.data.user;
}

export const loginUser = async (loginData) => {
    const userData = await api.post('/auth/login', loginData);
    localStorage.setItem('authToken', userData.data.token);
    api.defaults.headers.common.authorization = `Bearer ${userData.data.token}`;
    console.log(userData);
    return userData.data.user;
    
}

export const verifyUser = async () => {
    const token = localStorage.getItem('authToken');
    
    if (token) {
        api.defaults.headers.common.authorization = `Bearer ${token}`;
        const userData = await api.get('/auth/verify');
        return userData.data;
    } else {
        return false;
    }
}

export const editUser = async(id, userData) => {
    const editedUser = await api.put(`/user/profile/edit/${id}`, userData);
    console.log(editedUser);
    return editedUser.data;
}

export const deleteUser = async(id) => {
    const removeUser = await api.delete(`/user/profile/delete/${id}`);
    return removeUser.data
}

//animals paths

export const fetchCrittersByUser = async(id) => {
    const critterData = await api.get(`/animal/user/${id}`);
    return critterData.data;
}

export const addCritter = async(newCritter) => {
    const critterData = await api.post('/animal/create', newCritter);
    console.log(critterData);
    return critterData.data;
}

export const editCritter = async(id, critterData) => {
    const editedCritter = await api.put(`/animal/edit/${id}`, critterData);
    return editedCritter.data;
}

export const deleteCritter = async(id) => {
    const removeCritter = await api.delete(`/animal/delete/${id}`);
    return removeCritter.data
}

//post paths

export const fetchAllPosts = async () => {
    const postData = await api.get('/post/all');
    return postData.data;
}

export const createPost = async (postData) => {
    const newPost = await api.post(`/post/create`, postData);
    console.log(newPost);
    return newPost.data
}

export const editPost = async(id, postData) => {
    const editedPost = await api.put(`/post/edit/${id}`, postData);
    console.log(postData);
    return editedPost.data;
}

export const deletePost = async(id) => {
    const removePost = await api.delete(`/post/delete/${id}`);
    return removePost.data
}