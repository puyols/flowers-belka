import React from 'react';
import Icon from '../AppIcon';

const FloatingButtons = () => {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col space-y-3">
      {/* WhatsApp Button */}
      <a
        href="https://api.whatsapp.com/send?phone=79037349844"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="Написать в WhatsApp"
      >
        <Icon name="MessageSquare" size={24} />
      </a>
    </div>
  );
};

export default FloatingButtons;
