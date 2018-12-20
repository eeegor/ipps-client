import React from 'react';

export const IconLogo = props => {
  const { color = '#29c', height = 75, width = 200 } = props;

  return (
    <div className="icon icon--logo">
      <svg
        width={width}
        height={height}
        viewBox="0 0 201 75"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <g
          id="logo"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <path
            id="IPPS"
            fill={color}
            d="M0.5,2.38095238 L15.9761905,2.38095238 L15.9761905,72.6190476 L0.5,72.6190476 L0.5,2.38095238 Z M30.0634921,2.38095238 L56.1547619,2.38095238 C59.7923462,2.38095238 63.2314653,2.7116369 66.4722222,3.37301587 C69.7129792,4.03439484 72.5403318,5.17525645 74.9543651,6.79563492 C77.3683983,8.41601339 79.2863686,10.5985312 80.7083333,13.343254 C82.1302981,16.0879767 82.8412698,19.54363 82.8412698,23.7103175 C82.8412698,27.8108671 82.1799008,31.2499861 80.8571429,34.0277778 C79.5343849,36.8055694 77.71562,39.0211558 75.4007937,40.6746032 C73.0859673,42.3280506 70.3412857,43.5019807 67.1666667,44.1964286 C63.9920476,44.8908765 60.5529286,45.2380952 56.8492063,45.2380952 L45.5396825,45.2380952 L45.5396825,72.6190476 L30.0634921,72.6190476 L30.0634921,2.38095238 Z M45.5396825,32.1428571 L55.8571429,32.1428571 C57.2460387,32.1428571 58.585311,32.0105833 59.875,31.7460317 C61.164689,31.4814802 62.3220848,31.0350561 63.3472222,30.406746 C64.3723596,29.778436 65.1990709,28.9186562 65.827381,27.827381 C66.455691,26.7361057 66.7698413,25.3637649 66.7698413,23.7103175 C66.7698413,21.9245942 66.3564856,20.4861166 65.5297619,19.3948413 C64.7030382,18.303566 63.6448477,17.4603204 62.3551587,16.8650794 C61.0654697,16.2698383 59.6269921,15.8895511 58.0396825,15.7242063 C56.452373,15.5588616 54.9312242,15.4761905 53.4761905,15.4761905 L45.5396825,15.4761905 L45.5396825,32.1428571 Z M92.5634921,2.38095238 L118.654762,2.38095238 C122.292346,2.38095238 125.731465,2.7116369 128.972222,3.37301587 C132.212979,4.03439484 135.040332,5.17525645 137.454365,6.79563492 C139.868398,8.41601339 141.786369,10.5985312 143.208333,13.343254 C144.630298,16.0879767 145.34127,19.54363 145.34127,23.7103175 C145.34127,27.8108671 144.679901,31.2499861 143.357143,34.0277778 C142.034385,36.8055694 140.21562,39.0211558 137.900794,40.6746032 C135.585967,42.3280506 132.841286,43.5019807 129.666667,44.1964286 C126.492048,44.8908765 123.052929,45.2380952 119.349206,45.2380952 L108.039683,45.2380952 L108.039683,72.6190476 L92.5634921,72.6190476 L92.5634921,2.38095238 Z M108.039683,32.1428571 L118.357143,32.1428571 C119.746039,32.1428571 121.085311,32.0105833 122.375,31.7460317 C123.664689,31.4814802 124.822085,31.0350561 125.847222,30.406746 C126.87236,29.778436 127.699071,28.9186562 128.327381,27.827381 C128.955691,26.7361057 129.269841,25.3637649 129.269841,23.7103175 C129.269841,21.9245942 128.856486,20.4861166 128.029762,19.3948413 C127.203038,18.303566 126.144848,17.4603204 124.855159,16.8650794 C123.56547,16.2698383 122.126992,15.8895511 120.539683,15.7242063 C118.952373,15.5588616 117.431224,15.4761905 115.97619,15.4761905 L108.039683,15.4761905 L108.039683,32.1428571 Z M189.785714,19.5436508 C188.529094,17.9563413 186.826069,16.7824112 184.676587,16.0218254 C182.527106,15.2612396 180.493396,14.8809524 178.575397,14.8809524 C177.451053,14.8809524 176.293657,15.0132262 175.103175,15.2777778 C173.912692,15.5423294 172.788365,15.955685 171.730159,16.5178571 C170.671952,17.0800293 169.812173,17.8240694 169.150794,18.75 C168.489415,19.6759306 168.15873,20.8002579 168.15873,22.1230159 C168.15873,24.2394286 168.952373,25.8597827 170.539683,26.984127 C172.126992,28.1084712 174.127633,29.0674563 176.541667,29.8611111 C178.9557,30.6547659 181.551573,31.4484087 184.329365,32.2420635 C187.107157,33.0357183 189.70303,34.1600456 192.117063,35.6150794 C194.531097,37.0701131 196.531738,39.0211518 198.119048,41.468254 C199.706357,43.9153562 200.5,47.1891329 200.5,51.2896825 C200.5,55.1918185 199.772494,58.597869 198.31746,61.5079365 C196.862427,64.418004 194.894854,66.832001 192.414683,68.75 C189.934511,70.667999 187.057556,72.0899425 183.78373,73.015873 C180.509904,73.9418036 177.054251,74.4047619 173.416667,74.4047619 C168.853152,74.4047619 164.62039,73.7103244 160.718254,72.3214286 C156.816118,70.9325327 153.178588,68.683878 149.805556,65.5753968 L160.81746,53.4722222 C162.40477,55.5886349 164.405411,57.2255233 166.819444,58.3829365 C169.233478,59.5403497 171.730146,60.1190476 174.309524,60.1190476 C175.566144,60.1190476 176.839279,59.9702396 178.128968,59.672619 C179.418657,59.3749985 180.576053,58.9285744 181.60119,58.3333333 C182.626328,57.7380923 183.453039,56.9775179 184.081349,56.0515873 C184.709659,55.1256567 185.02381,54.0343978 185.02381,52.7777778 C185.02381,50.6613651 184.213632,48.9914082 182.593254,47.7678571 C180.972875,46.5443061 178.939166,45.5026498 176.492063,44.6428571 C174.044961,43.7830645 171.399485,42.9232847 168.555556,42.0634921 C165.711626,41.2036994 163.06615,40.0463036 160.619048,38.5912698 C158.171945,37.1362361 156.138236,35.2182659 154.517857,32.8373016 C152.897479,30.4563373 152.087302,27.3148343 152.087302,23.4126984 C152.087302,19.6428383 152.831342,16.3359931 154.319444,13.4920635 C155.807547,10.6481339 157.791654,8.26720536 160.271825,6.34920635 C162.751997,4.43120734 165.612418,2.99272966 168.853175,2.03373016 C172.093932,1.07473065 175.433845,0.595238095 178.873016,0.595238095 C182.84129,0.595238095 186.67723,1.15740179 190.380952,2.28174603 C194.084675,3.40609028 197.424588,5.29099206 200.400794,7.93650794 L189.785714,19.5436508 Z"
          />
        </g>
      </svg>
    </div>
  );
};
