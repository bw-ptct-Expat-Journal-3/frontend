import React from "react";
import "../App.css";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div>
      {/* <div className="Home">About Component</div> */}

      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="CSS/index.css" />
        <title>exPatJournal3</title>
      </head>
      <body>
        <div class="container">
          {/* <!-- Header --> */}
          <header class="header">
            <div>
              <h1>ExPat Journal 3</h1>
            </div>

            <nav>
              <Link to="/home">Home</Link>
              {/* <a href="src/kcomponent/home.js" title="Home Page">
                Home
              </a> */}
              <Link to="/about">About</Link>
              {/* <a href="about.html" title="About Page">
                About
              </a> */}
              <a href="#" title="Contact Page">
                Contact
              </a>
              <a href="#" title="Login Page">
                Login
              </a>
            </nav>
          </header>

          <hr></hr>

          {/* <!-- Main Content --> */}
          <section class="main">
            <section class="intro">
              <span class="imgMain">
                <img className="welcome_photo" />
                {/* <img
                  src="Images/welcome photo.jpg"
                  alt="Intro_Photo"
                  title="Intro Photo"
                  style={{ width: "1200px", height: "300px" }}
                /> */}
              </span>
              <div class="introDiv">
                <h2>Welcome to Expat Journal 3</h2>
                <h3>A Friendly Place for Travelers to Share Their Escape</h3>

                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Inventore explicabo architecto corrupti quod culpa facere,
                  deserunt doloremque consectetur illum aliquam, vitae alias,
                  nisi laudantium nam. Optio iusto eos libero iste. Lorem ipsum
                  dolor sit amet consectetur adipisicing elit. Esse eum earum
                  possimus vel omnis et officiis officia consequuntur quidem
                  itaque. Laboriosam et dolore, dignissimos natus praesentium
                  sed explicabo quisquam possimus. Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Debitis eveniet voluptatum porro
                  nisi! Esse maiores veritatis commodi nihil natus vero ea dicta
                  alias? Voluptate dolor ratione quaerat atque, hic ipsam? Lorem
                  ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
                  corporis molestiae voluptates quos aliquam consectetur
                  accusantium. Animi adipisci eos praesentium, eveniet
                  doloremque quidem voluptate magnam amet iste molestias, rerum
                  sunt.
                </p>

                <nav>
                  <a href="#">
                    <button class="registerBttn">Register</button>
                  </a>
                  <a href="#">
                    <button class="logonBttn">Login</button>
                  </a>
                </nav>
              </div>
            </section>
            <hr></hr>

            <section className="mainContent">
              <div>
                <span className="contentImg">
                  <img className="getaway" alt="getaway" />
                  {/* <img
                    src="Images/getaway.jpg"
                    alt="planned_image"
                    title="Content Photo"
                    style={{ width: "250px", height: "200px" }}
                  /> */}
                </span>
                <h3>Plan Your Getaway</h3>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam
                  delectus veniam, reprehenderit voluptatem molestiae enim
                  obcaecati tempora, sunt consectetur necessitatibus repellat
                  corporis? Labore debitis repudiandae aspernatur corrupti ea
                  nobis quaerat!
                </p>
              </div>

              <div>
                <span className="contentImg2">
                  <img className="share" />
                  {/* <img
                    src="Images/share.jpg"
                    alt="shared_image"
                    title="Content Photo"
                    style={{ width: "250px", height: "200px" }}
                  /> */}
                </span>
                <h3>Share your Experiences w Family and Friends</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Quaerat praesentium tempora aliquam. Dignissimos, odio
                  voluptatem, incidunt ipsam debitis rerum id dolorem, non
                  architecto praesentium tempore reiciendis natus aliquam sed
                  in?
                </p>
              </div>

              <div>
                <span class="contentImg3">
                  <img className="memories" />
                  {/* <img
                    src="Images/memories.jpg"
                    alt="memory_image"
                    title="Content Photo"
                    style={({ width: `${250}px` }, { height: `${200}px` })}
                  /> */}
                </span>
                <h3>Your Memories Always at Your Fingertips </h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
                  animi, totam odio enim eveniet consectetur labore aperiam.
                  Consectetur quo nam ratione eius accusantium cumque nobis esse
                  consequatur ullam, quam omnis.
                </p>
              </div>

              <div>
                <span class="contentImg4">
                  <img className="earth" />
                  {/* <img
                    src="Images/earth.jpg"
                    alt="worldview_image"
                    title="Content Photo"
                    style={{ width: `${250}px`, height: `${200}px` }}
                  /> */}
                </span>
                <h3>The World From a Different View</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Similique quod assumenda reprehenderit odit illum dolorum
                  libero enim vero, veritatis ad, suscipit harum ab esse odio
                  doloribus maxime distinctio beatae aliquid!
                </p>
              </div>
            </section>
          </section>

          <hr></hr>

          {/* <!-- Footer --> */}

          <footer class="footer">
            <h2>See the World Like You Have Never Seen Before </h2>
            <button>Sign Up Today</button>
            <p class="copyright">&copy; ExpatJournal3 2020</p>
          </footer>
        </div>
      </body>
    </div>
  );
};
export default About;
