import { BASE_API_URL } from "config";
import { AuthContext } from "Contexts/Auth.Context";
import { FC, useContext } from "react";
import { useForm } from "react-hook-form";

interface IRegisterForm {
  classes: any[];
}

export const RegisterForm: FC<IRegisterForm> = (props) => {

  const auth = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data: any) => {

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    myHeaders.append('authorization', `Bearer ${auth.accessToken}`);
    myHeaders.append("x-refresh", `Bearer ${auth.refreshToken}`);

    const permissionsResponse = await fetch(`${BASE_API_URL}/api/permissions/all`);
    const permissions = await permissionsResponse.json();

    data.permission = permissions.filter((permission: { level: number; }) => permission.level === 0)[0]._id;

    const response = await fetch(`${BASE_API_URL}/api/users`, {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(data)
    })

    const resData = await response.json();
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Imię i nazwisko</label>
        <input {...register('name')} />
      </div>
      <div>
        <label>Adres email</label>
        <input type='email' {...register('email')} />
      </div>
      <div>
        <label>Hasło</label>
        <input type='password' {...register('password')} />
      </div>
      <div>
        <label>Potwierdź hasło</label>
        <input type='password' {...register('passwordConfirmation')} />
      </div>
      <div>
        <label>Klasa</label>
        <select {...register('class')}>
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
  )

}