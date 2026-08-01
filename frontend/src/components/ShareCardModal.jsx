import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';

const ShareCardModal = ({ item, type, onClose }) => {
  const cardRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Helper to extract clean text from rich HTML
  const getPlainText = (htmlOrText) => {
    if (!htmlOrText) return '';
    if (Array.isArray(htmlOrText)) return htmlOrText.join('\n');
    const tmp = document.createElement('div');
    tmp.innerHTML = htmlOrText;
    return tmp.textContent || tmp.innerText || '';
  };

  // Generate canvas blob
  const generateCanvasBlob = async () => {
    if (!cardRef.current) return null;
    const canvas = await html2canvas(cardRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#F6EEDF',
    });
    return new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
  };

  // Download image file to user's device
  const triggerDownload = (blob, filename) => {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(link.href), 1000);
  };

  // Dedicated Download Action
  const handleDownload = async () => {
    if (isGenerating) return;
    setIsGenerating(true);

    try {
      const blob = await generateCanvasBlob();
      if (blob) {
        const filename = `Vasantham_${type}_${Date.now()}.png`;
        triggerDownload(blob, filename);
      }
    } catch (error) {
      console.error('Error downloading image:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Share Action: ALWAYS downloads image to device FIRST, then opens native Web Share API
  const handleShare = async () => {
    if (isGenerating) return;
    setIsGenerating(true);

    try {
      const blob = await generateCanvasBlob();
      if (!blob) {
        setIsGenerating(false);
        return;
      }

      const filename = `Vasantham_${type}_${Date.now()}.png`;

      // 1. ALWAYS download to mobile/desktop device first
      triggerDownload(blob, filename);

      // 2. Then trigger Web Share API if supported
      const file = new File([blob], filename, { type: 'image/png' });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            title: item.title || 'వసంతం సాహిత్యము',
            text: (item.title ? `"${item.title}" - వసంతం` : 'వసంతం సాహిత్యము') + '\n\nమరిన్ని రచనల కోసం సందర్శించండి: https://vasantham.onrender.com',
            files: [file],
          });
        } catch (err) {
          console.log('Share sheet closed or failed after download');
        }
      }
    } catch (error) {
      console.error('Error sharing image:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-8 overflow-y-auto">
      <div className="my-auto bg-[#F8F1E4] rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-[#E6D7BD] flex flex-col items-center gap-5 relative shrink-0">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-[#5C4328] hover:text-[#3B6533] p-1 text-xl font-bold"
        >
          ✕
        </button>

        <h3 className="font-serif text-xl font-bold text-[#3B6533]">
          సాహిత్య కార్డు (Literary Card)
        </h3>

        {/* Card Element to Capture */}
        <div 
          ref={cardRef} 
          className="w-full bg-[#F6EEDF] p-8 rounded-2xl border-2 border-[#D8C6A5] shadow-md flex flex-col justify-between items-center text-center relative overflow-hidden"
          style={{ backgroundImage: "url('/images/hero_background_1785512169900.png')" }}
        >
          {/* Header Branding */}
          <div className="flex flex-col items-center gap-1 mb-4 border-b border-[#D8C6A5] pb-3 w-full">
            <span className="font-serif text-3xl font-bold text-[#3B6533]">
              వసంతం
            </span>
            <span className="font-serif text-xs text-[#A08530] font-medium tracking-wider">
              తెలుగుదీపిక – అక్షరమాలిక
            </span>
          </div>

          {/* Title if present */}
          {item.title && (
            <h4 className="font-serif text-xl font-bold text-[#4A3520] mb-3 leading-snug">
              {item.title}
            </h4>
          )}

          {/* Content */}
          <div className="font-sans text-base text-[#5C4328] leading-relaxed whitespace-pre-line my-3 px-2 italic">
            "{getPlainText(item.content || item.text)}"
          </div>

          {/* Author & Footer Branding */}
          <div className="mt-6 pt-3 border-t border-[#D8C6A5] w-full flex justify-between items-end text-xs text-[#6C5338]">
            <div className="text-left">
              <p className="font-serif font-bold text-[#3B6533] text-sm">
                – {item.author || 'Geeta Vasanta Laxmi (వసంతం)'}
              </p>
              <p className="text-[10px] text-[#A08530]">రచయిత్రి (Author)</p>
            </div>
            <div className="text-right">
              <span className="font-sans font-semibold text-[#3B6533]">
                vasantham.onrender.com
              </span>
            </div>
          </div>
        </div>

        {/* Buttons Row */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full pt-2">
          {/* Download Button */}
          <button
            onClick={handleDownload}
            disabled={isGenerating}
            className="w-full sm:flex-1 py-2.5 px-4 rounded-xl border border-[#3B6533] text-[#3B6533] bg-[#EFE3C9]/60 font-semibold hover:bg-[#EFE3C9] transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>{isGenerating ? 'తయారవుతోంది...' : 'డౌన్‌లోడ్ (Download)'}</span>
          </button>

          {/* Share Button */}
          <button
            onClick={handleShare}
            disabled={isGenerating}
            className="w-full sm:flex-1 py-2.5 px-4 rounded-xl bg-[#3B6533] text-[#F5EBDC] font-semibold hover:bg-[#2F5228] transition-colors flex items-center justify-center gap-2 shadow-md disabled:opacity-50 text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 100-2.684 3 3 0 000 2.684zm0 9a3 3 0 100-2.684 3 3 0 000 2.684" />
            </svg>
            <span>{isGenerating ? 'తయారవుతోంది...' : 'పంచుకోండి (Share)'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default ShareCardModal;
