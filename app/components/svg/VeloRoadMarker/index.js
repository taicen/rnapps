import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

export default ({ color }) => (
  <Svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <Circle cx="18" cy="18" r="17" fill={color || '#1C65D1'} stroke="white" stroke-width="2" />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M24.5318 16.3353C24.3724 16.3353 24.2156 16.346 24.0611 16.3648L23.0906 13.0424C23.1854 12.9319 23.243 12.7886 23.243 12.6317C23.243 12.2829 22.9602 12 22.6114 12H20.0059C19.6571 12 19.3742 12.2829 19.3742 12.6317C19.3742 12.9805 19.6571 13.2633 20.0059 13.2633H21.6561L20.9851 14.3312C20.9555 14.3274 20.9251 14.3253 20.8947 14.3261L15.2539 14.4079C15.3937 14.2921 15.4827 14.1171 15.4827 13.9214C15.4827 13.5726 15.1999 13.2898 14.8511 13.2898H13.3294C12.9806 13.2898 12.6978 13.5726 12.6978 13.9214C12.6978 14.2702 12.9806 14.5531 13.3294 14.5531H13.4431C13.4582 14.6096 13.4812 14.665 13.5131 14.7176L13.7668 15.135L13.0667 16.5163C12.6962 16.399 12.3021 16.3352 11.8932 16.3352C9.74652 16.3353 8 18.0817 8 20.2285C8 22.3753 9.74652 24.1218 11.8932 24.1218C13.7471 24.1218 15.3015 22.8189 15.6914 21.081L17.7744 21.2015C17.7867 21.2022 17.7989 21.2026 17.811 21.2026C18.0273 21.2026 18.2298 21.0916 18.3458 20.9069L22.2544 14.6855L22.8484 16.7185C21.5422 17.3475 20.6385 18.6845 20.6385 20.2285C20.6385 22.3753 22.3851 24.1218 24.5318 24.1218C26.6786 24.1218 28.4252 22.3753 28.4252 20.2285C28.4252 18.0817 26.6786 16.3353 24.5318 16.3353ZM14.5389 16.4059L16.6442 19.8707L15.7649 19.8199C15.6477 18.7012 15.0545 17.7225 14.1925 17.0893L14.5389 16.4059ZM9.2633 20.2285C9.2633 18.7784 10.4431 17.5986 11.8932 17.5986C12.0963 17.5986 12.2938 17.6225 12.4838 17.6663L11.3298 19.943C11.2335 20.133 11.2394 20.3588 11.3457 20.5435C11.4519 20.7282 11.6441 20.8469 11.8567 20.8592L14.4056 21.0067C14.0731 22.0782 13.0726 22.8585 11.8932 22.8585C10.4431 22.8585 9.2633 21.6787 9.2633 20.2285ZM12.8928 19.6536L13.61 18.2386C14.0525 18.621 14.3665 19.1478 14.478 19.7453L12.8928 19.6536ZM17.8188 19.3711L15.568 15.6668L20.188 15.5998L17.8188 19.3711ZM24.5318 22.8585C23.0816 22.8585 21.9018 21.6787 21.9018 20.2285C21.9018 19.26 22.4284 18.4127 23.21 17.9564L23.9255 20.4056C24.0234 20.7405 24.3744 20.9328 24.7089 20.8349C25.0438 20.737 25.2359 20.3863 25.1381 20.0515L24.4224 17.6014C24.4587 17.5999 24.4951 17.5986 24.5318 17.5986C25.9821 17.5986 27.1619 18.7784 27.1619 20.2286C27.1619 21.6787 25.9821 22.8585 24.5318 22.8585Z"
      fill="white"
    />
  </Svg>
);
