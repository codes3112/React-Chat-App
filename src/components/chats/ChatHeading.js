import React from "react";


export default function ({ name, numberOfUsers }) {
    return (
        <div className="chat-header">
            <div className="user-info">
                <div className="user-name">{name}</div>
                <div className="status">
                    <div className="indicator" />
                    <span>{numberOfUsers ? numberOfUsers : null}</span>
                </div>
            </div>
            <div className="options">
                {/* <FAVideo />
        <FAUserPlus />
        <MdEllipsisMenu /> */}
            </div>
        </div>
    );
}
