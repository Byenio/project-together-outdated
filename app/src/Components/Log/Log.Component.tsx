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
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="email"
                    placeholder="Email"
                    {...register('email', { required: true })}
                />
                {errors.email && <span>Email is required</span>}
                <input
                    type="password"
                    placeholder="Password"
                    {...register('password', { required: true })}
                />
                {errors.password && <span>Password is required</span>}
                <input type="submit" />
            </form>
            Nie masz konta? <Link to='/register'>Zarejestruj się!</Link>
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
        </>
    );

}

export default Log;