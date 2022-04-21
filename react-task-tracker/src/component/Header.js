import React from "react";
import PropTypes from 'prop-types'
import { Button } from "./Button";
const Header = ({ title, onAdd, showAdd }) => {
// const onClick = (e) => {
// console.log('Click', e);
 
 return (
 <header className='header'>
 <h1>
     {title}
 </h1>
 <Button onClick={onAdd} color={showAdd ? 'blue' : 'green'} text={showAdd ? 'Close' : 'Add'} />
 </header>
 )
}
const headingStyle = {
 color: 'darkcyan',
 backgroundColor: 'lightblue',
 textAlign: 'center'
}
Header.defaultProps = {
 title: 'Task Tracker',
}
Header.propTypes = {
 // See changes for isRequired after remove defaultProps
 //<Header title = {1}/> in app.js will show the warining in console.
 title: PropTypes.string.isRequired,
}
export default Header