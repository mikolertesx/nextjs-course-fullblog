import Image from "next/image";
import classes from "./hero.module.css";

const Hero = (props) => {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/site/me.jpg"
          alt="An image showing Max"
          width={500}
          height={500}
        />
      </div>
      <h1>Hi, I'm Mike!</h1>
      <p>I'm a fullstack developer and fanatic of programming!</p>
      <p>Also I have a waifu!</p>
    </section>
  );
};

export default Hero;
