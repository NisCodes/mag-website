import { db } from "../server.js";

export const pushEvent = async (req, res) => {
  const formData = req.body;

  const image = req.file ? req.file.buffer : null;

  const newEventPost = {
    title: formData.title,
    content: formData.content,
    image: image,
    date: formData.date || new Date(),
  };

  try {
    await db.query(
      `INSERT INTO events (title, content, image, date) 
       VALUES ($1, $2, $3, $4)`,
      [
        newEventPost.title,
        newEventPost.content,
        newEventPost.image,
        newEventPost.date,
      ]
    );
    res.status(201).json({ message: "Event created successfully" });
  } catch (err) {
    console.error(`Database error: ${err}`);
    res.status(500).json({ error: "Error creating event" });
  }
};

export const getEvent = async (req, res) => {
  try {
    const response = await db.query("SELECT * FROM events");
    const events = response.rows.map((event) => {
      if (event.image) {
        const imageBase64 = event.image.toString("base64");
        return { ...event, image: imageBase64 };
      }
      return event;
    });

    res.status(200).json(events);
  } catch (err) {
    console.error(`Database error: ${err}`);
    res.status(500).json({ error: "Error fetching events" });
  }
};

export const deleteEvent = async (req, res) => {
  try{
    const result = await db.query("SELECT * FROM events WHERE id = $1", [req.params.id]);
    if(result.rows.length === 0){
      return res.status(404).json({error: "Event not found"});
    }
    await db.query("DELETE FROM events WHERE id = $1", [req.params.id]);

    res.status(200).json({message: "Event deleted successfully"});
  } catch (err) {
    console.error(`Database error: ${err}`);
    res.status(500).json({error: "Error in deleting ;) event"});
  }
};
