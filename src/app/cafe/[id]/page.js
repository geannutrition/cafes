import cafes from '@/app/data/cafes.json';
import Link from 'next/link';

export default function CafeDetail({ params }) {
  // params.idをNumberに変換し、存在チェック
  const id = Number(params?.id);
  if (!id || isNaN(id)) {
    return <div className="min-h-screen bg-gray-100 p-4">無効なIDです</div>;
  }

  const cafe = cafes.find((c) => c.id === id);
  if (!cafe) {
    return <div className="min-h-screen bg-gray-100 p-4">カフェが見つかりません</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">{cafe.name}</h1>
      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
        <img src={cafe.image} alt={cafe.name} className="w-full h-64 object-cover rounded mb-4" />
        <p><strong>住所:</strong> {cafe.address}</p>
        <p><strong>営業時間:</strong> {cafe.hours}</p>
        <p><strong>特徴:</strong> {cafe.features.join(', ')}</p>
        <p><strong>説明:</strong> {cafe.description}</p>
        <Link href="/" className="mt-4 inline-block text-blue-500 hover:underline">
          戻る
        </Link>
      </div>
    </div>
  );
}