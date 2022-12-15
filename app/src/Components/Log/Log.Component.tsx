import { Link } from 'react-router-dom';
import { BASE_API_URL } from "config";
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

export interface LogInterface { };


const Log: React.FunctionComponent = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [fetchError, setFetchError] = useState<boolean>(false);
    const [fetchErrorStatus, setFetchErrorStatus] = useState<Number>(0);

    const onSubmit = async (data: any) => {
        setLoading(true);
        setFetchError(false);
        setFetchErrorStatus(0);

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Accept", "application/json");

        const response = await fetch(`${BASE_API_URL}/api/sessions`, {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(data)
        }).then(res => {
            if (res.status >= 400) {
                setFetchError(true);
                setFetchErrorStatus(res.status);
                setLoading(false);
            }
            return res.json();
        })

        const resData = await response;
        localStorage.setItem('accessToken', resData.accessToken)
        localStorage.setItem('refreshToken', resData.refreshToken)

        setLoading(false);
        navigate('/');
        window.location.reload();

    }

    return (
        <div className='flex justify-center w-full p-10 m-2 flex-wrap'>
            <div className='flex justify-center w-full max-w-[600px] p-6 flex-wrap rounded-xl border-4'>
            <form onSubmit={handleSubmit(onSubmit)} className='flex justify-center w-full flex-wrap'>
                <input
                    type="email"
                    placeholder="Email"
                    {...register('email', { required: true })}
                    className="basis-[100%] bg-gray-300	m-2 rounded-md"
                />
                {errors.email && <span>Email is required</span>}
                <input
                    type="password"
                    placeholder="Password"
                    className="basis-[100%] bg-gray-300	m-2 rounded-md"
                    {...register('password', { required: true })}
                />
                {errors.password && <span>Password is required</span>}
                <input type="submit" className="basis-[100%] text-black"/>
            </form>
            <p className='text-black'>Nie masz konta? <u><Link to='/register'>Zarejestruj się!</Link></u></p>
            {loading &&
                <div>
                    Ładowanie...
                </div>
            }
            {fetchError &&
                <div>
                    Podano niepoprawne dane logowania
                </div>
            }
            </div>
        </div>
    );

}

export default Log;