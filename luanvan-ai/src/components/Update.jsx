/* eslint-disable react/prop-types */
import { useState } from 'react';
import { CheckIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    return (
        <header className="bg-[#202327] text-white py-3 px-6 flex items-center justify-between">
            <div className="flex items-center">
                <img
                    src="https://www.svgrepo.com/show/493614/react.svg"
                    alt="React Logo"
                    className="w-6 h-6 mr-2"
                />
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
                        <button href="#" className="hover:text-blue-300">
                            GitHub <span className="ml-1">↗</span>
                        </button>
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

const PlanOption = ({ title, price, features, isCurrentPlan, onUpgrade }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-3xl font-bold mb-4">
            ${price}{' '}
            <span className="text-sm font-normal">USD/tháng</span>
        </p>
        <p className="text-gray-600 mb-6">
            {title === 'Miễn phí'
                ? 'Cùng khám phá sự hỗ trợ của AI trong các công việc hàng ngày của bạn'
                : 'Nâng cao hiệu suất với quyền truy cập mở rộng'}
        </p>
        {isCurrentPlan ? (
            <button className="w-full py-2 px-4 bg-gray-200 text-gray-700 rounded-md mb-6">
                Phiên bản hiện tại của bạn
            </button>
        ) : (
            <button
                onClick={onUpgrade}
                className="w-full py-2 px-4 bg-emerald-500 text-white rounded-md mb-6 hover:bg-emerald-600"
            >
                Nâng cấp lên {title}
            </button>
        )}
        <ul className="space-y-2">
            {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-emerald-500 mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                </li>
            ))}
        </ul>
    </div>
);

const Update = () => {
    const navigate = useNavigate();
    const [planType, setPlanType] = useState('Cá nhân');

    const plans = {
        'Cá nhân': {
            'Miễn phí': {
                price: 0,
                features: [
                    'Hỗ trợ viết, giải quyết vấn đề và nhiều tính năng khác',
                    'Giới hạn truy cập',
                    'Quyền truy cập hạn chế vào A3M-0.1',
                    'Quyền truy cập hạn chế vào chức năng phân tích dữ liệu, tải tệp lên, thị giác, duyệt web và tạo hình ảnh',
                    'Sử dụng GPT tùy chỉnh',
                ],
            },
            'Plus': {
                price: 20,
                features: [
                    'Mọi thứ đều miễn phí',
                    'Có thể phân tích hình ảnh',
                    'Nhiều tin nhắn hơn tới 5 lần cho A3M-0.1',
                    'Quyền truy cập vào chức năng phân tích dữ liệu, tải tệp lên, thị giác, duyệt web và tạo hình ảnh',
                    'Truy cập Chế độ thoại nâng cao',
                    'Tạo và sử dụng GPT tùy chỉnh',
                ],
            },
        },
        'Doanh nghiệp': {
            'Nhóm': {
                price: 25,
                features: [
                    'Mọi thứ trên Plus',
                    'và các công cụ như DALL-E, duyệt web, phân tích dữ liệu, v.v.',
                    'Tạo và chia sẻ GPT với không gian làm việc của bạn',
                    'Bảng điều khiển quản trị viên dùng để quản lý không gian làm việc',
                    'Dữ liệu nhóm được loại bỏ khỏi hoạt động huấn luyện theo cài đặt mặc định.',
                ],
            },
        },
    };

    const currentPlanOptions = plans[planType];

    const handleClose = () => {
        navigate('/');
    }

    return (
        <div>
            <Header />
            <div className="flex flex-col items-center justify-center min-h-screen relative">
                <div className="max-w-4xl w-full p-6">
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-60 text-gray-600 hover:text-gray-800"
                    >
                        <span aria-hidden="true" className='text-5xl'>×</span>
                    </button>

                    <h1 className="text-3xl font-bold text-center mb-8">
                        Nâng cấp kế hoạch của bạn
                    </h1>
                    <div className="flex justify-center mb-8">
                        <div className="bg-gray-100 p-1 rounded-full flex">
                            <button
                                className={`px-4 py-2 rounded-full ${planType === 'Cá nhân' ? 'bg-white' : ''
                                    }`}
                                onClick={() => setPlanType('Cá nhân')}
                            >
                                Cá nhân
                            </button>
                            <button
                                className={`px-4 py-2 rounded-full ${planType === 'Doanh nghiệp' ? 'bg-white' : ''
                                    }`}
                                onClick={() => setPlanType('Doanh nghiệp')}
                            >
                                Doanh nghiệp
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {Object.entries(currentPlanOptions).map(
                            ([planName, planDetails]) => (
                                <PlanOption
                                    key={planName}
                                    title={planName}
                                    price={planDetails.price}
                                    features={planDetails.features}
                                    isCurrentPlan={planName === 'Miễn phí'}
                                    onUpgrade={() => console.log(`Upgrade to ${planName}`)}
                                />
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Update;