import React from 'react';
import belkaImage from '../../../assets/images/image_fx_.jpg';

const YandexReviews = () => {
  console.log('Путь к изображению белочки:', belkaImage);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Левая часть - точная копия оригинала */}
          <div className="grid-col">
            <div className="grid-items">
              <div className="grid-item">
                <div>
                  <p>
                    <img
                      src={belkaImage}
                      alt="Белочка с букетом"
                      className="w-full max-w-full"
                      onError={(e) => {
                        console.error('Ошибка загрузки изображения белочки:', e);
                        e.target.style.border = '2px solid red';
                      }}
                      onLoad={() => console.log('Изображение белочки загружено успешно')}
                    />
                  </p>
                  <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-4">
                    <strong>Подарите радость близким, даже находясь далеко!</strong>
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Хотите порадовать любимого человека или друга, но находитесь далеко? Не беда! Мы поможем вам передать тепло и заботу с помощью красивых, ярких букетов, которые подчеркнут ваши чувства и оставят самые приятные впечатления. Наши флористы тщательно подбирают оттенки и сочетания, чтобы каждый букет был уникальным и подходил к любому поводу — будь то день рождения, годовщина или просто знак внимания.
                  </p>
                  <p className="font-bold text-gray-900 mb-3">
                    <strong>Как это работает?</strong>
                  </p>
                  <ol className="list-decimal list-inside space-y-3 text-gray-700">
                    <li>
                      <p>
                        <strong>Выберите букет</strong>: На нашем сайте вы найдете самые свежие и стильные композиции. Мы предлагаем цветы на любой вкус — от классических роз до экзотических сочетаний.
                      </p>
                    </li>
                    <li>
                      <p>
                        <strong>Оформите заказ</strong>: Укажите адрес получателя и желаемую дату доставки. Мы учтем все пожелания, чтобы ваш подарок был идеальным.
                      </p>
                    </li>
                    <li>
                      <p>
                        <strong>Доставка в срок</strong>: Мы оперативно доставим букет в указанное время, чтобы ваш сюрприз стал приятным моментом для получателя.
                      </p>
                    </li>
                  </ol>
                  <p><br /></p>
                </div>
              </div>
            </div>
          </div>

          {/* Правая часть - виджет Яндекс.Карт */}
          <div className="grid-col">
            <div className="grid-items">
              <div className="grid-item">
                <div className="module module-blocks module-blocks-312 blocks-grid">
                  <div className="module-body">
                    <div className="module-item module-item-1 no-expand">
                      <div className="block-body expand-block">
                        <div className="block-wrapper">
                          <div className="block-content block-html">
                            <div style={{width: '560px', height: '800px', overflow: 'hidden', position: 'relative'}}>
                              <iframe 
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  border: '1px solid #e6e6e6',
                                  borderRadius: '8px',
                                  boxSizing: 'border-box'
                                }}
                                src="https://yandex.ru/maps-reviews-widget/4005765345?comments"
                                title="Отзывы Яндекс.Карт"
                              />
                              <a 
                                href="https://yandex.ru/maps/org/tsvetochnaya_masterskaya_belka_flowers/4005765345/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                style={{
                                  boxSizing: 'border-box',
                                  textDecoration: 'none',
                                  color: '#b3b3b3',
                                  fontSize: '10px',
                                  fontFamily: 'YS Text,sans-serif',
                                  padding: '0 20px',
                                  position: 'absolute',
                                  bottom: '8px',
                                  width: '100%',
                                  textAlign: 'center',
                                  left: '0',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  display: 'block',
                                  maxHeight: '14px',
                                  whiteSpace: 'nowrap',
                                  paddingLeft: '16px',
                                  paddingRight: '16px'
                                }}
                              >
                                Цветочная мастерская Belka-flowers на карте Москвы и Московской области — Яндекс&nbsp;Карты
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YandexReviews;
