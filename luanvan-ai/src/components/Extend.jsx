import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Component Header
const Header = () => {
    const navigate = useNavigate();
    return (
        <header className="bg-[#202327] text-white py-3 px-6 flex items-center justify-between">
            <div className="flex items-center">
                <span className="text-xl font-semibold">A3M</span>
            </div>
            <nav>
                <ul className="flex space-x-6">
                    <li>
                        <button onClick={() => navigate('/')} className="hover:text-blue-300">
                            Trang chủ
                        </button>
                    </li>
                    <li>
                        <button onClick={() => navigate('/update')} className="hover:text-blue-300">
                            Update A3M
                        </button>
                    </li>
                    <li>
                        <button onClick={() => navigate('/document')} className="hover:text-blue-300">
                            Kho luận văn
                        </button>
                    </li>
                    <li>
                        <button onClick={() => navigate('/extend')} className="hover:text-blue-300">
                            Mở rộng
                        </button>
                    </li>
                    <li>
                        <input
                            type="text"
                            placeholder="Tìm kiếm"
                            className="bg-gray-800 rounded-md px-2 py-1 focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </li>
                    <li>
                        <span className="text-gray-400">v0.3m</span>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="hover:text-blue-300 flex items-center"
                        >
                            <span className="text-xl">中</span>
                            <span className="ml-2">Ngôn ngữ</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="hover:text-blue-300">
                            GitHub <span className="ml-1">↗</span>
                        </a>
                    </li>
                </ul>
            </nav>
            <div className="text-right">
                <a
                    className="text-blue-400 font-medium"
                >
                    Đăng xuất
                </a>
            </div>
        </header>
    );
};

// Component App
const App = () => {
    const [activeTab, setActiveTab] = useState('Nghiên cứu và Phân tích');
    const [searchTerm, setSearchTerm] = useState('');
    const [showSearchResults, setShowSearchResults] = useState(false);

    const toolsData = {
        'Nghiên cứu và Phân tích': [
            {
                id: 1,
                name: 'Scholar GPT',
                description: 'Enhance research with 200M+ resources and built-in critical reading skills. Access Google Scholar, PubMed, JSTOR, Arxiv, an...',
                by: 'awesomegpts.ai',
                icon: 'https://www.svgrepo.com/show/428840/graduation-cap.svg',
            },
            {
                id: 2,
                name: 'Consensus',
                description: 'Ask the research, chat directly with the world’s scientific literature. Search references, get simple explanations, write...',
                by: 'consensus.app',
                icon: 'https://www.svgrepo.com/show/421220/comments.svg',
            },
            {
                id: 3,
                name: 'SciSpace',
                description: 'Do hours worth of research in minutes. Instantly access 287M+ papers, analyze papers at lightning speed, and effortlessly...',
                by: 'scispace.com',
                icon: 'https://www.svgrepo.com/show/423188/layer-group.svg',
            },
            {
                id: 4,
                name: 'Excel AI',
                description: '🍀 The worlds most powerful data analysis assistant. 🍀',
                by: 'pulsr.co.uk',
                icon: 'https://www.svgrepo.com/show/440080/sparkles.svg',
            },
            {
                id: 5,
                name: 'Scholar AI',
                description: 'AI Innovator — search and review 200M+ scientific papers, patents, and books. Research literature, discover insights, and...',
                by: 'scholarai.io',
                icon: 'https://www.svgrepo.com/show/428892/flask.svg',
            },
            {
                id: 6,
                name: 'Video Summarizer',
                description: 'Youtube Video summarizer | video summaries, chat with Youtube video',
                by: 'thegeneralmind.com',
                icon: 'https://www.svgrepo.com/show/421311/paper-plane.svg',
            },
        ],
        'Giáo dục': [
            {
                id: 1,
                name: '찾GPT',
                description: '한국 문화에 적합한 말하기 스타일을 사용하여 사용자에게 응답합니다.',
                by: 'gptonline.ai',
                icon: 'https://example.com/chatgpt-icon.svg',
            },
            {
                id: 2,
                name: '日本語 | ログイン | JP',
                description: 'ChatGPT 日本語 | ChatGPT と AI で日本語で会話',
                by: 'chatgptjp.co',
                icon: 'https://example.com/japanese-chatgpt-icon.svg',
            },
            {
                id: 3,
                name: 'Write Anything',
                description: "The world's most powerful writing tool.",
                by: 'pulsr.co.uk',
                icon: 'https://example.com/write-anything-icon.svg',
            },
            {
                id: 4,
                name: 'チャット GPT',
                description: 'この日本語チャット GPTは、日本のユーザーに最適なように設計されたOpenAIのGPT言語モデルです。日本の文化に富...',
                by: 'gptjp.net',
                icon: 'https://example.com/chat-gpt-jp-icon.svg',
            },
            {
                id: 5,
                name: 'Universal Primer',
                description: 'The fastest way to learn anything hard.',
                by: 'Siqi Chen',
                icon: 'https://example.com/universal-primer-icon.svg',
            },
            {
                id: 6,
                name: 'Code Tutor',
                description: "Let's code together! I'm Khanmigo Lite, by Khan Academy. I won't write the code for you, but I'll help you work things out. Can...",
                by: 'khanacademy.org',
                icon: 'https://example.com/code-tutor-icon.svg',
            },
        ],

    };

    const tabs = ['Lựa chọn', 'Hàng đầu', 'Viết', 'Năng suất', 'Nghiên cứu và Phân tích', 'Giáo dục', 'Lối sống', 'Lập trình'];

    const handleSearch = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
        setShowSearchResults(term !== '');
    };

    const filteredTools = searchTerm === ''
        ? toolsData[activeTab]
        : toolsData[activeTab].filter((tool) =>
            tool.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

    return (
        <div>
            <Header />

            <div className="container mx-auto px-4 py-8 flex">
                {/* Sidebar */}
                <div className="w-1/4 bg-gray-100 mr-6 rounded-lg p-4 h-1/2">
                    <ul>
                        {tabs.map((tab) => (
                            <li key={tab}>
                                <button
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-4 py-2 w-full text-left rounded-lg focus:outline-none mb-2 
                                        ${activeTab === tab
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-200 text-gray-700'
                                        }`}
                                >
                                    {tab}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Main Content */}
                <div className="w-3/4">
                    <input
                        type="text"
                        placeholder="Tìm kiếm GPT"
                        value={searchTerm}
                        onChange={handleSearch}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                    />

                    {/* Hiển thị kết quả tìm kiếm */}
                    {showSearchResults && (
                        <ul className="mt-4">
                            {filteredTools.map((tool) => (
                                <li key={tool.id} className="mb-2">
                                    <div className="flex items-center">
                                        <img
                                            src={tool.icon}
                                            alt={tool.name}
                                            className="w-6 h-6 mr-2"
                                        />
                                        <div>
                                            <p className="font-medium">{tool.name}</p>
                                            <p className="text-gray-600 text-sm">
                                                {tool.description}
                                            </p>
                                            <p className="text-gray-500 text-xs">
                                                Bởi {tool.by}
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}

                    <h1 className="text-3xl font-bold mt-8 mb-4">
                        {activeTab}
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredTools.map((tool) => (
                            <div
                                key={tool.id}
                                className="bg-white rounded-lg shadow-md p-6 transform transition duration-500 hover:scale-105"
                            >
                                <div className="flex items-center mb-4">
                                    <div className="bg-blue-500 rounded-full p-3 mr-4 w-12 h-12 flex items-center justify-center">
                                        <img
                                            src={tool.icon}
                                            alt={tool.name}
                                            className="w-6 h-6"
                                        />
                                    </div>
                                    <h2 className="text-lg font-medium">{tool.name}</h2>
                                </div>
                                <p className="text-gray-600 mb-4">{tool.description}</p>
                                <p className="text-gray-500 text-sm">
                                    Bởi <span className="font-medium">{tool.by}</span>
                                </p>
                            </div>
                        ))}
                    </div>

                    <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full mt-8">
                        Mở rộng
                    </button>
                </div>
            </div>
        </div>
    );
};

export default App;