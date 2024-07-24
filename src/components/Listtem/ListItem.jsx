import { forwardRef } from 'react';
import './ListItem.css';


const colors = [
    'rgb(255, 143, 143)',
    'rgb(255, 220, 151)',
    'rgb(212, 255, 151)',
    'rgb(151, 255, 241)',
    'rgb(229, 151, 255)']
export default forwardRef( function ListItem({name},ref){
    var color =  Math.floor(Math.random() * (5));
    return (<>
        <div ref={ref} className='listItem' style={{backgroundColor:colors[color]}}>
            <p>{name}</p>
        </div>
    </>)
})