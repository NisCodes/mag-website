import { db } from "../server.js";

export const pushPoem = async (req, res) => {
  const formData = req.body;

  const image = req.file ? req.file.buffer : null;

  const newBlogPost = {
    title: formData.title,
    content: formData.content,
    image: image,
    author: formData.author,
    date: formData.date || new Date(),
    rollno: formData.rollno,
    category: formData.category,  // Include category field here
    approved: false,
  };

  try {
    await db.query(
      `INSERT INTO poetry (title, content, image, author, date, rollno, category, approved) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        newBlogPost.title,
        newBlogPost.content,
        newBlogPost.image,
        newBlogPost.author,
        newBlogPost.date,
        newBlogPost.rollno,
        newBlogPost.category,  // Pass category value
        newBlogPost.approved,
      ]
    );
    res.status(201).json({ message: "Prose/Poetry post created successfully" });
  } catch (err) {
    console.error(`Database error: ${err}`);
    res.status(500).json({ error: "Error creating Prose/Poetry post" });
  }
};

export const getPoem = async (req, res) => {
  try {
    const response = await db.query(
      "SELECT * FROM poetry WHERE approved = true"
    );
    const blogs = response.rows.map((blog) => {
      if (blog.image) {
        const imageBase64 = blog.image.toString("base64");
        return { ...blog, image: imageBase64 };
      }
      return blog;
    });

    res.status(200).json(blogs);
  } catch (err) {
    console.error(`Database error: ${err}`);
    res.status(500).json({ error: "Error fetching prose/poetry" });
  }
};

export const getallPoem = async (req, res) => {
  try {
    const response = await db.query("SELECT * FROM poetry");
    const blogs = response.rows.map((blog) => {
      if (blog.image) {
        const imageBase64 = blog.image.toString("base64");
        return { ...blog, image: imageBase64 };
      }
      return blog;
    });

    res.status(200).json(blogs);
  } catch (err) {
    console.error(`Database error: ${err}`);
    res.status(500).json({ error: "Error fetching prose/poetry" });
  }
};

export const deletePoem = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM poetry WHERE id = $1", [
      req.params.id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Prose/Poetry not found" });
    }

    await db.query("DELETE FROM poetry WHERE id = $1", [req.params.id]);

    res.status(200).json({ message: "prose/poetry deleted successfully" });
  } catch (err) {
    console.error(`Database error: ${err}`);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the prose/poetry" });
  }
};

export const approvePoem = async (req, res) => {
  try {
    const result = await db.query(
      "UPDATE poetry SET approved = true WHERE id = $1 RETURNING *",
      [req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Prose/poetry not found" });
    }
    res
      .status(200)
      .json({ message: "prose/poetry approved successfully", blog: result.rows[0] });
  } catch (err) {
    console.error(`Database error: ${err}`);
    res
      .status(500)
      .json({ error: "An error occurred while approving the prose/poetry" });
  }
};
