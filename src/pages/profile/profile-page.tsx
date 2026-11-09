import { useState } from "react";

export function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  
  const [userInfo, setUserInfo] = useState({
    email: "gwangsoo@cinemalab.kr",
    nickname: "gs0428",
  });

  const [editForm, setEditForm] = useState({ nickname: userInfo.nickname });

  const handleEditClick = () => {
    setEditForm({ nickname: userInfo.nickname });
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setUserInfo((prev) => ({ ...prev, nickname: editForm.nickname }));
    setIsEditing(false);
  };

  return (
    <div className="w-full min-h-screen bg-[#F8F9FA] pb-20">
      <div className="max-w-[1000px] mx-auto px-6 pt-16">
        
        {isEditing ? (
          /* ==========================================
             내 정보 수정 모드 (내 정보 수정.svg 참고)
             ========================================== */
          <div className="animate-in fade-in duration-300">
            {/* 상단 헤더 영역 */}
            <div className="flex justify-between items-start mb-16">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">내 정보 수정</h1>
                <p className="text-gray-500 text-sm">닉네임과 프로필 이미지만 변경할 수 있어요.</p>
              </div>
              <button
                onClick={handleSaveClick}
                className="bg-[#2563EB] hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-bold transition-colors"
              >
                변경사항 저장
              </button>
            </div>

            {/* 정보 수정 폼 영역 */}
            <div className="flex flex-col md:flex-row gap-16 mb-24">
              {/* 좌측: 프로필 이미지 */}
              <div className="flex flex-col items-center min-w-[140px]">
                <div className="relative w-28 h-28 bg-[#E9ECEF] rounded-full flex items-center justify-center mb-4">
                  {/* 기본 유저 아이콘 */}
                  <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                     <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                  {/* 연필(수정) 아이콘 배지 */}
                  <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 border border-gray-200 shadow-sm hover:bg-gray-50">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                </div>
                <h3 className="font-bold text-gray-900 mb-1">프로필 이미지</h3>
                <p className="text-xs text-gray-400">선택 사항 · 최대 5MB</p>
              </div>

              {/* 우측: 닉네임, 이메일 입력 */}
              <div className="flex-1 max-w-[600px] space-y-8">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-900">닉네임</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={editForm.nickname}
                      onChange={(e) => setEditForm({ nickname: e.target.value })}
                      className="w-full pl-4 pr-24 py-3.5 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500 bg-white"
                    />
                    <button className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-[#2563EB]">
                      중복 확인
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-900">이메일</label>
                  <input
                    type="email"
                    value={userInfo.email}
                    disabled
                    className="w-full px-4 py-3.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            {/* 회원 탈퇴 영역 */}
            <div className="bg-[#FFF5F5] border border-[#FFE3E3] rounded-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-[#E03131] font-bold mb-1">회원 탈퇴</h3>
                <p className="text-[#FA5252] text-sm">
                  탈퇴하면 작성한 평점, 후기와 즐겨찾기가 모두 삭제되며 복구할 수 없습니다.
                </p>
              </div>
              <button className="whitespace-nowrap bg-white text-[#E03131] border border-[#E03131] px-6 py-2.5 rounded-lg font-bold hover:bg-red-50 transition-colors">
                회원 탈퇴
              </button>
            </div>
          </div>
        ) : (
          /* ==========================================
             내 정보 조회 모드 (내 정보.jpg 참고)
             ========================================== */
          <div className="animate-in fade-in duration-300">
            {/* 상단 헤더 영역 */}
            <div className="flex justify-between items-center mb-12">
              <h1 className="text-3xl font-bold text-gray-900">내 정보</h1>
              <button
                onClick={handleEditClick}
                className="bg-[#2563EB] hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-bold transition-colors"
              >
                정보 수정
              </button>
            </div>

            {/* 기본 정보 섹션 */}
            <section className="mb-16">
              <h2 className="text-lg font-bold text-gray-900 mb-6">기본 정보</h2>
              <div className="flex items-center gap-12">
                {/* 프로필 이미지 (뷰 모드) */}
                <div className="w-20 h-20 bg-[#E9ECEF] rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                     <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
                
                {/* 닉네임, 이메일 정보 */}
                <div className="flex gap-20">
                  <div>
                    <p className="text-xs text-gray-400 font-medium mb-1.5">닉네임</p>
                    <p className="text-lg font-bold text-gray-900">{userInfo.nickname}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium mb-1.5">이메일</p>
                    <p className="text-lg font-bold text-gray-900">{userInfo.email}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 내 즐겨찾기 섹션 (가데이터) */}
            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-6">내 즐겨찾기</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {/* 영화 카드 1 */}
                <div>
                  <div className="aspect-[2/3] bg-gray-200 rounded-lg overflow-hidden mb-3">
                    <img src="https://image.tmdb.org/t/p/w500/uF6nI2x82QhP6yJ88eR61bZ6lR0.jpg" alt="스파이더맨" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-bold text-gray-900 truncate">스파이더맨: 브랜드 뉴 데이</h3>
                  <p className="text-sm text-gray-400">2026.07.29</p>
                </div>
                {/* 영화 카드 2 */}
                <div>
                  <div className="aspect-[2/3] bg-gray-200 rounded-lg overflow-hidden mb-3">
                    <img src="https://image.tmdb.org/t/p/w500/vUUqzWa2LcUAYBlcx4M6RoXixQl.jpg" alt="오디세이" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-bold text-gray-900 truncate">오디세이</h3>
                  <p className="text-sm text-gray-400">2026.08.05</p>
                </div>
                {/* 영화 카드 3 */}
                <div>
                  <div className="aspect-[2/3] bg-gray-200 rounded-lg overflow-hidden mb-3">
                    <img src="https://image.tmdb.org/t/p/w500/wKiOkZTN9lUUUNZLmtnwubZYONg.jpg" alt="미니언즈" className="w-full h-full object-cover bg-yellow-400" />
                  </div>
                  <h3 className="font-bold text-gray-900 truncate">미니언즈 & 몬스터즈</h3>
                  <p className="text-sm text-gray-400">2026.07.15</p>
                </div>
              </div>
            </section>
            
          </div>
        )}
      </div>
    </div>
  );
}