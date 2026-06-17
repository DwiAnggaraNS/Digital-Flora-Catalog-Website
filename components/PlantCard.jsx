import Link from "next/link";

export default function PlantCard({ plant }) {
  const { nama_lokal, nama_latin, kategori, slug, images } = plant;
  
  // Use first image in array or placeholder if none
  const imageUrl = images && images.length > 0 ? images[0] : "";

  return (
    <div className="plant-card group bg-surface-container-lowest border border-secondary-container rounded-lg overflow-hidden flex flex-col transition-all duration-300">
      <div className="aspect-square relative overflow-hidden bg-surface-container-low">
        {imageUrl ? (
          <img
            alt={`Botanical study of ${nama_lokal}`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            src={imageUrl}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-secondary">
            <span className="material-symbols-outlined text-4xl">eco</span>
          </div>
        )}
      </div>
      <div className="p-stack-md flex flex-col flex-grow">
        <p className="font-label-caps text-label-caps text-primary-container mb-2">
          {kategori}
        </p>
        <h3 className="font-headline-sm text-headline-sm text-primary mb-1">
          {nama_lokal}
        </h3>
        <p className="font-body-md text-body-md italic text-secondary mb-4">
          {nama_latin}
        </p>
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-secondary-container/50">
          <Link
            href={`/explore/${slug}`}
            className="font-label-md text-label-md text-primary flex items-center group/link hover:opacity-80 transition-opacity"
          >
            Kenalan yuk
            <span
              className="material-symbols-outlined ml-1 text-[18px] transition-transform group-hover/link:translate-x-1"
              data-icon="arrow_forward"
            >
              arrow_forward
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
