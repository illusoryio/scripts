// v2.202

$(document).ready(function () {
  $(".products-loader").show();
  var authToken = window.localStorage.getItem("token");
  var endpoint = "https://api.illusory.io/api:8YXVpa8D/sub/stock_v3";
  const getStock = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        axios
          .get(endpoint, {
            headers: {
              "Content-type": "application/json",
              Authorization: "Bearer " + authToken,
            },
          })
          .catch((error) => {
            $("#errorMsg").show();
            $("#errorMsg").slideDown("slow").delay(3000).slideUp("slow");
            $("#errorTxt").html(error.response.data.message);
          })
          .then((response) => {
            resolve();
            if (response === undefined) {
            } else {
              console.log(response);
              var payReq = response.data.payReq;
              var activeAtt = response.data.activeAtt;
              var activeVer = response.data.activeVer;
              var activeTmo = response.data.activeTmo;
              var attStock_la = response.data.attStock_la;
              var verStock_la = response.data.verStock_la;
              var tmoStock_la = response.data.tmoStock_la;
              var activeAtt_la = response.data.activeAtt_la;
              var activeVer_la = response.data.activeVer_la;
              var activeTmo_la = response.data.activeTmo_la;
              var attStock_cle = response.data.attStock_cle;
              var verStock_cle = response.data.verStock_cle;
              var tmoStock_cle = response.data.tmoStock_cle;
              var activeAtt_cle = response.data.activeAtt_cle;
              var activeVer_cle = response.data.activeVer_cle;
              var activeTmo_cle = response.data.activeTmo_cle;
              var price = response.data.productsSub.price;
              var dueToday = response.data.dueToday;
              var subAmount = response.data.productsSub.subtotal;
              var bhwAmount = response.data.productsSub.bhwDiscount;
              var bulkAmount = response.data.productsSub.bulkDiscount;
              var period = response.data.productsSub.period;
              var stripeNickname = response.data.productsSub.stripeNickname;
              var stripeProduct = response.data.productsSub.stripeProduct;
              var periodType = response.data.periodType;
              var bhwVerified = response.data.bhwVerified;

              $("#payReq").val(payReq);
              $("#totalPrice").val(parseInt(price));
              $("#dueToday").val(parseInt(dueToday));
              $("#stripeNickname").val(stripeNickname);
              $("#stripeProduct").val(stripeProduct);

              // periodType select
              $(`#periodSelect option[value=${periodType}]`).prop({
                defaultSelected: true,
              });

              // BHW Member select
              $(`#memberSelect option[value=${bhwVerified}]`).prop({
                defaultSelected: true,
              });

              if (bhwVerified === true) {
                var bhwUsername = response.data.bhwUsername;
                $("#memberUname").val(bhwUsername);
                $("#memberUnameCtn").show();
                if (bhwAmount > 0) {
                  $("#bhwAmount").html("-$" + bhwAmount);
                  $("#bhwAmount").show();
                  $("#bhwLineItem").show();
                } else {
                  $("#bhwAmount").html(0);
                  $("#bhwAmount").hide();
                  $("#bhwLineItem").hide();
                }
              }

              if (bulkAmount > 0) {
                $("#bulkAmount").html("-$" + bulkAmount);
                $("#bulkAmount").show();
                $("#bulkLineItem").show();
              } else {
                $("#bulkAmount").html(0);
                $("#bulkAmount").hide();
                $("#bulkLineItem").hide();
              }
              $("#periodLineItem").html(periodType);
              $("#todayAmount").html("$" + dueToday);
              $("#subAmount").html("$" + subAmount);
              $("#totalAmount").html("$" + price + period);

              if (payReq == false) {
                $("#paynowBtn").hide();
              } else {
                $("#paynowBtn").show();
                $("#subAlert").show();
              }

              var attStock_cle = response.data.attStock_cle;
              var verStock_cle = response.data.verStock_cle;
              var tmoStock_cle = response.data.tmoStock_cle;

              var attSelect_cle = document.getElementById("attSelect_cle");

              for (var i = 0; i < attStock_cle; i++) {
                var option = document.createElement("option");
                option.text = i + 1 + " Active";
                option.value = i + 1;
                attSelect_cle.appendChild(option);
              }
              if (activeAtt_cle > 0) {
                $(`#attSelect_cle option[value=${activeAtt_cle}]`).prop({
                  defaultSelected: true,
                });
                $("#attSelect_cle").css(
                  "background",
                  "linear-gradient(90deg, #0037bf, #0082ff) #181b26"
                );
                
                $("#attLineItemQuanity").html("x" + activeAtt);
                $("#attLineItem").show();
                $("#attLineItemQuanity").show();
              } else {
                // console.log("None");
              }

              var verSelect_cle = document.getElementById("verSelect_cle");

              for (var i = 0; i < verStock_cle; i++) {
                var option = document.createElement("option");
                option.text = i + 1 + " Active";
                option.value = i + 1;
                verSelect_cle.appendChild(option);
              }
              if (activeVer_cle > 0) {
                $(`#verSelect_cle option[value=${activeVer_cle}]`).prop({
                  defaultSelected: true,
                });
                $("#verSelect_cle").css(
                  "background",
                  "linear-gradient(90deg, #bf0000, #ff6a00) #181b26"
                );
                $("#verLineItemQuanity").html("x" + activeVer);
                $("#verLineItem").show();
                $("#verLineItemQuanity").show();
              } else {
                // console.log("None");
              }

              var tmoSelect_cle = document.getElementById("tmoSelect_cle");

              for (var i = 0; i < tmoStock_cle; i++) {
                var option = document.createElement("option");
                option.text = i + 1 + " Active";
                option.value = i + 1;
                tmoSelect_cle.appendChild(option);
              }
              if (activeTmo_cle > 0) {
                $(`#tmoSelect_cle option[value=${activeTmo_cle}]`).prop({
                  defaultSelected: true,
                });
                $("#tmoSelect_cle").css(
                  "background",
                  "linear-gradient(90deg, #5700bf, #e400ff) #181b26"
                );
                $("#tmoLineItemQuanity").html("x" + activeTmo);
                $("#tmoLineItem").show();
                $("#tmoLineItemQuanity").show();
              } else {
                // console.log("None");
              }

              var attStock_la = response.data.attStock_la;
              var verStock_la = response.data.verStock_la;
              var tmoStock_la = response.data.tmoStock_la;

              var attSelect_la = document.getElementById("attSelect_la");

              for (var i = 0; i < attStock_la; i++) {
                var option = document.createElement("option");
                option.text = i + 1 + " Active";
                option.value = i + 1;
                attSelect_la.appendChild(option);
              }
              if (activeAtt_la > 0) {
                $(`#attSelect_la option[value=${activeAtt_la}]`).prop({
                  defaultSelected: true,
                });
                $("#attSelect_la").css(
                  "background",
                  "linear-gradient(90deg, #0037bf, #0082ff) #181b26"
                );
                $("#attLineItemQuanity").html("x" + activeAtt);
                $("#attLineItem").show();
                $("#attLineItemQuanity").show();
              } else {
                // console.log("None");
              }

              var verSelect_la = document.getElementById("verSelect_la");

              for (var i = 0; i < verStock_la; i++) {
                var option = document.createElement("option");
                option.text = i + 1 + " Active";
                option.value = i + 1;
                verSelect_la.appendChild(option);
              }
              if (activeVer_la > 0) {
                $(`#verSelect_la option[value=${activeVer_la}]`).prop({
                  defaultSelected: true,
                });
                $("#verSelect_la").css(
                  "background",
                  "linear-gradient(90deg, #bf0000, #ff6a00) #181b26"
                );
                $("#verLineItemQuanity").html("x" + activeVer);
                $("#verLineItem").show();
                $("#verLineItemQuanity").show();
              } else {
                // console.log("None");
              }

              var tmoSelect_la = document.getElementById("tmoSelect_la");

              for (var i = 0; i < tmoStock_la; i++) {
                var option = document.createElement("option");
                option.text = i + 1 + " Active";
                option.value = i + 1;
                tmoSelect_la.appendChild(option);
              }
              if (activeTmo_la > 0) {
                $(`#tmoSelect_la option[value=${activeTmo_la}]`).prop({
                  defaultSelected: true,
                });
                $("#tmoSelect_la").css(
                  "background",
                  "linear-gradient(90deg, #5700bf, #e400ff) #181b26"
                );
                $("#tmoLineItemQuanity").html("x" + activeTmo);
                $("#tmoLineItem").show();
                $("#tmoLineItemQuanity").show();
              } else {
                // console.log("None");
              }
              $(".products-loader").hide();
            }
          });
      });
    }, 200);
  };
  async function loadStock() {
    console.log("Starting clickAsync");
    await getStock();
  }
  loadStock();
});
