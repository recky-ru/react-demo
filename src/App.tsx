import './App.css'
import PostList from './components/PostList'

function App() {

  return (
    <>
      <h1>Blog Posts</h1>
      <div className="card">
        <PostList></PostList>
      </div>
    </>
  )
}

export default App
