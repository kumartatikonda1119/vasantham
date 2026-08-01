import { useState, useEffect } from 'react';

import aksharaData from '../data/aksharadata.json';

const AksharaPage = () => {
  return (
    <div className="min-h-screen bg-[#F6EEDF] py-10 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#3B6533] mb-2">
            అక్షరార్థం (Akshara Ardham)
          </h1>
          <div className="h-[1px] w-24 bg-[#A08530]/40 mx-auto mt-4"></div>
        </div>

        {/* Aksharaardams */}
        <div className="space-y-12">
          {aksharaData.aksharaardams.map((poem, index) => (
            <div key={index} className="bg-[#F8F1E4] p-8 rounded-3xl border border-[#E6D7BD] shadow-md">
              <h2 className="font-serif text-2xl font-bold text-[#4A3520] mb-1 text-center">
                {poem.title}
              </h2>
              {poem.description && (
                <p className="text-center text-[#5C4328] mb-6 font-medium">
                  {poem.description}
                </p>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {poem.lines.map((line, idx) => (
                  <div key={idx} className="flex flex-col items-center text-center p-4 bg-white/50 rounded-2xl shadow-sm">
                    <div className="w-16 h-16 rounded-2xl bg-[#3B6533] text-[#F5EBDC] font-serif text-3xl font-bold flex items-center justify-center mb-4 shadow-sm">
                      {line.letter}
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

          {/* Quotes Section */}
          <div className="bg-[#F8F1E4] p-8 rounded-3xl border border-[#E6D7BD] shadow-md mt-12">
            <h2 className="font-serif text-2xl font-bold text-[#4A3520] mb-8 text-center border-b border-[#E6D7BD]/60 pb-4">
              జీవన సూత్రాలు - {aksharaData.quotes.author}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 max-w-2xl mx-auto">
              {aksharaData.quotes.items.map((quote, idx) => (
                <div key={idx} className="flex items-start space-x-3">
                  <span className="text-[#3B6533] mt-1 text-lg">✿</span>
                  <p className="font-sans text-[#5C4328] font-medium text-lg">
                    <span className="font-bold text-[#4A3520]">{quote.subject}</span> {quote.action}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AksharaPage;
