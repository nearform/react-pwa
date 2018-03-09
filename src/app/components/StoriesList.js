const React = require('react')

function StoriesList (props) {
  const { stories } = props

  return (
    <div className='stories-list-component'>
      <ul>
        {stories.filter(Boolean).map(story => (
          <li className='stories-list-component__item' key={story.id}>
            <span>{story.score}</span>
            <span><a href={story.url}>{story.title}</a></span>
            <br />
            <span>by {story.by.id}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
module.exports = StoriesList
