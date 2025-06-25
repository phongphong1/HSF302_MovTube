interface Episode {
  id: string;
  orderNumber: number;
  url: string;
}

// Component Popup Chọn Tập Phim
interface EpisodeSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  episodes: Episode[];
  currentEpisode?: string | null;
  onSelectEpisode: (episodeId: string) => void;
  movieTitle: string;
}

const EpisodeSelector: React.FC<EpisodeSelectorProps> = ({
  isOpen,
  onClose,
  episodes,
  currentEpisode,
  onSelectEpisode,
  movieTitle,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75">
      <div className="bg-gray-800 rounded-lg w-full max-w-4xl max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h3 className="text-xl font-semibold text-white">{movieTitle}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Episodes grid */}
        <div className="p-4 overflow-y-auto flex-grow">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {episodes.map((ep) => (
              <div
                key={ep.id}
                onClick={() => onSelectEpisode(ep.url)}
                className={`cursor-pointer rounded-md overflow-hidden transition-all duration-200 ${
                  currentEpisode === ep.id
                    ? "ring-2 ring-red-500 scale-105"
                    : "hover:scale-105 hover:shadow-lg"
                }`}
              >
                <div className="p-2 bg-gray-700">
                  <p className="text-xs text-gray-400">Tập {ep.orderNumber}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EpisodeSelector;
