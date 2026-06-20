import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const teamMembers = [
  {
    name: 'MAG 2024',
    role: '',
    imgSrc: 'assets/img/team/2024.jpg',
    socialLinks: {
      twitter: '',
      facebook: '',
      instagram: '',
      linkedin: ''
    }
  },
  {
    name: 'MAG 2023',
    role: '',
    imgSrc: 'assets/img/team/2023.jpg',
    socialLinks: {
      twitter: '',
      facebook: '',
      instagram: '',
      linkedin: ''
    }
  },
  {
    name: 'MAG 2022',
    role: '',
    imgSrc: 'assets/img/team/2022.jpg',
    socialLinks: {
      twitter: '',
      facebook: '',
      instagram: '',
      linkedin: ''
    }
  }
];

function Team() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section id="team" className="team section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Team</h2>
        <p>MAG is not a Club, Its a Family</p>
      </div>

      <div className="container">
        <div className="row gy-4">
          {teamMembers.map((member, index) => (
            <div className="col-lg-4" data-aos="fade-up" data-aos-delay={(index + 1) * 100} key={index}>
              <div className="member">
                <img src={member.imgSrc} className="img-fluid" alt={member.name} />
                <div className="member-info">
                  <div className="member-info-content">
                    <h4>{member.name}</h4>
                    
                  </div>
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Team;
