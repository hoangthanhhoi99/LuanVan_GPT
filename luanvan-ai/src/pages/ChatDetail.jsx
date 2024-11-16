import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import IconMenu from "../assets/menu.png";
import SideBar from "../components/SideBar";
import IconStar from "../assets/star.png";
import Gemini from "../gemini";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, setNameChat } from "../store/chatSlice";

// eslint-disable-next-line react/prop-types
const SuggestionBox = ({ suggestion, onClick }) => (
    <div
        onClick={() => onClick(suggestion)}
        className="w-[200px] h-[200px] p-6 bg-gray-400 flex items-center justify-center rounded-lg cursor-pointer hover:bg-gray-500 transition"
    >
        <p>{suggestion}</p>
    </div>
);

const ChatDetail = () => {
    const [menuToggle, setMenuToggle] = useState(true);
    const [dataDetail, setDataDetail] = useState([]);
    const [messageDetail, setMessageDetail] = useState([]);
    const [inputChat, setInputChat] = useState("");
    const [darkMode, setDarkMode] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [hints, setHints] = useState([
        "Phân tích các yếu tố ảnh hưởng", "Tạo phần phụ lục", "Nhấn mạnh các đóng góp của nghiên cứu",
        "Đọc và phân tích các bài viết tương tự", "Trích dẫn chính xác", "Cách dùng tài liệu",
        "Lên thời gian", "Việc giữ liên kết logic", "Tìm hiểu về định dạng", "Đưa ra kết luận",
        "Viết phần kết luận", "Nhận xét", "Xác định vấn đề chính", "Nghiên cứu tài liệu", "Lên dàn ý",
    ]);
    const [displayedHints, setDisplayedHints] = useState([]);

    const { id } = useParams();
    const { data } = useSelector((state) => state.chat);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (data.length > 0) {
            const chat = data.find((chat) => chat.id === id);
            if (chat) {
                setDataDetail(chat);
                setMessageDetail(chat.messages);
            }
        }
    }, [data, id]);

    useEffect(() => {
        setDisplayedHints(getRandomHints());
    }, [hints]);

    const getRandomHints = () => {
        const shuffled = hints.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 4);
    };

    const handleNavigateHome = () => {
        navigate("/chat/info");
    };
    const handleNavigateLogin = () => {
        navigate("/login");
    };
    const handleUpdateClick = () => {
        navigate("/update");
    };
    const handleNavigateDocument = () => {
        navigate("/document");
    };
    const handleNavigateExtend = () => {
        navigate("/extend");
    };
    const handleChatDetail = async () => {
        if (id && inputChat.trim() !== "") {
            setIsLoading(true);
            try {
                const chatText = await Gemini(inputChat, messageDetail);
                if (dataDetail.title === "Chat") {
                    const promptName = `This is a new chat, and user asks about ${inputChat}. No reply and comment just give me a name for this chat, Max length is 10 characters`;
                    const newTitle = await Gemini(promptName);
                    dispatch(setNameChat({ newTitle, chatId: id }));
                }
                if (chatText) {
                    const dataMessage = {
                        idChat: id,
                        userMess: inputChat,
                        botMess: chatText,
                    };
                    dispatch(addMessage(dataMessage));
                    setInputChat("");
                }
            } catch (error) {
                console.error("Error fetching chat response:", error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleMicClick = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Speech recognition is not supported in your browser.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = "vi-VN";
        recognition.interimResults = false;

        recognition.onstart = () => {
            console.log("Voice recognition started. Speak into the microphone.");
        };

        recognition.onspeechend = () => {
            recognition.stop();
            console.log("Voice recognition stopped.");
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setInputChat(transcript);
            console.log("Recognized text:", transcript);
        };

        recognition.start();
    };

    const handleSuggestionClick = (suggestion) => {
        setInputChat(suggestion);
    };

    const handleRefreshHints = () => {
        setDisplayedHints(getRandomHints());
    };

    return (
        <div className={`xl:w-[90%] w-full relative ${darkMode ? "bg-black text-white" : "bg-white text-black"} transition-colors duration-300`}>
            <div className="flex justify-between space-x-2 p-4">
                <div className="flex items-center">
                    <button onClick={() => setMenuToggle(!menuToggle)}>
                        <img src={IconMenu} alt="menu icon" className="w-8 h-8 xl:hidden" />
                    </button>
                    <h1 className="text-xl font-bold pr-4 cursor-pointer" onClick={handleNavigateHome}>
                        A3M
                    </h1>
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="ml-auto p-2 rounded-full bg-gray-700 text-white"
                        title="Toggle Light/Dark Mode"
                    >
                        {darkMode ? "☀️" : "🌙"}
                    </button>
                    <div className="ml-2">Dark Mode</div>
                </div>

                <div>
                    <button className="rounded-lg p-2 text-xs bg-green-200 hover:bg-green-300 mr-4 text-black"
                        onClick={handleNavigateExtend}
                    >
                        Extend
                    </button>
                    <button
                        className="rounded-lg p-2 text-xs bg-green-200 hover:bg-green-300 mr-4 text-black"
                        onClick={handleUpdateClick}
                    >
                        Update A3M plus
                    </button>
                    <button className="rounded-lg p-2 text-xs bg-green-200 hover:bg-green-300 mr-4 text-black"
                        onClick={handleNavigateDocument}

                    >
                        Document
                    </button>
                    <button
                        type="button"
                        className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2"
                        onClick={handleNavigateLogin}
                    >
                        <svg
                            className="w-4 h-4 me-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 18 19"
                        >
                            <path
                                fillRule="evenodd"
                                d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                                clipRule="evenodd"

                            />
                        </svg>
                        Đăng nhập tài khoản
                    </button>
                </div>
            </div>

            {menuToggle && (
                <div className="absolute h-full top-0 left-0 xl:hidden">
                    <SideBar onToggle={() => setMenuToggle(!menuToggle)} />
                </div>
            )}
            <div className="max-w-[90%] w-full mx-auto mt-20 space-y-10">
                {id ? (
                    <div className="flex flex-col space-y-4 p-4 h-[400px] overflow-x-hidden overflow-y-auto">
                        {isLoading ? (
                            <div className="flex flex-col justify-center items-center m-auto bg-white">
                                <div className="relative w-16 h-12 animate-spin rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                                    <div className="absolute inset-0 m-auto w-9 h-4 bg-gray-100 rounded-full"></div>
                                </div>
                                <p className="mt-4 text-lg text-gray-700 font-semibold">
                                    Đang tạo câu trả lời.. .
                                </p>
                            </div>
                        ) : (
                            Array.isArray(messageDetail) &&
                            messageDetail.map((item) => (
                                <div className="flex space-y-6 flex-col" key={item.id}>
                                    <div className="flex space-x-6 items-baseline">
                                        {item.isBot ? (
                                            <>
                                                <img src={IconStar} alt="star" className="w-8 h-8" />
                                                <p dangerouslySetInnerHTML={{ __html: item.text }} />
                                            </>
                                        ) : (
                                            <>
                                                <p>User</p>
                                                <p>{item.text}</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                ) : (
                    <div className="flex flex-col m-auto w-[70%] space-y-5">
                        <div className="space-y-1">
                            <h2 className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 text-[30px] inline-block text-transparent bg-clip-text font-bold">
                                Xin Chào
                            </h2>
                            <p className="text-3xl">Hôm nay tôi có thể giúp gì cho bạn</p>
                        </div>
                        <div className="flex items-center space-x-3">
                            {displayedHints.map((suggestion, index) => (
                                <SuggestionBox
                                    key={index}
                                    suggestion={suggestion}
                                    onClick={handleSuggestionClick}
                                />
                            ))}
                        </div>
                        <button
                            onClick={handleRefreshHints}
                            className="mx-auto w-[200px] px-4 py-2 mt-4"
                        >
                            <i className="fa-solid fa-spinner"></i> Làm mới gợi ý
                        </button>
                    </div>
                )}
                <div className="flex items-center space-x-6 w-[76%] bg-gray-200 rounded-s-3xl rounded-e-3xl px-3 m-auto">
                    <input
                        type="text"
                        value={inputChat}
                        placeholder="Nhập câu lệnh tại đây"
                        className="py-4 rounded-s-3xl rounded-e-3xl bg-gray-200 focus:outline-none rounded-lg w-[75%] text-black"
                        onChange={(e) => setInputChat(e.target.value)}
                    />
                    <button
                        type="button"
                        className="text-gray-900 bg-gray-200 hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-3.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2"
                        onClick={handleMicClick}
                        title="Click to speak"
                    >
                        🎤 Mic
                    </button>
                    <button
                        type="button"
                        className="text-gray-900 bg-gray-200 hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-3.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2"
                        onClick={handleChatDetail}
                    >
                        Gửi
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatDetail;