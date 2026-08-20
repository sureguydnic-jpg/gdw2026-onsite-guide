/**
 * GDW 2026 On-Site Guide - Configuration File
 * 추후 생성되는 링크 및 안내 문구를 이 파일에서 손쉽게 수정할 수 있습니다.
 */

window.GDW_CONFIG = {
  // 행사 기본 정보
  event: {
    title: "GDW 2026 On-Site Guide",
    subtitle: "Goyang Destination Week 2026 현장 안내",
    dates: "2026. 08. 26 (Wed) - 08. 29 (Sat)",
    venue: "고양꽃전시관 (Goyang Flower Exhibition Center)",
  },

  // 1. 📖 프로그램북 | e-Program Book
  programBook: {
    title: "📖 프로그램북 | e-Program Book",
    description: "행사 일정, 연사 프로필 및 세션 정보를 확인하세요.",
    // 추후 링크 연결시 아래 url에 주소를 입력하세요 (예: "https://example.com/programbook.pdf")
    url: "", 
    notice: "GDW 2026 e-Program Book 디지털 책자 링크입니다."
  },

  // 2. 📶 무료 와이파이 연결 | Venue Wi-Fi Info
  wifi: {
    title: "📶 무료 와이파이 연결 | Venue Wi-Fi Info",
    ssid: "GDW_2026_Free_WiFi",
    password: "gdw2026conference",
    instructions: [
      "1. 와이파이 목록에서 'GDW_2026_Free_WiFi' 선택",
      "2. 비밀번호 입력란에 'gdw2026conference' 입력",
      "3. 웹 브라우저 접속 후 동의 페이지가 나타나면 '연결' 클릭"
    ]
  },

  // 3. 🎧 실시간 AI 통역 | AI Live Interpretation (SNAP SIGHT)
  aiInterpretation: {
    title: "🎧 실시간 AI 통역 | AI Live Interpretation (SNAP SIGHT)",
    description: "SNAP SIGHT 실시간 다국어 AI 자막 & 번역 서비스",
    // 추후 웹 접속 링크가 있다면 입력
    url: "", 
    instructions: [
      "1. 개인 스마트폰/디바이스의 카메라로 현장 QR코드를 스캔하거나 위 버튼을 클릭합니다.",
      "2. 선호하는 원어 및 번역 언어(한국어, 영어 등)를 선택합니다.",
      "3. 이어폰을 착용하시면 더욱 선명하게 실시간 오디오 통역을 청취하실 수 있습니다."
    ]
  },

  // 4. 🔴 실시간 생중계 | YouTube Live Streaming
  youtubeLive: {
    title: "🔴 유튜브 라이브 실시간 중계 | YouTube Live Streaming",
    description: "GDW 2026 현장 세션을 유튜브 라이브로 시청하세요.",
    // 추후 YouTube 라이브 스트리밍 URL
    url: "", 
    instructions: [
      "1. 아래 버튼을 클릭하여 GDW 2026 공식 유튜브 라이브 채널에 접속합니다.",
      "2. 세션별 실시간 생중계 및 다시보기(VOD)를 시청하실 수 있습니다."
    ]
  },

  // 5. 📲 행사 공식 앱 | CVENT App Download
  officialApp: {
    title: "📲 행사 공식 앱 | CVENT App Download",
    appName: "CVENT Events App",
    eventCode: "GDW2026",
    iosUrl: "", // Apple App Store Link
    androidUrl: "", // Google Play Store Link
    instructions: [
      "1. iOS(App Store) 또는 Android(Google Play) 아이콘을 클릭하여 CVENT 앱을 설치합니다.",
      "2. 앱 실행 후 검색창에 이벤트 코드 'GDW2026' 입력",
      "3. 등록하신 이메일 계정으로 로그인하여 나만의 세션 일정 및 1:1 미팅을 관리하세요."
    ]
  },

  // 6. 📝 만족도 조사 | Daily Survey
  surveys: [
    {
      id: "day1",
      dayTitle: "Day 1 (8/26) Survey",
      date: "2026년 8월 26일 (수)",
      url: "", // 추후 링크 입력
      notice: "Day 1 프로그램 및 세션 만족도 조사입니다."
    },
    {
      id: "day2",
      dayTitle: "Day 2 (8/27) Survey",
      date: "2026년 8월 27일 (목)",
      url: "", // 추후 링크 입력
      notice: "Day 2 프로그램 및 세션 만족도 조사입니다."
    },
    {
      id: "day3",
      dayTitle: "Day 3 (8/28) Survey",
      date: "2026년 8월 28일 (금)",
      url: "", // 추후 링크 입력
      notice: "Day 3 프로그램 및 세션 만족도 조사입니다."
    },
    {
      id: "day4",
      dayTitle: "Day 4 (8/29) Survey",
      date: "2026년 8월 29일 (토)",
      url: "", // 추후 링크 입력
      notice: "Day 4 프로그램 및 전체 만족도 조사입니다."
    }
  ]
};
