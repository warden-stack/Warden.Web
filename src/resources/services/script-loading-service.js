export default class ScriptLoadingService {
  load(url) {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      if (resolve) script.onload = resolve;
      script.src = url;
      document.head.appendChild(script);
    });
  }
}
