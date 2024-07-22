import React from 'react'
import "../../../styles/components/AdminManagement/AccessTags.css"

const rightsIds = [
    {
        id: 1,
        name: "analytics"
    },
    {
        id: 2,
        name: "assign"
    },
    {
        id: 3,
        name: "admin"
    },
]

const AccessTags = ({ accessId }) => {
    const right = rightsIds.find(item => item.id === accessId)
    
  return (
    <>
        {right &&
        <div className={"access-tag " + right.name + "-tag"}>
            {right.name}
        </div>}
    </>
  )
}

export default AccessTags