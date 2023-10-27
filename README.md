## AMX_Ranking

주소 : <http://13.209.85.151>

### Descript

```
-현재 작동 중인 내용

1. AMX_Zero / AMX_10 각 라운드마다 Q(예선),H1(본선1),H2(본선2) 의 결과지파일(.csv) 존재
2. .csv파일(게임 결과지 파일)을 .json파일로 읽어온다.
3. 결과지의 참가자 정보를 DB의 User테이블에 저장한다.(결과지 파일을 새로 읽어올때마다 새로운 User가 추가 됐는지 검사 -> 새로운 유저만 추가한다.)
4. 결과지의 결과값으로 새로운 Elo,Odds,OddsDiff값 등을 계산한다.
5. 계산된 값을 각 AMX_Zero, AMX_10 테이블에 업데이트한다.
6. User테이블에 유저별 경기횟수, 이긴횟수를 누적시킨다.
7. 메인페이지 내용 : ~라운드까지의 한번이라도 참가한 유저들의 Elo값의 랭킹순위임
8. Game, Tier, Region 별 데이터 걸러짐
9. Search : 유저 네임 검색/ Countries : 나라 검색
10. 각 라운드마다 Q,H1,H2 상금 누적
10-1. AMXZero
- Q, H1, H2 게임 경기 중에 카메라 킨 유저-경기 마지막에 체크 Round당 -> + $1
- Q, H1, H2 1등~15등까지만 상금있음 -> 등수별 상이
- H1, H2 -> Fastest기록세운 유저 -> + $1
10-2. AMX10
- Q, H1, H2 1등~15등까지만 상금있음 -> 등수별 상이
- H1, H2 -> Fastest기록세운 유저 -> + $5


-추가 및 변경 하고 싶은 내용

관리자 페이지 추가하고 싶음
1. AMXZero / AMX10 별 csv파일 업로드를 선택하게 한다.
2. S3에 csv 파일을 업로드 하게 한다. (지금 내가 한땀한땀..하)
3. Elo초기값 변경할 수 있게한다. (지금 초기값 무조건 1000점 부터 시작)
4. 관리자페이지에서 페널티 적용시키면 포인트를 깎을수 있도록 수정부분넣기
5. 유저로그 쌓기(결과를 계속 누적시키니까 이게 계속 업데이트되는데 중간중간 계산과정이 생략되어서 결과만 보이고 있어서 굉장히 별로다..예를들면, 각 라운드마다 몇등해서 얼만큼 상금이 쌓였고, 몇등해서 엘로값이 이만큼 나왔는지...업데이트 될때마다 LOG테이블을 만들어서 넣어놓기)

```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
