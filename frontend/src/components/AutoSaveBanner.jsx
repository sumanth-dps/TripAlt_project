export default function AutoSaveBanner({ restored, onDiscard }) {
  if (!restored) return null;

  return (
    <div className="bg-orange-50 border border-orange-300 text-orange-900 mb-4 rounded-lg px-4 py-2 flex justify-between">
      <span>Draft restored from previous session</span>
      <button
        onClick={onDiscard}
        className="text-sm underline hover:text-orange-700"
      >
        Discard
      </button>
    </div>
  );
}
