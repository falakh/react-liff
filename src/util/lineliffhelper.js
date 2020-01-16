const liff = window.liff;
let isInit = false;
let profile = {};
let liffInfo = {};
let myLiffId = "1653720179-oEZpz6gO"


class liffHelper {
  init() {
    return liff
      .init({
        liffId: myLiffId
      })
      .then(() => {
        console.log("siap gan")
        console.log(liff)
        isInit = true;
        if (!liff.isLoggedIn()) {
          liff.login({ redirectUri: "https://linenote.herokuapp.com/" });
        }
      })
      .catch((err) => {

      });
  }


  getLIFFInfo() {
    return liffInfo;
  }

  getProfile() {
    return new Promise((resolve, reject) => {
      if (isInit && !profile.userId) {
        liff.getProfile()
          .then(pf => {
            profile = pf;
            console.log(pf)
            resolve(pf);
          })
          .catch((err) => {
            console.log('get profile error', err);
            reject(err);
          });
      } else {
        resolve(profile)
      }
    });
  }

  closeWindow() {
    liff.closeWindow();
  }

  openWindow(url, external) {
    liff.openWindow({ url, external });
  }

  sendMessages(messages) {
    const messagesToSend = Array.isArray(messages) ? messages : [messages];
    return new Promise((resolve, reject) => {
          liff.sendMessages(messagesToSend)
            .then(() => {
              resolve();
            })
            .catch((err) => {
              reject(err);
            });
        })
  }
};
export default new liffHelper();