import { loginCheck } from "../login-check.js";


/*

  nav가 변하는 부분   =>    로그인  /  회원가입  /  카트
  
  관리자 계정으로 로그인 했을 때 =>  페이지 관리 / 계정 관리 / 로그아웃 / 카트

*/



async function navTransition(pageName) {

  // const isLogined = await loginCheck();
  const checkData = await loginCheck();
  console.log(checkData);
  const navSelect = document.querySelector('#navSelect');


  if (pageName !== 'login') {
    const content = checkData.isLogined ?
      '<li><a href="/" id="logout">로그아웃</a></li>'
      : '<li><a href="/login">로그인</a></li>';
    navSelect.insertAdjacentHTML('afterbegin', content);
  }


  if (pageName === 'register' || checkData.isLogined) {
    const registerBtn = document.querySelector('.register_btn');
    registerBtn.parentNode.removeChild(registerBtn);
  }

  if (pageName !== 'account' && checkData.isLogined) {
    const account = `<li><a href="/account">계정관리</a></li>`;
    navSelect.insertAdjacentHTML('afterbegin', account);
  }

  if (checkData.idAdmin && pageName !== 'adminPage') {
    const addminPage = `<li><a href="/admin">페이지 관리</a></li>`;
    navSelect.insertAdjacentHTML('afterbegin', addminPage);
  }


  // 로그아웃 시 토큰, userId이 삭제되며 홈페이지로 이동
  if (checkData.isLogined) {
    document.querySelector('#logout').addEventListener('click', () => {
      sessionStorage.clear();
    })
  }

  return checkData.isLogined;
}



export { navTransition };




