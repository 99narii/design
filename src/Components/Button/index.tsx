import React from 'react'
import './style.scss';


interface ButtonProps {
    title: string;
    click: () => void;
  }
  
  export const Button: React.FC<ButtonProps> = ({ title, click }) => {
    return (
  <button className='button' onClick={click}>
    {title}
  </button>
  
)};
