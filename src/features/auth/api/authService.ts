import $api from "@/shared/api/axios";

interface LoginData {
    email: string;
    password: string;
}

interface RegisterData {
    email: string;
    first_name: string;
    last_name: string;
    middle_name: string;
    password: string;
    role: number;
    birth_date: string | null;
}

interface AuthResponse {
    detail: string;
    access_token: string;
    user: object;
}

const AuthService = {
    login: async (data: LoginData) : Promise <AuthResponse> => {
        try {    
            const response = await $api.post("public/users/login/", data);
            return response.data;        
        } catch (error) {
            throw {
                name: error.name,
                message: error.message,
                stack: error.stack, 
                response: error.response
            }
        }
    },

    register: async (data: RegisterData) : Promise <AuthResponse> => {
        try {
            const response = await $api.post("public/users/register/", data);
            return response.data;
        } catch (error) {
            throw {
                name: error.name,
                message: error.message,
                stack: error.stack, 
                response: error.response
            }
        }
    },

    refresh: async () : Promise <AuthResponse> => {
        try {
            const response = await $api.post("public/users/refresh-token/");
            return response.data;
        } catch (error) {
            throw {
                name: error.name,
                message: error.message,
                stack: error.stack, 
                response: error.response
            }
        }
    }
};

export default AuthService;