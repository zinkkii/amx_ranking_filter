## AMX_Ranking

주소 : <http://13.209.85.151>

```

-설명

.csv파일(iracing 결과지)을 .json으로 변환한다
게임 결과지의 참가자 정보 -> DB의 USER테이블에 저장한다
게임 결과지의 참가자 및 결과 정보 -> 읽어와서 Elo값, Odds값 계산 -> DB의 각 게임테이블 정보에 저장한다.
결과지 누적 -> DB정보 업데이트

메인페이지 -> 가장 최근 게임결과까지의 누적데이터 표시한다

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
