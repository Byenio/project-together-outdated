import React from 'react';
import { FieldInterfaceProps } from './Field';
import Cookies from 'universal-cookie';
import { Navigate } from 'react-router-dom';

export interface IFields {

    [key: string]: FieldInterfaceProps

}

interface FormInterface {

    action: string,
    render: () => React.ReactNode,
    fields: IFields

}

export interface ValuesInterface {

    [key: string]: any;

}

export interface ErrorInterface {

    [key: string]: string;

}

export interface FormStateInterface {

    values: ValuesInterface,
    errors: ErrorInterface,
    submitSuccess?: boolean,

}

export interface FormContextInterface extends FormStateInterface {

    setValues: (values: ValuesInterface) => void;
    validate: (fieldName: string) => void;

}

export const FormContext = React.createContext<FormContextInterface | undefined>(undefined);

//! < Validation
export const required = (values: ValuesInterface, fieldName: string): string =>
  values[fieldName] === null ||
  values[fieldName] === ""
    ? "This must be populated"
    : "";

export const isEmail = (values: ValuesInterface, fieldName: string): string =>
  values[fieldName] &&
  values[fieldName].search(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  )
    ? "This must be in a valid email format"
    : "";

export const maxLength = (
  values: ValuesInterface,
  fieldName: string,
  length: number
): string =>
  values[fieldName] && values[fieldName].length > length
    ? `This can not exceed ${length} characters`
    : "";
//! Validation />

export class Form extends React.Component<FormInterface, FormStateInterface> {

    constructor(props: FormInterface) {
        super(props);

        const errors: ErrorInterface = {};
        const values: ValuesInterface = {};

        this.state = { errors, values }

    }

    private haveErrors(errors: ErrorInterface) {

        var haveError: boolean = false;
        Object.keys(errors).map((key: string) => {

            if (errors[key].length > 0) {
                haveError = true
            }

        });

        return haveError;

    }

    private handleSubmit = async ( e: React.FormEvent<HTMLFormElement> ): Promise<void> => {

        e.preventDefault();

        if (this.validateForm()) {

            const submitSuccess: boolean = await this.submitForm();
            this.setState({ submitSuccess });

        }

    }

    private validateForm(): boolean {
        return true;
    }

    private async submitForm(): Promise<boolean> {
        try {
            const response = await fetch(this.props.action, {
              method: "post",
              headers: new Headers({
                "Content-Type": "application/json",
                Accept: "application/json"
              }),
              body: JSON.stringify(this.state.values)
            })

            const result = await response.json();

            const cookies = new Cookies();
            cookies.set('accessToken', result.accessToken);
            cookies.set('refreshToken', result.refreshToken);

            return response.ok;
        } catch (ex) {
            return false;
        }
    }

    private setValues = (values: ValuesInterface) => {
        this.setState({ values: { ...this.state.values, ...values }})
    }

    private validate = (fieldName: string): string => {
        let newError: string = "";
     
        if (
          this.props.fields[fieldName] &&
          this.props.fields[fieldName].validation
        ) {
          newError = this.props.fields[fieldName].validation!.rule(
            this.state.values,
            fieldName,
            this.props.fields[fieldName].validation!.args
          );
        }
        this.state.errors[fieldName] = newError;
        this.setState({
           errors: { ...this.state.errors, [fieldName]: newError }
        });
        return newError;
    };

    public render() {

        const { submitSuccess, errors } = this.state;
        const context: FormContextInterface = {
            ...this.state,
            setValues: this.setValues,
            validate: this.validate
        };
        
        return (

            <FormContext.Provider value={context}>
                <form onSubmit={this.handleSubmit} noValidate={true}>
                    <div className="container">
                    
                        {this.props.render()}

                        <div className="form-group">
                            <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={this.haveErrors(errors)}
                            >
                            Submit
                            </button>
                        </div>
                        {submitSuccess && (
                            <Navigate to="/account" />
                        )}
                        {submitSuccess === false &&
                            !this.haveErrors(errors) && (
                            <div className="alert alert-danger" role="alert">
                                Email and password doesn't match
                            </div>
                        )}
                    </div>
                </form>
            </FormContext.Provider>

        );

    }

}