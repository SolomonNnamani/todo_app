import React from 'react'

const L_NotFound = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "4rem" }}>
    <h1 className="text-5xl font-bold">404 - Page Not Found</h1>
    <p>Oops! We couldn’t find the page you were looking for.</p>
    <a href="/" style={{ color: "blue", textDecoration: "underline" }}>
      Go back to homepage
    </a>
  </div>
  )
}

export default L_NotFound