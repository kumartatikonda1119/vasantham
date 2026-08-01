const VinayakaIllustration = ({ className = "w-28 h-32" }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg 
        viewBox="0 0 400 440" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full text-[#4A3520] opacity-90 hover:opacity-100 transition-opacity"
      >
        {/* Crown (Mukut) */}
        <path d="M200 20 L212 50 L188 50 Z" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="200" cy="16" r="5" fill="currentColor" />
        {/* Crown Tier 2 */}
        <path d="M175 60 C175 52 225 52 225 60 L232 95 C232 100 168 100 168 95 Z" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M185 75 Q200 68 215 75" stroke="currentColor" strokeWidth="3" />
        <circle cx="200" cy="72" r="4" fill="currentColor" />
        {/* Crown Base Band */}
        <path d="M152 105 Q200 95 248 105 L252 118 Q200 108 148 118 Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" fill="none" />
        <circle cx="175" cy="111" r="3" fill="currentColor" />
        <circle cx="200" cy="108" r="3" fill="currentColor" />
        <circle cx="225" cy="111" r="3" fill="currentColor" />

        {/* Ears */}
        {/* Left Ear */}
        <path d="M148 115 C110 100 85 140 105 180 C120 205 145 200 152 185" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
        {/* Right Ear */}
        <path d="M252 115 C290 100 315 140 295 180 C280 205 255 200 248 185" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />

        {/* Head & Face Contour */}
        <path d="M152 118 Q200 112 248 118 C252 150 240 180 220 200 C210 210 205 220 205 235 C205 255 225 255 235 242 C240 235 238 225 230 225" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />

        {/* Trunk curve details */}
        <path d="M195 205 C185 225 185 245 195 255 C205 265 228 265 240 248 C248 238 244 218 226 218 C218 218 212 225 218 232" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />

        {/* Tilak on Forehead */}
        <path d="M194 125 C194 118 206 118 206 125 C206 138 194 138 194 125 Z" stroke="currentColor" strokeWidth="3" fill="none" />
        <path d="M198 128 L200 142 L202 128" stroke="currentColor" strokeWidth="2.5" fill="currentColor" />
        <line x1="182" y1="132" x2="218" y2="132" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="186" y1="138" x2="214" y2="138" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />

        {/* Eyes */}
        {/* Left Eye */}
        <path d="M165 146 Q175 140 185 147" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="176" cy="148" r="2.5" fill="currentColor" />
        {/* Right Eye */}
        <path d="M215 147 Q225 140 235 146" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="224" cy="148" r="2.5" fill="currentColor" />

        {/* Tusks */}
        <path d="M164 185 L154 192" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <path d="M236 185 L246 195 L242 196" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />

        {/* Necklace */}
        <path d="M155 200 Q200 235 245 200" stroke="currentColor" strokeWidth="3.5" fill="none" />
        <path d="M162 212 Q200 248 238 212" stroke="currentColor" strokeWidth="3" fill="none" />
        <circle cx="200" cy="236" r="5" stroke="currentColor" strokeWidth="3" fill="none" />

        {/* Upper Right Hand (Holding Axe - Parashu) */}
        <path d="M148 180 C125 180 100 170 92 145 C88 132 95 120 108 125 C118 129 118 145 110 155" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
        {/* Axe */}
        <path d="M85 110 L85 155" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <path d="M85 120 C70 115 65 135 85 140 Z" stroke="currentColor" strokeWidth="3" fill="currentColor" fillOpacity="0.1" />

        {/* Upper Left Hand (Holding Lotus - Padma) */}
        <path d="M252 180 C275 180 300 170 308 145 C312 132 305 120 292 125 C282 129 282 145 290 155" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
        {/* Lotus Flower */}
        <path d="M315 135 L315 155" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M315 130 C305 115 315 105 315 105 C315 105 325 115 315 130 Z" stroke="currentColor" strokeWidth="3" fill="none" />
        <path d="M305 125 C295 120 305 110 315 118" stroke="currentColor" strokeWidth="2.5" fill="none" />
        <path d="M325 125 C335 120 325 110 315 118" stroke="currentColor" strokeWidth="2.5" fill="none" />

        {/* Lower Right Hand (Abhaya Mudra - Blessing) */}
        <path d="M152 215 C130 225 115 220 110 235 C105 250 115 270 135 265" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
        {/* Hand Palm */}
        <path d="M115 225 C108 215 120 205 128 215 L128 235" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="120" y1="230" x2="120" y2="242" stroke="currentColor" strokeWidth="2.5" />
        <line x1="125" y1="230" x2="125" y2="244" stroke="currentColor" strokeWidth="2.5" />

        {/* Lower Left Hand (Holding Modak Bowl) */}
        <path d="M248 215 C270 225 285 220 290 235 C295 250 285 270 265 265" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
        {/* Modak Bowl & Sweet */}
        <path d="M272 232 C285 232 292 245 278 252 C268 255 262 242 272 232 Z" stroke="currentColor" strokeWidth="3" fill="currentColor" fillOpacity="0.15" />
        <path d="M277 232 C277 224 283 224 280 232" stroke="currentColor" strokeWidth="3" />

        {/* Seated Body / Torso */}
        <path d="M142 240 C135 275 145 315 170 325" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M258 240 C265 275 255 315 230 325" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />

        {/* Crossed Legs (Padmasana Pose) */}
        {/* Left Leg */}
        <path d="M125 310 C100 325 85 350 115 375 C145 400 210 395 240 370" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        {/* Right Leg */}
        <path d="M275 310 C300 325 315 350 285 375 C255 400 190 395 160 370" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" fill="none" />

        {/* Feet */}
        <path d="M185 375 C175 385 160 380 165 365 C170 355 185 360 185 375 Z" stroke="currentColor" strokeWidth="3" fill="currentColor" fillOpacity="0.2" />
        <path d="M215 375 C225 385 240 380 235 365 C230 355 215 360 215 375 Z" stroke="currentColor" strokeWidth="3" fill="currentColor" fillOpacity="0.2" />

        {/* Dhoti Fold Lines */}
        <path d="M165 330 Q200 350 235 330" stroke="currentColor" strokeWidth="3" fill="none" />
        <path d="M150 350 Q200 375 250 350" stroke="currentColor" strokeWidth="2.5" fill="none" />
      </svg>
    </div>
  );
};

export default VinayakaIllustration;
