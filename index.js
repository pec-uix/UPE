const functions = require("firebase-functions");
const puppeteer = require("puppeteer");
const { defineString, defineSecret } = require("firebase-functions/params");
const { initializeApp } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");
const { getMessaging } = require("firebase-admin/messaging");
const FormData = require("form-data");
const axios = require("axios");
const epsApiUrl = defineString("EPS_API_URL");
const epsApiKey = defineSecret("EPS_API_KEY");
const functionApiKey = defineSecret("FUNCTION_API_KEY");
const apnsAuthKey = defineSecret("APNS_AUTH_KEY");
const apnsAuthKeyId = defineSecret("APNS_AUTH_KEY_ID");
const apnsTeamId = defineSecret("APNS_TEAM_ID");
const express = require("express");
const { nanoid } = require("nanoid");
initializeApp();

exports.test = functions
  .region("asia-east1")
  .runWith({
    memory: "1GB",
    timeoutSeconds: 240,
  })
  .https.onRequest(async (req, res) => {
    if (req.query.q) {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(`https://biggo.com.tw/s/?q=${req.query.q}`);

      const result = await page.$$eval(".product-row  .price", (elements) => {
        return elements
          .flatMap((e) => e.innerText.split("~"))
          .map((x) => x.replace(/\D+/g, ""));
      });

      res.json({ min: Math.min(...result), max: Math.max(...result) });

      await browser.close();
    } else {
      res.send("no q");
    }
  });

const app = express();
app.use(express.json());

app.post("/gift.exchange/:couponNo/notification", (req, res) => {
  console.log("gift.exchange");

  const db = getFirestore();

  db.collection("tickets")
    .where("ticketNo", "==", req.params.couponNo)
    .get()
    .then((snapshot) => {
      if (snapshot.size) {
        return Promise.all(
          snapshot.docs.map((doc) =>
            doc.ref.set(
              {
                ...req.body,
                beUsed: true,
              },
              { merge: true }
            )
          )
        );
      } else {
        return db
          .collection("ticketNotFoundLogs")
          .add({ ...req.body, createdTimestamp: FieldValue.serverTimestamp() });
      }
    })
    .then(() => res.status(200).json({ status: "ok" }))
    .catch((err) => {
      console.log(err);
      res.status(500).send();
    });
});
exports["ticket"] = functions.region("asia-east1").https.onRequest(app);

exports.verifyPhoneNumberV2 = functions
  .region("asia-east1")
  .runWith({ secrets: [epsApiKey] })
  .https.onCall(async (_, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "The function must be called while authenticated."
      );
    }

    const phoneNumber = context.auth.token.phone_number;
    if (phoneNumber) {
      const formData = new FormData();
      formData.append("PhoneNumber", phoneNumber.replace("+886", "0"));

      let response = await axios.post(
        `${epsApiUrl.value()}/api/Whitelist/CheckWhitelistByPhoneNumberCustomize`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${epsApiKey.value()}`,
          },
        }
      );

      if (response.data.status == 1) {
        let userRecord = await getAuth().getUser(context.auth.uid);
        let customClaims = userRecord.customClaims || {};
        customClaims.isVerified = true;
        customClaims.userNo = response.data.result.user_no;
        customClaims.compNo = response.data.result.company_tax_id_number;

        // const fireStoreDb = getFirestore();
        // const snapshot = await fireStoreDb
        //   .collection("users")
        //   .where("compNo", "==", response.data.result.company_tax_id_number)
        //   .where("userNo", "==", response.data.result.user_no)
        //   .get();

        // const uid = snapshot.docs[0]?.id || context.auth.uid;

        // await fireStoreDb
        //   .collection("users")
        //   .doc(uid)
        //   .set(
        //     {
        //       userNo: response.data.result.user_no,
        //       compNo: response.data.result.company_tax_id_number,
        //       phoneNumber: phoneNumber,
        //       profileIsCompleted:
        //         snapshot.docs[0]?.data().profileIsCompleted || false,
        //     },
        //     { merge: true }
        //   );

        await getAuth().setCustomUserClaims(context.auth.uid, customClaims);
      }
      return response.data;
    } else {
      return {
        result: {
          result_message: "查無員工資料",
          is_verify: false,
        },
        message: "找不到資料",
        status: 3,
      };
    }
  });

exports.verifyCompanyData = functions
  .region("asia-east1")
  .runWith({ secrets: [epsApiKey] })
  .https.onCall(async (data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "The function must be called while authenticated."
      );
    }

    const phone = context.auth.token.phone_number;

    let response = await axios.post(
      `${epsApiUrl.value()}/api/Whitelist/CheckWhitelistByUserNoCustomize`,
      {
        CompanyTaxIdNumber: data.companyTaxIdNumber,
        UserNo: data.userNo,
        IdNumber4: data.idNumber4,
        PhoneNumber: phone.replace("+886", "0"),
        UserName: data.userName,
        AuthenticationUID: context.auth.uid,
      },
      {
        headers: {
          Authorization: `Bearer ${epsApiKey.value()}`,
        },
      }
    );

    if (response.data.status == 1) {
      const fireStoreDb = getFirestore();

      const snapshot = await fireStoreDb
        .collection("users")
        .where("compNo", "==", data.companyTaxIdNumber)
        .where("userNo", "==", response.data.result.old_userNo)
        .get();

      for (let index = 0; index < snapshot.docs.length; index++) {
        try {
          let doc = snapshot.docs[index];
          let oldUserRecord = await getAuth().getUser(doc.id);
          let oldCustomClaims = oldUserRecord.customClaims || {};
          oldCustomClaims.isVerified = false;
          await getAuth().setCustomUserClaims(doc.id, oldCustomClaims);
        } catch (error) {
          console.log(error);
        }
      }

      let userRecord = await getAuth().getUser(context.auth.uid);
      let customClaims = userRecord.customClaims || {};
      customClaims.isVerified = true;
      customClaims.userNo = response.data.result.user_no;
      customClaims.compNo = response.data.result.company_tax_id_number;
      await getAuth().setCustomUserClaims(context.auth.uid, customClaims);
    }

    return response.data;
  });

exports.setAdminUserClaims = functions
  .region("asia-east1")
  .https.onCall(async (data, context) => {
    const isAdmin = context.auth.token.isAdmin;

    if (isAdmin) {
      try {
        let userRecord = await getAuth().getUserByPhoneNumber(data.phoneNumber);
        let customClaims = userRecord.customClaims || {};
        customClaims.isAdmin = true;
        await getAuth().setCustomUserClaims(userRecord.uid, customClaims);
        return "ok";
      } catch (error) {
        throw new functions.https.HttpsError(
          "invalid-argument",
          error.errorInfo?.code
        );
      }
    } else {
      throw new functions.https.HttpsError("permission-denied");
    }
  });

exports.verifyCompanyDataV2 = functions
  .region("asia-east1")
  .runWith({ secrets: [epsApiKey] })
  .https.onCall(async (data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "The function must be called while authenticated."
      );
    }
    const fireStoreDb = getFirestore();
    const phoneNumber = context.auth.token.phone_number || "";
    const email = context.auth.token.email || "";

    const snapshot = await fireStoreDb
      .collection("users")
      .where("compNo", "==", data.companyTaxIdNumber)
      .where("userNo", "==", data.userNo.toUpperCase())
      .get();

    if (snapshot.docs[0] && phoneNumber) {
      if (
        snapshot.docs[0].data().phoneNumber &&
        snapshot.docs[0].data().phoneNumber !== "Unknow"
      ) {
        return {
          result: {
            result_message: "員工編號已經綁定過手機號碼",
            is_verify: false,
          },
          message: "員工編號已經綁定過手機號碼",
          status: 3,
        };
      }
    }

    if (snapshot.docs[0] && email) {
      if (
        snapshot.docs[0].data().email &&
        snapshot.docs[0].data().email !== "Unknow"
      ) {
        return {
          result: {
            result_message: "員工編號已經綁定過email",
            is_verify: false,
          },
          message: "員工編號已經綁定過email",
          status: 3,
        };
      }
    }

    const uid = snapshot.docs[0]?.id || context.auth.uid;

    let response = await axios.post(
      `${epsApiUrl.value()}/api/Whitelist/CheckWhitelistByUserNoCustomize`,
      {
        CompanyTaxIdNumber: data.companyTaxIdNumber,
        UserNo: data.userNo.toUpperCase(),
        IdNumber4: data.idNumber4,
        PhoneNumber: (
          snapshot.docs[0]?.data().phoneNumber || phoneNumber
        ).replace("+886", "0"),
        UserName: data.userName,
        AuthenticationUID: uid,
      },
      {
        headers: {
          Authorization: `Bearer ${epsApiKey.value()}`,
        },
      }
    );

    if (response.data.status == 1) {
      await fireStoreDb
        .collection("users")
        .doc(uid)
        .set(
          {
            userNo: data.userNo.toUpperCase(),
            compNo: data.companyTaxIdNumber,
            phoneNumber:
              snapshot.docs[0]?.data().phoneNumber &&
              snapshot.docs[0]?.data().phoneNumber !== "Unknow"
                ? snapshot.docs[0]?.data().phoneNumber
                : phoneNumber,
            email:
              snapshot.docs[0]?.data().email &&
              snapshot.docs[0]?.data().email !== "Unknow"
                ? snapshot.docs[0]?.data().email
                : email,
            profileIsCompleted:
              snapshot.docs[0]?.data().profileIsCompleted || false,
          },
          { merge: true }
        );

      let userRecord = await getAuth().getUser(uid);
      let customClaims = userRecord.customClaims || {};
      customClaims.isVerified = true;
      customClaims.userNo = response.data.result.user_no.toUpperCase();
      customClaims.compNo = response.data.result.company_tax_id_number;
      await getAuth().setCustomUserClaims(context.auth.uid, customClaims);

      if (snapshot.docs[0]) {
        await getAuth().deleteUser(context.auth.uid);
      }

      if (snapshot.docs[0] && email) {
        await getAuth().updateUser(uid, {
          email: email,
          password: nanoid(),
          emailVerified: true,
        });
      }

      if (snapshot.docs[0] && phoneNumber) {
        await getAuth().updateUser(uid, {
          providerToLink: {
            uid: phoneNumber,
            displayName: undefined,
            email: undefined,
            photoURL: undefined,
            providerId: "phone",
            phoneNumber: phoneNumber,
          },
        });
      }

      const customToken = await getAuth().createCustomToken(uid);

      response.data.result.customToken = customToken;
    }

    return response.data;
  });

exports.fetchUserData = functions
  .region("asia-east1")
  .runWith({ secrets: [epsApiKey] })
  .https.onCall(async (data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "The function must be called while authenticated."
      );
    }

    let response = await axios.post(
      `${epsApiUrl.value()}/api/Whitelist/CheckWhitelistUserInfoCustomize`,
      {
        CompanyTaxIdNumber: context.auth.token.compNo,
        UserNo: context.auth.token.userNo,
      },
      {
        headers: {
          Authorization: `Bearer ${epsApiKey.value()}`,
        },
      }
    );

    if (response.data.status == 1) {
      response.data.result.email = context.auth.token.email || null;
      response.data.result.phone_number =
        context.auth.token.phone_number || null;
    }

    return response.data;
  });

exports.removeAdminUserClaims = functions
  .region("asia-east1")
  .https.onCall(async (data, context) => {
    const isAdmin = context.auth.token.isAdmin;

    if (isAdmin) {
      try {
        let userRecord = await getAuth().getUserByPhoneNumber(data.phoneNumber);
        let customClaims = userRecord.customClaims || {};
        customClaims.isAdmin = false;
        await getAuth().setCustomUserClaims(userRecord.uid, customClaims);
        return "ok";
      } catch (error) {
        throw new functions.https.HttpsError(
          "invalid-argument",
          error.errorInfo?.code
        );
      }
    } else {
      throw new functions.https.HttpsError("permission-denied");
    }
  });

exports.callSendMessageToken = functions
  .region("asia-east1")
  .runWith({
    secrets: [apnsAuthKey, apnsAuthKeyId, apnsTeamId],
  })
  .https.onCall(async (data, context) => {
    const isAdmin = context.auth.token.isAdmin;

    if (isAdmin) {
      let result = await sendMessageToken(data, {
        authKey: apnsAuthKey.value(),
        authKeyId: apnsAuthKeyId.value(),
        teamId: apnsTeamId.value(),
      });
      return result;
    } else {
      throw new functions.https.HttpsError("permission-denied");
    }
  });

exports.requestSendMessageToken = functions
  .region("asia-east1")
  .runWith({
    secrets: [functionApiKey, apnsAuthKey, apnsAuthKeyId, apnsTeamId],
  })
  .https.onRequest(async (req, res) => {
    if (req.method !== "POST") {
      res.status(405).send("Method Not Allowed");
      return;
    }

    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer ")
    ) {
      res.status(403).send("Unauthorized");
      return;
    }
    const apiKey = req.headers.authorization.split("Bearer ")[1];

    if (apiKey != functionApiKey.value()) {
      res.status(403).send("Unauthorized");
      return;
    }

    let result = await sendMessageToken(req.body, {
      authKey: apnsAuthKey.value(),
      authKeyId: apnsAuthKeyId.value(),
      teamId: apnsTeamId.value(),
    });
    res.send(result);
  });

async function sendMessageToken(data, apns) {
  const fireStoreDb = getFirestore();
  const devos = ["IOS", "ANDROID", "WEB", "FCM.WEB"];

  const pushMessage = data;
  // This registration token comes from the client FCM SDKs.
  let finalReturnObject = {
    success: true,
    response: {
      data: {
        ANDROID: {
          successCount: 0,
          failureCount: 0,
        },
        IOS: {
          successCount: 0,
          failureCount: 0,
        },
        WEB: {
          successCount: 0,
          failureCount: 0,
        },
      },
    },
  };
  let aRegistrationUsers = [];
  let iRegistrationUsers = [];
  let wRegistrationUsers = [];
  let fcmwRegistrationUsers = [];
  let aRegistrationTokens = [];
  let iRegistrationTokens = [];
  let wRegistrationTokens = [];
  let fcmwRegistrationTokens = [];
  let aRegistrationTokensFailed = {};
  let iRegistrationTokensFailed = {};
  let wRegistrationTokensFailed = {};
  let fcmwRegistrationTokensFailed = {};

  // "COMP_NO": "string",
  // "USER_ID": "string",
  // "DEVICE_ID": "string",
  // "HASHED_PUSHTOKEN": "string",
  // "TOPIC": "string",
  // "DEVICE_OS": "ANDROID",
  // "PUSH_TITLE": "string",
  // "PUSH_BODY": "string",
  // "PUSH_REDIRECT": "string",
  // "NAV_TYPE": "string",
  // "SOUND": "string",
  // "BADGE": 1,
  // "HOST_TYPE": "SANDBOX"

  let devosQ = [];
  if (
    pushMessage["HASHED_PUSHTOKEN"] &&
    pushMessage["HASHED_PUSHTOKEN"] !== undefined
  ) {
    if (pushMessage["DEVICE_OS"] && pushMessage["DEVICE_OS"] !== undefined) {
      if (pushMessage["DEVICE_OS"].split(",").length === 1) {
        devosQ.push(pushMessage["DEVICE_OS"]);
      } else {
        devosQ = pushMessage["DEVICE_OS"].split(",");
      }
    } else {
      devosQ = Object.assign([], devos);
    }
  } else {
    if (pushMessage["DEVICE_OS"] && pushMessage["DEVICE_OS"] !== undefined) {
      if (pushMessage["DEVICE_OS"].split(",").length === 1) {
        devosQ.push(pushMessage["DEVICE_OS"]);
      } else {
        devosQ = pushMessage["DEVICE_OS"].split(",");
      }
    } else {
      devosQ.push("@@@");
    }
  }

  await Promise.all(
    devosQ.map(async (oskind) => {
      // console.info(`${oskind} / ${index2}`);
      let getSql = fireStoreDb
        .collection("users")
        .where("pushEnable", "==", true)
        .where("userStatus", "==", 1);

      let hashed_pushtoken = [];
      let hashed_pushtokenToString = "";
      if (oskind != "@@@") {
        if (
          pushMessage["HASHED_PUSHTOKEN"] &&
          pushMessage["HASHED_PUSHTOKEN"] !== undefined
        ) {
          if (pushMessage["HASHED_PUSHTOKEN"].split(",").length === 1) {
            hashed_pushtoken = [pushMessage["HASHED_PUSHTOKEN"]];
            getSql = getSql.where(`devToken.${oskind}`, "array-contains-any", [
              pushMessage["HASHED_PUSHTOKEN"],
            ]);
          } else {
            hashed_pushtoken = pushMessage["HASHED_PUSHTOKEN"].split(",");
            getSql = getSql.where(
              `devToken.${oskind}`,
              "array-contains-any",
              pushMessage["HASHED_PUSHTOKEN"].split(",")
            );
          }
          hashed_pushtokenToString = hashed_pushtoken.toString();
          // console.info(`hashed_pushtoken.toString() = ${hashed_pushtokenToString}`);
        }
      }

      if (pushMessage["COMP_NO"] && pushMessage["COMP_NO"] !== undefined) {
        getSql = getSql.where("compNo", "==", pushMessage["COMP_NO"]);
        // if (pushMessage["COMP_NO"].split(",").length === 1) {
        //   getSql = getSql.where("compNo", "==", pushMessage["COMP_NO"]);
        // } else {
        //   getSql = getSql.where(
        //     "compNo",
        //     "in",
        //     pushMessage["COMP_NO"].split(",")
        //   );
        // }
      }

      if (pushMessage["USER_ID"] && pushMessage["USER_ID"] !== undefined) {
        if (pushMessage["USER_ID"].split(",").length === 1) {
          getSql = getSql.where("userNo", "==", pushMessage["USER_ID"]);
        } else {
          getSql = getSql.where(
            "userNo",
            "in",
            pushMessage["USER_ID"].split(",")
          );
        }
      }

      // if ((pushMessage['DEVICE_OS']) && (pushMessage['DEVICE_OS'] !== undefined)) {
      //     if (pushMessage['DEVICE_OS'].split(',').length === 1) {
      //         getSql = getSql.where('devos', '==', pushMessage['DEVICE_OS']);
      //     } else {
      //         getSql = getSql.where('devos', 'in', pushMessage['DEVICE_OS'].split(','));
      //     }
      // }

      // if ((pushMessage['DEVICE_ID']) && (pushMessage['DEVICE_ID'] !== undefined)) {
      //     if (pushMessage['DEVICE_ID'].split(',').length === 1) {
      //         getSql = getSql.where('devid', '==', pushMessage['DEVICE_ID']);
      //     } else {
      //         getSql = getSql.where('devid', 'in', pushMessage['DEVICE_ID'].split(','));
      //     }
      // }

      // console.info(`start getsql`);
      await getSql
        //await fireStoreDb.collection('users')
        //    .where('userNo', '==', usersData.userNo)
        //    .where('compNo', '==', usersData.compNo)
        .get()
        .then(async (snapshot) => {
          if (snapshot.empty) {
            // console.info('No matching documents.');
            //finalReturnObject = { "success": false, "message": `No matching documents.` };
            return;
          }

          // console.info("getSql 取得成功"); // lamign test
          await Promise.all(
            snapshot.docs.map(async (doc) => {
              // console.info(doc.id, '=>', doc.data());
              const docData = doc.data();

              let unReadCountSnapshot = await fireStoreDb
                .collection("messages")
                .where("userNo", "==", docData.userNo)
                .where("compNo", "==", docData.compNo)
                .where("alreadySend", "==", true)
                .where("alreadyRead", "==", false)
                .count()
                .get();

              let unReadCount = unReadCountSnapshot.data().count;

              await fireStoreDb
                .collection("users")
                .doc(doc.id)
                .update({ unReadCount: unReadCount });

              Object.keys(docData["devToken"]).some((k) => {
                if (oskind == "@@@" || oskind == k) {
                  switch (k) {
                    case "ANDROID":
                      docData["devToken"][k].map((token) => {
                        if (
                          (hashed_pushtoken.length > 0 &&
                            hashed_pushtokenToString.indexOf(token) >= 0) ||
                          hashed_pushtoken.length <= 0
                        ) {
                          aRegistrationUsers.push({
                            ID: doc.id,
                            unReadCount: unReadCount,
                            //"DEVICE_ID": docData['devid']
                          });
                          aRegistrationTokens.push(token);
                        }
                      });
                      break;
                    case "IOS":
                      docData["devToken"][k].map((token) => {
                        if (
                          (hashed_pushtoken.length > 0 &&
                            hashed_pushtokenToString.indexOf(token) >= 0) ||
                          hashed_pushtoken.length <= 0
                        ) {
                          iRegistrationUsers.push({
                            ID: doc.id,
                            unReadCount: unReadCount,
                            //"DEVICE_ID": docData['devid']
                          });
                          iRegistrationTokens.push(token);
                        }
                      });
                      break;
                    case "WEB":
                      docData["devToken"][k].map((token) => {
                        if (
                          (hashed_pushtoken.length > 0 &&
                            hashed_pushtokenToString.indexOf(token) >= 0) ||
                          hashed_pushtoken.length <= 0
                        ) {
                          wRegistrationUsers.push({
                            ID: doc.id,
                            unReadCount: unReadCount,
                            //"DEVICE_ID": docData['devid']
                          });
                          wRegistrationTokens.push(token);
                        }
                      });
                      break;
                    case "FCM.WEB":
                      docData["devToken"][k].map((token) => {
                        if (
                          (hashed_pushtoken.length > 0 &&
                            hashed_pushtokenToString.indexOf(token) >= 0) ||
                          hashed_pushtoken.length <= 0
                        ) {
                          fcmwRegistrationUsers.push({
                            ID: doc.id,
                            unReadCount: unReadCount,
                            //"DEVICE_ID": docData['devid']
                          });
                          fcmwRegistrationTokens.push(token);
                        }
                      });
                      break;
                  }
                }
              });
            })
          );
        })
        .catch((error) => {
          // console.info("取得發生錯誤 1"); // lamign test
          // console.info(`Error => ${error} / ${JSON.stringify(error)}`);
          finalReturnObject = { success: false, message: `${error}`, ...error };
          ////return error;
          //throw new HttpException(`${this.envLogEnableTag ? ('[' + this.tagName + ']') : ''} pushToken取得失敗!`, 404);
          ////return false;
        });
      // console.info(`end getsql`);
    })
  );

  let pushData;

  if (
    aRegistrationTokens.length > 0 ||
    iRegistrationTokens.length > 0 ||
    wRegistrationTokens.length > 0 ||
    fcmwRegistrationTokens.length > 0
  ) {
    pushData = {
      // 測試傳遞
      title: pushMessage["PUSH_TITLE"],
      content: pushMessage["PUSH_BODY"],
    };
    if (
      pushMessage["PUSH_REDIRECT"] &&
      pushMessage["PUSH_REDIRECT"] !== undefined
    ) {
      pushData["url"] = pushMessage["PUSH_REDIRECT"];
    }
    if (pushMessage["NAV_TYPE"] && pushMessage["NAV_TYPE"] !== undefined) {
      pushData["navType"] = pushMessage["NAV_TYPE"];
    }
    if (pushMessage["SOUND"] && pushMessage["SOUND"] !== undefined) {
      pushData["sound"] = pushMessage["SOUND"];
    }
    // if ((pushMessage['BADGE']) && (pushMessage['BADGE'] !== undefined)) {
    //     pushData['badge'] = pushMessage['BADGE'];
    // }
  } else {
    finalReturnObject = { success: false, message: `No matching documents.` };
  }

  // FCM專用, Web-Push不能用
  let payload = {};
  if (aRegistrationTokens.length > 0 || fcmwRegistrationTokens.length > 0) {
    // if ((pushMessage['BADGE']) && (pushMessage['BADGE'] !== undefined)) {
    // //if ((pushData['badge']) && (pushData['badge'] !== undefined)) {
    //     pushData['badge'] = pushData['badge'].toString();
    // }

    // https://firebase.google.com/docs/reference/push/rest/v1/projects.messages
    // See documentation on defining a message payload.
    payload = {
      //notification: pushNotification,
      //notification: {
      //    title: '$FooCorp up 1.43% on the day',
      //    body: '$FooCorp gained 11.80 points to close at 835.67, up 1.43% on the day.'
      //},
      //data: pushData,
      android: {
        //ttl: "86400s",
        //priority: 'high',
        //notification: {
        //    clickAction: 'OpenClickActivity'
        //}
      },
      apns: {
        // ios
        //headers: {
        //    "apns-priority": "5",
        //    "apns-expiration": "1604750400"
        //},
        //payload: {
        //    aps: {
        //        category: 'INVITE_CATEGORY'
        //    }
        //}
      },
      webpush: {
        //headers: {
        //    TTL: '86400',
        //    Urgency: 'high'
        //},
        //fcmOptions: {
        //    link: 'breakingnews.html'
        //}
      },
    };
  }

  // Web-Push
  if (wRegistrationTokens.length > 0) {
    // // sample
    // const pushConfig = {
    //     endpoint: "https://fcm.googleapis.com/fcm/send/cxsy5J3yz1Y:APA91bErhucJOkAm9eDd0kQgYhcEMx6KosFtTW1Ji7VDQmFNehwapPzG-DckLPeOCoh3Vs16Zri3YhhwGIjAdxyTqnn_HIDkxNIZ5sN6oG8Qgdf7_reBG8Pi9Le153XngVCewNuoH83N",
    //     keys: {
    //         p256dh: "BDeLJtNxoAgFY0qhhfYaCZXeuc_JzmoaAjmngKx_J1_i0ZfJ1QgkE-gRu6rVGUsli3CPxtRwantcf2BPar2yIz0",
    //         auth: "oOIN5KJ9dgDABmTYAeN25g"
    //     }
    // };
    // const pushConfig = {
    //     "endpoint": "https://wns2-sg2p.notify.windows.com/w/?token=BQYAAAAfYQoV0O82UwV39pb5w%2fQngY2qQ%2buFI4RqTsr5eWamSPKBkcYPkmtfR7BhddvQijDpfu4OMHXXCrfTHELRJR3SEVw9Xvo4oAIjUXHxNEBiHxixLfsL57pna55UsVMFN4uQtRSG%2f%2fd9qfR9H2o9t7oAu%2fBzXKgO9Jw1wxQIjGxXkM0TUjSnGLTs2TJ6drFRtt9Zi8UvnjqwTlWFsI6CvUUjdDD6upzKye%2fP0L8ybk0N2Qognft9pMimCuPpeTT9kxBuLQpdrYzmlTloSuYziPvEbLoX%2fzAsxAD19Zgs%2baO3%2fPJ%2bjsxpntoWkzOWfHp5jYXXk%2buFUGYP3Vwec6eFyRnZJtm3N8jWy5KNcNaSUtWhaQ%3d%3d",
    //     "expirationTime": null,
    //     "keys": {
    //         "p256dh": "BH44MjV2ENI_-wiKNS2C0FIj3f7_uZInGZWQhaj6lD6B-kYS7BMuDyBp8Q88sybdL-UGDD3jyTUedj1PYIBQaWI",
    //         "auth": "j2Cr2NQkaLRlkxqWbeByvQ"
    //     }
    // };

    let successCount = 0;
    let failureCount = 0;
    await Promise.all(
      wRegistrationTokens.map(async (elem, index) => {
        // Send a push notification for this subscription
        await webpush
          .sendNotification(JSON.parse(elem), JSON.stringify(pushData))
          //await webpush.sendNotification(pushConfig, JSON.stringify({
          //  title: pushMessage['PUSH_TITLE'],
          //  content: pushMessage['PUSH_BODY'],
          //  icon: req.query.icon,
          //  badge: req.query.badge
          //}))
          .then(() => {
            successCount++;
          })
          .catch(async () => {
            // console.error(`Web-Push send message error: ${error}`);
            //finalReturnObject = { "success": false, ...error };
            failureCount++;
            //return next(error); // 將err傳遞給errorHandler處理
            //throw new Error(`WEB訊息推播失敗: ${JSON.stringify(error)}`);
            // 記錄失效Token
            if (
              !wRegistrationTokensFailed[wRegistrationUsers[index]["ID"]] ||
              wRegistrationTokensFailed[wRegistrationUsers[index]["ID"]] ===
                undefined
            ) {
              wRegistrationTokensFailed[wRegistrationUsers[index]["ID"]] = [];
            }
            wRegistrationTokensFailed[wRegistrationUsers[index]["ID"]].push(
              elem
            );
          });
      })
    );
    finalReturnObject.response.data.WEB.successCount += successCount;
    finalReturnObject.response.data.WEB.failureCount += failureCount;
    if (failureCount > 0) {
      // 刪除失效Token
      Object.keys(wRegistrationTokensFailed).some(async (k) => {
        await fireStoreDb
          .collection("users")
          .doc(k)
          .get()
          .then(async (doc) => {
            if (doc.exists) {
              // console.info("Web-Push 刪除失效Token 取得成功"); // lamign test
              // console.info(doc.id, '=>', doc.data());

              let newDrvToken = new Array();
              let failedTokensToString =
                wRegistrationTokensFailed[k].toString();
              // console.info(`failedTokensToString = ${failedTokensToString}`);
              doc.data()["devToken"]["WEB"].map((token) => {
                // console.info(`token = ${token}`);
                if (failedTokensToString.indexOf(token) < 0)
                  newDrvToken.push(token);
              });
              // console.info(`newDrvToken length = ${newDrvToken.length}`);

              // 刪除某個欄位
              await fireStoreDb
                .collection("users")
                .doc(k)
                .update({
                  "devToken.WEB": newDrvToken,
                  //devToken: [];
                  //devToken: admin.firestore.FieldValue.delete()
                })
                .then(async () => {
                  // console.info("Web-Push 刪除失效Token 刪除某個欄位成功"); // lamign test
                  //return true;
                })
                .catch(() => {
                  // console.info("Web-Push 刪除失效Token 刪除某個欄位發生錯誤"); // lamign test
                  // console.info(`Error => ${error} / ${JSON.stringify(error)}`);
                  ////return error;
                  //throw new HttpException(`${this.envLogEnableTag ? ('[' + this.tagName + ']') : ''} pushTokeng新增失敗!`, 404);
                  ////return false;
                });
            }
          })
          .catch(() => {
            // console.info("Web-Push 刪除失效Token 取得發生錯誤"); // lamign test
            // console.info(`Error => ${error} / ${JSON.stringify(error)}`);
            ////return error;
            //throw new HttpException(`${this.envLogEnableTag ? ('[' + this.tagName + ']') : ''} pushToken取得失敗!`, 404);
            ////return false;
          });
      });
    }
  }

  // Web FCM
  if (fcmwRegistrationTokens.length > 0) {
    let successCount = 0;
    let failureCount = 0;
    await Promise.all(
      fcmwRegistrationTokens.map(async (elem, index) => {
        await getMessaging()
          .send({
            token: elem,
            data: {
              badge:
                //fcmwRegistrationUsers[index]["unReadCount"] &&
                fcmwRegistrationUsers[index]["unReadCount"] !== undefined
                  ? fcmwRegistrationUsers[index]["unReadCount"].toString()
                  : "1",
              ...pushData,
            },
            ...payload,
          })
          .then(async () => {
            //await admin.messaging().send(payload).then(async (response) => {
            // On success, each send method returns a message ID.The Firebase Admin SDK returns the ID string in the format projects / { project_id } / messages / { message_id }.The HTTP protocol response is a single JSON key:
            //{ "name": "projects/myproject-b5ae1/messages/0:1500415314455276%31bd1c9631bd1c96" }
            // Response is a message ID string.
            successCount++;
          })
          .catch(() => {
            // console.error(`Web FCM Push send message error: ${error}`);
            //finalReturnObject = { "success": false, ...error };
            failureCount++;
            //return next(error); // 將err傳遞給errorHandler處理
            //throw new Error(`Web FCM訊息推播失敗: ${JSON.stringify(error)}`);
            // 記錄失效Token
            if (
              !fcmwRegistrationTokensFailed[
                fcmwRegistrationUsers[index]["ID"]
              ] ||
              fcmwRegistrationTokensFailed[
                fcmwRegistrationUsers[index]["ID"]
              ] === undefined
            ) {
              fcmwRegistrationTokensFailed[fcmwRegistrationUsers[index]["ID"]] =
                [];
            }
            fcmwRegistrationTokensFailed[
              fcmwRegistrationUsers[index]["ID"]
            ].push(elem);
          });
      })
    );
    finalReturnObject.response.data.WEB.successCount += successCount;
    finalReturnObject.response.data.WEB.failureCount += failureCount;

    if (failureCount > 0) {
      // 刪除失效Token
      Object.keys(fcmwRegistrationTokensFailed).some(async (k) => {
        await fireStoreDb
          .collection("users")
          .doc(k)
          .get()
          .then(async (doc) => {
            if (doc.exists) {
              // console.info("Web FCM 刪除失效Token 取得成功"); // lamign test
              // console.info(doc.id, '=>', doc.data());

              let newDrvToken = new Array();
              let failedTokensToString =
                fcmwRegistrationTokensFailed[k].toString();
              // console.info(`failedTokensToString = ${failedTokensToString}`);
              doc.data()["devToken"]["FCM.WEB"].map((token) => {
                // console.info(`token = ${token}`);
                if (failedTokensToString.indexOf(token) < 0)
                  newDrvToken.push(token);
              });
              // console.info(`newDrvToken length = ${newDrvToken.length}`);

              // 刪除某個欄位
              await fireStoreDb
                .collection("users")
                .doc(k)
                .update({
                  "devToken.FCM.WEB": newDrvToken,
                  //devToken: [];
                  //devToken: admin.firestore.FieldValue.delete()
                })
                .then(async () => {
                  // console.info("Web FCM 刪除失效Token 刪除某個欄位成功"); // lamign test
                  //return true;
                })
                .catch(() => {
                  // console.info("Web FCM 刪除失效Token 刪除某個欄位發生錯誤"); // lamign test
                  // console.info(`Error => ${error} / ${JSON.stringify(error)}`);
                  ////return error;
                  //throw new HttpException(`${this.envLogEnableTag ? ('[' + this.tagName + ']') : ''} pushTokeng新增失敗!`, 404);
                  ////return false;
                });
            }
          })
          .catch(() => {
            // console.info("Web FCM 刪除失效Token 取得發生錯誤"); // lamign test
            // console.info(`Error => ${error} / ${JSON.stringify(error)}`);
            ////return error;
            //throw new HttpException(`${this.envLogEnableTag ? ('[' + this.tagName + ']') : ''} pushToken取得失敗!`, 404);
            ////return false;
          });
      });
    }
  }

  // Android FCM
  if (aRegistrationTokens.length > 0) {
    let successCount = 0;
    let failureCount = 0;
    await Promise.all(
      aRegistrationTokens.map(async (elem, index) => {
        await getMessaging()
          .send({
            token: elem,
            data: {
              badge:
                //aRegistrationUsers[index]["unReadCount"] &&
                aRegistrationUsers[index]["unReadCount"] !== undefined
                  ? aRegistrationUsers[index]["unReadCount"].toString()
                  : "1",
              ...pushData,
            },
            ...payload,
          })
          .then(async () => {
            //await admin.messaging().send(payload).then(async (response) => {
            // On success, each send method returns a message ID.The Firebase Admin SDK returns the ID string in the format projects / { project_id } / messages / { message_id }.The HTTP protocol response is a single JSON key:
            //{ "name": "projects/myproject-b5ae1/messages/0:1500415314455276%31bd1c9631bd1c96" }
            // Response is a message ID string.
            successCount++;
          })
          .catch(() => {
            // console.error(`Android FCM Push send message error: ${error}`);
            //finalReturnObject = { "success": false, ...error };
            failureCount++;
            //return next(error); // 將err傳遞給errorHandler處理
            //throw new Error(`Android FCM訊息推播失敗: ${JSON.stringify(error)}`);
            // 記錄失效Token
            if (
              !aRegistrationTokensFailed[aRegistrationUsers[index]["ID"]] ||
              aRegistrationTokensFailed[aRegistrationUsers[index]["ID"]] ===
                undefined
            ) {
              aRegistrationTokensFailed[aRegistrationUsers[index]["ID"]] = [];
            }
            aRegistrationTokensFailed[aRegistrationUsers[index]["ID"]].push(
              elem
            );
          });
      })
    );
    finalReturnObject.response.data.ANDROID.successCount += successCount;
    finalReturnObject.response.data.ANDROID.failureCount += failureCount;

    if (failureCount > 0) {
      // 刪除失效Token
      Object.keys(aRegistrationTokensFailed).some(async (k) => {
        await fireStoreDb
          .collection("users")
          .doc(k)
          .get()
          .then(async (doc) => {
            if (doc.exists) {
              // console.info("Android FCM 刪除失效Token 取得成功"); // lamign test
              // console.info(doc.id, '=>', doc.data());

              let newDrvToken = new Array();
              let failedTokensToString =
                aRegistrationTokensFailed[k].toString();
              // console.info(`failedTokensToString = ${failedTokensToString}`);
              doc.data()["devToken"]["ANDROID"].map((token) => {
                // console.info(`token = ${token}`);
                if (failedTokensToString.indexOf(token) < 0)
                  newDrvToken.push(token);
              });
              // console.info(`newDrvToken length = ${newDrvToken.length}`);

              // 刪除某個欄位
              await fireStoreDb
                .collection("users")
                .doc(k)
                .update({
                  "devToken.ANDROID": newDrvToken,
                  //devToken: [];
                  //devToken: admin.firestore.FieldValue.delete()
                })
                .then(async () => {
                  // console.info("Android FCM 刪除失效Token 刪除某個欄位成功"); // lamign test
                  //return true;
                })
                .catch(() => {
                  // console.info("Android FCM 刪除失效Token 刪除某個欄位發生錯誤"); // lamign test
                  // console.info(`Error => ${error} / ${JSON.stringify(error)}`);
                  ////return error;
                  //throw new HttpException(`${this.envLogEnableTag ? ('[' + this.tagName + ']') : ''} pushTokeng新增失敗!`, 404);
                  ////return false;
                });
            }
          })
          .catch(() => {
            // console.info("Android FCM 刪除失效Token 取得發生錯誤"); // lamign test
            // console.info(`Error => ${error} / ${JSON.stringify(error)}`);
            ////return error;
            //throw new HttpException(`${this.envLogEnableTag ? ('[' + this.tagName + ']') : ''} pushToken取得失敗!`, 404);
            ////return false;
          });
      });
    }
  }

  // iOS APNS
  if (iRegistrationTokens.length > 0) {
    let bundleid = "com.pec.EPS"; // < - Your Bundle ID
    let host = "api.push.apple.com"; // api.sandbox.push.apple.com or api.push.apple.com
    let url = "";
    //let ipayload = {};
    let ipayload_aps = {};

    if (pushMessage["HOST_TYPE"] && pushMessage["HOST_TYPE"] !== undefined) {
      switch (pushMessage["HOST_TYPE"]) {
        case "SANDBOX":
          host = "api.sandbox.push.apple.com"; // api.sandbox.push.apple.com or api.push.apple.com
          break;
        case "PRODUCTION":
        default: // api.sandbox.push.apple.com or api.push.apple.com
          host = "api.push.apple.com";
          break;
      }
    }
    url = `https://${host}`;

    // https://levelup.gitconnected.com/send-push-notification-through-apns-using-node-js-7427a01662a2
    // https://developer.apple.com/documentation/userNotifications/setting_up_a_remote_notification_server/generating_a_remote_notification#2943363

    // * @constructor
    // * @param {String} deviceToken
    // * @param {Object} [options]
    // * @param {Object|String} [options.alert]
    // * @param {String} [options.alert.title]
    // * @param {String} [options.alert.body]
    // * @param {Number} [options.badge]
    // * @param {String} [options.sound]
    // * @param {String} [options.category]
    // * @param {Object} [options.data]
    // * @param {Boolean} [options.contentAvailable]
    // * @param {Number} [options.priority]
    // * @param {String} [options.topic]
    // * @param {String} [options.collapseId]
    // * @param {String} [options.threadId]
    // * @param {Object} [options.aps] - override all setters
    ipayload_aps = {
      alert: {
        // pushNotification
        title: pushMessage["PUSH_TITLE"],
        body: pushMessage["PUSH_BODY"],
        //subtitle: 'Five Card Draw'
      },
      // //badge: 1,
      // badge: (((pushMessage['BADGE']) && (pushMessage['BADGE'] !== undefined)) ? pushMessage['BADGE'] : 1),
      //sound: 'bingbong',  // 'default' // 'Submarine.aiff' // 'bingbong.aiff'
      sound:
        pushMessage["SOUND"] && pushMessage["SOUND"] !== undefined
          ? pushMessage["SOUND"]
          : "default",
      //category: 'GAME_INVITATION',
      //'content-available': 1,
      url:
        pushMessage["PUSH_REDIRECT"] &&
        pushMessage["PUSH_REDIRECT"] !== undefined
          ? pushMessage["PUSH_REDIRECT"]
          : "",
      navType:
        pushMessage["NAV_TYPE"] && pushMessage["NAV_TYPE"] !== undefined
          ? pushMessage["NAV_TYPE"]
          : "",
    };

    //if ((pushMessage['BADGE']) && (pushMessage['BADGE'] !== undefined)) {
    //  ipayload_aps['badge'] = pushMessage['BADGE'];
    //}
    // ipayload = {
    //     aps: ipayload_aps
    // };

    //const tokenObject = UtilityService.useRequestGenToken(req);
    //const accessToken = tokenObject.accessToken;
    //const refreshToken = tokenObject.refreshToken;
    const accessToken =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY2hlbWEiOiJyZXRtIiwidXNlcklkIjoiMjU5MTU3IiwiaWF0IjoxNjE3MDkxNTU2LCJleHAiOjE2MTcwOTUxNTYsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzUwMCIsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzAwMCJ9.eydYMKzyG3_7XRxai8MwpXAx9imhfLQjZ0PQitWQpF4";

    if (!accessToken || accessToken === undefined) {
      // console.error(`No auth token`);
      throw new Error("No auth token");
      //throw new HttpException("No auth token", 418);
      //return false;
    } else {
      // const jwtToken = accessToken;
      // console.info(`sendNotificationToiOSDevice jwtToken = ${jwtToken}`);

      // $http2ch = curl_init();
      // curl_setopt_array($http2ch, array(
      //     CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_2_0,
      //     CURLOPT_URL => "url/3/device/$token",
      //     CURLOPT_PORT => 443,
      //     CURLOPT_HTTPHEADER => array(
      //         "apns-topic: {bundleid}"
      //     ),
      //     CURLOPT_POST => TRUE,
      //     CURLOPT_POSTFIELDS => ipayload,
      //     CURLOPT_RETURNTRANSFER => TRUE,
      //     CURLOPT_TIMEOUT => 30,
      //     CURLOPT_HEADER => 1
      // ));
      // curl_setopt($http2ch, CURLOPT_URL, "url/3/device/$token");
      // curl_setopt($http2ch, CURLOPT_SSLCERT, pem_file);
      // curl_setopt($http2ch, CURLOPT_SSLCERTPASSWD, fs.readFileSync(pem_secret).toString()); // pem_secret
      // curl_setopt($http2ch, CURLOPT_SSL_VERIFYPEER, false); // 相同於 --insecure
      // //curl_setopt($http2ch, CURLOPT_SSL_VERIFYHOST, false);
      // curl_setopt($http2ch, CURLOPT_VERBOSE, true);
      // $result = curl_exec($http2ch);

      // console.info(`start require... node-libcurl`);
      // https://github.com/JCMais/node-libcurl
      // npm i --save node-libcurl@2.3.4 --redhat linux 8
      const { curly } = require("node-libcurl");
      // console.info(`node-libcurl started....`);

      const jwt = require("jsonwebtoken");
      const authKeyId = apns.authKeyId;
      const teamId = apns.teamId;
      const cert = apns.authKey;
      let expiredtime = 1200; // https://developer.apple.com/go/?id=api-generating-tokens
      // let jwtToken2 = null;
      // if (!fs.existsSync(p8_jwtfile)) {
      // console.info(`${p8_jwtfile}.File not found`);
      // } else {
      //     try {
      //         jwtToken2 = fs.readFileSync(p8_jwtfile).toString(); // 取得.p8 JWT Token
      //     } catch (err) {
      //         // If the type is not what you want, then just throw the error again.
      //         if (err.code !== 'ENOENT') throw err;
      //         // Handle a file-not-found error
      //     }
      // }
      let envDocId = null;
      let jwtToken2 = null;

      // 取得.p8 JWT Token
      // console.info(`get env`);
      await fireStoreDb
        .collection("env")
        .where("prjId", "==", "com.pec.EPS")
        .get()
        .then(async (snapshot) => {
          if (snapshot.empty) {
            // console.info(`com.pec.EPS => No matching documents 0.`);
          } else {
            // console.info(`com.pec.EPS => 取得成功 0`); // lamign test

            let docObject = new Array();
            snapshot.forEach(async (doc) => {
              docObject.push(doc);
            });
            await Promise.all(
              docObject.map(async (doc) => {
                // console.info(doc.id, '=>', doc.data());

                envDocId = doc.id;
                jwtToken2 = doc.data()["iOS_p8jwt"];
                // console.info(`get exists jwtToken2 = ${jwtToken2}`);

                return Promise.resolve(true);
              })
            );
          }
        })
        .catch(() => {
          // console.info(`com.pec.EPS => 取得發生錯誤 0`); // lamign test
          // console.info(`Error => ${error} / ${JSON.stringify(error)}`);
          ////return error;
          //throw new HttpException(`${this.envLogEnableTag ? ('[' + this.tagName + ']') : ''} pushToken取得失敗!`, 404);
          ////return false;
        });
      // console.info(`end env`);

      let successCount = 0;
      let failureCount = 0;
      let firstInit = true;
      // let i = -1;
      while (iRegistrationTokens.length > 0) {
        // i++;
        // console.info(`iRegistrationTokens length = ${iRegistrationTokens.length} / ${iRegistrationUsers.length}`);
        if (!firstInit) {
          // console.info(`create new jwtToken2 by statusCode === 403`);
          jwtToken2 = null;
        }
        if (firstInit) firstInit = false;

        await Promise.all(
          iRegistrationTokens.map(async (elem, index) => {
            let url2 = `${url}/3/device/${elem}`;
            // console.info(`111 => url2 = ${iRegistrationUsers[index]['unReadCount']}---${url2}`);

            if (jwtToken2 && jwtToken2 !== undefined) {
              // verify a token asymmetric
              try {
                jwt.verify(
                  jwtToken2,
                  cert,
                  {
                    issuer: teamId,
                    header: { alg: "ES256", kid: authKeyId },
                    algorithms: "ES256",
                  },
                  function (err, decoded) {
                    // console.info(`jwt.verify decoded = ${JSON.stringify(decoded)}`);
                    // console.info(`jwt.verify err = ${err}`); // TokenExpiredError: jwt expired
                    if (!decoded || decoded === undefined) {
                      let constructor =
                        err["name"] ||
                        err["message"] ||
                        err["expiredAt"] ||
                        err["constructor"];
                      if (
                        constructor.indexOf("TokenExpiredError") >= 0 ||
                        constructor.indexOf("jwt expired") >= 0
                      ) {
                        // console.info(`${index}.jwt token expired 1.`);
                        jwtToken2 = null;
                      }
                    } else {
                      // console.info(`jwt.verify nowtimecal = ${((Date.now() - (decoded['iat'] * 1000))/1000)}`);
                      if (
                        (Date.now() - decoded["iat"] * 1000) / 1000 >
                        expiredtime
                      ) {
                        // 判斷exp是否超過20min(1200秒)
                        // console.info(`${index}.jwt token expired 2.`);
                        jwtToken2 = null;
                      }
                    }
                  }
                );
              } catch (err) {
                // console.info(`jwt.verify catch err = ${err}`);
              }
            }
            if (!jwtToken2 || jwtToken2 === undefined) {
              // .p8
              // https://medium.com/@josephchen.jojo/%E5%9F%BA%E6%96%BChttp-2%E7%9A%84ios-apns-%E6%8E%A8%E6%92%AD-f39c6b31eb51
              // https://stackoverflow.com/questions/41628335/send-ios-push-notification-in-php-with-p8-file
              // https://developer.apple.com/go/?id=api-generating-tokens
              jwtToken2 = jwt.sign(
                {
                  iss: teamId,
                  iat: Math.floor(Date.now() / 1000) - 30,
                },
                cert,
                {
                  expiresIn: expiredtime,
                  header: { alg: "ES256", kid: authKeyId },
                  algorithm: "ES256",
                }
              );
              // console.info(`${index}.create new jwtToken2 = ${jwtToken2}`);

              // try {
              //     fs.writeFileSync(p8_jwtfile, jwtToken2);
              // } catch (err) {
              //     // If the type is not what you want, then just throw the error again.
              //     if (err.code !== 'ENOENT') throw err;
              //     // Handle a file-not-found error
              // }
              if (!envDocId || envDocId === undefined) {
                // 新增資料
                envData["iOS_p8jwt"] = jwtToken2;
                await fireStoreDb
                  .collection("env")
                  .add(envData)
                  .then((doc) => {
                    // async
                    // console.info(`${index} com.pec.EPS => ${doc.id} 新增成功 1`); // lamign test
                    envDocId = doc.id;
                    //return true;
                  })
                  .catch(() => {
                    // console.info(`${index} com.pec.EPS => 新增發生錯誤 1`); // lamign test
                    // console.info(`Error => ${error} / ${JSON.stringify(error)}`);
                    ////return error;
                    //throw new HttpException(`${this.envLogEnableTag ? ('[' + this.tagName + ']') : ''} pushTokeng新增失敗!`, 404);
                    ////return false;
                  });
              } else {
                // 更新集合中的部分資料
                await fireStoreDb
                  .collection("env")
                  .doc(envDocId)
                  .update({
                    iOS_p8jwt: jwtToken2,
                  })
                  .then(() => {
                    // async
                    // console.info(`${index} com.pec.EPS => 更新集合中的部分資料成功 1`); // lamign test
                    //return true;
                  })
                  .catch(() => {
                    // console.info(`${index} com.pec.EPS => 更新集合中的部分資料發生錯誤 1`); // lamign test
                    // console.info(`Error => ${error} / ${JSON.stringify(error)}`);
                    ////return error;
                    //throw new HttpException(`${this.envLogEnableTag ? ('[' + this.tagName + ']') : ''} pushTokeng新增失敗!`, 404);
                    ////return false;
                  });
              }
            }

            // .p8
            await curly
              .post(url2, {
                //const { statusCode, data, headers } = await curly.post(url2, {
                HTTP_VERSION: "CURL_HTTP_VERSION_2_0",
                PORT: 443,
                HTTPHEADER: [
                  `content-type: application/json`,
                  `authorization: Bearer ${jwtToken2}`,
                  `apns-topic: ${bundleid}`,
                ],
                //POSTFIELDS: JSON.stringify(ipayload),
                POSTFIELDS: JSON.stringify({
                  aps: {
                    badge:
                      //iRegistrationUsers[index]["unReadCount"] &&
                      iRegistrationUsers[index]["unReadCount"] !== undefined
                        ? iRegistrationUsers[index]["unReadCount"]
                        : 1,
                    ...ipayload_aps,
                  },
                }),
                //RETURNTRANSFER: true,
                TIMEOUT: 30, // 30 // CustomConfigModule.envHttpTimeout
                HEADER: 1,
                SSL_VERIFYPEER: false,
                //SSL_VERIFYHOST, false,
                VERBOSE: true,
                // .p12
                // await curly.post(url2, {
                // //const { statusCode, data, headers } = await curly.post(url2, {
                //     HTTP_VERSION: "CURL_HTTP_VERSION_2_0",
                //     PORT: 443,
                //     HTTPHEADER: [
                //         `apns-topic: ${bundleid}`
                //     ],
                //     //POSTFIELDS: JSON.stringify(ipayload),
                //     POSTFIELDS: JSON.stringify({
                //         aps: {'badge': (((iRegistrationUsers[index]['unReadCount']) && (iRegistrationUsers[index]['unReadCount'] !== undefined)) ? iRegistrationUsers[index]['unReadCount'] : 1), ...ipayload_aps}
                //     }),
                //     //RETURNTRANSFER: true,
                //     TIMEOUT: 30, // 30 // CustomConfigModule.envHttpTimeout
                //     HEADER: 1,
                //     SSLCERT: pem_file,
                //     KEYPASSWD: fs.readFileSync(pem_secret).toString(), // pem_secret
                //     SSL_VERIFYPEER: false,
                //     //SSL_VERIFYHOST, false,
                //     VERBOSE: true
              })
              .then(async (response) => {
                // console.info(`222 => response = ${JSON.stringify(response)}`);
                // console.info(`Api ${index} - ${url2} return => ${JSON.stringify(response)}`);
                // HTTP/2 200 apns-id: BABD5514-93E8-CB80-2579-E417CFA8E8DA 200
                // HTTP/2 400 apns-id: 6B6F61C6-0FDD-D7D7-73EF-0D0FE0813D1B {"reason":"BadDeviceToken"}400
                // { "statusCode": 200, "data": { "type": "Buffer", "data": [72, 84, 84, 80, 47, 50, 32, 50, 48, 48, 32, 13, 10, 97, 112, 110, 115, 45, 105, 100, 58, 32, 55, 51, 51, 70, 57, 51, 51, 55, 45, 51, 68, 65, 67, 45, 53, 49, 51, 70, 45, 66, 55, 67, 51, 45, 51, 56, 53, 56, 68, 68, 66, 49, 69, 50, 67, 65, 13, 10, 13, 10] }, "headers": [{ "result": { "version": "HTTP/2", "code": 200, "reason": "" }, "apns-id": "733F9337-3DAC-513F-B7C3-3858DDB1E2CA" }] }
                if (response["statusCode"] === 403) {
                  // console.info(`${i}.${index}.${response['statusCode']}`);
                } else {
                  // console.info(`remove.${i}.${index}.${response['statusCode']}`);
                  if (response["statusCode"] === 200) {
                    successCount++;
                  } else {
                    failureCount++;
                    // https://developer.apple.com/documentation/userNotifications/setting_up_a_remote_notification_server/handling_notification_responses_from_apns
                    if (response["statusCode"] === 410) {
                      // 記錄失效Token
                      if (
                        !iRegistrationTokensFailed[
                          iRegistrationUsers[index]["ID"]
                        ] ||
                        iRegistrationTokensFailed[
                          iRegistrationUsers[index]["ID"]
                        ] === undefined
                      ) {
                        iRegistrationTokensFailed[
                          iRegistrationUsers[index]["ID"]
                        ] = [];
                      }
                      iRegistrationTokensFailed[
                        iRegistrationUsers[index]["ID"]
                      ].push(elem);
                    }
                  }
                  let indexOfElem = iRegistrationTokens.indexOf(elem);
                  iRegistrationTokens.splice(indexOfElem, 1); // index
                  iRegistrationUsers.splice(indexOfElem, 1); // index
                  // console.info(`remove.iRegistrationTokens length = ${iRegistrationTokens.length} / ${iRegistrationUsers.length}`);
                }

                // 使用Promise，盡可能避免使用callback方式。
                //return Promise.resolve({
                //    "successCount": response['successCount'],
                //    "failureCount": response['failureCount']
                //});
                //return Promise.resolve(response['data']);
              })
              .catch(() => {
                // console.info(`333 => err = ${JSON.stringify(err)}`);
                // console.error(`sendNotificationToiOSDevice error 1 = ${err} / ${JSON.stringify(err)}`);
                //UtilityService.exceptionTransfer(err, true);
                failureCount++;
                //reject(err);
                //return throwError(err);
                //throw new HttpException(`下載檔案失敗!`, 404);
              });
          })
        );
      } // end while
      finalReturnObject.response.data.IOS.successCount = successCount;
      finalReturnObject.response.data.IOS.failureCount = failureCount;

      if (failureCount > 0) {
        // 刪除失效Token
        Object.keys(iRegistrationTokensFailed).some(async (k) => {
          await fireStoreDb
            .collection("users")
            .doc(k)
            .get()
            .then(async (doc) => {
              if (doc.exists) {
                // console.info("iOS APNS 刪除失效Token 取得成功"); // lamign test
                // console.info(doc.id, '=>', doc.data());

                let newDrvToken = new Array();
                let failedTokensToString =
                  iRegistrationTokensFailed[k].toString();
                // console.info(`failedTokensToString = ${failedTokensToString}`);
                doc.data()["devToken"]["IOS"].map((token) => {
                  // console.info(`token = ${token}`);
                  if (failedTokensToString.indexOf(token) < 0)
                    newDrvToken.push(token);
                });
                // console.info(`newDrvToken length = ${newDrvToken.length}`);

                // 刪除某個欄位
                await fireStoreDb
                  .collection("users")
                  .doc(k)
                  .update({
                    "devToken.IOS": newDrvToken,
                    //devToken: [];
                    //devToken: admin.firestore.FieldValue.delete()
                  })
                  .then(async () => {
                    // console.info("iOS APNS 刪除失效Token 刪除某個欄位成功"); // lamign test
                    //return true;
                  })
                  .catch(() => {
                    // console.info("iOS APNS 刪除失效Token 刪除某個欄位發生錯誤"); // lamign test
                    // console.info(`Error => ${error} / ${JSON.stringify(error)}`);
                    ////return error;
                    //throw new HttpException(`${this.envLogEnableTag ? ('[' + this.tagName + ']') : ''} pushTokeng新增失敗!`, 404);
                    ////return false;
                  });
              }
            })
            .catch(() => {
              // console.info("iOS APNS 刪除失效Token 取得發生錯誤"); // lamign test
              // console.info(`Error => ${error} / ${JSON.stringify(error)}`);
              ////return error;
              //throw new HttpException(`${this.envLogEnableTag ? ('[' + this.tagName + ']') : ''} pushToken取得失敗!`, 404);
              ////return false;
            });
        });
      }

      // console.info(`999 => finalReturnObject = ${JSON.stringify(finalReturnObject)}`);
    }
  }

  // console.info(`finalReturnObject = ${JSON.stringify(finalReturnObject)}`);
  return finalReturnObject;
  //return res.json(finalReturnObject);
}
