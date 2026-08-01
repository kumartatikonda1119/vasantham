import { useState } from 'react';
import ShareCardModal from '../components/ShareCardModal';
import writingsData from '../data/writingsdata.json';

const WritingsPage = () => {
  const [shareItem, setShareItem] = useState(null);

  return (
    <div className="min-h-screen bg-[#F6EEDF] py-10 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#3B6533] mb-2">
            రచనలు (Writings)
          </h1>
          <p className="font-sans text-base text-[#5C4328] font-medium">
            మనసును తాకే ఆలోచనలు, అనుభూతులు, భావాల సమాహారం.
          </p>
          <div className="h-[1px] w-24 bg-[#A08530]/40 mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {writingsData.map((item, index) => (
            <div 
              key={index}
              className="bg-[#F8F1E4] p-8 rounded-3xl border border-[#E6D7BD] shadow-md flex flex-col justify-between"
            >
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#4A3520] mb-4 border-b border-[#E6D7BD] pb-3 text-center">
                  {item.title}
                </h2>
                <div className="font-sans text-base text-[#5C4328] leading-relaxed my-4 space-y-2 text-center">
                  {item.content.map((line, idx) => (
                    <p key={idx}>{line}</p>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#E6D7BD]">
                <span className="font-serif text-xs text-[#A08530] font-bold">
                  – {item.author || 'Geeta Vasanta Laxmi (వసంతం)'}
                </span>

                <button
                  onClick={() => setShareItem({ ...item, content: item.content.join('\n') })}
                  className="py-1.5 px-4 rounded-xl bg-[#3B6533] text-[#F5EBDC] text-xs font-semibold hover:bg-[#2F5228] transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <span>పంచుకోండి (Share)</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 100-2.684 3 3 0 000 2.684zm0 9a3 3 0 100-2.684 3 3 0 000 2.684" />
                  </svg>
                </button>
              </div>
            </div>
          ))}

          {writingsData.length === 0 && (
            <div className="text-center py-16 bg-[#F8F1E4] rounded-3xl border border-[#E6D7BD] text-[#6C5338]">
              ప్రస్తుతం ఏ రచనలు అందుబాటులో లేవు.
            </div>
          )}
        </div>

      </div>

      {/* Share Modal */}
      {shareItem && (
        <ShareCardModal
          item={shareItem}
          type="Writing"
          onClose={() => setShareItem(null)}
        />
      )}
    </div>
  );
};

export default WritingsPage;
