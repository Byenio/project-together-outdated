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

const useSubmit = async (data: any) => {

    const auth = useContext(AuthContext);

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

    const resData = await response.json();
    console.log(resData);

}

function NewPost() {

    const { subjects, types } = useDropdown();
    const { register, handleSubmit, formState: { errors } } = useForm();

    return (
        <>
            <form onSubmit={handleSubmit(useSubmit)}>
                <textarea cols={30} rows={10} {...register('description')}></textarea>
                <select {...register('subject')}>
                    {subjects.map(subject => {
                        return (
                            <option value={subject._id}>
                                {subject.name}
                            </option>
                        )
                    })}
                </select>
                <select {...register('type')}>
                    {types.map(type => {
                        return (
                            <option value={type._id}>
                                {type.name}
                            </option>
                        )
                    })}
                </select>
                <input type="submit" value="Utwórz post" />
            </form>
        </>
    );

}

export default NewPost;