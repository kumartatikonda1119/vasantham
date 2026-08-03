import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Overview Counts for Dashboard
  const [counts, setCounts] = useState({
    poems: 0,
    writings: 0,
    quotes: 0,
    akshara: 0,
    akshara: 0,
  });
  
  // Form State
  const [title, setTitle] = useState('');
  const [content, setContent] = useState(''); // Textarea content (newline separated)
  const [status, setStatus] = useState('published');
  
  // Akshara specific
  const [description, setDescription] = useState('');
  const [footerMessage, setFooterMessage] = useState('');
  const [aksharaLines, setAksharaLines] = useState([{ letter: '', text: '' }]);
  

  const navigate = useNavigate();
  const token = localStorage.getItem('vasantham_token');

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchDashboardCounts();
    if (activeTab !== 'dashboard') {
      fetchItems();
    }
  }, [activeTab]);

  const fetchDashboardCounts = async () => {
    try {
      const [poemsRes, writingsRes, quotesRes, aksharaRes] = await Promise.all([
        fetch('https://vasanthambackend.onrender.com/api/poems?all=true'),
        fetch('https://vasanthambackend.onrender.com/api/writings?all=true'),
        fetch('https://vasanthambackend.onrender.com/api/quotes?all=true'),
        fetch('https://vasanthambackend.onrender.com/api/akshara?all=true'),
      ]);

      const [poems, writings, quotes, akshara] = await Promise.all([
        poemsRes.json(),
        writingsRes.json(),
        quotesRes.json(),
        aksharaRes.json(),
      ]);

      setCounts({
        poems: Array.isArray(poems) ? poems.length : 0,
        writings: Array.isArray(writings) ? writings.length : 0,
        quotes: Array.isArray(quotes) ? quotes.length : 0,
        akshara: Array.isArray(akshara) ? akshara.length : 0,
      });
    } catch (err) {
      console.error('Counts fetch error:', err);
    }
  };

  const getEndpoint = () => {
    switch (activeTab) {
      case 'poems': return 'https://vasanthambackend.onrender.com/api/poems';
      case 'writings': return 'https://vasanthambackend.onrender.com/api/writings';
      case 'quotes': return 'https://vasanthambackend.onrender.com/api/quotes';
      case 'akshara': return 'https://vasanthambackend.onrender.com/api/akshara';
      default: return 'https://vasanthambackend.onrender.com/api/poems';
    }
  };

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${getEndpoint()}?all=true`);
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (item = null) => {
    setEditingItem(item);
    if (item) {
      setTitle(item.title || '');
      setContent(Array.isArray(item.content) ? item.content.join('\n') : (item.content || ''));
      setStatus(item.status || 'published');
      
      // Akshara
      setDescription(item.description || '');
      setFooterMessage(item.footerMessage || '');
      setAksharaLines(item.lines || [{ letter: '', text: '' }]);
    } else {
      setTitle('');
      setContent('');
      setStatus('published');
      setDescription('');
      setFooterMessage('');
      setAksharaLines([{ letter: '', text: '' }]);
    }
    setShowModal(true);
  };

  const handleAddAksharaLine = () => {
    setAksharaLines([...aksharaLines, { letter: '', text: '' }]);
  };

  const handleAksharaLineChange = (index, field, value) => {
    const newLines = [...aksharaLines];
    newLines[index][field] = value;
    setAksharaLines(newLines);
  };

  const handleRemoveAksharaLine = (index) => {
    const newLines = [...aksharaLines];
    newLines.splice(index, 1);
    setAksharaLines(newLines);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const endpoint = editingItem 
      ? `${getEndpoint()}/${editingItem._id}`
      : getEndpoint();

    const method = editingItem ? 'PUT' : 'POST';

    let bodyData = {};
    if (activeTab === 'poems' || activeTab === 'writings' || activeTab === 'quotes') {
      bodyData = { 
        title, 
        content: content.split('\n'), // split textarea into array of strings
        status 
      };
    } else if (activeTab === 'akshara') {
      bodyData = { title, description, footerMessage, lines: aksharaLines, status };
    }

    try {
      const res = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(bodyData),
      });

      if (res.ok) {
        setShowModal(false);
        fetchItems();
        fetchDashboardCounts();
      } else {
        alert('Failed to save item');
      }
    } catch (err) {
      console.error('Save error:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('ఈ విషయాన్ని ఖచ్చితంగా తొలగించాలనుకుంటున్నారా? (Confirm Delete?)')) return;

    try {
      const res = await fetch(`${getEndpoint()}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (res.ok) {
        fetchItems();
        fetchDashboardCounts();
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('vasantham_token');
    localStorage.removeItem('vasantham_admin');
    navigate('/admin/login');
  };

  const navItems = [
    { id: 'dashboard', label: 'డ్యాష్‌బోర్డ్ (Dashboard)', icon: '📊' },
    { id: 'poems', label: 'కవితలు (Poems)', icon: '📜' },
    { id: 'writings', label: 'రచనలు (Writings)', icon: '✍️' },
    { id: 'quotes', label: 'వ్యాఖ్యానాలు (Commentary)', icon: '💬' },
    { id: 'akshara', label: 'అక్షరార్థం (Akshara Ardham)', icon: '🔤' },
  ];

  return (
    <div className="min-h-screen bg-[#F6EEDF] flex flex-col md:flex-row">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[#F8F1E4] border-r border-[#E6D7BD] p-5 flex flex-col justify-between shrink-0">
        <div>
          <div className="mb-8 pb-4 border-b border-[#E6D7BD]">
            <h2 className="font-serif text-2xl font-bold text-[#3B6533]">వసంతం</h2>
            <p className="font-sans text-xs text-[#A08530] font-medium tracking-wide">ADMIN CONTROL PANEL</p>
          </div>

          <nav className="flex flex-col gap-1.5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors text-left ${
                  activeTab === item.id
                    ? 'bg-[#3B6533] text-[#F5EBDC] shadow-sm'
                    : 'text-[#5C4328] hover:bg-[#EFE3C9]'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="pt-4 border-t border-[#E6D7BD] mt-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-red-200 text-red-700 bg-red-50 hover:bg-red-100 text-sm font-semibold transition-colors"
          >
            <span>🚪</span>
            <span>లాగౌట్ (Logout)</span>
          </button>
        </div>
      </aside>

      {/* Main Content Workspace */}
      <main className="flex-grow p-6 md:p-10 max-w-5xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#3B6533] capitalize">
              {navItems.find(i => i.id === activeTab)?.label}
            </h1>
            <p className="font-sans text-xs text-[#6C5338] mt-1">రచయిత్రి: గీతా వసంత లక్ష్మి (వసంతం)</p>
          </div>

          {activeTab !== 'dashboard' && (
            <button
              onClick={() => handleOpenModal()}
              className="py-2.5 px-5 rounded-xl bg-[#3B6533] text-[#F5EBDC] text-sm font-semibold hover:bg-[#2F5228] transition-colors shadow-md flex items-center gap-2"
            >
              <span>+</span>
              <span>క్రొత్తది ప్రచురించు (Add New)</span>
            </button>
          )}
        </div>

        {/* DASHBOARD OVERVIEW */}
        {activeTab === 'dashboard' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div onClick={() => setActiveTab('poems')} className="bg-[#F8F1E4] p-6 rounded-2xl border border-[#E6D7BD] shadow-sm hover:shadow-md cursor-pointer">
              <span className="text-3xl">📜</span>
              <h3 className="font-sans text-2xl font-bold text-[#3B6533] mt-3">{counts.poems}</h3>
              <p className="font-serif text-sm font-semibold text-[#5C4328]">కవితలు (Poems)</p>
            </div>
            <div onClick={() => setActiveTab('writings')} className="bg-[#F8F1E4] p-6 rounded-2xl border border-[#E6D7BD] shadow-sm hover:shadow-md cursor-pointer">
              <span className="text-3xl">✍️</span>
              <h3 className="font-sans text-2xl font-bold text-[#3B6533] mt-3">{counts.writings}</h3>
              <p className="font-serif text-sm font-semibold text-[#5C4328]">రచనలు (Writings)</p>
            </div>
            <div onClick={() => setActiveTab('quotes')} className="bg-[#F8F1E4] p-6 rounded-2xl border border-[#E6D7BD] shadow-sm hover:shadow-md cursor-pointer">
              <span className="text-3xl">💬</span>
              <h3 className="font-sans text-2xl font-bold text-[#3B6533] mt-3">{counts.quotes}</h3>
              <p className="font-serif text-sm font-semibold text-[#5C4328]">వ్యాఖ్యానాలు (Commentary)</p>
            </div>
            <div onClick={() => setActiveTab('akshara')} className="bg-[#F8F1E4] p-6 rounded-2xl border border-[#E6D7BD] shadow-sm hover:shadow-md cursor-pointer">
              <span className="text-3xl">🔤</span>
              <h3 className="font-sans text-2xl font-bold text-[#3B6533] mt-3">{counts.akshara}</h3>
              <p className="font-serif text-sm font-semibold text-[#5C4328]">అక్షరార్థం (Akshara)</p>
            </div>
          </div>
        ) : (
          /* CONTENT LIST */
          loading ? (
            <div className="text-center py-16 text-[#5C4328] font-sans">లోడ్ అవుతోంది...</div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {items.map((item) => (
                <div key={item._id} className="bg-[#F8F1E4] p-6 rounded-2xl border border-[#E6D7BD] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full font-bold ${
                        item.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {item.status}
                      </span>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-[#4A3520]">
                      {item.title || 'వ్యాఖ్యానం'}
                    </h3>
                    
                    <div className="font-sans text-xs text-[#6C5338] line-clamp-2 mt-1">
                      {Array.isArray(item.content) ? item.content[0] : item.description}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button onClick={() => handleOpenModal(item)} className="py-1.5 px-3.5 rounded-xl border border-[#D8C6A5] text-[#5C4328] text-xs font-semibold hover:bg-[#EFE3C9]">సవరించు (Edit)</button>
                    <button onClick={() => handleDelete(item._id)} className="py-1.5 px-3.5 rounded-xl bg-red-50 text-red-600 text-xs font-semibold hover:bg-red-100">తొలగించు (Delete)</button>
                  </div>
                </div>
              ))}

              {items.length === 0 && (
                <div className="text-center py-16 bg-[#F8F1E4] rounded-2xl border border-[#E6D7BD] text-[#6C5338]">
                  ఇక్కడ ఎటువంటి అంశాలు లేవు.
                </div>
              )}
            </div>
          )
        )}
      </main>

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-[#F8F1E4] rounded-3xl max-w-2xl w-full p-6 md:p-8 border border-[#E6D7BD] shadow-2xl my-8">
            <div className="flex justify-between items-center mb-6 pb-3 border-b border-[#E6D7BD]">
              <h3 className="font-serif text-xl font-bold text-[#3B6533]">
                {editingItem ? 'సవరించండి (Edit)' : 'క్రొత్తది (Add New)'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-[#5C4328] hover:text-[#3B6533] text-lg font-bold">✕</button>
            </div>

            <form onSubmit={handleSave} className="flex flex-col gap-4">
              
              {/* Common Title for Poems, Writings, Quotes, Akshara */}
              {['poems', 'writings', 'quotes', 'akshara'].includes(activeTab) && (
                <div>
                  <label className="block text-xs font-semibold text-[#5C4328] mb-1">శీర్షిక (Title)</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D8C6A5] bg-[#FDF8EF] text-sm"
                  />
                </div>
              )}

              {/* Text Area for Poems, Writings, Quotes */}
              {['poems', 'writings', 'quotes'].includes(activeTab) && (
                <div>
                  <label className="block text-xs font-semibold text-[#5C4328] mb-1">
                    సాహిత్యం (Content - ప్రతి లైన్ కి ఒక కొత్త లైన్ ఇవ్వండి)
                  </label>
                  <textarea
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={8}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D8C6A5] bg-[#FDF8EF] text-sm"
                    placeholder="పద్యం లేదా వ్యాసం ఇక్కడ రాయండి..."
                  />
                </div>
              )}

              {/* Specifics for Akshara */}
              {activeTab === 'akshara' && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-[#5C4328] mb-1">వివరణ (Description - Optional)</label>
                    <input
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#D8C6A5] bg-[#FDF8EF] text-sm"
                    />
                  </div>
                  
                  <div className="bg-[#EFE3C9] p-4 rounded-xl border border-[#D8C6A5] space-y-3">
                    <label className="block text-sm font-bold text-[#3B6533]">లైన్స్ (Lines)</label>
                    {aksharaLines.map((line, idx) => (
                      <div key={idx} className="flex gap-2 items-center">
                        <input
                          type="text"
                          placeholder="అక్షరం"
                          value={line.letter}
                          onChange={(e) => handleAksharaLineChange(idx, 'letter', e.target.value)}
                          className="w-1/3 px-3 py-2 rounded-lg border border-[#D8C6A5] text-sm"
                        />
                        <input
                          type="text"
                          required
                          placeholder="అర్థం / వాక్యం"
                          value={line.text}
                          onChange={(e) => handleAksharaLineChange(idx, 'text', e.target.value)}
                          className="w-2/3 px-3 py-2 rounded-lg border border-[#D8C6A5] text-sm"
                        />
                        <button type="button" onClick={() => handleRemoveAksharaLine(idx)} className="text-red-500 font-bold px-2">X</button>
                      </div>
                    ))}
                    <button type="button" onClick={handleAddAksharaLine} className="text-sm text-[#3B6533] font-bold">+ యాడ్ లైన్ (Add Line)</button>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#5C4328] mb-1">ఫుటర్ సందేశం (Footer Message - Optional)</label>
                    <input
                      type="text"
                      value={footerMessage}
                      onChange={(e) => setFooterMessage(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#D8C6A5] bg-[#FDF8EF] text-sm"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-xs font-semibold text-[#5C4328] mb-1">ప్రచురణ స్థితి (Status)</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#D8C6A5] bg-[#FDF8EF] text-sm"
                >
                  <option value="published">ప్రచురించు (Publish)</option>
                  <option value="draft">ముసాయిదా (Draft)</option>
                </select>
              </div>

              <div className="flex items-center gap-3 mt-4 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl border border-[#D8C6A5] text-[#5C4328] text-sm font-medium hover:bg-[#EFE3C9]">రద్దు (Cancel)</button>
                <button type="submit" className="flex-1 py-2.5 rounded-xl bg-[#3B6533] text-[#F5EBDC] text-sm font-semibold hover:bg-[#2F5228] shadow-md">
                  {editingItem ? 'సేవ్‌ చేయి (Save)' : 'ప్రచురించు (Publish)'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
