import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const baseURL = 'https://mathk.herokuapp.com/api';

const baseURL = 'http://192.168.8.141:8080/api';

// const baseURL = 'http://localhost:8080/api';
// const baseURL = 'https://mathkids-4ba30.web.app/api';
// const baseURL = 'mathkids-4ba30.firebaseapp.com/api';

const mathApi = axios.create({ baseURL });

mathApi.interceptors.request.use(
    async(config:any) => {
        const token = await AsyncStorage.getItem('token');
        if ( token ) {
            config.headers['x-token'] = token;
        }
        return config;
    }
);

export default mathApi;
