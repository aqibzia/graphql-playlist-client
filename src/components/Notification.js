import React from 'react';

export const Notification = (props) => {
    const close = () => {
      console.log('closed');
    };
    return (
        <div className="notification">
            <p>{props.message}</p>
            <div className="close" onClick={close}>Close</div>
        </div>
    );
};
