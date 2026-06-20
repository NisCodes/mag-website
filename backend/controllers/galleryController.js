import { db } from "../server.js";

// Handle image upload
export const pushImage = async (req, res) => {
  const formData = req.body;

  const image = req.file ? req.file.buffer : null;

  if (!image) {
    return res.status(400).json({ error: "No image provided" });
  }

  try {
    await db.query(
      `INSERT INTO gallery (image_data) 
             VALUES ($1)`,
      [image]
    );
    res.status(201).json({ message: "Gallery post created successfully" });
  } catch (err) {
    console.error(`Database error: ${err}`);
    res.status(500).json({ error: "Error creating gallery post" });
  }
};

export const getImage = async (req, res) => {
  try {
    const response = await db.query("SELECT * FROM gallery");
    const images = response.rows.map((image) => {
      if (image.image_data) {
        const imageBase64 = image.image_data.toString("base64");
        return { ...image, image_data: imageBase64 };
      }
      return image;
    });

    res.status(200).json(images);
  } catch (err) {
    console.error(`Database error: ${err}`);
    res.status(500).json({ error: "Error fetching gallery images" });
  }
};
