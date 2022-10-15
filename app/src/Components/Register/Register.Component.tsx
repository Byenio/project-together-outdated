import { useEffect, useState } from 'react';
import { getClasses } from 'Proxies/Register/getClasses';
import { RegisterForm } from './Components/Register.Form';

const useClasses = () => {

    const [classes, setClasses] = useState<[]>([])
    const [errors, setErrors] = useState(null);

    const fetchClasses = async () => {

        await getClasses()
            .then((returnedClasses) => {
                setClasses(returnedClasses);
            })
            .catch((error) => {
                setErrors(error);
            })

    }

    useEffect(() => {
        fetchClasses();
    }, [])

    return { classes, errors };

}

export default function Log() {

    const { classes } = useClasses();

    return (

        <>
            <RegisterForm classes={classes} />
        </>

    );

}