const HeroSection = () => {
  return (
    <div className="relative w-full bg-[#F6EEDF] bg-hero-texture bg-cover bg-center overflow-hidden min-h-[calc(100vh-65px)] flex flex-col justify-between">
      
      {/* Background Soft Glow & Overlay */}
      <div className="absolute inset-0 bg-[#F6EEDF]/40 pointer-events-none"></div>

      {/* Main Content Row */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 md:px-8 pt-3 pb-2 flex flex-col lg:flex-row items-center justify-between flex-grow">
        
        {/* LEFT DECORATIONS (Mango Leaves, Kalasham, Jasmine) */}
        <div className="hidden lg:block w-[24%] h-[440px] relative pointer-events-none">
          <img 
            src="/images/left_decorations_1785512180167.png" 
            alt="Ugadi Spring Decorations" 
            className="w-full h-full object-contain object-left-top drop-shadow-md"
          />
        </div>

        {/* CENTER COLUMN (Title, Taglines, Subtitles, Vinayaka PNG) */}
        <div className="w-full lg:w-[50%] flex flex-col items-center justify-center text-center py-2 z-20">
          
          {/* Main Title "వసంతం" Decorative Image */}
          <div className="w-full max-w-[380px] md:max-w-[430px] mx-auto mb-1">
            <img 
              src="/images/vasantham_title_1785512253754.png" 
              alt="వసంతం" 
              className="w-full h-auto drop-shadow-sm"
            />
          </div>

          {/* Tagline 1 directly below Vasantham text */}
          <h2 className="font-serif text-xl md:text-2xl text-[#3B6533] font-bold mb-1.5 tracking-wide drop-shadow-sm">
            తెలుగుదీపిక – అక్షరమాలిక
          </h2>

          {/* Tagline 2 placed after Vasantham tagline */}
          <div className="text-center mb-3">
            <p className="font-serif text-base md:text-lg text-[#3B6533] font-semibold leading-snug drop-shadow-sm">
              "మనసు పలికిన ప్రతి భావానికి
            </p>
            <p className="font-serif text-base md:text-lg text-[#3B6533] font-semibold leading-snug drop-shadow-sm">
              ఒక అక్షర రూపం."
            </p>
          </div>

          {/* Classical Decorative Divider */}
          <div className="flex items-center gap-3 mb-3 text-[#A08530]/70">
            <span className="text-xs">❖</span>
            <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-[#A08530]/50 to-transparent"></div>
            <span className="text-xs">❖</span>
          </div>

          {/* Subtitles */}
          <p className="font-sans text-base md:text-lg text-[#4A3520] font-semibold mb-1">
            తెలుగు సాహిత్యానికి – ఆత్మీయమాతృక
          </p>

          <p className="font-sans text-sm md:text-base text-[#5C4328] font-medium mb-2">
            సాహిత్య సేవలో
          </p>

          {/* Exact Vinayaka Line-Art PNG */}
          <div className="my-1 py-1 px-4 flex items-center justify-center">
            <img 
              src="/images/ganesh_user.png" 
              alt="Lord Vinayaka" 
              className="w-24 h-24 md:w-28 md:h-28 object-contain mix-blend-multiply filter contrast-125 opacity-90 drop-shadow-sm"
            />
          </div>

          {/* Vinayaka Devotional Line */}
          <div className="flex items-center gap-3 text-[#A08530] my-2">
            <div className="h-[1px] w-10 bg-[#A08530]/40"></div>
            <span className="font-serif text-sm md:text-base font-semibold tracking-wide text-[#5C4328]">
              వినాయకా నీమూర్తికే నా మొదటి ప్రణామం
            </span>
            <div className="h-[1px] w-10 bg-[#A08530]/40"></div>
          </div>

        </div>

        {/* RIGHT DECORATION (Krishna & Arjuna Illustration) */}
        <div className="hidden lg:block w-[26%] h-[440px] relative pointer-events-none">
          <div className="w-full h-full relative rounded-2xl overflow-hidden shadow-lg border border-[#E6D7BD]/60">
            <img 
              src="/images/krishna_arjuna_1785512236866.png" 
              alt="Krishna teaching Arjuna" 
              className="w-full h-full object-cover object-center"
            />
            {/* Soft inner vignette border to blend naturally */}
            <div className="absolute inset-0 ring-1 ring-inset ring-[#5C4328]/20 rounded-2xl pointer-events-none"></div>
          </div>
        </div>

      </div>

      {/* Mobile view illustrations bar */}
      <div className="flex lg:hidden items-center justify-between px-6 py-4 bg-[#F0E4C8]/50 border-t border-[#E6D7BD]">
        <img 
          src="/images/left_decorations_1785512180167.png" 
          alt="Ugadi Decorations" 
          className="h-28 object-contain"
        />
        <img 
          src="/images/krishna_arjuna_1785512236866.png" 
          alt="Krishna Arjuna" 
          className="h-28 object-contain rounded-lg shadow-sm"
        />
      </div>

    </div>
  );
};

export default HeroSection;
