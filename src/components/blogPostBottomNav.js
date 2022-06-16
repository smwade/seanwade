import React from 'react'

export const blogPostBottomNav = (props) => {
  return (
    <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={props.previous.url} rel="prev">
                ← {props.previous.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={props.next.url} rel="next">
                {props.next.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
  )
}