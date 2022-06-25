import React from 'react';

export interface IAddPostProps {};

export const AddPost: React.FunctionComponent<IAddPostProps> = (props) => {

    return (

        <div className="AddPost-container">
            <h1>Dodaj post</h1>
        </div>

    );

}