import React, { useContext, useEffect, useState } from 'react';
import { BASE_API_URL } from 'config';
import { getNewpostDropdown } from 'Proxies/Account.NewPost/getDropdown';
import { AuthContext } from 'Contexts/Auth.Context';
import { useForm } from 'react-hook-form';

const useDropdown = () => {

    const [subjects, setSubjects] = useState<any[]>([]);
    const [types, setTypes] = useState<any[]>([]);
    const [errors, setErrors] = useState(null);

    const fetchDropdown = async () => {

        getNewpostDropdown()
            .then((response) => {
                setSubjects(response.subjects);
                setTypes(response.types);
            })
            .catch((error) => {
                setErrors(error)
            })

    }

    useEffect(() => {
        fetchDropdown();
    }, [])

    return { subjects, types };

}

function NewPost() {

    const auth = useContext(AuthContext);
    const { subjects, types } = useDropdown();
    const { register, handleSubmit, formState: { errors } } = useForm();
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
        myHeaders.append('authorization', `Bearer ${auth.accessToken}`);
        myHeaders.append("x-refresh", `Bearer ${auth.refreshToken}`);

        console.log(data);

        const response = await fetch(`${BASE_API_URL}/api/posts`, {
            method: 'POST',
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

        const resData = await response;
        setLoading(false);
        console.log(resData);
    }

    return (
        <div className='flex-1 min-width-[70%]'>
            <form onSubmit={handleSubmit(onSubmit)} className='text-black rounded-xl justify-end border-4 m-5 p-5 flex flex-wrap'>
                <textarea cols={30} rows={10} {...register('description')} placeholder="Podaj opis postu" className="basis-[100%] border-2"></textarea>
                <div>
                Przedmiot
                <select {...register('subject')} className="ml-2 mr-5">
                    <option disabled selected>-</option>
                    {subjects.map(subject => {
                        return (
                            <option value={subject._id}>
                                {subject.name}
                            </option>
                        )
                    })}
                </select>
                </div>
                <div>
                Typ
                <select {...register('type')} className="ml-2 mr-5">
                    <option disabled selected>-</option>
                    {types.map(type => {
                        return (
                            <option value={type._id}>
                                {type.name}
                            </option>
                        )
                    })}
                </select>
                </div>
                <input type="submit" value="Utwórz post" />
            </form>
            {loading &&
                <div>
                    Ładowanie...
                </div>
            }
            {fetchError &&
                <div>
                    Wprowadzono niepoprawne dane
                </div>
            }
        </div>
    );

}

export default NewPost;