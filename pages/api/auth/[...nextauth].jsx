import { executeQuery } from "@/app/DB/db";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
//import { TypeORMLegacyAdapter } from "@next-auth/typeorm-legacy-adapter";

export const authOptions = {
  providers: [
    CredentialsProvider({
      //1. 로그인페이지 폼 자동생성해주는 코드
      name: "credentials",
      credentials: {
        id: { label: "id", type: "text" },
        pw: { label: "pw", type: "password" },
      },

      //2. 로그인요청시 실행되는코드
      //직접 DB에서 아이디,비번 비교하고
      //아이디,비번 맞으면 return 결과, 틀리면 return null 해야함
      async authorize(credentials) {
        var sql = "SELECT * FROM AdminLogin WHERE id=? AND pw=?";
        let user = await executeQuery(sql, [credentials.id, credentials.pw]);
        console.log("----------eeeeee----------");
        console.log(user[0]);
        console.log("----------eeeeee----------");

        if (user.length == 0) {
          console.log("실패임");
          return null;
        }
        console.log(user);
        return user;
      },
    }),
  ],

  //3. jwt 써놔야 잘됩니다 + jwt 만료일설정
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, //30일
  },

  callbacks: {
    //4. jwt 만들 때 실행되는 코드
    //user변수는 DB의 유저정보담겨있고 token.user에 뭐 저장하면 jwt에 들어갑니다.
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = {};
        token.user.id = user[0].id;
        token.user.pw = user[0].pw;
        console.log("-------------rrrrrr------------");
        console.log(token.user.id);
        console.log(token.user.pw);
        console.log("-------------rrrrrr------------");
      }
      return token;
    },
    //5. 유저 세션이 조회될 때 마다 실행되는 코드
    session: async ({ session, token }) => {
      session.user = token.user;
      return session;
    },
  },
  pages: {
    signIn: "/manage",
  },
  secret: process.env.SECRET,
  //   adapter: TypeORMLegacyAdapter({
  //     type: "mysql",
  //     username: process.env.DB_USER,
  //     password: process.env.DB_PASSWORD,
  //     host: process.env.DB_HOST,
  //     database: process.env.DB_DATABASE,
  //     synchronize: false,
  //   }),
};
export default NextAuth(authOptions);
