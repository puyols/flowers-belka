import React from 'react';
import Image from '../../../components/AppImage';

const CollectionHero = ({ currentCollection }) => {
  return (
    <div className="relative h-80 lg:h-96 overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
      <div className="absolute inset-0">
        <Image
          src={currentCollection.heroImage}
          alt={currentCollection.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
      </div>
      
      <div className="relative h-full flex items-center">
        <div className="w-full px-4 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="font-playfair text-4xl lg:text-5xl font-bold text-white mb-4 text-shadow-soft">
              {currentCollection.name}
            </h1>
            <p className="font-inter text-lg text-white/90 mb-6 leading-relaxed">
              {currentCollection.description}
            </p>
            <div className="flex items-center space-x-6 text-white/80">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Источник:</span>
                <span className="text-sm">{currentCollection.source}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Сезон:</span>
                <span className="text-sm">{currentCollection.season}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionHero;