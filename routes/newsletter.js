const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Newsletter = require('../models/Newsletter');
const nodemailer = require('nodemailer');
const newsData = require('../models/newsData');

// Create a new newsletter

// scru hzfa qgmd eqbz  password
// email :- riyanshigupta2004@gmail.com



router.post('/addnewsletter', auth, async (req, res) => {
  const { title, description } = req.body;
  try {
   
    const newsletter = new Newsletter({ title, description });
    await newsletter.save();
    
 
    const subscribers = await newsData.find();
    
    if (subscribers.length > 0) {
       
      const NEWS_API_KEY = "49d8202a37b24a62b7fd9d6fa7f6aac2";
      const query = encodeURIComponent(title);
      
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${query}&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`
      );
      
      if (!response.ok) throw new Error("Failed to fetch articles");
      
      const data = await response.json();
      const articles = data.articles.slice(0, 3);
      
      // Create email content with the articles
      let emailContent = `
        <h2>${title}</h2>
        <p>${description}</p>
        <h3>Related Articles:</h3>
      `;
      
      articles.forEach(article => {
        emailContent += `
          <div style="margin-bottom: 20px; padding: 15px; border: 1px solid #ddd; border-radius: 5px;">
            <h4>${article.title}</h4>
            <p><i>Source: ${article.source.name} | Published: ${new Date(article.publishedAt).toLocaleDateString()}</i></p>
            <p>${article.description || 'No description available'}</p>
            <a href="${article.url}" style="display: inline-block; background-color: #ff8c00; color: white; text-decoration: none; padding: 8px 15px; border-radius: 5px; font-size: 14px;">Read Full Article</a>
          </div>
        `;
      });
      
      // Create transporter
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'riyanshigupta2004@gmail.com',
          pass: 'scru hzfa qgmd eqbz'
        }
      });
      
      // Send email to all subscribers
      for (const subscriber of subscribers) {
        const mailOptions = {
          from: 'riyanshigupta2004@gmail.com',
          to: subscriber.email,
          subject: `Newsletter: ${title}`,
          html: emailContent
        };
        
        await transporter.sendMail(mailOptions);
      }
    }
    
    res.status(201).json({ 
      message: 'Newsletter created and sent to subscribers', 
      newsletter 
    });
  } catch (err) {
    console.error('Error creating/sending newsletter:', err);
    res.status(500).json({ error: 'Failed to create or send newsletter' });
  }
});

router.get('/newsletter', async (req, res) => {
  try {
    const newsletters = await Newsletter.find();
    res.json(newsletters);
  } catch (err) {
    console.error('Error fetching newsletters:', err);
    res.status(500).json({ error: 'Failed to fetch newsletters' });
  }
});

router.delete('/newsletter/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    await Newsletter.findByIdAndDelete(id);
    res.json({ message: 'Newsletter deleted successfully' });
  } catch (err) {
    console.error('Error deleting newsletter:', err);
    res.status(500).json({ error: 'Failed to delete newsletter' });
  }
});




module.exports = router;
