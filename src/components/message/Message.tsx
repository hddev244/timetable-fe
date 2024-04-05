import React from 'react';

interface MessageProps {
    message: string;
    type: 'success' | 'error' | 'info';
}

const Message: React.FC<MessageProps> = ({ message, type }) => {
    const messageClass = `message ${type} bg-gray-200 p-4 rounded-md transition duration-300 ease-in-out transform translate-y-0 `;

    return (
        <div className={messageClass}>
            <p>{message}</p>
        </div>
    );
};

export default Message;