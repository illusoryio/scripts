// v3.1
async function getProxies() {
    const { data, error } = await supabaseClient
        .from("proxies_restricted")
        .select()
        .order("proxy_name", { ascending: true });
    return new Promise((resolve) => {
        setTimeout(() => {
            if (error) {
                console.error("we got an error:", error);
            } else {
                // Clear content
                const prxCard = document.getElementsByClassName("cards-v2")[0];
                prxCard.innerHTML = "";

                var items = data;
                var isp_count = 0;

                for (var i = 0; i < items.length; i++) {
                    // Proxies array
                    var item = items[i];

                    // Create card
                    const card = document.createElement("div");
                    card.setAttribute("prx_card", item.proxy_name);
                    card.classList.add("prx_crd_v2");
                    card.setAttribute("onclick", "interact(this)");
                    card.setAttribute("interact", item.proxy_name);
                    prxCard.appendChild(card);

                    // Create card top
                    const prxCardTop = document.createElement("div");
                    prxCardTop.classList.add("prx_crd_top");
                    card.appendChild(prxCardTop);

                    // Add timer div
                    const cardTimerElem = document.createElement("div");
                    cardTimerElem.classList.add("prx_crd_ti_v2");
                    cardTimerElem.setAttribute("prx_res_timer", item.proxy_name);
                    prxCardTop.appendChild(cardTimerElem);

                    // Add proxy card title section
                    const cardTitleWrap = document.createElement("div");
                    cardTitleWrap.classList.add("prx_crd_tit_sec_v2");
                    cardTitleWrap.classList.add("w-clearfix");
                    prxCardTop.appendChild(cardTitleWrap);

                    // Add proxy rotate icon wrap
                    const cardIcons = document.createElement("div");
                    cardIcons.classList.add("ico_rot_v2");
                    cardIcons.classList.add("w-embed");
                    cardTitleWrap.appendChild(cardIcons);

                    // Add proxy rotate icon
                    const rotateImgElem = new Image();
                    rotateImgElem.src =
                        "https://assets.website-files.com/601983fb7d31a9e2fe9f0840/61aa903bc84f5b905f432b4f_rotate-cw.svg";
                    rotateImgElem.setAttribute("onclick", "resetProxy(this.id)");
                    rotateImgElem.setAttribute("id", "reset_" + item.proxy_name);
                    cardIcons.appendChild(rotateImgElem);

                    // Add proxy card title wrap
                    const cardDetailsElem = document.createElement("div");
                    cardDetailsElem.classList.add("prx_crd_det_v2");
                    cardTitleWrap.appendChild(cardDetailsElem);

                    // Add proxy card title
                    const cardTitleText = document.createElement("div");
                    cardTitleText.classList.add("crd_tit_v2");
                    cardTitleText.classList.add("smaller");
                    cardTitleText.innerHTML = item.proxy_name;
                    cardTitleText.setAttribute("crd_tit", item.proxy_name);
                    cardTitleWrap.appendChild(cardTitleText);

                    // Add proxy card subtitle
                    const cardSubTitle = document.createElement("div");
                    cardSubTitle.classList.add("prx_subtxt_v2");
                    cardSubTitle.setAttribute("crd_ports", item.proxy_name);
                    cardSubTitle.classList.add("smaller");
                    cardSubTitle.innerHTML =
                        "HTTP " + item.h_port + " • " + "SOCKS5 " + item.s_port;
                    cardTitleWrap.appendChild(cardSubTitle);

                    // Add proxy indicator wrap
                    const indicatorWrap = document.createElement("div");
                    indicatorWrap.classList.add("ind_wrp_v2");
                    indicatorWrap.classList.add("w-clearfix");
                    prxCardTop.appendChild(indicatorWrap);

                    if (item.isp == "AT&T") {
                        var ispColor = "blue";
                    } else {
                        if (item.isp == "Verizon") {
                            var ispColor = "red";
                        } else {
                            if (item.isp == "T-Mobile") {
                                var ispColor = "pink";
                            }
                        }
                    }

                    // Add proxy card isp indicator
                    const ispTitle = document.createElement("div");
                    ispTitle.classList.add("ind_v3");
                    ispTitle.classList.add(ispColor);
                    ispTitle.innerHTML = item.isp;
                    ispTitle.setAttribute("crd_isp", item.proxy_name);
                    indicatorWrap.appendChild(ispTitle);

                    // Add proxy card location indicator
                    const locTitle = document.createElement("div");
                    locTitle.classList.add("ind_v3");
                    locTitle.classList.add("purple");
                    locTitle.innerHTML = item.location;
                    locTitle.setAttribute("crd_loc", item.proxy_name);
                    indicatorWrap.appendChild(locTitle);

                    // Add proxy card threads indicator
                    const threadsTitle = document.createElement("div");
                    threadsTitle.classList.add("ind_v3");
                    threadsTitle.classList.add("light-blue");
                    threadsTitle.innerHTML =
                        parseInt(item.h_threads) + parseInt(item.s_threads) + " threads";
                    threadsTitle.setAttribute("crd_threads", item.proxy_name);
                    indicatorWrap.appendChild(threadsTitle);

                    if (item.traffic < 1024) {
                        var suffix = "Bytes";
                        var divider = 1;
                    } else {
                        if (item.traffic >= 1024 && item.traffic < 1048576) {
                            var suffix = "KB";
                            var divider = 1024;
                        } else {
                            if (item.traffic >= 1048576 && item.traffic < 1073741824) {
                                var suffix = "MB";
                                var divider = 1048576;
                            } else {
                                if (
                                    item.traffic >= 1073741824 &&
                                    item.traffic < 1099511627776
                                ) {
                                    var suffix = "GB";
                                    var divider = 1073741824;
                                } else {
                                    if (item.traffic >= 1099511627776) {
                                        var suffix = "TB";
                                        var divider = 1099511627776;
                                    }
                                }
                            }
                        }
                    }

                    if (item.traffic < 1024) {
                        var divided = parseInt(item.traffic) / parseInt(divider);
                        var converted = divided + " " + suffix;
                    } else {
                        var divided = parseInt(item.traffic) / parseInt(divider);
                        var converted = divided.toFixed(2) + " " + suffix;
                    }

                    // Add proxy card traffic indicator
                    const trafficTitle = document.createElement("div");
                    trafficTitle.classList.add("ind_v3");
                    trafficTitle.classList.add("light-blue");
                    trafficTitle.innerHTML = converted;
                    trafficTitle.setAttribute("crd_traffic", item.proxy_name);
                    indicatorWrap.appendChild(trafficTitle);

                    // Add proxy card auto-change indicator
                    var autoChange = item.auto_change;
                    if (autoChange == true) {
                        var autoChangeColor = "green";
                        var autoChangeText = "auto-change updating"; //item.next_ip_change;
                        var autoChangeTarget = "auto_change_on";
                    } else {
                        var autoChangeColor = "grey";
                        var autoChangeText = "auto-change off";
                        var autoChangeTarget = "auto_change_off";
                    }

                    const autoChangeTitle = document.createElement("div");
                    autoChangeTitle.classList.add("ind_v3");
                    autoChangeTitle.classList.add(autoChangeTarget);
                    autoChangeTitle.classList.add(autoChangeColor);
                    autoChangeTitle.innerHTML = autoChangeText;
                    autoChangeTitle.setAttribute("crd_auto", item.proxy_name);
                    autoChangeTitle.setAttribute("datetime", item.next_ip_change);
                    indicatorWrap.appendChild(autoChangeTitle);

                    const lastIpChange = document.createElement("div");
                    lastIpChange.classList.add("ind_v3");
                    lastIpChange.classList.add("last_ip_change");
                    lastIpChange.setAttribute("datetime", item.last_ip_change);
                    lastIpChange.innerHTML = "ip change updating"; // item.last_ip_change;
                    lastIpChange.setAttribute("crd_last_ip_change", item.proxy_name);
                    indicatorWrap.appendChild(lastIpChange);

                    const lastReboot = document.createElement("div");
                    lastReboot.classList.add("ind_v3");
                    lastReboot.classList.add("last_reboot");
                    lastReboot.setAttribute("datetime", item.last_reboot);
                    lastReboot.innerHTML = "reboot updating"; //item.last_reboot;
                    lastReboot.setAttribute("crd_last_reboot", item.proxy_name);
                    indicatorWrap.appendChild(lastReboot);

                    //   // Create interact
                    //   const prxCardInteract = document.createElement("div");
                    //   prxCardInteract.classList.add("prx_crd_act");
                    //   prxCardInteract.setAttribute("interact", item.proxy_name);
                    //   prxCardInteract.setAttribute("onclick", "interact(this)");
                    //   prxCardInteract.innerHTML = "Interact";
                    //   card.appendChild(prxCardInteract);

                    const prxModX = document.getElementById("mod_x");
                    prxModX.setAttribute("onclick", "closeModal(this)");

                    var add_isp_count = parseInt(isp_count) + 1;
                    isp_count = add_isp_count;

                    document.querySelector("#all_isps_cnt").innerHTML = isp_count;
                }
            }
            resolve("🤡");
        }, 200);
    });
}
