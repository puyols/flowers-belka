import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const ProductImageGallery = ({ images, productName }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div className="space-y-4">
      {/* Main Image Display */}
      <div className="relative bg-surface rounded-2xl overflow-hidden shadow-botanical">
        <div className="aspect-square relative">
          <Image
            src={images[currentImageIndex]?.url}
            alt={`${productName} - изображение ${currentImageIndex + 1}`}
            className={`w-full h-full object-cover transition-transform duration-300 cursor-zoom-in ${
              isZoomed ? 'scale-150' : 'scale-100'
            }`}
            onClick={toggleZoom}
          />
          
          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center text-text-primary hover:bg-background transition-botanical shadow-botanical-sm"
                aria-label="Предыдущее изображение"
              >
                <Icon name="ChevronLeft" size={20} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center text-text-primary hover:bg-background transition-botanical shadow-botanical-sm"
                aria-label="Следующее изображение"
              >
                <Icon name="ChevronRight" size={20} />
              </button>
            </>
          )}

          {/* Zoom Indicator */}
          <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center space-x-2">
            <Icon name="ZoomIn" size={16} className="text-text-secondary" />
            <span className="text-sm font-inter text-text-secondary">
              {isZoomed ? 'Уменьшить' : 'Увеличить'}
            </span>
          </div>
        </div>
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="flex space-x-3 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-botanical ${
                index === currentImageIndex
                  ? 'border-primary shadow-botanical-sm'
                  : 'border-transparent hover:border-primary/30'
              }`}
            >
              <Image
                src={image.url}
                alt={`${productName} - миниатюра ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Image Counter */}
      <div className="text-center">
        <span className="text-sm font-inter text-text-secondary">
          {currentImageIndex + 1} из {images.length}
        </span>
      </div>
    </div>
  );
};

export default ProductImageGallery;