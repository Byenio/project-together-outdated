import { BASE_API_URL } from "config";
import { AuthContext } from "Contexts/Auth.Context";
import { FC, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface IRegisterForm {
    classes: any[];
}

export const RegisterForm: FC<IRegisterForm> = (props) => {

    const auth = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState<boolean>(false);
    const [fetchError, setFetchError] = useState<boolean>(false);
    const [fetchErrorStatus, setFetchErrorStatus] = useState<Number>(0);

    const navigate = useNavigate();

    const onSubmit = async (data: any) => {
        setLoading(true);
        setFetchError(false);
        setFetchErrorStatus(0);

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Accept", "application/json");
        myHeaders.append('authorization', `Bearer ${auth.accessToken}`);
        myHeaders.append("x-refresh", `Bearer ${auth.refreshToken}`);

        const permissionsResponse = await fetch(`${BASE_API_URL}/api/permissions/all`);
        const permissions = await permissionsResponse.json();

        data.permissionLevel = permissions.filter((permission: { level: number; }) => permission.level === 0)[0]._id;

        const response = await fetch(`${BASE_API_URL}/api/users`, {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(data)
        })
            .then(res => {
                if (res.status >= 400) {
                    setFetchError(true);
                    setFetchErrorStatus(res.status);
                    setLoading(false);
                }
                return res.json();
            })

        const registerResData = await response;
        if (registerResData) {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Accept", "application/json");

            const response = await fetch(`${BASE_API_URL}/api/sessions`, {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify({
                    email: data.email,
                    password: data.password
                })
            })

            const loginResData = await response.json();
            localStorage.setItem('accessToken', loginResData.accessToken)
            localStorage.setItem('refreshToken', loginResData.refreshToken)

            setLoading(false);
            navigate('/');
            window.location.reload();
        }
    }

    return (
        <div className='flex justify-center w-full p-10 m-2 flex-wrap'>
            <div className='flex justify-center w-full max-w-[600px] p-6 flex-wrap rounded-xl border-4'>
                <form onSubmit={handleSubmit(onSubmit)} className='text-black flex justify-center w-[60%] flex-wrap'>
                    <div className="basis-[100%]">
                        <label>Imię i nazwisko</label>
                        <input {...register('name')} className="basis-[100%] bg-gray-300	m-2 rounded-md" />
                    </div>
                    <div className="basis-[100%]">
                        <label>Adres email</label>
                        <input type='email' {...register('email')} className="bg-gray-300	m-2 rounded-md" />
                    </div>
                    <div className="basis-[100%]">
                        <label>Hasło</label>
                        <input type='password' {...register('password')} className="basis-[100%] bg-gray-300	m-2 rounded-md" />
                    </div>
                    <div className="basis-[100%]">
                        <label>Potwierdź hasło</label>
                        <input type='password' {...register('passwordConfirmation')} className="basis-[100%] bg-gray-300	m-2 rounded-md" />
                    </div>
                    <div className="basis-[100%]">
                        <label>Klasa   </label>
                        <select {...register('class')}>
                            <option disabled selected>-</option>
                            {props.classes.map(element => {
                                return (
                                    <option value={element._id}>
                                        {element.name}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <div>
                        <input type="submit" value="Zarejestruj się" />
                    </div>
                </form>
                {loading &&
                    <div className="basis-full text-black">
                        Ładowanie...
                    </div>
                }
                {fetchError &&
                    <div>
                        Użytkownik z podanym adresem email już istnieje
                    </div>
                }
            </div>
        </div>
    )

}