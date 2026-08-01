const Footer = () => {
  return (
    <footer className="bg-[#233B1E] py-8 px-6 text-center text-[#F5EBDC] relative overflow-hidden border-t border-[#34522B]">
      
      {/* Decorative leaf motifs in corners */}
      <div className="absolute left-4 bottom-2 text-[#3B6533] opacity-40 text-2xl select-none">
        🌿
      </div>
      <div className="absolute right-4 bottom-2 text-[#3B6533] opacity-40 text-2xl select-none">
        🌿
      </div>

      <div className="max-w-3xl mx-auto flex flex-col items-center gap-2">
        <p className="font-sans text-base md:text-lg italic font-normal tracking-wide text-[#E8DEC8]">
          "వసంతం ప్రకృతిలో ఒక ఋతువు మాత్రమే కాదు, మనసులో ఒక అనుభూతి."
        </p>
        <p className="font-sans text-xs md:text-sm text-[#C5A44E] font-medium tracking-wider">
          – వసంతం
        </p>
      </div>
    </footer>
  );
};

export default Footer;
