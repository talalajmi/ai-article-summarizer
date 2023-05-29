import { logo } from "../assets";

const Hero = () => {
  return (
    <header className="flex w-full flex-col items-center justify-center">
      <nav className="mb-10 flex w-full items-center justify-between pt-3">
        <img src={logo} alt="summarizer_logo" className="w-28 object-contain" />
        <button
          type="button"
          className="black_btn"
          onClick={() => {
            window.open(
              "https://github.com/talalajmi/ai-article-summarizer",
              "_blank"
            );
          }}
        >
          GitHub
        </button>
      </nav>
      <h1 className="head_text">
        Summarize Articles with <br className="max-md:hidden" />
        <span className="orange_gradient">OpenAI GPT-4</span>
      </h1>
      <h2 className="desc">
        Simplify your readung with Summarizer, an open-source article summarizer
        that transforms lengthy articles into clear and consice summaries
      </h2>
    </header>
  );
};

export default Hero;
