const React = require('react')
const { connect } = require('react-redux')

function StoriesList (props) {
  const { stories } = props

  return (
    <div className='stories-list-component'>
      <ul>
        {stories.map(story => (
          <li className='stories-list-component__item'>
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

function mstp (state) {
  console.log('\n\n\n\n mstp state:', state)
  return state.stories
}

module.exports = connect(mstp)(StoriesList)
