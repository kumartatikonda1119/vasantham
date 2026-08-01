import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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
  });
  
  // Form State
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('published');
  const [letter, setLetter] = useState('');
  const [meaning, setMeaning] = useState('');

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
        fetch('http://localhost:5000/api/poems?all=true'),
        fetch('http://localhost:5000/api/writings?all=true'),
        fetch('http://localhost:5000/api/quotes?all=true'),
        fetch('http://localhost:5000/api/akshara?all=true'),
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
      case 'poems': return 'http://localhost:5000/api/poems';
      case 'writings': return 'http://localhost:5000/api/writings';
      case 'quotes': return 'http://localhost:5000/api/quotes';
      case 'akshara': return 'http://localhost:5000/api/akshara';
      default: return 'http://localhost:5000/api/poems';
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
      setContent(item.content || item.text || item.description || '');
      setStatus(item.status || 'published');
      setLetter(item.letter || '');
      setMeaning(item.meaning || '');
    } else {
      setTitle('');
      setContent('');
      setStatus('published');
      setLetter('');
      setMeaning('');
    }
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const endpoint = editingItem 
      ? `${getEndpoint()}/${editingItem._id}`
      : getEndpoint();

    const method = editingItem ? 'PUT' : 'POST';

    const bodyData = activeTab === 'quotes'
      ? { text: content, status }
      : activeTab === 'akshara'
      ? { letter, meaning, description: content, status }
      : { title, content, status };

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
    { id: 'quotes', label: 'వ్యాఖ్యానాలు (Quotations)', icon: '💬' },
    { id: 'akshara', label: 'అక్షరార్థం (Akshara Ardham)', icon: '🔤' },
  ];

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'align': [] }],
      ['clean']
    ],
  };

  return (
    <div className="min-h-screen bg-[#F6EEDF] flex flex-col md:flex-row">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[#F8F1E4] border-r border-[#E6D7BD] p-5 flex flex-col justify-between shrink-0">
        <div>
          {/* Logo Branding */}
          <div className="mb-8 pb-4 border-b border-[#E6D7BD]">
            <h2 className="font-serif text-2xl font-bold text-[#3B6533]">
              వసంతం
            </h2>
            <p className="font-sans text-xs text-[#A08530] font-medium tracking-wide">
              ADMIN CONTROL PANEL
            </p>
          </div>

          {/* Navigation Links */}
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

        {/* Logout Button */}
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
        
        {/* Top Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#3B6533] capitalize">
              {activeTab === 'dashboard' ? 'డ్యాష్‌బోర్డ్ వివరణ' : activeTab}
            </h1>
            <p className="font-sans text-xs text-[#6C5338] mt-1">
              రచయిత్రి: గీతా వసంత లక్ష్మి (వసంతం)
            </p>
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

        {/* DASHBOARD OVERVIEW VIEW */}
        {activeTab === 'dashboard' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div 
              onClick={() => setActiveTab('poems')}
              className="bg-[#F8F1E4] p-6 rounded-2xl border border-[#E6D7BD] shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <span className="text-3xl">📜</span>
              <h3 className="font-sans text-2xl font-bold text-[#3B6533] mt-3">{counts.poems}</h3>
              <p className="font-serif text-sm font-semibold text-[#5C4328]">కవితలు (Poems)</p>
            </div>

            <div 
              onClick={() => setActiveTab('writings')}
              className="bg-[#F8F1E4] p-6 rounded-2xl border border-[#E6D7BD] shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <span className="text-3xl">✍️</span>
              <h3 className="font-sans text-2xl font-bold text-[#3B6533] mt-3">{counts.writings}</h3>
              <p className="font-serif text-sm font-semibold text-[#5C4328]">రచనలు (Writings)</p>
            </div>

            <div 
              onClick={() => setActiveTab('quotes')}
              className="bg-[#F8F1E4] p-6 rounded-2xl border border-[#E6D7BD] shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <span className="text-3xl">💬</span>
              <h3 className="font-sans text-2xl font-bold text-[#3B6533] mt-3">{counts.quotes}</h3>
              <p className="font-serif text-sm font-semibold text-[#5C4328]">వ్యాఖ్యానాలు (Quotations)</p>
            </div>

            <div 
              onClick={() => setActiveTab('akshara')}
              className="bg-[#F8F1E4] p-6 rounded-2xl border border-[#E6D7BD] shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <span className="text-3xl">🔤</span>
              <h3 className="font-sans text-2xl font-bold text-[#3B6533] mt-3">{counts.akshara}</h3>
              <p className="font-serif text-sm font-semibold text-[#5C4328]">అక్షరార్థం (Akshara)</p>
            </div>
          </div>
        ) : (
          /* CONTENT LIST TAB VIEW */
          loading ? (
            <div className="text-center py-16 text-[#5C4328] font-sans">
              లోడ్ అవుతోంది...
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {items.map((item) => (
                <div 
                  key={item._id}
                  className="bg-[#F8F1E4] p-6 rounded-2xl border border-[#E6D7BD] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full font-bold ${
                        item.status === 'published' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {item.status}
                      </span>
                      {item.letter && (
                        <span className="font-serif font-bold text-[#3B6533] text-sm">
                          అక్షరం: {item.letter}
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif text-lg font-bold text-[#4A3520]">
                      {item.title || item.meaning || 'వ్యాఖ్యానం'}
                    </h3>
                    
                    {/* Content snippet */}
                    <div 
                      className="font-sans text-xs text-[#6C5338] line-clamp-2 mt-1"
                      dangerouslySetInnerHTML={{ __html: item.content || item.text || item.description }}
                    />
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleOpenModal(item)}
                      className="py-1.5 px-3.5 rounded-xl border border-[#D8C6A5] text-[#5C4328] text-xs font-semibold hover:bg-[#EFE3C9]"
                    >
                      సవరించు (Edit)
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="py-1.5 px-3.5 rounded-xl bg-red-50 text-red-600 text-xs font-semibold hover:bg-red-100"
                    >
                      తొలగించు (Delete)
                    </button>
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

      {/* Add / Edit Modal with ReactQuill Telugu Rich Text Editor */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-[#F8F1E4] rounded-3xl max-w-2xl w-full p-6 md:p-8 border border-[#E6D7BD] shadow-2xl my-8">
            
            <div className="flex justify-between items-center mb-6 pb-3 border-b border-[#E6D7BD]">
              <h3 className="font-serif text-xl font-bold text-[#3B6533]">
                {editingItem ? 'సవరించండి (Edit Content)' : 'క్రొత్తది ప్రచురించు (Publish Content)'}
              </h3>
              <button 
                onClick={() => setShowModal(false)}
                className="text-[#5C4328] hover:text-[#3B6533] text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="flex flex-col gap-4">
              {activeTab === 'akshara' ? (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-[#5C4328] mb-1">అక్షరం (Letter)</label>
                    <input
                      type="text"
                      required
                      value={letter}
                      onChange={(e) => setLetter(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#D8C6A5] bg-[#FDF8EF] text-sm"
                      placeholder="ఉదా: వ"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#5C4328] mb-1">అర్థం (Meaning)</label>
                    <input
                      type="text"
                      required
                      value={meaning}
                      onChange={(e) => setMeaning(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#D8C6A5] bg-[#FDF8EF] text-sm"
                      placeholder="ఉదా: వసంతం"
                    />
                  </div>
                </>
              ) : activeTab !== 'quotes' ? (
                <div>
                  <label className="block text-xs font-semibold text-[#5C4328] mb-1">శీర్షిక (Title)</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D8C6A5] bg-[#FDF8EF] text-sm"
                    placeholder="శీర్షిక రాయండి..."
                  />
                </div>
              ) : null}

              {/* Rich Text Editor for Content */}
              <div>
                <label className="block text-xs font-semibold text-[#5C4328] mb-1">
                  సాహిత్యం / వివరింపు (Telugu Content & Formatting)
                </label>
                <div className="bg-[#FDF8EF] rounded-xl overflow-hidden border border-[#D8C6A5]">
                  <ReactQuill
                    theme="snow"
                    value={content}
                    onChange={setContent}
                    modules={quillModules}
                    placeholder="తెలుగులో టైప్ చేయండి లేదా పేస్ట్ చేయండి..."
                    className="min-h-[180px] font-sans text-base"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5C4328] mb-1">ప్రచురణ స్థితి (Publish Status)</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#D8C6A5] bg-[#FDF8EF] text-sm"
                >
                  <option value="published">ప్రచురించు (Publish Immediately)</option>
                  <option value="draft">ముసాయిదా (Save as Draft)</option>
                </select>
              </div>

              <div className="flex items-center gap-3 mt-4 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-[#D8C6A5] text-[#5C4328] text-sm font-medium hover:bg-[#EFE3C9]"
                >
                  రద్దు (Cancel)
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#3B6533] text-[#F5EBDC] text-sm font-semibold hover:bg-[#2F5228] shadow-md"
                >
                  {editingItem ? 'సవరణ సేవ్‌ చేయి' : 'ప్రచురించు (Publish)'}
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
