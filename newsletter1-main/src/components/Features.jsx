import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import "../styles/Features.css";

function Features() {
  const [newsletters, setNewsletters] = useState([]);

  useEffect(() => {
    const fetchNewsletters = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "newsletter1"));

        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(data);
        setNewsletters(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNewsletters();
  }, []);

  return (
    <section className="gallery">
      <h1>Newsletters</h1>

      <div className="gallery-grid">
        {newsletters.map((item) => (
          <div className="card" key={item.id}>
            <a
  href={item.link}
  target="_blank"
  rel="noopener noreferrer"
  className="cover-link"
>
  <img src={item.image} alt={item.title} />
</a>

<h2>{item.title}</h2>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;