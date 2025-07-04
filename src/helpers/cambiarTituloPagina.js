export const cambiarTitulo = (idPagina) => {
  switch (idPagina) {
    case "home":
      document.title = "Pagina Principal";
      break;
    case "login":
      document.title = "Inicio de Sesion";
    default:
      document.title = "ERROR";
      break;
  }
};
