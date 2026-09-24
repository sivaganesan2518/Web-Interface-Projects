import bikeride from "./assets/bikeride.jpg";
import carride from "./assets/carride.jpg";
import cybersecurity from "./assets/cybersecurity.jpg";
import football from "./assets/football.jpg";
import music from "./assets/music.jpg";
import volleyball from "./assets/volleyball.jpg";
import "./App.css";


function HobbyCard(props) {
  return (
    <div className="card">

      <img
        src={props.image}
        alt={props.hobby}
      />

      <h2>{props.hobby}</h2>

      <p>{props.description}</p>

    </div>
  );
}


function Hobby() {
  return (
    <div>
      <h1>My Hobbies</h1>

      <div className="hobby-container">

        <HobbyCard
          image={bikeride}
          hobby="bikeride"
          description="I have interested in bikeride."
        />

        <HobbyCard
          image={carride}
          hobby="carride"
          description="I enjoy the carriding."
        />

        <HobbyCard
          image={cybersecurity}
          hobby="cybersecurity"
          description="cybersecurity in ethical hacking."
        />

        <HobbyCard
          image={football}
          hobby="football"
          description="playing football in my friends."
        />

        <HobbyCard
          image={music}
          hobby="music"
          description="I love listening to music."
        />

        <HobbyCard
          image={volleyball}
          hobby="volleyball"
          description="volleyball is not just a game.its an emotion."
        />

      </div>
    </div>
  );
}

export default Hobby;