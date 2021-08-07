import axios from 'axios'
const url = 'http://localhost:4000'
const API = axios.create({baseURL: url})

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req;
})

export const fetchPosts = () => API.get('/posts')
export const createPost = (newPost) => API.post('/posts', newPost)
export const updatePost = (id,post) => API.patch(`/posts/${id}` , post)
export const deltePost = (id) => API.delete(`/posts/${id}`)
export const likeCount = (id) => API.patch(`/posts/${id}/likeCount`)


export const signIn = (formdata) => API.post('/user/signin' , formdata)
export const signUp = (formdata) => API.post('/user/signup' , formdata)
