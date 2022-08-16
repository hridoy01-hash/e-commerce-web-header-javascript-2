
(async function () {
    let BUSINESS_ID = "62024b7c0d36dfc17e75e2bd";
    // let HEADER_LOGO = <% businessInfo_logo %>;
    // let PRIMARY_COLOR = <~ primaryColor ~>;
    let PRIMARY_COLOR = "#B0946D";
    let HEADER_LOGO = "logo.webp";
    let HEADER_LOGO_URL = `https://www.soppiya.com/media/images/${BUSINESS_ID}/business/${HEADER_LOGO}`;
    let timeOut = null;
    let BUSINESS_INFO = true;
    // let BUSINESS_INFO = `<# showBusinessInfo #>`;
    let email = "example@gmail.com";
    // let email = `<# email #>`;
    let mobile = "+0251035131";
    // let mobile = `<# mobile #>`;
    let address = "2880 Broadway, New York, NY 10025";
    // let address = `<# address #>`;
    let screenWidth = document.body.clientWidth;

    (function sidebarOpenClose() {
        let hamburgerBtn = document.querySelector(".s0401_hamburger_icon");
        let s0401_hamburger_icon = document.querySelector(".s0401_hamburger_icon");
        let s0401_sidebar_area = document.querySelector(".s0401_sidebar_area");
        // console.log("Screen Width", screenWidth);
        window.addEventListener("resize", function (event) {
            screenWidth = document.body.clientWidth;
            // console.log("Screen Width after resize", screenWidth);
        });

        // window.addEventListener("resize", function(event){
        //             let screenWidth = document.body.clientWidth;
        //             if(screenWidth > 767 && screenWidth < 1025){
        //                 document.querySelector(".s0401_brand_logo").style.display = "none";
        //                 document.querySelector(".s0401_header_right").style.display = "none";
        //             }else{
        //                 document.querySelector(".s0401_brand_logo").style.display = "block";
        //             document.querySelector(".s0401_header_right").style.display = "block";
        //             }
        //         });
        // setDisplay();
        hamburgerBtn.addEventListener("click", function () {
            // s0401_hamburger_icon.classList.toggle("s0401_hamburger_icon_active");
            if (!hamburgerBtn.classList.contains("s0401_hamburger_icon_active")) {
                hamburgerBtn.classList.add("s0401_hamburger_icon_active");
                s0401_sidebar_area.classList.add("s0401_sidebar_area_open");
                // document.querySelector(".s0401_brand_logo").style.display = "none";
                // document.querySelector(".s0401_header_right").style.display = "none";
                // if(screenWidth > 767 && screenWidth < 1025){
                //         document.querySelector(".s0401_brand_logo").style.display = "none";
                //         document.querySelector(".s0401_header_right").style.display = "none";
                //     }else{
                //         document.querySelector(".s0401_brand_logo").style.display = "flex";
                //     document.querySelector(".s0401_header_right").style.display = "block";
                //     }
                setDisplay();


            } else {
                hamburgerBtn.classList.remove("s0401_hamburger_icon_active");
                s0401_sidebar_area.classList.remove("s0401_sidebar_area_open");
                document.querySelector(".s0401_brand_logo").style.display = "flex";
                document.querySelector(".s0401_header_right").style.display = "block";
            }

        })
        function setDisplay() {
            if (screenWidth > 767 && screenWidth < 1025) {
                document.querySelector(".s0401_brand_logo").style.display = "none";
                document.querySelector(".s0401_header_right").style.display = "none";
            } else {
                document.querySelector(".s0401_brand_logo").style.display = "flex";
                document.querySelector(".s0401_header_right").style.display = "block";
            }
        }
        // hamburgerBtn.addEventListener("click", function () {
        //     s0401_sidebar_area.classList.toggle("s0401_sidebar_area_open");

        // });
    })();

    // load catagories data
    const headerCategoriesData = async (url) => { try { let response = await fetch(url, { method: "get", headers: { "businessid": `${BUSINESS_ID}` } }); response = await response.json(); if (response.Error) { return console.log(response.Error) }; return response; } catch (e) { return }; };
    let sidebarCategories = await headerCategoriesData(`https://api.soppiya.com/v2.1/widget/header/category`);

    // load pages Data
    const headerPagesData = async (url) => { try { let response = await fetch(url, { method: "get", headers: { "businessid": `${BUSINESS_ID}` } }); response = await response.json(); if (response.Error) { return console.log(response.Error) }; return response; } catch (e) { return }; };
    let sidebarPages = await headerPagesData(`https://api.soppiya.com/v2.1/widget/header/page`);

    // load social Data
    const headerSocialData = async (url) => { try { let response = await fetch(url, { method: "get", headers: { "businessid": `${BUSINESS_ID}` } }); response = await response.json(); if (response.Error) { return console.log(response.Error) }; return response; } catch (e) { return }; };
    let sidebarSocial = await headerSocialData(`https://api.soppiya.com/v2.1/widget/header/social`);

    async function headerSearchedData(searchedValue) {
        if (timeOut) {
            clearTimeout(timeOut);
        };
        timeOut = setTimeout(async function () {
            try {
                if (searchedValue.length > 0) {
                    let response = await fetch(`https://api.soppiya.com/v2.1/widget/header/search?q=${searchedValue}`, {
                        method: "get",
                        headers: {
                            "businessId": `${BUSINESS_ID}`
                        }
                    });

                    let searchedData = await response.json();
                    // console.log(searchedData);
                    if (Object.values(searchedData).length > 0) {
                        if (document.getElementById("s0401_search_error_id")) {
                            document.getElementById("s0401_search_error_id").remove();
                        };
                        if (document.getElementById("s0401_search_box_suggession_field_id").childNodes) {
                            document.getElementById("s0401_search_box_suggession_field_id").textContent = "";
                        };
                        await loadSearchedItems(searchedData);
                    } else if (Object.values(searchedData).length === 0) {
                        document.getElementById("s0401_search_box_suggession_field_id").textContent = "";
                        let searchError = elementMaker("div", ["s0401_suggestion_item"], "s0401_search_error_id");
                        let searchErrorP = elementMaker("p", ["s0401_suggestion_item_txt"]);
                        searchErrorP.innerText = "Data Not Found";
                        searchError.appendChild(searchErrorP);
                        document.getElementById("s0401_search_box_suggession_field_id").appendChild(searchError);
                        searchError.parentNode.style.background = "#fff";
                    };
                } else if (searchedValue.length === 0) {
                    document.getElementById("s0401_search_box_suggession_field_id").style.background = "#40474d";
                    document.getElementById("s0401_search_box_suggession_field_id").textContent = "";
                };
            } catch (err) {
                console.log(err.message);
            };
        }, 350);
    };

    typeof handleNotification === "function" && handleNotification(true, true);

    (function headerLogo() {
        document.getElementById("s0401_header_logo_id").setAttribute("src", `${HEADER_LOGO_URL}`);

    })();

    document.getElementById("s0401_header_logo_id").addEventListener("click", function () {
        typeof handleNavigate === "function" && handleNavigate("/");
        console.log('/');
    });



    (function openAllCategoryAndIconRotate() {
        document.getElementById("s0401_sidebar_all_category_p_id").addEventListener("click", () => {
            let iconId = document.getElementById("s0401_sidebar_all_category_arrow_icon_id");
            let subCategoryUl = document.getElementById("s0401_sub_categories_list_id");
            if (iconId.classList.contains("s0401_arrow_icon_rotate")) {
                iconId.classList.remove("s0401_arrow_icon_rotate");
                subCategoryUl.style.display = "block";
                if (document.getElementById("s0401_sub_categories_list_id").children.length < 1) {
                    subCategoryUl.style.marginBottom = "25px";
                    loadSidebarCategories(sidebarCategories);
                };
            } else {
                iconId.classList.add("s0401_arrow_icon_rotate");
                subCategoryUl.style.display = "none";

            };
        });
    })();
    async function loadSidebarCategories(sidebarCategories) {

        await sidebarCategories.forEach(element => {

            let subCateGoryLi = elementMaker("li", ["s0401_sub_categories_item"]);
            let subCategoryP = elementMaker("p", ["s0401_sub_categories_link"]);
            let subCategoryTextSpan = elementMaker("span", ["s0401_sub_categories_txt"]);
            subCategoryTextSpan.innerText = `${element.name}`;
            subCategoryP.appendChild(subCategoryTextSpan);

            if (element.hasChild === true) {
                let subCategoryArrowIconSpan = elementMaker("span", ["s0401_arrow_icon", "s0401_arrow_icon_rotate"], `s0401_arrow_icon_span_id_${element._id}`);
                subCategoryArrowIconSpan.innerHTML = `
                                       <svg xmlns="http://www.w3.org/2000/svg" width="8" height="4.267"
                                            viewBox="0 0 8 4.267">
                                            <path id="Arrow"
                                                d="M10.226,13.293,9.4,12.45l3.1-3.157L9.4,6.136l.829-.843,3.1,3.157a1.208,1.208,0,0,1,0,1.687Z"
                                                transform="translate(13.293 -9.4) rotate(90)" fill="#fff"
                                                opacity="0.5" />
                                        </svg>
                        `;
                subCategoryP.appendChild(subCategoryArrowIconSpan);
            };
            subCateGoryLi.appendChild(subCategoryP);
            subCategoryP.addEventListener("click", () => {
                if (element.hasChild === true) {
                    console.log("children", subCateGoryLi.children.length);
                    if (subCateGoryLi.children.length === 1) {
                        let subSubCategoryNav = elementMaker("nav", ["s0401_sub_sub_categories_nav_area"]);
                        let subSubCategoryUl = elementMaker("ul", ["s0401_sub_categories_list"], `s0401_sub_categories_ul_id_${element._id}`);

                        subSubCategoryNav.appendChild(subSubCategoryUl);
                        subCateGoryLi.appendChild(subSubCategoryNav);
                    };
                    let iconSpanId = document.getElementById(`s0401_arrow_icon_span_id_${element._id}`);
                    let subSubParentId = document.getElementById(`s0401_sub_categories_ul_id_${element._id}`);

                    if (iconSpanId.classList.contains("s0401_arrow_icon_rotate")) {
                        closeSidebarSubItems();
                        iconSpanId.classList.remove("s0401_arrow_icon_rotate");
                        console.log(subSubParentId);
                        subSubParentId.style.display = "block";
                        if (subSubParentId.children.length < 1) {

                            subSubParentId.style.marginBottom = "20px";
                            loadSidebarSubSubCategories(`s0401_sub_categories_ul_id_${element._id}`, element._id);
                        };
                    } else {
                        console.log("display none")
                        iconSpanId.classList.add("s0401_arrow_icon_rotate");
                        subSubParentId.style.display = "none";
                    };

                } else if (element.hasChild === false) {
                    typeof handleNavigate === "function" && handleNavigate(`/category/${element._id}`);
                };
            });
            document.getElementById("s0401_sub_categories_list_id").appendChild(subCateGoryLi);
        });
    };

    async function loadSidebarSubSubCategories(parentId, elementId) {
        try {
            let response = await fetch(`https://api.soppiya.com/v2.1/widget/header/category/${elementId}`, {
                method: "get",
                headers: {
                    "businessId": `${BUSINESS_ID}`
                }
            });
            let subSubCategoryData = await response.json();
            let subSubCategoryLi;
            subSubCategoryData.forEach(element => {
                console.log(element);
                subSubCategoryLi = elementMaker("li", ["s0401_sub_categories_item"], "s0401_sub_categories_item_id");
                let subSubCategoryP = elementMaker("p", ["s0401_sub_categories_link"]);
                let subSubCategoryNameSpan = elementMaker("span", ["s0401_sub_categories_txt"]);
                subSubCategoryNameSpan.innerText = `${element.name}`;
                subSubCategoryP.appendChild(subSubCategoryNameSpan);
                if (element.hasChild === true) {
                    let subSubCategoryArrowIconSpan = elementMaker("span", ["s0401_arrow_icon", "s0401_arrow_icon_rotate"], `s0401_arrow_icon_sub_sub_id_${element.id}`);
                    subSubCategoryArrowIconSpan.innerHTML = `
                                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="4.267"
                                                                viewBox="0 0 8 4.267">
                                                                <path id="Arrow"
                                                                    d="M10.226,13.293,9.4,12.45l3.1-3.157L9.4,6.136l.829-.843,3.1,3.157a1.208,1.208,0,0,1,0,1.687Z"
                                                                    transform="translate(13.293 -9.4) rotate(90)"
                                                                    fill="#fff" opacity="0.5" />
                                                            </svg>
                                `;
                    subSubCategoryP.appendChild(subSubCategoryArrowIconSpan);
                };
                subSubCategoryLi.appendChild(subSubCategoryP);
                subSubCategoryP.addEventListener("click", () => {
                    console.log(subSubCategoryLi)
                    if (element.hasChild === true) {
                        if (subCateGoryLi.children.length === 1) {
                            let subSubCategoryNav = elementMaker("nav", ["s0401_sub_sub_categories_nav_area"]);
                            let subSubCategoryUl = elementMaker("ul", ["s0401_sub_categories_list"], `s0401_sub_sub_categories_ul_id_${element._id}`);
                            subSubCategoryNav.appendChild(subSubCategoryUl);
                            subSubCateGoryLi.appendChild(subSubCategoryNav);
                        };
                        let iconSpanId = document.getElementById(`s0401_arrow_icon_sub_sub_id_${element._id}`);
                        let subSubParentId = document.getElementById(`s0401_sub_sub_categories_ul_id_${element._id}`);

                        if (iconSpanId.classList.contains("s0401_arrow_icon_rotate")) {
                            iconSpanId.classList.remove("s0401_arrow_icon_rotate");
                            subSubParentId.style.display = "block";
                            if (subSubParentId.children.length < 1) {
                                subSubParentId.style.marginBottom = "20px";
                                loadSidebarSubSubSubCategories(`s0401_sub_sub_categories_ul_id_${element._id}`, element._id);
                            };
                        } else {
                            iconSpanId.classList.add("s0401_arrow_icon_rotate");
                            subSubParentId.style.display = "none";
                        };
                    } else if (element.hasChild === false) {
                        typeof handleNavigate === "function" && handleNavigate(`/category/${element._id}`);
                    };
                });

                document.getElementById(parentId).appendChild(subSubCategoryLi);
            });
        } catch (err) {
            console.log(err.message);
        };
    };

    async function loadSidebarSubSubSubCategories(parentId, elementId) {
        try {
            let response = await fetch(`https://api.soppiya.com/v2.1/widget/header/category/${elementId}`, {
                method: "get",
                headers: {
                    "businessId": `${BUSINESS_ID}`
                }
            });
            let subSubSubCategoryData = await response.json();
            subSubSubCategoryData.forEach(element => {
                let subSubSubli = elementMaker("li", ["s0401_sub_categories_item"]);
                let subSubSubP = elementMaker("p", ["s0401_sub_categories_link"]);
                let subSubSubSpan = elementMaker("span", ["s0401_sub_categories_txt"]);
                subSubSubSpan.innerText = `${element.name}`;
                subSubSubP.appendChild(subSubSubSpan);
                subSubSubli.appendChild(subSubSubP);
                subSubSubP.addEventListener("click", () => {
                    typeof handleNavigate === "function" && handleNavigate(`/category/${element._id}`);
                });
                document.getElementById(parentId).appendChild(subSubSubli);
            });
        } catch (err) {
            console.log(err.message)
        };
    };
    function closeSidebarSubItems() {
        let parentElementId = document.getElementById("s0401_sub_categories_list_id");
        for (let i = 0; i < parentElementId.children.length; i++) {
            if (parentElementId.children[i]?.children[0].children.length > 1) {
                if (!parentElementId.children[i]?.children[0].children[1].classList.contains("s0401_arrow_icon_rotate")) {
                    parentElementId.children[i]?.children[0].children[1].classList.add("s0401_arrow_icon_rotate");
                    parentElementId.children[i].children[1].children[0].style.display = "none";
                };
            };
        };
    };
    async function loadsidebarPagesList(sidebarPages) {

        for (let key of sidebarPages) {

            if (Object.values(key).length >= 0) {
                let legalLi = elementMaker("li", ["s0401_sidebar_nav_item"]);
                let legalP = elementMaker("p", ["s0401_sidebar_nav_link"]);
                let legalSpan = elementMaker("span", ["s0401_sidebar_nav_txt"]);

                legalSpan.innerText = `${key.title}`;

                legalP.appendChild(legalSpan);
                legalLi.appendChild(legalP);
                legalP.addEventListener("click", () => {
                    typeof handleNavigate === "function" && handleNavigate(`/page/key.slug}`);
                    console.log(`/page/key.slug`);
                });
                document.getElementById("s0401_sidebar_legal_item_parent_id").appendChild(legalLi);
            };
        };
    }
    await loadsidebarPagesList(sidebarPages);

    /*   (function loadSidebarSocialList(sidebarSocial) {
          // console.log(sidebarSocial);
          for (let key of sidebarSocial) {
              console.log(key);
              let socialLi = elementMaker("li", ["s0401_social_icon_nav_item"]);
              let socialA = elementMaker("a", ["s0201_harvest_social_icon_link"]);
              setAttributes(socialA, { "src": `${sidebarSocial[key].url}` });
              socialA.innerHTML = `${sidebarSocial[key].svg}`;
              socialA.children[0].children[0].lastChild.style.fill = `${PRIMARY_COLOR}`;
              socialLi.appendChild(socialA);
              socialLi.addEventListener("click", () => {
                  window.open(`${sidebarSocial[key].url}`, "_blank");
              });
              document.getElementById("s0401_sidebar_social_icon_ul_id").appendChild(socialLi);
          };
      })(sidebarSocial); */

    async function loadSidebarSocialList(sidebarSocial) {
        // console.log(sidebarSocial);
        for (singleSocialData of sidebarSocial) {
            // console.log(singleSocialData);
            let socialLi = elementMaker("li", ["s0401_social_icon_nav_item"]);
            let socialA = elementMaker("a", ["s0201_harvest_social_icon_link"]);
            setAttributes(socialA, { "src": `${singleSocialData.url}` });
            socialA.innerHTML = `${singleSocialData.svg}`;
            socialA.children[0].children[0].lastChild.style.fill = `${PRIMARY_COLOR}`;
            socialLi.appendChild(socialA);
            socialLi.addEventListener("click", () => {
                window.open(`${singleSocialData.url}`, "_blank");
            });
            document.getElementById("s0401_sidebar_social_icon_ul_id").appendChild(socialLi);
        }
    }
    await loadSidebarSocialList(sidebarSocial);
    (function loadSidebarGoogleMap() {
        let parentDiv = document.getElementById("s0401_footer_location_map_box_wrapper_id");
        typeof mapPluginRegister === "function" && mapPluginRegister(parentDiv);
    })();

    (function openCloseSearchbar() {
        document.getElementById("s0401_header_search_item_id").addEventListener("click", () => {
            document.getElementById("s0401_search_box_area").classList.add("s0401_search_popup");
            document.getElementById("s0401_search_box_suggession_field_id").textContent = "";
            document.getElementById("s0401_search_box_suggession_field_id").style.background = "#40474d";
            document.getElementById("s0401_search_input").value = "";

        });
        document.getElementById("s0401_header_mobile_search_item_id").addEventListener("click", () => {
            document.getElementById("s0401_search_box_area").classList.add("s0401_search_popup");
            document.getElementById("s0401_search_box_suggession_field_id").textContent = "";
            document.getElementById("s0401_search_box_suggession_field_id").style.background = "#40474d";
            document.getElementById("s0401_search_input").value = "";
        });
        document.getElementById("s0401_search_box_close_icon_id").addEventListener("click", () => {
            document.getElementById("s0401_search_box_area").classList.contains("s0401_search_popup") && document.getElementById("s0401_search_box_area").classList.remove("s0401_search_popup");
            if (document.getElementById("s0401_search_box_suggession_field_id").childNodes) {
                document.getElementById("s0401_search_box_suggession_field_id").textContent = "";
                document.getElementById("s0401_search_box_suggession_field_id").style.background = "#40474d";
                document.getElementById("s0401_search_input").value = "";
            };
        });
    })();
    (function loadBusinessAddress() {
        if (BUSINESS_INFO === true) {
            let addressWrapper = elementMaker("div", ["s0401_address_txt_wrapper"]);
            addressWrapper.innerHTML = `
                <p class="s0401_address_txt">
                <span>A</span>: ${address}</p>
                `;
            document.getElementById("s0401_address_details_id").appendChild(addressWrapper);
            let phoneWrapper = elementMaker("div", ["s0401_address_txt_wrapper"]);
            phoneWrapper.innerHTML = `
                <p class="s0401_address_txt">
                <span>P</span>: ${mobile}</p>
                `;
            document.getElementById("s0401_address_details_id").appendChild(phoneWrapper);
            let emailWrapper = elementMaker("div", ["s0401_address_txt_wrapper"]);
            emailWrapper.innerHTML = `
                <p class="s0401_address_txt">
                <span>P</span>: ${email}</p>
                `;
            document.getElementById("s0401_address_details_id").appendChild(emailWrapper);
        };
    })();

    (function searchInput() {
        document.getElementById("s0401_search_input").addEventListener("input", (event) => {
            let searchedValue = event.target.value;
            headerSearchedData(searchedValue);
        });
    })();
    async function loadSearchedItems(searchedData) {

        searchedData?.forEach(element => {
            let searchedValueDiv = elementMaker("div", ["s0401_suggestion_item"]);
            let searchedValueP = elementMaker("p", ["s0401_suggestion_item_txt"]);
            searchedValueP.innerText = `${element.name}`;
            searchedValueDiv.appendChild(searchedValueP);
            document.getElementById("s0401_search_box_suggession_field_id").appendChild(searchedValueDiv);
            document.getElementById("s0401_search_box_suggession_field_id").style.background = "#fff";
            searchedValueDiv.addEventListener("click", () => {
                typeof handleNavigate === "function" && handleNavigate(`/item/${element.slug}`);
            });
        });
    };

    (async function accountEvent() {
        if (await checkUserLoggedIn() === true) {
            if (!document.getElementById("s0401_header_account_id").classList.contains("s0401_active_notification")) { document.getElementById("s0401_header_account_id").classList.add("s0401_active_notification") };
            if (!document.getElementById("s0401_header_mobile_account_id").classList.contains("s0401_active_notification")) { document.getElementById("s0401_header_mobile_account_id").classList.add("s0401_active_notification") };
        } else if (await checkUserLoggedIn() === false) {
            if (document.getElementById("s0401_header_account_id").classList.contains("s0401_active_notification")) { document.getElementById("s0401_header_account_id").classList.remove("s0401_active_notification") };
            if (document.getElementById("s0401_header_mobile_account_id").classList.contains("s0401_active_notification")) { document.getElementById("s0401_header_mobile_account_id").classList.remove("s0401_active_notification") };
        };
    })();
    (async function accountClickEvent() {
        document.getElementById("s0401_header_account_id").addEventListener("click", async () => await setAccountNavigation());
        document.getElementById("s0401_header_mobile_account_id").addEventListener("click", async () => await setAccountNavigation());
    })();

    async function setAccountNavigation() {
        typeof handleNavigate === "function" && handleNavigate(true, "/account");
        console.log('/account');
        // if (await checkUserLoggedIn() === false) {
        //     typeof handleAuth === "function" && handleAuth(true, "/account"); console.log("/auth")
        // } else if (await checkUserLoggedIn() === true) { typeof handleNavigate === "function" && handleNavigate("/account"); console.log("/account") };
    };

    async function checkUserLoggedIn() {
        let userLoggedIn = (typeof handleUserAuth === "function" && await handleUserAuth("check", {}));
        return userLoggedIn.status;
    };

    (function wishlistCartEventHandler() {
        document.getElementById("s0401_header_wishlist_id").addEventListener("click", () => handleWishlistCartNavigation("s0401_header_wishlist_id", "s0401_header_mobile_wishlist_id", "/wishlist"));
        document.getElementById("s0401_header_mobile_wishlist_id").addEventListener("click", () => handleWishlistCartNavigation("s0401_header_wishlist_id", "s0401_header_mobile_wishlist_id", "/wishlist"));
        document.getElementById("s0401_header_cart_id").addEventListener("click", () => handleWishlistCartNavigation("s0401_header_cart_id", "s0401_header_mobile_cart_id", "/cart"));
        document.getElementById("s0401_header_mobile_cart_id").addEventListener("click", () => handleWishlistCartNavigation("s0401_header_cart_id", "s0401_header_mobile_cart_id", "/cart"));
    })();
    function handleWishlistCartNavigation(topMenuItem, bottomMenuItem, path) {
        typeof handleNavigate === "function" && handleNavigate(`${path}`);
        removeActiveFillInNotification();

        document.getElementById(`${topMenuItem}`).classList.contains("s0401_active_notification") && document.getElementById(`${topMenuItem}`).classList.remove("s0401_active_notification");
        document.getElementById(`${bottomMenuItem}`).classList.contains("s0401_active_notification") && document.getElementById(`${bottomMenuItem}`).classList.remove("s0401_active_notification");

        document.getElementById(`${topMenuItem}`).children[0].classList.add("s0401_menu_fill");
        document.getElementById(`${bottomMenuItem}`).children[0].classList.add("s0401_menu_fill");
        console.log(`${path}`);
    };




    window.notificationAlert = (type, count) => {
        if (type === "cart") {
            if (count > 0) {
                document.getElementById("s0401_header_cart_id").classList.add("s0401_active_notification");
                document.getElementById("s0401_header_mobile_cart_id").classList.add("s0401_active_notification");
            } else {
                document.getElementById("s0401_header_cart_id")?.classList?.remove("s0401_active_notification");
                document.getElementById("s0401_header_mobile_cart_id")?.classList?.remove("s0401_active_notification");
            };
        } else if (type === "wishlist") {
            if (count > 0) {
                document.getElementById("s0401_header_wishlist_id").classList.add("s0401_active_notification");
                document.getElementById("s0401_header_mobile_wishlist_id").classList.add("s0401_active_notification");
            } else {
                document.getElementById("s0401_header_wishlist_id")?.classList?.remove("s0401_active_notification");
                document.getElementById("s0401_header_mobile_wishlist_id")?.classList?.remove("s0401_active_notification");
            };
        };
    };
    window.setRoute = (path) => {
        if (path === "/account") {
            removeActiveFillInNotification();
            console.log("hi")
            document.getElementById("s0401_header_account_id").children[0].classList.add("s0401_menu_fill");
            document.getElementById("s0401_header_account_id").classList.contains("s0401_active_notification") && document.getElementById("s0401_header_account_id").classList.remove("s0401_active_notification");
        };
    };

    function removeActiveFillInNotification() {
        console.log("remove clicked")
        let allHeaderItem = document.querySelectorAll(".s0401_header_icon_item");
        for (let i = 0; i < allHeaderItem.length; i++) {
            allHeaderItem[i].children[0].classList.contains("s0401_menu_fill") && allHeaderItem[i].children[0].classList.remove("s0401_menu_fill");
        };
    };
    function elementMaker(name, className, id) {
        try {
            let element = document.createElement(name);
            className && (element.className = className.join(" "));
            id && (element.id = id);
            return element;
        } catch (err) {
            console.log(err.message);
        };
    };

    function setAttributes(elementName, allAttributes) {
        for (let key in allAttributes) {
            elementName.setAttribute(key, allAttributes[key]);
        };
    };
})();