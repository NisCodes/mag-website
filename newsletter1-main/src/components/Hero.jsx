import "../styles/Hero.css";

function Hero() {
  return (
    <section className="hero">

      <div className="hero-left">

        <h1>
          Read Amazing
          <br />
          Newsletters.
        </h1>

        <p>
          Read and grow with our newsletters on this amazing platfrom created by MAG.com
        </p>

        <div className="hero-buttons">
          <button className="primary-btn">Get Started</button>
          <button className="secondary-btn">Learn More</button>
        </div>

      </div>

      <div className="hero-right">
  <div className="hero-card">

    <h2>Newsletter</h2>

    <p>
      Read our beautiful newsletters and connect with your college effortlessly.
    </p>

    <button className="primary-btn">
      Explore
    </button>

  </div>
</div>

    </section>
  );
}

export default Hero;