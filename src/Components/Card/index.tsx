import React from 'react'
import './style.scss';


interface ButtonProps {
    type: string;
    info: string;
  }
  
  export const Card: React.FC<ButtonProps> = ({ type, info }) => {
    return (
  <button className='button'>
    {type}
    {info}
  </button>
  
)};
