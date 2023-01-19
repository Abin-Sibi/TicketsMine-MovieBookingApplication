import React from 'react'
import TheatreDashboard from '../components/Theatre/TheatreHome/TheatreHome'
import TheatreSidebar from '../components/Theatre/TheatreSidebar/TheatreSidebar'

function TheatreHome() {
  return (
    <TheatreSidebar>
     <TheatreDashboard/>
    </TheatreSidebar>
    
  )
}

export default TheatreHome