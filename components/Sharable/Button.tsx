import React, {ReactNode} from 'react';
import './Button.scss'

interface Props {
    borderBottomLeftRadius?: string, 
    borderTopLeftRadius?: string, 
    background?:string, 
    text?:string | ReactNode, 
    height?:string, 
    padding?:string, 
    width?:string, 
    margin?:string, 
    minWidth?:string, 
    borderRadius?:string

}

const Button: React.FC<Props> = ({borderBottomLeftRadius, borderTopLeftRadius, background, text, height, padding, width, margin, minWidth, borderRadius}) => {
    return (
        <>
            <button className="main-button" style={{borderBottomLeftRadius, borderTopLeftRadius, background, height, padding, width, margin, minWidth, borderRadius}}>{text}</button>
            </>
       
    )
    return (
        <React.Fragment>
            {Button}
        </React.Fragment>
    )
}

export default Button