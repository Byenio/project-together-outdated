import { Link } from 'react-router-dom';
import { BASE_API_URL } from "config";
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";

export interface LogInterface { };


const Log: React.FunctionComponent = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data: any) => {

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Accept", "application/json");

        const response = await fetch(`${BASE_API_URL}/api/sessions`, {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(data)
        })

        const resData = await response.json();
        localStorage.setItem('accessToken', resData.accessToken)
        localStorage.setItem('refreshToken', resData.refreshToken)

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
        </>
    );

}

export default Log;