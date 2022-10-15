import { BASE_API_URL } from "config";
import { AuthContext } from "Contexts/Auth.Context";
import { FC, useContext } from "react";
import { useForm } from "react-hook-form";

interface IRegisterForm {
  classes: any[];
}

const useSubmit = async (data: any) => {

  const auth = useContext(AuthContext);

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/json");
  myHeaders.append('authorization', `Bearer ${auth.accessToken}`);
  myHeaders.append("x-refresh", `Bearer ${auth.refreshToken}`);

  const response = await fetch(`${BASE_API_URL}/api/users`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(data)
  })

  const resData = await response.json();

}

export const RegisterForm: FC<IRegisterForm> = (props) => {

  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <form onSubmit={handleSubmit(useSubmit)}>
      <input {...register('name')} />
      <input {...register('email')} />
      <input {...register('password')} />
      <input {...register('passwordConfirmation')} />
      <select {...register('class')}>
        {props.classes.map(element => {
          return (
            <option value={element._id}>
              {element.name}
            </option>
          )
        })}
      </select>
      <input type="submit" value="Zarejestruj" />
    </form>
  )

}