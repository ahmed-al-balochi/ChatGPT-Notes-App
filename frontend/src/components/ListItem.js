import React from 'react'
import {Link} from 'react-router-dom'
const LanguageDetect = require('languagedetect');

let createdAt = (note) => {
  return new  Date(note.created_at).toLocaleDateString()
}

let modifiedAt = (note) => {
  return new  Date(note.modified_at).toLocaleDateString()
}


let getContent = (note) => {
  let content = note.content
  if(content.length > 55) {
    return content.slice(0,55) + '...'
  } else {
    return content
  }
}

function textContentDirection(dir){
  const lngDetector = new LanguageDetect();
  let text = " "
  text = lngDetector.detect(dir)
  //console.log(text)
  if(0 !== text.length && 'arabic' === text[0][0]){
    return 'rtl' 
  }else{
    return 'ltr'
  }
}

const ListItem = ({note}) => {
  return (
    <Link to={`/notes/${note.id}`}>
      <div dir={textContentDirection(note.content)} className='notes-list-item'>
        <h2>{note.title}</h2>
        <p><span>Created: {createdAt(note)} | Updated: {modifiedAt(note)}</span></p>
        <p><span>{getContent (note)}</span></p>
      </div>
    </Link>
  )
}

export default ListItem