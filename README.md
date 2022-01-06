## https://jiho3894.github.io/CoinSite/

- Recoil : 상태관리 라이브러리를 사용할때는 index.tsx에 RecoilRoot을 넣어야함
- React-query : index.tsx에 QueryClientProvider을 사용해 useQuery사용
- Fetching tool : ReactQueryDevtools을 사용하여 fetch한 데이터를 쉽게 볼 수 있는 툴을 사용
- Toggle Mode : styled-components에 ThemeProvider을 사용하여 다크모드 구현
- string enum : 문자 열거형으로 dark light 값을 담고 localStorage에 getItem 새로고침후에도 상태유지
- useRecoilValue에 값을 담았음
- UseParams : Coins.tsx Link에 state에 name prop을 담고 Coin.tsx에서 useParams를 사용하여 name값을 가지고 옴
- useCallback : 함수로 무한 스크롤 구현




