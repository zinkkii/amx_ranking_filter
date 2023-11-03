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
7. 메인페이지 내용 : 17라운드(현재)까지의 한번이라도 참가한 유저들의 Elo값의 랭킹순위임
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
11. 관리자 페이지 jwt 방식로그인
12. s3 파일 선택 업로드

-추가 및 변경 하고 싶은 내용

-관리자
1. Elo초기값 변경할 수 있게한다. (지금 초기값 무조건 1000점 부터 시작)
2. 관리자페이지에서 페널티 적용시키면 포인트를 깎을수 있도록 수정부분넣기(맨마지막)
3. 유저로그 쌓기


Q
1. s3 .csv Upload
2. Read .csv with Papaparse
3. User Check, Insert + (Log++)
4. Result Update + (Log++)
5. elo,point,result(...) Calculation + (Log++)

H1
1. s3 .csv Upload
2. Read .csv with Papaparse
3. Result Update + (Log++)
4. elo,point,result,
    fastestLapUser,fastestPoint(...) Calculation + (Log++)

H2
1. s3 .csv Upload
2. Read .csv with Papaparse
3. User Check, Insert + (Log++)
4. elo,point,result,fastestLapUser,fastestPoint,
    zoomBousUser,zoomPoint(...) Calculation + (Log++)

LogTableColumn(유저로그 쌓기)
num -  그냥 PK
custID - user고유 id (user의 custID FK)
round - 몇 라운드인지
game - AMX0인지 AMX10인지
q_result - Q 결과(등수)
q_point - Q 에서 얻은 포인트
q_elo - Q경기 후 엘로값
q_fastest - Q에서 fastestLaptime기록했는지(하면1 아님0)
h1_result - H1 결과(등수)
h1_point - H1에서 얻은 포인트
h1_elo - H1경기 후 엘로값
h1_fastest - H1에서 fastestLaptime기록했는지(1,0)
h2_result - H2결과(등수)
h2_point - H2에서 얻은 포인트
h2_elo - H2경기 후 엘로값
h2_fastest - H2에서 fastestLaptime기록했니?(1,0)
zoomPoint - AMX0 일때만 줌캠ON유저들 +1달러씩


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
