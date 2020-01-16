const liff = window.liff;
let isInit = false;
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
      isInit = true;
    }
    return new Promise((resolve, reject) => {
      this.init()
        .then(() => {
            liff.getProfile()
              .then(pf => {
                console.log(pf)
                resolve(pf);
              })
              .catch((err) => {
                console.log('get profile error', err);
                reject(err);
              });
         
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