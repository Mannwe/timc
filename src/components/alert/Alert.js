import React        from 'react';
import styled       from 'styled-components'

const StyledAlert = styled.div`
    color: var(--success-color);
    background-color: var(--success-bgcolor);
    width: var(--login-elements-width);
    height: calc(1.6rem + .75rem + 2px);
    margin: 0 auto;
    margin-top: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    border: 1px solid var(--success-border-color);
    margin-bottom: 1rem;
    padding: 0.6rem;

    /* Si se le ha pasado la prop with, ajustamos el ancho */
    ${({ width }) => width && `width: ${width};` }
    ${({ isError }) => isError && 'color: var(--error-color);' }
    ${({ isError }) => isError && 'background-color: var(--error-bgcolor);' }
    ${({ isError }) => isError && 'border-color: var(--error-color-border);' }

`

const Alert = ({ alert, width }) => {
    
    const { message, type } = alert
    const isError = type === 'error'

    return (
        <StyledAlert
            width={width}
            isError={isError}
        >
            {message}            
        </StyledAlert>
    );
}
 
export default Alert;