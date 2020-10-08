import React from 'react';
import PropTypes from 'prop-types';

const LoginContainer = ({error,request,username,handleChange,password,handleSubmit,years}) => {
    return (
        <form className="login" >
            {request && <div>{request}</div>}
            <div >

                <div className="label_username">ЕГН :</div>
                <input
                    className="input_form"
                    name="username"
                    value={username}
                    onChange={handleChange}
                />
                <div>
                    {error.username === undefined
                        ? ""
                        : error.username}
                </div>
            </div>
            <div>
                <div className="label_password">Парола :</div>
                <div>
                    <input
                        className="input_form"
                        type="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                    />
                    <div>
                        {error.password === undefined
                            ? ""
                            : error.password}
                    </div>
                </div>

            </div>
            <button onClick={handleSubmit} className="submit" type="submit">
                Влез
            </button>
        </form>
    );
};

LoginContainer.propTypes = {

};

export default LoginContainer;
