import { forwardRef, useImperativeHandle, useState  } from "react";

const Togglable = forwardRef((props, refs) =>
{
    
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible? 'none' : '' }
    const showWhenVisible = { display: visible? '' : 'none' }

    const toggleVisibility = () => setVisible(!visible)

    useImperativeHandle(refs, () => 
        {
            return {
                toggleVisibility
            }
        }, [])
    
    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <br/>
                <button onClick={toggleVisibility}>Cancel</button>
            </div>
        </div>
    )
})

export default Togglable