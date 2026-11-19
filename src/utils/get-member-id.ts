// JWT 토큰은 "헤더.내용.서명" 형태예요.
// 가운데 "내용"(payload)에 회원 정보가 들어 있어서, 이를 꺼내 memberId를 읽어요.
// 서버가 memberId를 어떤 이름으로 넣는지 명세에 없어서 memberId, sub 순서로 확인해요.
export function getMemberId(accessToken: string | null): number | null {
  if (!accessToken) return null;

  try {
    const payload = accessToken.split(".")[1];
    // base64url 형식을 atob가 읽을 수 있는 base64 형식으로 바꿔요.
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const decoded = JSON.parse(atob(base64));
    const memberId = Number(decoded.memberId ?? decoded.sub);

    return Number.isInteger(memberId) && memberId > 0 ? memberId : null;
  } catch {
    return null;
  }
}
