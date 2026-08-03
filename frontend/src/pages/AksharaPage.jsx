import { useState, useEffect } from 'react';

const AksharaPage = () => {
  const [aksharaData, setAksharaData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/akshara')
      .then(res => res.json())
      .then(data => {
        setAksharaData(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
        setLoading(false);
      });
  }, []);
  return (
    <div className="min-h-screen bg-[#F6EEDF] py-10 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#3B6533] mb-2">
            అక్షరార్థం (Word Meaning)
          </h1>
          <div className="h-[1px] w-24 bg-[#A08530]/40 mx-auto mt-4"></div>
        </div>

        {/* Aksharaardams */}
        <div className="space-y-12">
          {loading ? (
            <div className="text-center py-16 text-[#5C4328] font-sans">లోడ్ అవుతోంది... (Loading...)</div>
          ) : (
            <>
              {aksharaData.map((poem, index) => (
                <div key={poem._id || index} className="bg-[#F8F1E4] p-8 rounded-3xl border border-[#E6D7BD] shadow-md">
              <h2 className="font-serif text-2xl font-bold text-[#4A3520] mb-1 text-center">
                {poem.title}
              </h2>
              {poem.description && (
                <p className="text-center text-[#5C4328] mb-6 font-medium">
                  {poem.description}
                </p>
              )}
              
              <div className="flex flex-wrap justify-center gap-6">
                {poem.lines.map((line, idx) => (
                  <div key={idx} className="flex-1 min-w-[250px] flex flex-col items-center text-center p-4 bg-white/50 rounded-2xl shadow-sm">
                    <div className="min-w-[4rem] min-h-[4rem] px-4 py-2 rounded-2xl bg-[#3B6533] text-[#F5EBDC] font-serif font-bold flex items-center justify-center mb-4 shadow-sm text-center">
                      <span className={line.letter?.length > 4 ? "text-xl leading-snug" : "text-3xl"}>
                        {line.letter}
                      </span>
                    </div>
                    <p className="font-sans text-[#5C4328] font-medium leading-relaxed">
                      {line.text}
                    </p>
                  </div>
                ))}
              </div>

              {poem.footerMessage && (
                <div className="mt-8 pt-6 border-t border-[#E6D7BD]/60 text-center">
                  <p className="text-[#3B6533] font-serif italic font-medium">
                    "{poem.footerMessage}"
                  </p>
                </div>
              )}
            </div>
          ))}


            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default AksharaPage;
