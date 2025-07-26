import React from "react";
import "./YandexReviews.css";

const YandexReviews = () => {
  console.log("YandexReviews component loaded");

  return (
    <div className="grid-cols">
      <div className="grid-col grid-col-top-3-1">
        <div className="grid-items">
          <div className="grid-item grid-item-top-3-1-1">
            <div>
              <p>
                <img
                  src="https://flowers-belka.ru/image/catalog/image_fx_.jpg"
                  alt="Белочка с букетом цветов"
                  style={{width: "1408px"}}
                />
              </p>
              <h2>
                <strong>Подарите радость близким, даже находясь далеко!</strong>
              </h2>
              <p>
                Хотите порадовать любимого человека или друга, но находитесь далеко? Не беда! Мы поможем вам передать тепло и заботу с помощью красивых, ярких букетов, которые подчеркнут ваши чувства и оставят самые приятные впечатления. Наши флористы тщательно подбирают оттенки и сочетания, чтобы каждый букет был уникальным и подходил к любому поводу — будь то день рождения, годовщина или просто знак внимания.
              </p>
              <p>
                <strong>Как это работает?</strong>
              </p>
              <ol>
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

      <div className="grid-col grid-col-top-3-2">
        <div className="grid-items">
          <div className="grid-item grid-item-top-3-2-1">
            <div className="module module-blocks module-blocks-312 blocks-grid">
              <div className="module-body">
                <div className="module-item module-item-1 no-expand">
                  <div className="block-body expand-block">
                    <div className="block-wrapper">
                      <div className="block-content block-html">
                        <div style={{width: "560px", height: "800px", overflow: "hidden", position: "relative"}}>
                          <iframe
                            style={{
                              width: "100%",
                              height: "100%",
                              border: "1px solid #e6e6e6",
                              borderRadius: "8px",
                              boxSizing: "border-box"
                            }}
                            src="https://yandex.ru/maps-reviews-widget/4005765345?comments"
                          />
                          <a
                            href="https://yandex.ru/maps/org/tsvetochnaya_masterskaya_belka_flowers/4005765345/"
                            target="_blank"
                            style={{
                              boxSizing: "border-box",
                              textDecoration: "none",
                              color: "#b3b3b3",
                              fontSize: "10px",
                              fontFamily: "YS Text,sans-serif",
                              padding: "0 20px",
                              position: "absolute",
                              bottom: "8px",
                              width: "100%",
                              textAlign: "center",
                              left: "0",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              display: "block",
                              maxHeight: "14px",
                              whiteSpace: "nowrap"
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
  );
};

export default YandexReviews;
