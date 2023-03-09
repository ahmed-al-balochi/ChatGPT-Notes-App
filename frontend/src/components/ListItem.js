import React from 'react'
import {Link} from 'react-router-dom'

let createdAt = (note) => {
  return new  Date(note.created_at).toLocaleDateString()
}

let modifiedAt = (note) => {
  return new  Date(note.modified_at).toLocaleDateString()
}


let getContent = (note) => {
  let content = note.content
  if(content.length > 45) {
    return content.slice(0,45) + '...'
  } else {
    return content
  }
}

const ListItem = ({note}) => {
  return (
    <Link to={`/notes/${note.id}`}>
      <div className='notes-list-item'>
        <h2>{note.title}</h2>
        <p><span>Created: {createdAt(note)} | Updated: {modifiedAt(note)}</span></p>
        <p><span>{getContent (note)}</span></p>
      </div>
    </Link>
  )
}

export default ListItem