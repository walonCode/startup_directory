import { Link } from "react-router-dom";

const Hero = () => {
    return (
      <section className="bg-gradient-to-r flex flex-col gap-4 items-center justify-center min-h-screen from-green-600 to-black text-white text-center py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl font-bold mb-6">
            Discover Innovative Startups with Ease
          </h1>
          <p className="text-xl mb-8">
            Join a community of visionary entrepreneurs and explore a wide range of startups.
          </p>
          <Link
            to="startup"
            className="bg-green-600 text-white py-4 px-6 mt-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition"
          >
            Add Your Startup
          </Link>
        </div>
      </section>
    );
};
  
export default Hero;
  