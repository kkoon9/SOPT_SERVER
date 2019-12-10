module.exports = {

  /* Token */
  INVALID_TOKEN: "잘못된 형식의 토큰입니다.",
  EMPTY_TOKEN: "토큰값이 존재하지 않습니다.",
  EXPIRED_TOKEN: "만료된 토큰입니다.",
  EMPTY_REFRESH_TOKEN: "재발급 토큰이 존재하지 않습니다.",
  CREATE_TOKEN: "토큰 발급 완료.",
  REFRESH_TOKEN: "토큰 재발급 완료.",

  /* User */
  USER_SELECTED: "회원 조회 성공.",
  SIGN_UP_SUCCESS: "회원가입 성공",
  SIGN_UP_FAIL: "회원 가입 실패",
  SIGN_IN_SUCCESS: "로그인 성공",
  SIGN_IN_FAIL: "로그인 실패",
  POSSIBLE_ID: "사용가능한 ID 입니다.",
  NO_USER: "존재하지 않는 유저 id 입니다.",
  MISS_MATCH_PW: "비밀번호가 일치하지 않습니다",
  ALREADY_ID: "존재하는 ID 입니다.",

  /* Blog */
  ALREADY_HOST: "존재하는 HOST 이름입니다.",
  ALREADY_ADDRESS : "존재하는 url입니다.",
  ALREADY_BLOG: "존재하는 블로그입니다.",
  BLOG_EMPTY: "블로그가 비어있습니다",
  BLOG_CREATE_SUCCESS: "블로그 제작 성공",
  BLOG_CREATE_FAIL: "블로그 제작 실패",
  BLOG_READ_ALL_SUCCESS: "블로그 전체 조회 성공",
  BLOG_READ_ALL_FAIL: "블로그 전체 조회 실패",
  BLOG_READ_BLOGIDX_SUCCESS: "블로그 index로 블로그 조회 성공",
  BLOG_READ_HOST_SUCCESS: "HOST 네임으로 블로그 조회 성공",
  BLOG_READ_ADDRESS_SUCCESS: "url로 블로그 조회 성공",
  BLOG_READ_FAIL: "블로그 조회 실패",
  BLOG_UPDATE_SUCCESS: "블로그 수정 성공",
  BLOG_UPDATE_FAIL: "블로그 수정 실패",
  BLOG_DELETE_SUCCESS: "블로그 삭제 성공",
  BLOG_DELETE_FAIL: "블로그 삭제 실패",

  /* Article */
  ARTICLE_EMPTY: "기사가 비어있습니다",
  ARTICLE_CREATE_SUCCESS: "기사 작성 성공",
  ARTICLE_CREATE_FAIL: "기사 작성 실패",
  ARTICLE_READ_ALL_SUCCESS: "기사 전체 조회 성공",
  ARTICLE_READ_ALL_FAIL: "기사 전체 조회 실패",
  ARTICLE_READ_ARTICLEIDX_SUCCESS: "기사 INDEX로 기사 조회 성공",
  ARTICLE_READ_BLOGIDX_SUCCESS: "블로그 INDEX로 기사 조회 성공",
  ARTICLE_READ_FAIL: "기사 조회 실패",
  ARTICLE_UPDATE_SUCCESS: "기사 수정 성공",
  ARTICLE_UPDATE_FAIL: "기사 수정 실패",
  ARTICLE_DELETE_SUCCESS: "기사 삭제 성공",
  ARTICLE_DELETE_FAIL: "기사 삭제 실패",
  ALREADY_ARTICLE: "존재하는 기사 입니다.",

  /* Comment */
  COMMENT_EMPTY: "조회할 댓글이 없습니다",
  COMMENT_CREATE_SUCCESS: "댓글 작성 성공",
  COMMENT_CREATE_FAIL: "댓글 작성 실패",
  COMMENT_READ_ARTICLEIDX_SUCCESS: "기사 INDEX로 댓글 조회 성공",
  COMMENT_READ_ARTICLEIDX_FAIL: "기사 INDEX로 댓글 조회 실패",
  COMMENT_READ_COMMENTIDX_SUCCESS: "댓글 INDEX로 댓글 조회 성공",
  COMMENT_READ_NAME_SUCCESS: "작성자 이름으로 댓글 조회 성공",
  COMMENT_READ_FAIL: "댓글 조회 실패",
  COMMENT_UPDATE_SUCCESS: "댓글 수정 성공",
  COMMENT_UPDATE_FAIL: "댓글 수정 실패",
  COMMENT_DELETE_SUCCESS: "댓글 삭제 성공",
  COMMENT_DELETE_FAIL: "댓글 삭제 실패",

  /* ETC */
  OK: "성공",
  NULL_VALUE: "필요한 값이 없습니다",
  OUT_OF_VALUE: "파라미터 값이 잘못 되었습니다.",
  INTERNAL_SERVER_ERROR: "서버 내부 오류",
  NO_SELECT_AUTHORITY: "조회 권한 없음.",

  /* Group */
  MEMBER_READ_ALL_SUCCESS: "멤버 조회 성공",
  MEMBER_READ_ALL_FAIL: "멤버 조회 실패",
  GROUP_READ_SUCCESS: "그룹 조회 성공",
  GROUP_READ_FAIL: "그룹 조회 실패",
  MEMBER_MIX_SUCCESS: "그룹 섞기 성공",
  MEMBER_MIX_FAIL: "그룹 섞기 실패",
};
