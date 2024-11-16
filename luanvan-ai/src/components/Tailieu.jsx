/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const categories = [
    { name: 'Biểu Mẫu', icon: '📄' },
    { name: 'Tài liệu Miễn Phí', icon: '🆓' },
    { name: 'Chưa Phân Loại', icon: '📁' },
    { name: 'Kinh Tế Môn', icon: '💰' },
    { name: 'Tài Chính Thuế', icon: '📊' },
    { name: 'Du Lịch', icon: '✈️' },
    { name: 'Bảo Hiểm', icon: '☂️' },
    { name: 'Thương Mại', icon: '📈' },
    { name: 'Đầu Tư', icon: '💸' },
    { name: 'Marketing', icon: '📢' },
];

const documents = [
    {
        id: 1,
        title: "Tóm tắt luận án Phát triển hạ tầng kinh tế - xã hội ở nông thôn tỉnh Bắc Ninh: Kinh nghiệm và giải pháp",
        views: 1662,
        downloads: 2,
        format: "pdf",
        file: "/documents/document1.pdf",
        image: "src/assets/tailieu/tl1.png",
        category: "Kinh Tế Môn"
    },
    {
        id: 2,
        title: "Luận văn Đánh giá một số khía cạnh kinh tế xã hội phát sinh của hộ gia đình sau tái định cư thuộc dự án rạch ụ cây Quận 8 - Thành phố Hồ Chí Minh",
        views: 542,
        downloads: 2,
        format: "pdf",
        file: "/documents/document1.pdf",
        image: "src/assets/tailieu/tl2.jpg",
        category: "Kinh Tế Môn"
    },
    {
        id: 3,
        title: "Luận văn Đánh giá năng lực cạnh tranh của doanh nghiệp nhỏ và vừa tỉnh Bình Dương",
        views: 652,
        downloads: 2,
        format: "pdf",
        file: "/documents/document1.pdf",
        image: "src/assets/tailieu/tl3.jpg",
        category: "Kinh Tế Môn"
    },
    {
        id: 4,
        title: "Báo cáo Tóm tắt Nghiên cứu phát hiện chuyển động đất thường dựa vào camera",
        views: 1262,
        downloads: 2,
        format: "pdf",
        file: "/documents/document1.pdf",
        image: "src/assets/tailieu/tl4.png",
        category: "Kinh Tế Môn"
    },
];

function Tailieu() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const navigate = useNavigate();

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        setSearchTerm('');
    };

    const filteredDocuments = documents.filter((document) => {
        const matchesSearchTerm = document.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory ? document.category === selectedCategory : true;
        return matchesSearchTerm && matchesCategory;
    });

    return (
        <div>
            <Header />
            <div className="container mx-auto px-4 py-8 flex">
                {/* Sidebar */}
                <div className="w-1/4 bg-blue-500 text-white p-4 rounded-lg mr-6 h-1/2">
                    <h2 className="text-xl font-bold mb-4">DANH MỤC LUẬN VĂN</h2>
                    <ul>
                        {categories.map((category) => (
                            <li
                                key={category.name}
                                onClick={() => handleCategoryClick(category.name)}
                                className={`py-2 px-4 rounded-md mb-2 cursor-pointer 
                                ${selectedCategory === category.name ? 'bg-blue-700' : 'hover:bg-blue-600'}`}
                            >
                                {category.icon} {category.name}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Main Content */}
                <div className="w-3/4">
                    <input
                        type="text"
                        placeholder="Tìm kiếm..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />

                    <div className="mt-8 h-32">
                        {filteredDocuments.map((document) => (
                            <div key={document.id} className="bg-white rounded-lg p-6 mb-6 flex items-start">
                                <img
                                    src={document.image}
                                    alt={document.title}
                                    className="w-48 h-47 object-cover mr-6"
                                />

                                <div>
                                    <h3 className="text-xl font-semibold mb-2">
                                        {document.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-4">
                                        {/* Mô tả tùy chọn cho mỗi tài liệu */}
                                    </p>

                                    <div className="flex">
                                        <button className="bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded-lg mr-2 flex items-center">
                                            <i className="fas fa-eye mr-2"></i>
                                            {document.views}
                                        </button>
                                        <button className="bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded-lg mr-2 flex items-center">
                                            <i className="fas fa-download mr-2"></i>
                                            {document.downloads}
                                        </button>
                                        <button className="bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded-lg mr-4 flex items-center">
                                            <i className={`fas fa-file-${document.format} mr-2`}></i>
                                            {document.format.toUpperCase()}
                                        </button>
                                    </div>

                                    <a
                                        href={document.file}
                                        download={document.title}
                                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg mt-4 block text-center"
                                    >
                                        <i className="fas fa-download mr-2"></i> Download
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

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

export default Tailieu;