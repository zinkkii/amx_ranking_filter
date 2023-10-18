import Layout from "../layouts/layout";
import Typography from "@mui/material/Typography";

export default function adminPage() {
  return (
    <Layout>
      <Typography
        variant="h5"
        sx={{ mb: 3, fontFamily: "Kanit", fontWeight: "900" }}
      >
        Admin
      </Typography>
      <Typography
        variant="body"
        sx={{ mb: 3, fontFamily: "Kanit", fontWeight: "900" }}
      >
        1. AMX0 / AMX10 업로드를 선택하게한다
        <br />
        2. S3에 csv파일 업로드 하게 한다
        <br />
        3. S3에서 업로드한 csv파일 읽어온다.
        <br />
        4. 뉴비 User검사 후, User정보를 DB테이블에 넣는다.
        <br />
        5. User가 어떻게 업데이트 됐는지, 확인할 수 있도록 보여준다.
        <br />
        6. Elo값을 계산한다.(계산하기 버튼) ▶ 계산된 Elo값을 보여준다.
        <br />
        7. (Elo값 업데이트 버튼) ▶ (AMX0, AMX10 구별한걸로)Elo값 업데이트시킨다.
        <br />
        8. User 테이블에 경기 횟수, 이긴 횟수 등을 누적시킨다.
        <br />
      </Typography>
      <Typography sx={{ mt: 3 }}>aaaabbbb</Typography>
    </Layout>
  );
}
