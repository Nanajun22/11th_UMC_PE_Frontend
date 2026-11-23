export function getMemberId(accessToken: string | null): number | null {
  if (!accessToken) return null;

  try {
    const payload = accessToken.split(".")[1];
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const decoded = JSON.parse(atob(base64));
    const memberId = Number(decoded.memberId ?? decoded.sub);

    return Number.isInteger(memberId) && memberId > 0 ? memberId : null;
  } catch {
    return null;
  }
}
