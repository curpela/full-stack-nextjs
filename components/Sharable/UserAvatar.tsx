import React from 'react';
import './UserAvatar.scss'


interface Props {
    image?: string,
    height?: string,
    width?: string,
    border?: string
}

const UserAvatar: React.FC<Props> = ({image, width, height, border}) => {
    return (
        <div className="user-avatar" style={{width, height, border}}>
            <img className="user-avatar-image" src={image ? image : "https://images.unsplash.com/photo-1556955112-28cde3817b0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"}></img>
        </div>
    )
}

export default UserAvatar
