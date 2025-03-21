import AuthService from './auth.service';

export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.accessToken) {
    console.log("Token sendo enviado:", user.accessToken.substring(0, 20) + "...");
    return { Authorization: 'Bearer ' + user.accessToken };
  } else {
    console.log("Sem token de autenticação disponível");
    return {};
  }
}
