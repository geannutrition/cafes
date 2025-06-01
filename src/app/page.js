import cafes from './data/cafes.json';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">関西カフェ情報</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cafes.map((cafe) => (
          <a key={cafe.id} href={`/cafe/${cafe.id}`} className="bg-white p-4 rounded shadow hover:shadow-lg">
            <h2 className="text-xl font-semibold">{cafe.name}</h2>
            <p>{cafe.address}</p>
            <p>{cafe.hours}</p>
            <p className="text-sm text-gray-600">{cafe.features.join(', ')}</p>
          </a>
        ))}
      </div>
    </div>
  );
}