const React = require('react')

function StoriesList (props) {
  const { stories } = props

  return (
    <ol className='stories-list-component'>
      {stories.filter(Boolean).map(story => (
        <li className='stories-list-component__item' key={story.id}>
          <span><a href={story.url}>{story.title}</a></span>
          <br />
          <span className='stories-list-component__byline'>
            {story.score} points by {story.by.id}
          </span>
        </li>
      ))}
    </ol>
  )
}
module.exports = StoriesList
