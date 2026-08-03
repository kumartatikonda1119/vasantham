import { useState, useEffect } from 'react';
import ShareCardModal from '../components/ShareCardModal';

const CommentaryPage = () => {
  const [shareItem, setShareItem] = useState(null);
  const [commentaryData, setCommentaryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://vasanthambackend.onrender.com/api/quotes')
      .then(res => res.json())
      .then(data => {
        setCommentaryData(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching commentary:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-[#F6EEDF] py-10 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#3B6533] mb-2">
            వ్యాఖ్యానం (Commentary & Quotes)
          </h1>
          <p className="font-sans text-base text-[#5C4328] font-medium">
            జీవిత సత్యాలు, సూత్రాలు, అనుభవాల్ని పలికించిన వ్యాఖ్యానాలు.
          </p>
          <div className="h-[1px] w-24 bg-[#A08530]/40 mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {loading ? (
            <div className="text-center py-16 text-[#5C4328] font-sans">లోడ్ అవుతోంది... (Loading...)</div>
          ) : commentaryData.map((item, index) => (
            <div 
              key={item._id || index}
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

              <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-6 pt-4 border-t border-[#E6D7BD] gap-4 sm:gap-0">
                <span className="font-serif text-xs text-[#A08530] font-bold">
                  – {item.author || 'Geeta Vasanta Laxmi (వసంతం)'}
                </span>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    onClick={() => setShareItem({ ...item, content: item.content.join('\n'), action: 'download' })}
                    className="py-1.5 px-3 rounded-xl border border-[#3B6533] text-[#3B6533] bg-[#EFE3C9]/60 hover:bg-[#EFE3C9] text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span>డౌన్‌లోడ్</span>
                  </button>
                  <button
                    onClick={() => setShareItem({ ...item, content: item.content.join('\n'), action: 'share' })}
                    className="py-1.5 px-3 rounded-xl bg-[#3B6533] text-[#F5EBDC] text-xs font-semibold hover:bg-[#2F5228] transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 100-2.684 3 3 0 000 2.684zm0 9a3 3 0 100-2.684 3 3 0 000 2.684" />
                    </svg>
                    <span>పంచుకోండి</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {commentaryData.length === 0 && (
            <div className="text-center py-16 bg-[#F8F1E4] rounded-3xl border border-[#E6D7BD] text-[#6C5338]">
              ప్రస్తుతం ఏ వ్యాఖ్యానాలు అందుబాటులో లేవు.
            </div>
          )}
        </div>

      </div>

      {/* Share Modal */}
      {shareItem && (
        <ShareCardModal
          item={shareItem}
          type="Commentary"
          onClose={() => setShareItem(null)}
        />
      )}
    </div>
  );
};

export default CommentaryPage;
