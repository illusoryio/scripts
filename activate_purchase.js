// v3.1
$("#activateNow").click(function () {
  var customerId = window.localStorage.getItem("customerId");
  var attVal = $("#attSelect").val();
  var verVal = $("#verSelect").val();
  var tmoVal = $("#tmoSelect").val();
  var bhw = $("#memberSelect").val();
  var bhwUsername = $("#memberUname").val();
  var period = $("#periodSelect").val();
  var price = $("#totalPrice").val();
  var sum = parseInt(attVal) + parseInt(verVal) + parseInt(tmoVal);

  if (bhw == "true" && bhwUsername.length < 1) {
    $("#errorMsg").show();
    $("#errorMsg").slideDown("slow").delay(3000).slideUp("slow");
    $("#errorTxt").html("You forgot to enter your Blackhatworld Username 🎩");
  } else {
    if ((attVal > 0) | (verVal > 0) | (tmoVal > 0)) {
      $("#lottieStockWarn").hide();
      $("#lottieStockOk").hide();
      $("#lottieInvoiceOk").hide();
      $("#lottieInvoiceWarn").hide();
      $("#annual_btn").hide();
      //Show icons and loader
      $("#lottieStockSpin").show();
      $("#lottieInvoiceSpin").show();
      $("#activationPageLoader").show();
      $("#panelLoader").show();
      var paymentMethod = $("#paySelect").val();

      // If payment method == crypto, gen coinbase invoice
      // else line 65
      if (paymentMethod == "crypto") {
        var cancelUrl = "https://app.illusory.io/new";
        var successUrl = "https://app.illusory.io/crypto-success";
        var endpoint = new URL(
          "https://api.illusory.io/api:hZUbktAq/coinbase_add"
        );

        const getPricing = () => {
          return new Promise((resolve) => {
            setTimeout(() => {
              $(document).ready(
                axios
                  .post(endpoint, {
                    headers: { "Content-type": "application/json" },
                    customerId: customerId,
                    attVal: attVal,
                    verVal: verVal,
                    tmoVal: tmoVal,
                    sum: sum,
                    bhw: bhw,
                    bhwUsername: bhwUsername,
                    cancelUrl: cancelUrl,
                    successUrl: successUrl,
                    period: period,
                    orderType: "add",
                    local_price: {
                      amount: price,
                      currency: "USD",
                    },
                  })
                  .catch((error) => {
                    $("#errorMsg").show();
                    $("#errorMsg")
                      .slideDown("slow")
                      .delay(3000)
                      .slideUp("slow");
                    $("#errorTxt").html(error.response.data.message);
                    //Hide icons
                    $("#lottieStockSpin").hide();
                    $("#lottieInvoiceSpin").hide();
                    $("#lottieStockOk").hide();
                    $("#lottieInvoiceOk").hide();
                    //Show icons and back button
                    $("#lottieStockWarn").show();
                    $("#lottieInvoiceWarn").show();
                    $("#backToCheckout").show();
                  })
                  .then((response) => {
                    resolve();
                    if (response === undefined) {
                    } else {
                      var stockOk = response.data.stockOk;

                      if (stockOk === true) {
                        var coinbaseUrl =
                          response.data.coinbase.response.result.data
                            .hosted_url;
                        window.localStorage.setItem("coinbaseUrl", coinbaseUrl);
                        if (period == monthly) {
                          $("#outcomeTxt").html(
                            "Everything is ready! Would you like to save 20% with an annual subscription?"
                          );
                          $("#annual_btn").show();
                        } else {
                          $("#outcomeTxt").html(
                            "Everything is ready! Please continue to purchase. Note: Products are deployed once payment clears."
                          );
                        }
                        $("#lottieStockSpin").hide();
                        $("#lottieInvoiceSpin").hide();
                        $("#lottieInvoiceSpin").hide();
                        //Show icons and back button
                        $("#lottieStockOk").show();
                        $("#lottieInvoiceOk").show();
                        $("#payCoin").show();
                      } else {
                        $("#outcomeTxt").html(
                          "There was an issue. Stock was likely updated. Please update your quantity."
                        );
                        //Hide icons
                        $("#lottieStockSpin").hide();
                        $("#lottieInvoiceSpin").hide();
                        $("#lottieInvoiceSpin").hide();
                        //Show icons and back button
                        $("#lottieStockWarn").show();
                        $("#lottieInvoiceWarn").show();
                        $("#backBtn").show();
                      }
                    }
                  })
              );
            });
          }, 200);
        };
        async function clickPricing() {
          console.log("Starting clickAsync");
          await getPricing();
        }
        clickPricing();
        // If payment method card, gen stripe checkout session
      } else {
        var cancelUrl = "https://app.illusory.io/new";
        var successUrl = "https://app.illusory.io/card-success";
        var endpoint = new URL(
          "https://api.illusory.io/api:UQuTJ3vx/session_add"
        );
        var stripeNickname = $("#stripeNickname").val();
        var stripeProduct = $("#stripeProduct").val();

        const getPricing = () => {
          return new Promise((resolve) => {
            setTimeout(() => {
              $(document).ready(
                axios
                  .post(endpoint, {
                    headers: { "Content-type": "application/json" },
                    customerId: customerId,
                    attVal: attVal,
                    verVal: verVal,
                    tmoVal: tmoVal,
                    bhw: bhw,
                    sum: sum,
                    bhwUsername: bhwUsername,
                    period: period,
                    price: price,
                    paymentMethod: paymentMethod,
                    orderType: "add",
                    cancel_url: cancelUrl,
                    success_url: successUrl,
                    stripeNickname: stripeNickname,
                    stripeProduct: stripeProduct,
                    metadata: {
                      orderType: "add",
                      customerId: customerId,
                      attVal: attVal,
                      verVal: verVal,
                      tmoVal: tmoVal,
                    },
                  })
                  .catch((error) => {
                    $("#errorMsg").show();
                    $("#errorMsg")
                      .slideDown("slow")
                      .delay(3000)
                      .slideUp("slow");
                    $("#errorTxt").html(error.response.data.message);

                    //Hide icons
                    $("#lottieStockSpin").hide();
                    $("#lottieInvoiceSpin").hide();
                    $("#lottieStockOk").hide();
                    $("#lottieInvoiceOk").hide();
                    //Show icons and back button
                    $("#lottieStockWarn").show();
                    $("#lottieInvoiceWarn").show();
                    $("#backToCheckout").show();
                  })
                  .then((response) => {
                    resolve();
                    if (response === undefined) {
                    } else {
                      // console.log(response);
                      var stockOk = response.data.stockOk;

                      if (stockOk === true) {
                        var session = response.data.session.response.result.id;
                        window.localStorage.setItem("stripeSession", session);

                        if (period == monthly) {
                          $("#outcomeTxt").html(
                            "Everything is ready! Would you like to save 20% with an annual subscription?"
                          );
                          $("#annual_btn").show();
                        } else {
                          $("#outcomeTxt").html(
                            "Everything is ready! Please continue to purchase. Note: Products are deployed once payment clears."
                          );
                        }

                        $("#lottieStockSpin").hide();
                        $("#lottieInvoiceSpin").hide();
                        $("#lottieInvoiceSpin").hide();
                        //Show icons and back button
                        $("#lottieStockOk").show();
                        $("#lottieInvoiceOk").show();
                        $("#cardOptions").show();
                      } else {
                        $("#outcomeTxt").html(
                          "There was an issue. Stock was likely updated. Please update your quantity."
                        );
                        //Hide icons
                        $("#lottieStockSpin").hide();
                        $("#lottieInvoiceSpin").hide();
                        $("#lottieInvoiceSpin").hide();
                        //Show icons and back button
                        $("#lottieStockWarn").show();
                        $("#lottieInvoiceWarn").show();
                        $("#backBtn").show();
                      }
                    }
                  })
              );
            });
          }, 200);
        };
        async function clickPricing() {
          console.log("Starting clickAsync");
          await getPricing();
        }
        clickPricing();
      }
    } else {
      $("#errorMsg").show();
      $("#errorMsg").slideDown("slow").delay(3000).slideUp("slow");
      $("#errorTxt").html("You have no proxies selected though 😅");
    }
  }
});
