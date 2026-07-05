import { db } from "../server.js";

export const pushNewsletter = async (req, res) => {
  const formData = req.body;
  const image = req.file ? req.file.buffer : null;

  const newNewsletterPost = {
    edition: formData.edition, // This will act as your title string (e.g., "Newsletter Edition 1")
    link: formData.link,
    image: image,
    date: formData.date || new Date(),
  };

  try {
    await db.query(
      `INSERT INTO newsletter (edition, link, image, date) 
       VALUES ($1, $2, $3, $4)`,
      [
        newNewsletterPost.edition,
        newNewsletterPost.link,
        newNewsletterPost.image,
        newNewsletterPost.date,
      ]
    );
    res.status(201).json({ message: "Newsletter added successfully" });
  } catch (err) {
    console.error(`Database error: ${err}`);
    res.status(500).json({ error: "Error adding newsletter" });
  }
};

export const getNewsletter = async (req, res) => {
  try {
    const response = await db.query("SELECT * FROM newsletter");
    const newsletters = response.rows.map((newsletter) => {
      if (newsletter.image) {
        const imageBase64 = newsletter.image.toString("base64");
        // Maps edition to 'title' so the frontend component reads it instantly
        return { 
          ...newsletter, 
          title: newsletter.edition, 
          image: imageBase64 
        };
      }
      return { ...newsletter, title: newsletter.edition };
    });

    res.status(200).json(newsletters);
  } catch (err) {
    console.error(`Database error: ${err}`);
    res.status(500).json({ error: "Error fetching newsletters" });
  }
};

export const deleteNewsletter = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM newsletter WHERE id = $1", [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Newsletter not found" });
    }
    await db.query("DELETE FROM newsletter WHERE id = $1", [req.params.id]);

    res.status(200).json({ message: "Newsletter deleted successfully" });
  } catch (err) {
    console.error(`Database error: ${err}`);
    res.status(500).json({ error: "Error deleting newsletter" });
  }
};
