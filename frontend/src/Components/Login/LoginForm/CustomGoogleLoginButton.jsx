import React from 'react';

const CustomGoogleLoginButton = ({ onClick }) => {
    return (
        <button onClick={onClick} style={buttonStyle}>
            <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google logo" style={iconStyle} />
            <span>Login</span>
        </button>
    );
};

const buttonStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 20px',
    backgroundColor: '#4285F4',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
};

const iconStyle = {
    width: '20px',
    height: '20px',
    marginRight: '10px',
};

export default CustomGoogleLoginButton;
