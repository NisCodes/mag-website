import EventForm from "./components/EventForm.jsx";
import MagazineForm from "./components/MagazineForm.jsx";
import BlogForm from "./components/BlogForm.jsx";
import MessageForm from "./components/MessageForm.jsx";
import GalleryForm from "./components/GalleryForm.jsx";
import PoetryForm from "./components/PoetryForm.jsx";
function App() {
  return (
    <div className="App">
      EventForm
      <br />
      <EventForm />
      <hr />
      MagazineForm
      <br />
      <MagazineForm />
      <hr />
      BlogForm
      <br />
      <BlogForm />
      <hr />
      MessageForm
      <br />
      <MessageForm />
      <hr />
      GalleryForm
      <br />
      <GalleryForm />
      <hr />
      PoetryForm
      <br />
      <PoetryForm />
    </div>
  );
}

export default App;
