const liff = window.liff;
let isInit = false;
let profile = {};
let liffInfo = {};
let myLiffId = "1653720179-oEZpz6gO"


class liffHelper {
  init() {
     return  liff
        .init({
            liffId: myLiffId
        })
  }


  getLIFFInfo() {
    return liffInfo;
  }

  async getProfile()  {
    await this.init()
    if(!liff.isLoggedIn()){
      await liff.login()
    }
    return new Promise((resolve, reject) => {
      this.init()
        .then(() => {
         
          if (isInit && !profile.userId) {
            liff.getProfile()
              .then(pf => {
                profile = pf;
                console.log(pf)
                resolve(profile);
              })
              .catch((err) => {
                console.log('get profile error', err);
                reject(err);
              });
          } else {
            resolve(profile)
          }
        })
        .catch(err => { reject(err) });
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
      this.init()
        .then(() => {
          liff.sendMessages(messagesToSend)
            .then(() => {
              resolve();
            })
            .catch((err) => {
              reject(err);
            });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
};
export default new liffHelper();